/**
 * MarioBackground.jsx
 * Place this file at:  frontend/src/components/MarioBackground.jsx
 *
 * The canvas is position:fixed, zIndex:0, pointerEvents:none.
 * Your existing content needs position:relative + zIndex≥1 to sit above it.
 */

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* ─── Mario colour palette ───────────────────────────────────────────────── */
const C = {
  blockGold:    0xE8A000,   // ? block warm gold
  blockBorder:  0x7A4800,   // dark brown border
  blockFace:    0xC07800,   // slightly darker face
  coinYellow:   0xFFD000,   // spinning coin
  coinInner:    0xFFE96E,   // coin highlight
  starYellow:   0xFFE000,   // power-up star
  mushRed:      0xE03020,   // mushroom cap
  mushWhite:    0xF8F0E0,   // mushroom spots
  mushStem:     0xF0D090,   // mushroom stem
  skyBlue:      0x5090F0,   // warp pipe accent
  white:        0xFFFFFF,
};

/* ─── Helpers ────────────────────────────────────────────────────────────── */
const lerp = (a, b, t) => a + (b - a) * t;
const rand = (min, max) => Math.random() * (max - min) + min;
const randInt = (min, max) => Math.floor(rand(min, max));

/* ─── Geometry builders ──────────────────────────────────────────────────── */

/**
 * ? Block  — gold box with dark edge outline, pixel-art style.
 * Uses MeshLambertMaterial (cheap, looks good at low sizes).
 */
function makeQuestionBlock(size = 1) {
  const group = new THREE.Group();

  // Main body
  const bodyGeo = new THREE.BoxGeometry(size, size, size);
  const bodyMat = new THREE.MeshLambertMaterial({ color: C.blockGold });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  group.add(body);

  // Slightly larger wireframe for the dark border effect
  const edgeGeo = new THREE.EdgesGeometry(bodyGeo);
  const edgeMat = new THREE.LineBasicMaterial({ color: C.blockBorder });
  const edges = new THREE.LineSegments(edgeGeo, edgeMat);
  edges.scale.setScalar(1.01); // tiny offset to prevent z-fight
  group.add(edges);

  // "?" face — a thin flat plane on the +z face
  const dotGeo = new THREE.PlaneGeometry(size * 0.45, size * 0.6);
  const dotMat = new THREE.MeshLambertMaterial({
    color: C.blockBorder,
    side: THREE.DoubleSide,
  });
  const dot = new THREE.Mesh(dotGeo, dotMat);
  dot.position.z = size * 0.51;
  group.add(dot);

  return group;
}

/** Spinning coin — thin cylinder with bright emissive face */
function makeCoin(r = 0.35) {
  const group = new THREE.Group();

  // Outer rim
  const rimGeo = new THREE.CylinderGeometry(r, r, r * 0.15, 20);
  const rimMat = new THREE.MeshLambertMaterial({
    color: C.coinYellow,
    emissive: C.coinYellow,
    emissiveIntensity: 0.2,
  });
  const rim = new THREE.Mesh(rimGeo, rimMat);
  rim.rotation.x = Math.PI / 2; // face the camera
  group.add(rim);

  // Bright inner face
  const faceGeo = new THREE.CircleGeometry(r * 0.72, 20);
  const faceMat = new THREE.MeshLambertMaterial({
    color: C.coinInner,
    emissive: C.coinInner,
    emissiveIntensity: 0.35,
    side: THREE.DoubleSide,
  });
  const face = new THREE.Mesh(faceGeo, faceMat);
  face.position.z = r * 0.08;
  group.add(face);

  return group;
}

