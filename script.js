document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- 1. Inject sparkline signature into hero ----
  const hero = document.querySelector('.hero-inner');
  if (hero) {
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('class', 'sparkline');
    svg.setAttribute('viewBox', '0 0 140 36');

    // Path ends exactly at 138,3 — arrow tip placed there
    svg.innerHTML = `
      <defs>
        <linearGradient id="sparklineGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#8b2635"/>
          <stop offset="100%" stop-color="#c0956a"/>
        </linearGradient>
        <marker
          id="arrowMarker"
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L6,3 Z" fill="#c0956a"/>
        </marker>
      </defs>
      <path
        d="M2,28 L22,22 L42,26 L62,14 L82,18 L102,8 L122,10 L136,3"
        marker-end="url(#arrowMarker)"
      />
    `;
    hero.appendChild(svg);
  }

  // ---- 2. Scroll-reveal ----
  const revealTargets = document.querySelectorAll('.project-card, .content-wrap > p, .contact-grid');
  revealTargets.forEach(el => el.classList.add('reveal'));

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('is-visible'), i * 60);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  revealTargets.forEach(el => observer.observe(el));
});
