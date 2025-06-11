// script.js — Smooth scroll, scroll-spy, reveal, and theme toggle

// 1. SMOOTH SCROLL FOR NAV LINKS
document.querySelectorAll('.site-nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  
  // 2. SCROLL-SPY: HIGHLIGHT NAV ITEM
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const navLink = document.querySelector(`.site-nav a[href="#${entry.target.id}"]`);
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.removeAttribute('aria-current'));
        navLink && navLink.setAttribute('aria-current', 'page');
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });
  sections.forEach(sec => spyObserver.observe(sec));
  
  // 3. REVEAL ANIMATIONS
  document.querySelectorAll('.section, .project, .timeline__item').forEach(el => {
    const revObs = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revObs.observe(el);
  });
  
  // 4. DARK/LIGHT THEME TOGGLE
  const themeToggle = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('theme');
  
  let theme = saved
    ? saved
    : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  document.body.dataset.theme = theme;
  if (themeToggle) {
    themeToggle.textContent = (theme === 'dark') ? '🌞' : '🌙';
    themeToggle.addEventListener('click', () => {
      theme = (document.body.dataset.theme === 'dark') ? 'light' : 'dark';
      document.body.dataset.theme = theme;
      localStorage.setItem('theme', theme);
      themeToggle.textContent = (theme === 'dark') ? '🌞' : '🌙';
    });
  }
  
  // 5. OPTIONAL CONTACT FORM VALIDATION
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      const n = contactForm.elements['name']?.value.trim();
      const m = contactForm.elements['message']?.value.trim();
      if (!n || !m) {
        e.preventDefault();
        alert('Please fill out both your name and message before submitting.');
      }
    });
  }
  