/** Power-up star — five-pointed, flat */
function makeStar(r = 0.45) {
  const group = new THREE.Group();

  // Five spike cones arranged around centre
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
    const coneGeo = new THREE.ConeGeometry(r * 0.22, r * 0.95, 3);
    const coneMat = new THREE.MeshLambertMaterial({
      color: C.starYellow,
      emissive: C.starYellow,
      emissiveIntensity: 0.3,
    });
    const cone = new THREE.Mesh(coneGeo, coneMat);
    cone.position.set(Math.cos(angle) * r * 0.48, Math.sin(angle) * r * 0.48, 0);
    cone.rotation.z = angle + Math.PI;
    group.add(cone);
  }

  // Centre disk
  const diskGeo = new THREE.CylinderGeometry(r * 0.38, r * 0.38, 0.04, 12);
  const diskMat = new THREE.MeshLambertMaterial({
    color: C.starYellow,
    emissive: C.starYellow,
    emissiveIntensity: 0.4,
  });
  const disk = new THREE.Mesh(diskGeo, diskMat);
  disk.rotation.x = Math.PI / 2;
  group.add(disk);

  // Two simple pixel "eyes" (tiny dark disks)
  [-0.12, 0.12].forEach((xOff) => {
    const eyeGeo = new THREE.CircleGeometry(r * 0.07, 6);
    const eyeMat = new THREE.MeshLambertMaterial({ color: 0x2a1800, side: THREE.DoubleSide });
    const eye = new THREE.Mesh(eyeGeo, eyeMat);
    eye.position.set(xOff, r * 0.1, 0.03);
    group.add(eye);
  });

  return group;
}

