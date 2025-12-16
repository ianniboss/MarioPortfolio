// Scroll-driven float utility with 3D entrance animations (no lateral motion)
// - Entrance: elements tilt (X) and slide vertically when entering viewport
// - Scroll: vertical drift + subtle scale only while scrolling; stop when idle
// - No rotateY or Z-rotation to avoid side-to-side motion
// - Once entered, elements stay visible (no re-animation on scroll back)

export function initScrollFloat() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const direct = Array.from(document.querySelectorAll('[data-float]'));
  const parentContainers = Array.from(document.querySelectorAll('[data-float-children]'));
  const elements = Array.from(new Set([...direct, ...parentContainers.flatMap((p) => Array.from(p.querySelectorAll(':scope > *')))]));

  if (elements.length === 0) return () => { };

  // Track which elements have been entered (permanent)
  const enteredSet = new Set();

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
          // Once entered, always stay entered (no re-animation)
          if (!enteredSet.has(el)) {
            enteredSet.add(el);
            el.classList.add('entered');
          }
        } else {
          el.classList.remove('in-view');
          // Do NOT remove 'entered' class - keep elements visible once they've animated in
        }
      });
    },
    { threshold: 0.15 }
  );
  elements.forEach((el) => io.observe(el));

  let rafId = null;
  const animateOnScroll = () => {
    rafId = null;
    const vh = window.innerHeight || 800;

    elements.forEach((el) => {
      // Only apply scroll effects to elements currently in view
      if (!el.classList.contains('in-view')) {
        // Reset scroll transforms when out of view to prevent jumping
        el.style.setProperty('--scroll-tx', '0px');
        el.style.setProperty('--scroll-scale', '1');
        el.style.willChange = 'auto';
        return;
      }

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

      // Vertical drift only (no lateral or Z-rotation) - reduced intensity
      const translateY = progress * (15 * speed);
      const scale = 1 + Math.abs(progress) * 0.008;

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
    enteredSet.clear();
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