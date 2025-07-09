(() => {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    // 1. SMOOTH SCROLL + HISTORY UPDATE
    document.querySelectorAll('.site-nav a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const id = link.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.pushState(null, '', `#${id}`);
        }
      }, { passive: true });
    });

    // 2. SCROLL-SPY + REVEAL ANIMATIONS
    const sections = document.querySelectorAll('main section[id], .project, .timeline__item');
    const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        // Reveal on first intersection
        if (entry.intersectionRatio > 0.15) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
        // Scroll-spy underline when section is mid-screen
        if (entry.target.id && entry.intersectionRatio > 0.5) {
          navLinks.forEach(l => l.removeAttribute('aria-current'));
          const link = document.querySelector(`.site-nav a[href="#${entry.target.id}"]`);
          link?.setAttribute('aria-current', 'page');
        }
      });
    }, {
      rootMargin: '-50% 0px -50% 0px',
      threshold: [0.15, 0.5]
    });
    sections.forEach(el => observer.observe(el));

    // 3. MOBILE NAV TOGGLE
    const mobileToggle = document.getElementById('mobile-nav-toggle');
    const nav = document.querySelector('.site-nav');
    mobileToggle.addEventListener('click', () => {
      const opened = nav.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', opened);
    });

    // 4. THEME TOGGLE
    const themeToggle = document.getElementById('theme-toggle');
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let currentTheme = storedTheme || (prefersDark ? 'dark' : 'light');

    const applyTheme = theme => {
      document.body.dataset.theme = theme;
      themeToggle.setAttribute('aria-pressed', theme === 'dark');
      themeToggle.textContent = theme === 'dark' ? '🌞' : '🌙';
      localStorage.setItem('theme', theme);
    };
    applyTheme(currentTheme);

    themeToggle.addEventListener('click', () => {
      currentTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(currentTheme);
    });

    // 5. CONTACT FORM VALIDATION
    const form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', e => {
        const name = form.elements['name']?.value.trim();
        const message = form.elements['message']?.value.trim();
        if (!name || !message) {
          e.preventDefault();
          form.elements[!name ? 'name' : 'message'].focus();
          alert(`Please fill out your ${!name ? 'name' : 'message'} before submitting.`);
        }
      });
    }

    // 6. DISABLE AUTO SCROLL RESTORATION
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  });
})();
