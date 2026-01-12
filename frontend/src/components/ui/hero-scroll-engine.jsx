import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

/**
 * HeroScrollEngine
 * 
 * A cinematic scroll-driven animation engine that provides:
 * - Smooth Three.js camera movement
 * - Parallax depth feeling
 * - Scroll-driven transitions
 * - Subtle cinematic motion
 * 
 * This component renders ONLY a motion/depth engine canvas.
 * It does NOT render any text, UI, or visual elements.
 * It sits behind the Mario hero content to add AAA-level motion.
 */
const HeroScrollEngine = () => {
    const containerRef = useRef(null);
    const rendererRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const frameIdRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // === SCENE SETUP ===
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Light atmospheric fog for depth (subtle blue tint for sky feel)
        scene.fog = new THREE.FogExp2(0x87CEEB, 0.015);
        scene.background = null; // Transparent - Mario BG shows through

        // === CAMERA SETUP ===
        const camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.set(0, 2, 10);
        cameraRef.current = camera;

        // === RENDERER SETUP ===
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Mobile-safe
        renderer.setClearColor(0x000000, 0);
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // === INVISIBLE DEPTH PLANES (for parallax reference) ===
        // These create the illusion of moving through 3D space
        const createDepthPlane = (z, opacity) => {
            const geometry = new THREE.PlaneGeometry(100, 100);
            const material = new THREE.MeshBasicMaterial({
                color: 0x000000,
                transparent: true,
                opacity: opacity,
                visible: false // Invisible - only for depth reference
            });
            const plane = new THREE.Mesh(geometry, material);
            plane.position.z = z;
            return plane;
        };

        // 4 depth layers
        const depthPlanes = {
            farBg: createDepthPlane(-50, 0),
            midBg: createDepthPlane(-25, 0),
            nearBg: createDepthPlane(-10, 0),
            foreground: createDepthPlane(-5, 0)
        };

        Object.values(depthPlanes).forEach(plane => scene.add(plane));

        // === AMBIENT PARTICLES (subtle depth indicators) ===
        const particleCount = 50;
        const particlesGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 40;     // x
            positions[i + 1] = (Math.random() - 0.5) * 20; // y
            positions[i + 2] = (Math.random() - 0.5) * 30 - 15; // z (behind camera)
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            color: 0xFFFFFF,
            size: 0.05,
            transparent: true,
            opacity: 0.3,
            sizeAttenuation: true
        });

        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        // === SCROLL-DRIVEN CAMERA ANIMATION ===
        const cameraAnimation = {
            z: 10,
            y: 2,
            rotationX: 0
        };

        // GSAP ScrollTrigger for cinematic camera movement
        gsap.to(cameraAnimation, {
            z: 5,        // Move forward (into the scene)
            y: 4,        // Rise slightly
            rotationX: -0.05, // Subtle tilt down
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '#home',
                start: 'top top',
                end: 'bottom top',
                scrub: 1.5,  // Smooth scrubbing (1.5s delay for cinematic feel)
                onUpdate: (self) => {
                    camera.position.z = cameraAnimation.z;
                    camera.position.y = cameraAnimation.y;
                    camera.rotation.x = cameraAnimation.rotationX;

                    // Parallax particles based on scroll
                    particles.rotation.y = self.progress * 0.1;
                    particles.position.z = -15 + self.progress * 5;
                }
            }
        });

        // === ANIMATION LOOP ===
        const animate = () => {
            frameIdRef.current = requestAnimationFrame(animate);

            // Subtle constant motion (breathing effect)
            const time = Date.now() * 0.0005;
            particles.rotation.x = Math.sin(time) * 0.02;

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
            Object.values(depthPlanes).forEach(plane => {
                plane.geometry.dispose();
                plane.material.dispose();
            });
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="hero-scroll-engine"
            style={{
                position: 'absolute',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none',
                overflow: 'hidden'
            }}
            aria-hidden="true"
        />
    );
};

export default HeroScrollEngine;
