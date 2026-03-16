/**
 * AGUSTINA ZUBELDIA — Portfolio
 * main.js
 *
 * Modules:
 *  1. Custom Cursor
 *  2. Scroll Reveal
 *  3. Service Cards Stagger
 *  4. Skill Bars Animation
 *  5. Active Nav Link on Scroll
 */

'use strict';

/* ── 1. Custom Cursor ── */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');

  if (!cursor || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
    requestAnimationFrame(animateRing);
  }

  animateRing();
})();


/* ── 2. Scroll Reveal ── */
(function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((el) => observer.observe(el));
})();


/* ── 3. Service Cards Stagger ── */
(function initServiceCards() {
  const cards = document.querySelectorAll('.service-card');
  if (!cards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Array.from(cards).indexOf(entry.target);
          const delay = index * 0.1;

          entry.target.style.transition = [
            `opacity 0.5s ease ${delay}s`,
            `transform 0.5s ease ${delay}s`,
            'box-shadow 0.3s ease',
            'border-color 0.3s ease',
            'background 0.3s ease',
          ].join(', ');

          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach((card) => observer.observe(card));
})();


/* ── 4. Skill Bars Animation ── */
(function initSkillBars() {
  const fills = document.querySelectorAll('.skill-bar__fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          target.style.width = `${target.dataset.pct}%`;
          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.3 }
  );

  fills.forEach((fill) => observer.observe(fill));
})();


/* ── 5. Active Nav Link on Scroll ── */
(function initActiveNav() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav__link');
  if (!sections.length || !navLinks.length) return;

  const OFFSET = 120;

  function updateActiveLink() {
    let currentId = '';

    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - OFFSET) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${currentId}`;
      link.classList.toggle('is-active', isActive);
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink(); // run on load
})();
