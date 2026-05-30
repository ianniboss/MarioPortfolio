import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

/**
 * HeroScrollEngine
 * 
 * A cinematic scroll-driven animation engine with VISIBLE effects:
 * - Floating geometric shapes (Mario-themed colors)
 * - Smooth parallax camera movement
 * - Scroll-driven depth transitions
 * - Ambient floating particles
 */
const HeroScrollEngine = () => {
    const containerRef = useRef(null);
    const rendererRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const frameIdRef = useRef(null);
    const shapesRef = useRef([]);

    useEffect(() => {
        if (!containerRef.current) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const enableMotion = !prefersReducedMotion;
        let isMobile = window.innerWidth < 768;

        const scene = new THREE.Scene();
        sceneRef.current = scene;
        scene.background = null;
        scene.fog = new THREE.FogExp2(0x6aa8ff, 0.0045);

        const camera = new THREE.PerspectiveCamera(
            55,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.set(0, 2, 34);
        cameraRef.current = camera;

        const cameraBase = { x: 0, y: 2, z: 34, lookZ: 0 };
        const pointer = { x: 0, y: 0 };
        const postHero = { t: 0 };
        const fogFrom = new THREE.Color(0x6aa8ff);
        const fogTo = new THREE.Color(0x070a16);

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
        renderer.setClearColor(0x000000, 0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.14;

        const enableShadows = !isMobile;
        renderer.shadowMap.enabled = enableShadows;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        const existingCanvas = document.querySelector('[data-hero-scroll-canvas="true"]');
        if (existingCanvas && existingCanvas.parentNode) {
            existingCanvas.parentNode.removeChild(existingCanvas);
        }

        renderer.domElement.style.position = 'fixed';
        renderer.domElement.style.inset = '0';
        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';
        renderer.domElement.style.zIndex = '0';
        renderer.domElement.style.pointerEvents = 'none';
        renderer.domElement.setAttribute('data-hero-scroll-canvas', 'true');
        document.body.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        const createSkyDome = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 256;
            canvas.height = 256;

            const ctx = canvas.getContext('2d');
            if (!ctx) return null;

            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, '#77c9ff');
            gradient.addColorStop(0.52, '#6aa8ff');
            gradient.addColorStop(1, '#2a4b8d');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const texture = new THREE.CanvasTexture(canvas);
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.minFilter = THREE.LinearMipmapLinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.generateMipmaps = true;

            const material = new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.BackSide,
                depthWrite: false,
                toneMapped: false,
            });

            const mesh = new THREE.Mesh(new THREE.SphereGeometry(420, 32, 16), material);
            mesh.frustumCulled = false;
            mesh.renderOrder = -1000;
            scene.add(mesh);

            return { mesh, material, texture };
        };

        const sky = createSkyDome();

        const ambient = new THREE.AmbientLight(0xffffff, 0.9);
        scene.add(ambient);

        const hemi = new THREE.HemisphereLight(0x9bc9ff, 0x20160a, 0.55);
        scene.add(hemi);

        const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
        keyLight.position.set(14, 18, 12);
        if (enableShadows) {
            keyLight.castShadow = true;
            keyLight.shadow.mapSize.set(1024, 1024);
            keyLight.shadow.camera.near = 1;
            keyLight.shadow.camera.far = 120;
            keyLight.shadow.camera.left = -35;
            keyLight.shadow.camera.right = 35;
            keyLight.shadow.camera.top = 35;
            keyLight.shadow.camera.bottom = -35;
        }
        scene.add(keyLight);

        const fillLight = new THREE.DirectionalLight(0x7db7ff, 0.8);
        fillLight.position.set(-16, 10, 18);
        scene.add(fillLight);

        const warmRim = new THREE.PointLight(0xfff0cc, 0.55, 140);
        warmRim.position.set(0, 10, -26);
        scene.add(warmRim);

        const ground = new THREE.Mesh(
            new THREE.PlaneGeometry(220, 220),
            new THREE.MeshStandardMaterial({
                color: 0x0b1022,
                roughness: 1,
                metalness: 0,
                transparent: true,
                opacity: 0.12
            })
        );
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -10.2;
        ground.receiveShadow = enableShadows;
        scene.add(ground);

        const groundShadow = new THREE.Mesh(
            new THREE.PlaneGeometry(220, 220),
            new THREE.ShadowMaterial({ opacity: 0.18 })
        );
        groundShadow.rotation.x = -Math.PI / 2;
        groundShadow.position.y = -10.18;
        groundShadow.receiveShadow = enableShadows;
        scene.add(groundShadow);

        const shapes = [];

        const isInDeadZone = (x, y) => Math.abs(x) < 14 && Math.abs(y) < 9;

        const getEdgePosition = ({ min = 16, max = 34, yFactor = 0.62 } = {}) => {
            let x, y;
            do {
                const angle = Math.random() * Math.PI * 2;
                const distance = min + Math.random() * (max - min);
                x = Math.cos(angle) * distance;
                y = Math.sin(angle) * (distance * yFactor);
            } while (isInDeadZone(x, y));
            return { x, y };
        };

        const makeOutlined = (mesh, color = 0x5a2e00, opacity = 0.55) => {
            const edges = new THREE.LineSegments(
                new THREE.EdgesGeometry(mesh.geometry),
                new THREE.LineBasicMaterial({ color, transparent: true, opacity })
            );
            mesh.add(edges);
            return mesh;
        };

        const createQuestionBlock = () => {
            const mesh = new THREE.Mesh(
                new THREE.BoxGeometry(2.1, 2.1, 2.1),
                new THREE.MeshStandardMaterial({
                    color: 0xf7b500,
                    roughness: 0.55,
                    metalness: 0.08,
                    emissive: 0x3a2600,
                    emissiveIntensity: 0.36
                })
            );
            mesh.castShadow = enableShadows;
            mesh.receiveShadow = enableShadows;
            makeOutlined(mesh, 0x6b3b00, 0.5);
            return mesh;
        };

        const createCoin = () => {
            const mesh = new THREE.Mesh(
                new THREE.CylinderGeometry(0.95, 0.95, 0.18, 28),
                new THREE.MeshStandardMaterial({
                    color: 0xffd338,
                    roughness: 0.35,
                    metalness: 0.35,
                    emissive: 0x4a2f00,
                    emissiveIntensity: 0.24
                })
            );
            mesh.rotation.z = Math.PI / 2;
            mesh.castShadow = enableShadows;
            makeOutlined(mesh, 0x8a5b00, 0.35);
            return mesh;
        };

        const createPipe = () => {
            const group = new THREE.Group();
            const bodyMat = new THREE.MeshStandardMaterial({
                color: 0x2fbf5b,
                roughness: 0.55,
                metalness: 0.05
            });
            const rimMat = new THREE.MeshStandardMaterial({
                color: 0x35d56a,
                roughness: 0.5,
                metalness: 0.05
            });

            const body = new THREE.Mesh(new THREE.CylinderGeometry(1.35, 1.35, 6.4, 24), bodyMat);
            group.add(body);

            const rim = new THREE.Mesh(new THREE.CylinderGeometry(1.65, 1.65, 0.9, 24), rimMat);
            rim.position.y = 3.25;
            group.add(rim);

            group.traverse((obj) => {
                if (!obj.isMesh) return;
                obj.castShadow = enableShadows;
                obj.receiveShadow = enableShadows;
            });

            return group;
        };

        const createCloud = () => {
            const group = new THREE.Group();
            const mat = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                roughness: 0.92,
                metalness: 0.0
            });

            const puff1 = new THREE.Mesh(new THREE.SphereGeometry(1.15, 18, 18), mat);
            const puff2 = new THREE.Mesh(new THREE.SphereGeometry(1.35, 18, 18), mat);
            const puff3 = new THREE.Mesh(new THREE.SphereGeometry(1.05, 18, 18), mat);

            puff1.position.set(-1.1, 0, 0);
            puff2.position.set(0.25, 0.25, 0.25);
            puff3.position.set(1.25, 0, -0.1);

            group.add(puff1, puff2, puff3);
            return group;
        };

        const addFloating = (obj, { baseX, baseY, baseZ, floatAmp = 0.45, floatSpeed = 0.5, rotSpeed = 0.25, parallax = 6 } = {}) => {
            obj.position.set(baseX, baseY, baseZ);
            obj.userData = {
                baseX,
                baseY,
                baseZ,
                floatAmp,
                floatSpeed,
                floatOffset: Math.random() * Math.PI * 2,
                rotOffset: Math.random() * Math.PI * 2,
                rotSpeed,
                parallax,
            };
            scene.add(obj);
            shapes.push(obj);
        };

        const blockCount = isMobile ? 4 : 6;
        for (let i = 0; i < blockCount; i++) {
            const pos = getEdgePosition({ min: 16, max: 30, yFactor: 0.58 });
            addFloating(createQuestionBlock(), {
                baseX: pos.x,
                baseY: pos.y,
                baseZ: -14 - Math.random() * 12,
                floatAmp: 0.55,
                floatSpeed: 0.42 + Math.random() * 0.25,
                rotSpeed: 0.12 + Math.random() * 0.12,
                parallax: 7
            });
        }

        const coinCount = isMobile ? 7 : 10;
        for (let i = 0; i < coinCount; i++) {
            const pos = getEdgePosition({ min: 18, max: 36, yFactor: 0.64 });
            const coin = createCoin();
            const scale = 0.75 + Math.random() * 0.65;
            coin.scale.set(scale, scale, scale);
            addFloating(coin, {
                baseX: pos.x,
                baseY: pos.y,
                baseZ: -9 - Math.random() * 10,
                floatAmp: 0.35,
                floatSpeed: 0.6 + Math.random() * 0.45,
                rotSpeed: 0.8 + Math.random() * 0.7,
                parallax: 5
            });
        }

        const pipeLeft = createPipe();
        pipeLeft.rotation.y = Math.PI * 0.07;
        addFloating(pipeLeft, { baseX: -22, baseY: -7.4, baseZ: -18, floatAmp: 0.15, floatSpeed: 0.25, rotSpeed: 0.03, parallax: 2 });

        const pipeRight = createPipe();
        pipeRight.rotation.y = -Math.PI * 0.09;
        addFloating(pipeRight, { baseX: 22, baseY: -7.2, baseZ: -22, floatAmp: 0.12, floatSpeed: 0.23, rotSpeed: 0.03, parallax: 1.6 });

        const cloudCount = isMobile ? 4 : 6;
        for (let i = 0; i < cloudCount; i++) {
            const pos = getEdgePosition({ min: 20, max: 42, yFactor: 0.52 });
            const cloud = createCloud();
            const scale = 1.2 + Math.random() * 1.6;
            cloud.scale.set(scale, scale, scale);
            addFloating(cloud, {
                baseX: pos.x,
                baseY: 10 + Math.random() * 10,
                baseZ: -38 - Math.random() * 26,
                floatAmp: 0.25,
                floatSpeed: 0.18 + Math.random() * 0.18,
                rotSpeed: 0.0,
                parallax: 9
            });
        }

        shapesRef.current = shapes;

        const particleCount = isMobile ? 70 : 120;
        const particlesGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            const angle = Math.random() * Math.PI * 2;
            const distance = 24 + Math.random() * 26;

            positions[i] = Math.cos(angle) * distance;
            positions[i + 1] = Math.sin(angle) * (distance * 0.52);
            positions[i + 2] = -45 + Math.random() * 35;

            colors[i] = 0.8 + Math.random() * 0.15;
            colors[i + 1] = 0.78 + Math.random() * 0.2;
            colors[i + 2] = 0.55 + Math.random() * 0.25;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: isMobile ? 0.11 : 0.12,
            transparent: true,
            opacity: 0.42,
            vertexColors: true,
            sizeAttenuation: true
        });

        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        const scrollState = { progress: 0 };
        let scrollTween = null;
        let blendTrigger = null;

        if (enableMotion) {
            scrollTween = gsap.to(scrollState, {
                progress: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: '#home',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.4,
                    onUpdate: (self) => {
                        scrollState.progress = self.progress;

                        const p = scrollState.progress;
                        cameraBase.z = THREE.MathUtils.lerp(34, 24, p);
                        cameraBase.y = THREE.MathUtils.lerp(2, 6.4, p);
                        cameraBase.x = Math.sin(p * Math.PI) * 2.6;
                        cameraBase.lookZ = -10 * p;

                        shapes.forEach((shape) => {
                            if (!shape.userData) return;
                            shape.position.z = shape.userData.baseZ + p * shape.userData.parallax;
                        });

                        particles.rotation.y = p * 0.22;
                    }
                }
            });

            blendTrigger = ScrollTrigger.create({
                trigger: '#about',
                start: 'top bottom',
                end: 'top top',
                scrub: 1.2,
                onUpdate: (self) => {
                    postHero.t = self.progress;

                    cameraBase.z = THREE.MathUtils.lerp(24, 19.5, postHero.t);
                    cameraBase.y = THREE.MathUtils.lerp(6.4, 10.5, postHero.t);
                    cameraBase.x = THREE.MathUtils.lerp(0, 0.8, postHero.t);
                    cameraBase.lookZ = THREE.MathUtils.lerp(-10, -22, postHero.t);

                    shapes.forEach((shape) => {
                        if (!shape.userData) return;
                        shape.position.z = shape.userData.baseZ + shape.userData.parallax - postHero.t * 10;
                    });
                }
            });
        } else {
            camera.lookAt(0, 0.2, 0);
        }

        const clock = new THREE.Clock();
        const renderFrame = () => {
            frameIdRef.current = requestAnimationFrame(renderFrame);
            const t = clock.getElapsedTime();

            const pointerScale = isMobile ? 0 : 1;
            const pointerX = pointer.x * 1.2 * pointerScale;
            const pointerY = -pointer.y * 0.8 * pointerScale;

            camera.position.x = cameraBase.x + pointerX;
            camera.position.y = cameraBase.y + pointerY;
            camera.position.z = cameraBase.z;
            camera.lookAt(pointerX * 0.15, 0.2 + pointerY * 0.1, cameraBase.lookZ);

            if (scene.fog) {
                scene.fog.density = THREE.MathUtils.lerp(0.0045, 0.012, postHero.t);
                scene.fog.color.lerpColors(fogFrom, fogTo, postHero.t);
            }

            ambient.intensity = THREE.MathUtils.lerp(0.9, 0.45, postHero.t);
            hemi.intensity = THREE.MathUtils.lerp(0.55, 0.25, postHero.t);
            keyLight.intensity = THREE.MathUtils.lerp(2.2, 1.1, postHero.t);
            fillLight.intensity = THREE.MathUtils.lerp(0.8, 0.35, postHero.t);
            warmRim.intensity = THREE.MathUtils.lerp(0.55, 0.2, postHero.t);
            particlesMaterial.opacity = THREE.MathUtils.lerp(0.42, 0.12, postHero.t);

            shapes.forEach((shape) => {
                if (!shape.userData) return;
                shape.position.x = shape.userData.baseX + Math.sin(t * 0.12 + shape.userData.floatOffset) * 0.18;
                shape.position.y = shape.userData.baseY + Math.sin(t * shape.userData.floatSpeed + shape.userData.floatOffset) * shape.userData.floatAmp;

                if (shape.userData.rotSpeed > 0) {
                    shape.rotation.y = shape.userData.rotOffset + t * shape.userData.rotSpeed;
                    shape.rotation.x = Math.sin(t * 0.18 + shape.userData.rotOffset) * 0.15;
                }
            });

            particles.rotation.x = Math.sin(t * 0.22) * 0.05;
            renderer.render(scene, camera);
        };

        if (enableMotion) {
            renderFrame();
        } else {
            renderer.render(scene, camera);
        }

        const handlePointerMove = (e) => {
            const w = window.innerWidth || 1;
            const h = window.innerHeight || 1;
            pointer.x = (e.clientX / w) * 2 - 1;
            pointer.y = (e.clientY / h) * 2 - 1;
        };

        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            isMobile = width < 768;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('pointermove', handlePointerMove);

        const handleVisibility = () => {
            if (!enableMotion) return;
            if (document.hidden) {
                if (frameIdRef.current) {
                    cancelAnimationFrame(frameIdRef.current);
                    frameIdRef.current = null;
                }
            } else if (!frameIdRef.current) {
                clock.start();
                renderFrame();
            }
        };

        document.addEventListener('visibilitychange', handleVisibility);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('pointermove', handlePointerMove);
            document.removeEventListener('visibilitychange', handleVisibility);

            if (frameIdRef.current) {
                cancelAnimationFrame(frameIdRef.current);
            }

            if (scrollTween) {
                if (scrollTween.scrollTrigger) scrollTween.scrollTrigger.kill();
                scrollTween.kill();
            }

            if (blendTrigger) blendTrigger.kill();

            if (rendererRef.current) {
                if (rendererRef.current.domElement && rendererRef.current.domElement.parentNode) {
                    rendererRef.current.domElement.parentNode.removeChild(rendererRef.current.domElement);
                }
                rendererRef.current.dispose();
            }

            const disposeMaterial = (material) => {
                if (!material) return;
                if (Array.isArray(material)) {
                    material.forEach(disposeMaterial);
                    return;
                }
                Object.values(material).forEach((value) => {
                    if (value && value.isTexture) value.dispose();
                });
                material.dispose();
            };

            scene.traverse((obj) => {
                if (obj.geometry) obj.geometry.dispose();
                if (obj.material) disposeMaterial(obj.material);
            });

            if (sky) {
                sky.texture.dispose();
                sky.material.dispose();
                sky.mesh.geometry.dispose();
            }

            particlesGeometry.dispose();
            particlesMaterial.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="hero-scroll-engine"
            style={{
                display: 'none'
            }}
            aria-hidden="true"
        />
    );
};

export default HeroScrollEngine;
