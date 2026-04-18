/* ============================================
   GETSMOKE.CA — Main JavaScript
   ============================================ */

/* ── Age Verification ── */
(function () {
  const modal = document.getElementById('age-modal');
  if (!modal) return;

  const verified = sessionStorage.getItem('gs_age_ok');
  if (verified) {
    modal.classList.add('hidden');
    return;
  }

  window.confirmAge = function () {
    sessionStorage.setItem('gs_age_ok', '1');
    modal.classList.add('hidden');
  };

  window.denyAge = function () {
    window.location.href = 'https://www.google.ca';
  };
})();

/* ── Mobile Menu ── */
window.toggleMenu = function () {
  const menu = document.getElementById('mobile-menu');
  if (!menu) return;
  menu.classList.toggle('open');
};

/* ── Active Nav Link ── */
(function () {
  const links = document.querySelectorAll('.nav-links a, .mobile-menu a');
  const path = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* ── FAQ Accordion ── */
document.addEventListener('DOMContentLoaded', function () {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');
      // close all
      items.forEach(i => i.classList.remove('open'));
      // open clicked (unless it was already open)
      if (!isOpen) item.classList.add('open');
    });
  });
});

/* ── Shop Filter Tabs ── */
document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.product-card[data-filter]');

  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.filter === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});

/* ── Scroll fade-in animations ── */
document.addEventListener('DOMContentLoaded', function () {
  const targets = document.querySelectorAll(
    '.product-card, .step, .value-card, .delivery-card, .trust-item, .why-stat-card, .stat, .about-stat'
  );
  targets.forEach(el => el.classList.add('fade-up'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
});

/* ── Smooth scroll for anchor links ── */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});

/* ── Contact form handler (Formspree) ── */
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      const resp = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (resp.ok) {
        btn.textContent = 'Sent! We\'ll be in touch.';
        btn.style.background = '#22c55e';
        form.reset();
      } else {
        btn.textContent = 'Error — please email orders@getsmoke.ca';
        btn.style.background = '#ef4444';
        btn.disabled = false;
      }
    } catch {
      btn.textContent = 'Error — please email orders@getsmoke.ca';
      btn.style.background = '#ef4444';
      btn.disabled = false;
    }
  });
});
