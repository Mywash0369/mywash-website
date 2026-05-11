/* ==========================================================================
   MYWASH RECRUITMENT AGENCY - MAIN JAVASCRIPT
   Author: Sthembiso Ndlovu
   ========================================================================== */

'use strict';

/* ==========================================================================
   1. NAVIGATION - Transparent → Scrolled, Hamburger, Drawer
   ========================================================================== */

const Nav = (() => {
  const nav        = document.querySelector('.nav');
  const hamburger  = document.querySelector('.nav__hamburger');
  const drawer     = document.querySelector('.nav__drawer');
  const overlay    = document.querySelector('.nav__overlay');
  const drawerClose= document.querySelector('.nav__drawer-close');
  const SCROLL_THRESHOLD = 80;

  if (!nav) return;

  // Hero-aware: only go transparent if page has a hero bg image
  const hasHero = document.querySelector('.hero__bg, .page-hero__bg');

  function setScrolled() {
    const scrolled = window.scrollY > SCROLL_THRESHOLD;
    nav.classList.toggle('nav--scrolled', scrolled);
    nav.classList.toggle('nav--transparent', !scrolled && !!hasHero);
  }

  function openDrawer() {
    drawer?.classList.add('is-open');
    overlay?.classList.add('is-open');
    hamburger?.classList.add('is-open');
    hamburger?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer?.classList.remove('is-open');
    overlay?.classList.remove('is-open');
    hamburger?.classList.remove('is-open');
    hamburger?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  // Init
  setScrolled();
  window.addEventListener('scroll', setScrolled, { passive: true });

  hamburger?.addEventListener('click', openDrawer);
  drawerClose?.addEventListener('click', closeDrawer);
  overlay?.addEventListener('click', closeDrawer);

  // Close drawer on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  // Active nav link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link, .nav__drawer-link').forEach(link => {
    const href = link.getAttribute('href')?.split('/').pop();
    if (href === currentPath) link.classList.add('is-active');
  });
})();

/* ==========================================================================
   2. SCROLL REVEAL - IntersectionObserver fade-up
   ========================================================================== */

const Reveal = (() => {
  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* ==========================================================================
   3. STAT COUNTER - Count up on scroll
   ========================================================================== */

const Counter = (() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const DURATION = 1800; // ms

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function animateCounter(el) {
    const target  = parseFloat(el.dataset.target);
    const suffix  = el.dataset.suffix || '';
    const prefix  = el.dataset.prefix || '';
    const isFloat = el.dataset.float === 'true';
    const start   = performance.now();

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / DURATION, 1);
      const eased    = easeOutQuart(progress);
      const current  = target * eased;

      el.textContent = prefix + (isFloat
        ? current.toFixed(1)
        : Math.round(current).toLocaleString()) + suffix;

      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-count').forEach(el => observer.observe(el));
})();

/* ==========================================================================
   4. PHOTO PANEL CROSSFADE - Active panel on scroll
   ========================================================================== */

const PhotoPanels = (() => {
  const panels = document.querySelectorAll('.photo-panel');
  if (!panels.length) return;

  // iOS / mobile: static backgrounds handled in CSS, no JS needed
  if (window.innerWidth < 1024) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('is-active', entry.isIntersecting);
    });
  }, {
    threshold: 0.5
  });

  panels.forEach(panel => observer.observe(panel));
})();

/* ==========================================================================
   5. TESTIMONIAL CAROUSEL
   ========================================================================== */

const Carousel = (() => {
  const carousel = document.querySelector('.testimonial-carousel');
  if (!carousel) return;

  const slides      = carousel.querySelector('.testimonial-slides');
  const slideEls    = carousel.querySelectorAll('.testimonial-slide');
  const prevBtn     = carousel.querySelector('.carousel-btn--prev');
  const nextBtn     = carousel.querySelector('.carousel-btn--next');
  const dotsWrapper = carousel.querySelector('.carousel-dots');

  if (!slideEls.length) return;

  let current   = 0;
  let autoTimer = null;

  // Build dots
  slideEls.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrapper?.appendChild(dot);
  });

  function updateDots() {
    dotsWrapper?.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('is-active', i === current);
    });
  }

  function goTo(index) {
    current = (index + slideEls.length) % slideEls.length;
    slides.style.transform = `translateX(-${current * 100}%)`;
    slides.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
    updateDots();
  }

  function startAuto() {
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }

  function stopAuto() {
    clearInterval(autoTimer);
  }

  prevBtn?.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
  nextBtn?.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });

  // Touch/swipe support
  let touchStartX = 0;

  carousel.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      stopAuto();
      goTo(diff > 0 ? current + 1 : current - 1);
      startAuto();
    }
  });

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    startAuto();
  }

  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);
})();

/* ==========================================================================
   6. HERO SCROLL INDICATOR - Hide on scroll
   ========================================================================== */

const HeroScroll = (() => {
  const indicator = document.querySelector('.hero__scroll');
  if (!indicator) return;

  function check() {
    indicator.classList.toggle('is-hidden', window.scrollY > 120);
  }

  window.addEventListener('scroll', check, { passive: true });
})();

/* ==========================================================================
   7. CONTACT FORM - WhatsApp redirect + basic validation
   ========================================================================== */

const ContactForm = (() => {
  const form = document.querySelector('.js-contact-form');
  if (!form) return;

  const WHATSAPP_NUMBER = '27730966477';

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fields = form.querySelectorAll('[required]');
    let valid = true;

    fields.forEach(field => {
      const group = field.closest('.form-group');
      const error = group?.querySelector('.form-error');
      const empty = !field.value.trim();

      field.classList.toggle('is-error', empty);
      if (error) error.style.display = empty ? 'block' : 'none';
      if (empty) valid = false;
    });

    if (!valid) return;

    // Build WhatsApp message from form fields
    const name    = form.querySelector('[name="name"]')?.value || '';
    const company = form.querySelector('[name="company"]')?.value || '';
    const message = form.querySelector('[name="message"]')?.value || '';
    const type    = form.querySelector('[name="type"]')?.value || 'General Enquiry';

    const text = encodeURIComponent(
      `Hi Mywash Recruitment Agency,\n\n` +
      `Name: ${name}\n` +
      (company ? `Company: ${company}\n` : '') +
      `Enquiry type: ${type}\n\n` +
      `${message}`
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  });

  // Clear error on input
  form.querySelectorAll('[required]').forEach(field => {
    field.addEventListener('input', () => {
      const group = field.closest('.form-group');
      const error = group?.querySelector('.form-error');
      field.classList.remove('is-error');
      if (error) error.style.display = 'none';
    });
  });
})();

/* ==========================================================================
   8. SMOOTH ANCHOR SCROLL (offset for fixed nav)
   ========================================================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();

    const navHeight = document.querySelector('.nav')?.offsetHeight || 72;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ==========================================================================
   9. LAZY LOAD IMAGES - native loading="lazy" + IntersectionObserver fallback
   ========================================================================== */

if ('loading' in HTMLImageElement.prototype) {
  // Native lazy loading supported - browsers handle it
  document.querySelectorAll('img[data-src]').forEach(img => {
    img.src = img.dataset.src;
  });
} else {
  // Fallback for older browsers
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        imgObserver.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
}

/* ==========================================================================
   10. YEAR - Auto-update copyright year in footer
   ========================================================================== */

document.querySelectorAll('.js-year').forEach(el => {
  el.textContent = new Date().getFullYear();
});
