import { useEffect, useRef } from 'react';

/**
 * use3dTilt
 * 
 * Highly optimized React hook for physical 3D hover tilt card animations.
 * Maps mouse coordinate changes to CSS Custom Properties (--tilt-x, --tilt-y, --glow-x, --glow-y).
 * Respects 'prefers-reduced-motion' media query.
 */
export function use3dTilt() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const handlePointerMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left; // cursor x position relative to card
      const y = e.clientY - rect.top;  // cursor y position relative to card

      // Normalized coordinates between -1 and 1
      const normalizedX = (x / rect.width) * 2 - 1;
      const normalizedY = (y / rect.height) * 2 - 1;

      // Max tilt degrees (subtle yet pronounced)
      const maxTilt = 10;
      const tiltX = -normalizedY * maxTilt;
      const tiltY = normalizedX * maxTilt;

      // Glow position percentage
      const glowX = (x / rect.width) * 100;
      const glowY = (y / rect.height) * 100;

      el.style.setProperty('--tilt-x', `${tiltX}deg`);
      el.style.setProperty('--tilt-y', `${tiltY}deg`);
      el.style.setProperty('--glow-x', `${glowX}%`);
      el.style.setProperty('--glow-y', `${glowY}%`);
    };

    const handlePointerLeave = () => {
      // Smooth reset transitions are handled by CSS on transition property
      el.style.setProperty('--tilt-x', '0deg');
      el.style.setProperty('--tilt-y', '0deg');
      el.style.setProperty('--glow-x', '50%');
      el.style.setProperty('--glow-y', '50%');
    };

    el.addEventListener('pointermove', handlePointerMove);
    el.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return ref;
}
