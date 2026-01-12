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

        // === SCENE SETUP ===
        const scene = new THREE.Scene();
        sceneRef.current = scene;
        scene.background = null; // Transparent

        // === CAMERA SETUP ===
        const camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.set(0, 0, 30);
        cameraRef.current = camera;

        // === RENDERER SETUP ===
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // === MARIO-THEMED COLORS ===
        const marioColors = [
            0xE52521, // Mario Red
            0xFBD000, // Mario Yellow
            0x049CD8, // Mario Blue
            0x7AC943, // Green (pipes)
            0xFFFFFF, // White (clouds)
        ];

        // === FLOATING GEOMETRIC SHAPES ===
        const shapes = [];
        const geometries = [
            new THREE.BoxGeometry(1, 1, 1),        // Block
            new THREE.SphereGeometry(0.5, 16, 16), // Coin
            new THREE.TorusGeometry(0.4, 0.15, 8, 24), // Ring
            new THREE.OctahedronGeometry(0.6),     // Star
            new THREE.TetrahedronGeometry(0.5),    // Crystal
        ];

        // Create 25 floating shapes at various depths
        for (let i = 0; i < 25; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const color = marioColors[Math.floor(Math.random() * marioColors.length)];

            const material = new THREE.MeshBasicMaterial({
                color: color,
                transparent: true,
                opacity: 0.4 + Math.random() * 0.3, // 0.4 - 0.7 opacity
                wireframe: Math.random() > 0.5, // Some wireframe, some solid
            });

            const mesh = new THREE.Mesh(geometry, material);

            // Random position spread across the view
            mesh.position.x = (Math.random() - 0.5) * 50;
            mesh.position.y = (Math.random() - 0.5) * 30;
            mesh.position.z = (Math.random() - 0.5) * 40 - 10;

            // Random rotation
            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;

            // Random scale
            const scale = 0.5 + Math.random() * 1.5;
            mesh.scale.set(scale, scale, scale);

            // Store original position for parallax
            mesh.userData = {
                originalZ: mesh.position.z,
                rotationSpeedX: (Math.random() - 0.5) * 0.02,
                rotationSpeedY: (Math.random() - 0.5) * 0.02,
                floatSpeed: 0.5 + Math.random() * 1,
                floatOffset: Math.random() * Math.PI * 2,
            };

            scene.add(mesh);
            shapes.push(mesh);
        }
        shapesRef.current = shapes;

        // === AMBIENT PARTICLES (stars/dust) ===
        const particleCount = 100;
        const particlesGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 60;
            positions[i + 1] = (Math.random() - 0.5) * 40;
            positions[i + 2] = (Math.random() - 0.5) * 50 - 20;

            // Random warm colors
            colors[i] = 0.8 + Math.random() * 0.2;     // R
            colors[i + 1] = 0.7 + Math.random() * 0.3; // G
            colors[i + 2] = 0.3 + Math.random() * 0.3; // B
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.15,
            transparent: true,
            opacity: 0.6,
            vertexColors: true,
            sizeAttenuation: true
        });

        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        // === SCROLL-DRIVEN CAMERA ANIMATION ===
        const scrollState = { progress: 0 };

        gsap.to(scrollState, {
            progress: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: '#home',
                start: 'top top',
                end: 'bottom top',
                scrub: 1.5,
                onUpdate: (self) => {
                    scrollState.progress = self.progress;

                    // Camera moves forward and up
                    camera.position.z = 30 - scrollState.progress * 15;
                    camera.position.y = scrollState.progress * 5;
                    camera.rotation.x = -scrollState.progress * 0.1;

                    // Parallax: shapes move at different speeds based on depth
                    shapes.forEach((shape) => {
                        const depth = (shape.userData.originalZ + 30) / 60; // Normalize depth 0-1
                        shape.position.z = shape.userData.originalZ + scrollState.progress * 10 * depth;
                    });

                    // Particles drift
                    particles.rotation.y = scrollState.progress * 0.2;
                }
            }
        });

        // === ANIMATION LOOP ===
        const animate = () => {
            frameIdRef.current = requestAnimationFrame(animate);
            const time = Date.now() * 0.001;

            // Animate shapes (rotation + floating)
            shapes.forEach((shape) => {
                shape.rotation.x += shape.userData.rotationSpeedX;
                shape.rotation.y += shape.userData.rotationSpeedY;

                // Gentle floating motion
                shape.position.y += Math.sin(time * shape.userData.floatSpeed + shape.userData.floatOffset) * 0.005;
            });

            // Particles gentle drift
            particles.rotation.x = Math.sin(time * 0.3) * 0.05;

            renderer.render(scene, camera);
        };

        animate();

        // === RESIZE HANDLER ===
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);

        // === CLEANUP ===
        return () => {
            window.removeEventListener('resize', handleResize);

            if (frameIdRef.current) {
                cancelAnimationFrame(frameIdRef.current);
            }

            ScrollTrigger.getAll().forEach(trigger => trigger.kill());

            if (rendererRef.current && containerRef.current) {
                containerRef.current.removeChild(rendererRef.current.domElement);
                rendererRef.current.dispose();
            }

            // Dispose geometries and materials
            particlesGeometry.dispose();
            particlesMaterial.dispose();
            shapes.forEach(shape => {
                shape.geometry.dispose();
                shape.material.dispose();
            });
            geometries.forEach(geo => geo.dispose());
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="hero-scroll-engine"
            style={{
                position: 'absolute',
                inset: 0,
                zIndex: 1,
                pointerEvents: 'none',
                overflow: 'hidden'
            }}
            aria-hidden="true"
        />
    );
};

export default HeroScrollEngine;
