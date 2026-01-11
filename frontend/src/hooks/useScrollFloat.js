// Simple fade-in and slide-up animations when elements enter the viewport
// - Elements fade in and slide up when they scroll into view
// - Once entered, elements stay visible (no re-animation on scroll back)
// - Staggered animations for child elements in containers

export function initScrollFloat() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const direct = Array.from(document.querySelectorAll('[data-float]'));
  const parentContainers = Array.from(document.querySelectorAll('[data-float-children]'));
  const elements = Array.from(new Set([...direct, ...parentContainers.flatMap((p) => Array.from(p.querySelectorAll(':scope > *')))]));

  if (elements.length === 0) return () => { };

  // Track which elements have been entered (permanent)
  const enteredSet = new Set();

  // Add class to parent containers and assign stagger delays to their children
  parentContainers.forEach((p) => {
    p.classList.add('float-parent');
    const kids = Array.from(p.querySelectorAll(':scope > *'));
    kids.forEach((el, idx) => {
      const override = el.getAttribute('data-enter-delay');
      // Stagger: 80ms between each element for a flowing cascade
      el.style.transitionDelay = override ? override : `${idx * 80}ms`;
    });
  });

  // Prepare elements
  elements.forEach((el) => {
    el.classList.add('float-item');
  });

  // Intersection Observer: trigger fade-in when elements enter viewport
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting) {
          // Once entered, always stay entered (no re-animation)
          if (!enteredSet.has(el)) {
            enteredSet.add(el);
            el.classList.add('entered');
          }
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );
  elements.forEach((el) => io.observe(el));

  // Cleanup
  return () => {
    io.disconnect();
    enteredSet.clear();
    elements.forEach((el) => {
      el.classList.remove('float-item', 'entered');
      el.style.transitionDelay = '';
    });
  };
}