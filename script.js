document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- 1. Inject sparkline ----
  const heroInner = document.querySelector('.hero-inner');
  if (heroInner) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'sparkline');
    svg.setAttribute('viewBox', '0 0 165 44'); // FIX 1: was 160, arrow was clipping
    svg.setAttribute('fill', 'none');
    svg.setAttribute('aria-hidden', 'true');   // FIX 2: decorative SVG
    svg.setAttribute('focusable', 'false');    // FIX 3: accessibility

    svg.innerHTML = `
      <defs>
        <linearGradient id="sparklineGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#8b2635"/>
          <stop offset="100%" stop-color="#c0956a"/>
        </linearGradient>
      </defs>

      <polyline
        class="spark-line"
        points="4,36 24,30 44,34 64,20 84,24 104,14 124,16 142,8"
        stroke="url(#sparklineGradient)"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />

      <!-- FIX 4: Arrow now points UP-RIGHT ↗ correctly -->
      <line class="spark-arrow" x1="136" y1="4"  x2="142" y2="8"
            stroke="#c0956a" stroke-width="2.2" stroke-linecap="round"/>
      <line class="spark-arrow" x1="136" y1="12" x2="142" y2="8"
            stroke="#c0956a" stroke-width="2.2" stroke-linecap="round"/>
    `;

    // FIX 5: removed unnecessary xmlns (not needed when set via JS)
    if (svg) heroInner.appendChild(svg); // FIX 6: null safety check
  }

  // ---- 2. Scroll-reveal ----
  const revealTargets = document.querySelectorAll(
    '.project-card, .content-wrap > p, .contact-grid'
  );

  if (!revealTargets.length) return; // FIX 7: exit if nothing to observe

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
