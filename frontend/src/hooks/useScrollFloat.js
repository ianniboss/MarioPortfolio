// Scroll-driven float utility with 3D entrance animations (no lateral motion)
// - Entrance: elements tilt (X) and slide vertically when entering viewport
// - Scroll: vertical drift + subtle scale only while scrolling; stop when idle
// - No rotateY or Z-rotation to avoid side-to-side motion

export function initScrollFloat() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const direct = Array.from(document.querySelectorAll('[data-float]'));
  const parentContainers = Array.from(document.querySelectorAll('[data-float-children]'));
  const elements = Array.from(new Set([...direct, ...parentContainers.flatMap((p) => Array.from(p.querySelectorAll(':scope > *')))]));

  if (elements.length === 0) return () => {};

  // Add perspective to parent containers and assign stagger orders to their children
  parentContainers.forEach((p) => {
    p.classList.add('float-parent');
    const kids = Array.from(p.querySelectorAll(':scope > *'));
    kids.forEach((el, idx) => {
      el.__enterOrder = idx;
      const override = el.getAttribute('data-enter-delay');
      el.style.transitionDelay = override ? override : `${idx * 80}ms`;
    });
  });

  // Prepare elements
  elements.forEach((el) => {
    el.classList.add('float-item');
    const sp = parseFloat(el.getAttribute('data-float-speed') || '1');
    el.__floatSpeed = isNaN(sp) ? 1 : sp;
  });

  // Intersection: entrance and visibility
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting) {
          el.classList.add('in-view');
          el.classList.add('entered');
        } else {
          el.classList.remove('in-view');
          el.classList.remove('entered');
        }
      });
    },
    { threshold: 0.2 }
  );
  elements.forEach((el) => io.observe(el));

  let rafId = null;
  const animateOnScroll = () => {
    rafId = null;
    const vh = window.innerHeight || 800;

    elements.forEach((el) => {
      if (!el.classList.contains('in-view')) return;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const diff = center - vh / 2;
      const progress = Math.max(-1, Math.min(1, diff / vh));

      const speed = el.__floatSpeed || 1;
      if (prefersReduced) {
        el.style.setProperty('--scroll-tx', '0px');
        el.style.setProperty('--scroll-scale', '1');
        return;
      }

      // Vertical drift only (no lateral or Z-rotation)
      const translateY = progress * (26 * speed);
      const scale = 1 + Math.abs(progress) * 0.012;

      el.style.setProperty('--scroll-tx', `${translateY}px`);
      el.style.setProperty('--scroll-scale', `${scale}`);
      el.style.willChange = 'transform';
    });
  };

  const onScroll = () => {
    if (rafId) return; // coalesce multiple scroll events
    rafId = requestAnimationFrame(animateOnScroll);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  // Initial compute to place elements correctly on first render
  onScroll();

  // Cleanup
  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    if (rafId) cancelAnimationFrame(rafId);
    io.disconnect();
    elements.forEach((el) => {
      el.classList.remove('float-item', 'in-view', 'entered');
      el.style.removeProperty('--scroll-tx');
      el.style.removeProperty('--scroll-scale');
      el.style.transitionDelay = '';
      el.style.willChange = '';
      delete el.__floatSpeed;
      delete el.__enterOrder;
    });
  };
}