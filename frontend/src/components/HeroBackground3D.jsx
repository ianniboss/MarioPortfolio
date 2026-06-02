import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField({ count = 4000 }) {
  const pointsRef = useRef();

  // Respect user motion preference (Impeccable skill rule)
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Generate random points scattered in a sphere
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Use spherical distribution for a neat organic feel
      const r = 20 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    if (!prefersReduced && pointsRef.current) {
      // Slow, cinematic rotation (Taste skill: Motion Intensity)
      pointsRef.current.rotation.y -= delta * 0.03;
      pointsRef.current.rotation.x -= delta * 0.015;
      
      // Subtle floating effect based on mouse hover
      const mouseX = (state.pointer.x * Math.PI) / 10;
      const mouseY = (state.pointer.y * Math.PI) / 10;
      
      pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, mouseX, 0.02);
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, mouseY, 0.02);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        {/* Anti-slop: Avoid overly bright "neon vomit". Use a subtle premium white/gold dust. */}
        <PointMaterial
          transparent
          color="#d4af37" // Premium warm gold tone
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </group>
  );
}

export default function HeroBackground3D() {
  return (
    <div 
      aria-hidden="true" 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        zIndex: 0, 
        pointerEvents: 'none', 
        background: 'radial-gradient(circle at center, #1a1a1a 0%, #050505 100%)' 
      }}
    >
      {/* 
        Canvas acts as the R3F portal.
        We keep powerPreference="low-power" and dpr={Math.min(window.devicePixelRatio, 1.5)} 
        for performance (Impeccable skill rule)
      */}
      <Canvas 
        camera={{ position: [0, 0, 12], fov: 60 }}
        dpr={Math.min(window.devicePixelRatio, 1.5)}
        gl={{ powerPreference: 'low-power', antialias: false }}
      >
        <React.Suspense fallback={null}>
          <ParticleField />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
