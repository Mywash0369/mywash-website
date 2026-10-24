/* ==========================================================================
   MYWASH RECRUITMENT AGENCY - MAIN JAVASCRIPT
   Author: Sthembiso Ndlovu
   ========================================================================== */

'use strict';

/* ==========================================================================
   1. NAVIGATION - Transparent -> Scrolled, Hamburger, Drawer
   ========================================================================== */

(() => {
  const nav         = document.querySelector('.nav');
  const hamburger   = document.querySelector('.nav__hamburger');
  const drawer      = document.querySelector('.nav__drawer');
  const overlay     = document.querySelector('.nav__overlay');
  const drawerClose = document.querySelector('.nav__drawer-close');
  const dropdowns   = document.querySelectorAll('.nav__dropdown');
  const SCROLL_THRESHOLD = 80;

  if (!nav) return;

  const hasHero = document.querySelector('.hero__bg, .page-hero__bg');

  function setScrolled() {
    const scrolled = window.scrollY > SCROLL_THRESHOLD;
    nav.classList.toggle('nav--scrolled', scrolled);
    nav.classList.toggle('nav--transparent', !scrolled && !!hasHero);
  }

  function toggleDrawer(open) {
    drawer?.classList.toggle('is-open', open);
    overlay?.classList.toggle('is-open', open);
    hamburger?.classList.toggle('is-open', open);
    hamburger?.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  function closeDropdowns(except = null) {
    dropdowns.forEach(dropdown => {
      if (dropdown === except) return;
      dropdown.classList.remove('is-open');
      dropdown.querySelector('.nav__link')?.setAttribute('aria-expanded', 'false');
    });
  }

  setScrolled();
  window.addEventListener('scroll', setScrolled, { passive: true });

  hamburger?.addEventListener('click', () => toggleDrawer(true));
  drawerClose?.addEventListener('click', () => toggleDrawer(false));
  overlay?.addEventListener('click', () => toggleDrawer(false));

  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.nav__link');
    trigger?.setAttribute('aria-expanded', 'false');
    trigger?.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = dropdown.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', String(isOpen));
      closeDropdowns(dropdown);
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav__dropdown')) closeDropdowns();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      toggleDrawer(false);
      closeDropdowns();
    }
  });

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link, .nav__drawer-link').forEach(link => {
    const href = link.getAttribute('href')?.split('/').pop();
    if (href === currentPath) link.classList.add('is-active');
  });
})();

/* ==========================================================================
   2. SCROLL REVEAL - IntersectionObserver fade-up
   ========================================================================== */

(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* ==========================================================================
   3. STAT COUNTER - Count up on scroll
   ========================================================================== */

(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const DURATION = 1800;

  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const start  = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / DURATION, 1);
      const current  = Math.round(target * (1 - Math.pow(1 - progress, 4)));
      el.textContent = current.toLocaleString() + suffix;
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
   5. HERO SCROLL INDICATOR - Hide on scroll
   ========================================================================== */

(() => {
  const indicator = document.querySelector('.hero__scroll');
  if (!indicator) return;
  window.addEventListener('scroll', () => {
    indicator.classList.toggle('is-hidden', window.scrollY > 120);
  }, { passive: true });
})();

/* ==========================================================================
   6. CONTACT FORM - WhatsApp redirect + native validation
   ========================================================================== */

(() => {
  const form = document.querySelector('.js-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const text = encodeURIComponent(
      `Hi Mywash Recruitment Agency,\n\n` +
      `Name: ${data.get('name')?.trim() || ''}\n` +
      `Phone / WhatsApp: ${data.get('phone')?.trim() || ''}\n` +
      `Enquiry type: ${data.get('type') || 'General Enquiry'}\n\n` +
      `${data.get('message')?.trim() || ''}`
    );

    window.open(`https://wa.me/27730966477?text=${text}`, '_blank');

    const wrapper = document.querySelector('#form-wrapper');
    const success = document.querySelector('#form-success');
    if (wrapper && success) {
      wrapper.style.display = 'none';
      success.style.display = 'block';
    }
  });
})();

/* ==========================================================================
   7. YEAR & PACKAGE FLYER LIGHTBOX - Native <dialog> modal
   ========================================================================== */

document.querySelectorAll('.js-year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

(() => {
  const triggers = document.querySelectorAll('.package-card__media');
  if (!triggers.length) return;

  const dialog = document.createElement('dialog');
  dialog.className = 'package-lightbox';
  dialog.setAttribute('aria-label', 'Travel package flyer preview');
  dialog.innerHTML = `
    <div class="package-lightbox__inner">
      <button type="button" class="package-lightbox__close" aria-label="Close flyer preview">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <img class="package-lightbox__img" src="" alt="" />
    </div>
  `;
  document.body.appendChild(dialog);
  const dialogImg = dialog.querySelector('.package-lightbox__img');

  dialog.querySelector('.package-lightbox__close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });

  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const img = btn.querySelector('.package-card__img');
      if (!img) return;
      dialogImg.src = img.currentSrc || img.src;
      dialogImg.alt = img.alt;
      dialog.showModal();
    });
  });
})();
