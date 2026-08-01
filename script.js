// ==========================================================
// Footer year
// ==========================================================
document.getElementById('year').textContent = new Date().getFullYear();

// ==========================================================
// Sticky nav shadow on scroll
// ==========================================================
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 10);
});

// ==========================================================
// Mobile nav toggle
// ==========================================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ==========================================================
// Scroll reveal (IntersectionObserver)
// ==========================================================
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));
} else {
  // Fallback: no IntersectionObserver support, just show everything
  revealEls.forEach(el => el.classList.add('is-visible'));
}

// ==========================================================
// Animated counter for Techcise stats
// ==========================================================
const counters = document.querySelectorAll('.stat__num');

if ('IntersectionObserver' in window && counters.length) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1200;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const value = Math.floor(progress * target);
        el.textContent = value + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));
}

// ==========================================================
// Contact form (client-side only — no backend attached)
// ==========================================================
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    status.textContent = 'Please fill in every field before sending.';
    status.style.color = '#E8A33D';
    return;
  }

  // This site has no backend, so we hand off to the visitor's email client.
  // Replace 'your.email@example.com' in index.html with your real address.
  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
  window.location.href = `mailto:your.email@example.com?subject=${subject}&body=${body}`;

  status.textContent = 'Opening your email app to send this message…';
  status.style.color = '#4FD18C';
  form.reset();
});