/** Simple mushroom (1-UP green or super-mushroom red) */
function makeMushroom(color = C.mushRed) {
  const group = new THREE.Group();

  // Cap — half-sphere
  const capGeo = new THREE.SphereGeometry(0.5, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.55);
  const capMat = new THREE.MeshLambertMaterial({ color });
  const cap = new THREE.Mesh(capGeo, capMat);
  cap.position.y = 0.18;
  group.add(cap);

  // Spots — 3 small circles on the cap
  [[0, 0.45, 0.25], [0.28, 0.28, 0.38], [-0.28, 0.28, 0.38]].forEach(([x, y, z]) => {
    const spotGeo = new THREE.CircleGeometry(0.09, 8);
    const spotMat = new THREE.MeshLambertMaterial({ color: C.mushWhite, side: THREE.DoubleSide });
    const spot = new THREE.Mesh(spotGeo, spotMat);
    // Place spots on surface of cap — approximate
    const v = new THREE.Vector3(x, y, z).normalize().multiplyScalar(0.52);
    spot.position.copy(v).add(new THREE.Vector3(0, 0.18, 0));
    spot.lookAt(spot.position.clone().multiplyScalar(2)); // face outward
    group.add(spot);
  });

  // Stem
  const stemGeo = new THREE.CylinderGeometry(0.22, 0.28, 0.45, 10);
  const stemMat = new THREE.MeshLambertMaterial({ color: C.mushStem });
  const stem = new THREE.Mesh(stemGeo, stemMat);
  stem.position.y = -0.17;
  group.add(stem);

  return group;
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function MarioBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* ── Respect user motion preference ── */
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,           // transparent so your CSS bg shows through
      powerPreference: 'low-power',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    /* ── Scene ── */
    const scene = new THREE.Scene();

    /* ── Camera ── */
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      150
    );
    camera.position.set(0, 0, 22);

    /* ── Lighting ── */
    // Warm ambient — gives everything a slight Mario-world glow
    scene.add(new THREE.AmbientLight(0xffe8c0, 0.7));

    // Key light — gold tint, like a coin is shining
    const keyLight = new THREE.PointLight(0xFFCC44, 2.5, 80);
    keyLight.position.set(8, 14, 12);
    scene.add(keyLight);

    // Fill light — cool blue from below, like night sky
    const fillLight = new THREE.PointLight(0x3366CC, 1.2, 70);
    fillLight.position.set(-12, -10, 6);
    scene.add(fillLight);

    /* ── Background star field (tiny white points) ── */
    const BG_STARS = 180;
    const bgPos = new Float32Array(BG_STARS * 3);
    for (let i = 0; i < BG_STARS; i++) {
      bgPos[i * 3]     = rand(-60, 60);
      bgPos[i * 3 + 1] = rand(-35, 35);
      bgPos[i * 3 + 2] = rand(-50, -10);
    }
    const bgGeo = new THREE.BufferGeometry();
    bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3));
    const bgMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.14, transparent: true, opacity: 0.65 });
    const bgStars = new THREE.Points(bgGeo, bgMat);
    scene.add(bgStars);

    /* ── Object population ──────────────────────────────────────────────── */
    const objects = [];

    const Z_BY_LAYER = [-20, -11, -4]; // Z position of each layer
    const PARALLAX   = [1.0, 2.2, 3.8]; // mouse parallax strength per layer

    function addObject(mesh, type, layer) {
      const x = rand(-32, 32);
      const y = rand(-16, 16);
      const z = Z_BY_LAYER[layer] + rand(-1.5, 1.5);
      mesh.position.set(x, y, z);
      scene.add(mesh);
      objects.push({
        mesh, type,
        baseX: x, baseY: y,
        phase: rand(0, Math.PI * 2),
        speed: rand(0.4, 1.0),
        layer,
      });
    }

    // ? Blocks — backbone of Mario world
    for (let i = 0; i < 14; i++) {
      addObject(makeQuestionBlock(rand(0.55, 1.3)), 'block', randInt(0, 3));
    }

    // Coins
    for (let i = 0; i < 20; i++) {
      addObject(makeCoin(rand(0.22, 0.48)), 'coin', randInt(0, 3));
    }

    // Stars
    for (let i = 0; i < 9; i++) {
      addObject(makeStar(rand(0.28, 0.55)), 'star', randInt(0, 3));
    }

    // Mushrooms — a few scattered
    for (let i = 0; i < 5; i++) {
      const color = Math.random() > 0.5 ? C.mushRed : 0x30A830; // red or green
      const mush = makeMushroom(color);
      const scale = rand(0.5, 0.9);
      mush.scale.setScalar(scale);
      addObject(mush, 'mushroom', randInt(0, 3));
    }

    /* ── Mouse / touch input ── */
    let targetMX = 0, targetMY = 0;
    let currentMX = 0, currentMY = 0;

    const onMouseMove = (e) => {
      targetMX = (e.clientX / window.innerWidth  - 0.5) * 2;
      targetMY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    // Touch support — use first touch point
    const onTouchMove = (e) => {
      const t = e.touches[0];
      targetMX = (t.clientX / window.innerWidth  - 0.5) * 2;
      targetMY = (t.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    /* ── Scroll ── */
    let scrollY = 0;
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ── Resize ── */
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    /* ── Animation loop ── */
    const clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (!prefersReduced) {
        // Smooth mouse lerp
        currentMX = lerp(currentMX, targetMX, 0.045);
        currentMY = lerp(currentMY, targetMY, 0.045);

        // Camera drifts gently with mouse
        camera.position.x = lerp(camera.position.x, currentMX * 2.8,  0.06);
        camera.position.y = lerp(camera.position.y, -currentMY * 1.8, 0.06);
        camera.lookAt(0, 0, 0);

        // Per-object animation
        objects.forEach(({ mesh, type, baseX, baseY, phase, speed, layer }) => {
          const bob = Math.sin(t * speed + phase) * 0.75;

          // Bob
          mesh.position.y = baseY + bob - scrollY * [0.0015, 0.004, 0.010][layer];

          // Mouse parallax — farther layers move less
          mesh.position.x = baseX - currentMX * PARALLAX[layer];

          // Rotation by type
          switch (type) {
            case 'block':
              // Gentle rock
              mesh.rotation.y = Math.sin(t * 0.25 + phase) * 0.12;
              mesh.rotation.z = Math.sin(t * 0.18 + phase) * 0.05;
              break;
            case 'coin':
              // Spin to face camera as if it's a billboard coin arc
              mesh.rotation.y += 0.04 * speed;
              break;
            case 'star':
              mesh.rotation.z += 0.022 * speed;
              mesh.rotation.y += 0.012 * speed;
              break;
            case 'mushroom':
              // Slow bob already applied; add slight y rotation
              mesh.rotation.y = Math.sin(t * 0.3 + phase) * 0.2;
              break;
            default:
              break;
          }
        });

        // Star field slow drift
        bgStars.rotation.z = t * 0.003;

        // Key light pulse — simulates coin shimmer
        keyLight.intensity = 2.2 + Math.sin(t * 2.2) * 0.5;
      }

      renderer.render(scene, camera);
    };

    animate();

    /* ── Cleanup on unmount ── */
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);

      objects.forEach(({ mesh }) => {
        mesh.traverse((child) => {
          child.geometry?.dispose();
          if (child.material) {
            const mats = Array.isArray(child.material) ? child.material : [child.material];
            mats.forEach(m => m.dispose());
          }
        });
      });

      bgGeo.dispose();
      bgMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
