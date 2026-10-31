(function () {
  'use strict';

  var root = document.documentElement;
  var header = document.querySelector('.site-header');
  var nav = document.getElementById('main-nav');
  var toggle = document.querySelector('.menu-toggle');
  var sticky = document.getElementById('sticky-cta');
  var heroActions = document.getElementById('hero-actions');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header: solid background after scrolling ---------- */
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'סגירת תפריט' : 'פתיחת תפריט');
    nav.classList.toggle('is-open', open);
  }
  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', function (e) {
    if (nav.classList.contains('is-open') && !header.contains(e.target)) setMenu(false);
  });

  if (!('IntersectionObserver' in window)) return;

  /* ---------- Mobile sticky CTA: show once the hero buttons are off-screen ---------- */
  var stickyLink = sticky.querySelector('a');
  new IntersectionObserver(function (entries) {
    var show = !entries[0].isIntersecting && entries[0].boundingClientRect.top < 0;
    sticky.classList.toggle('is-visible', show);
    stickyLink.tabIndex = show ? 0 : -1;
  }).observe(heroActions);

  /* ---------- Scroll reveal with a small stagger between siblings ---------- */
  if (reduceMotion) return;
  var items = document.querySelectorAll('.reveal');
  root.classList.add('reveal-ready');

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var siblings = Array.prototype.filter.call(el.parentNode.children, function (c) {
        return c.classList.contains('reveal');
      });
      el.style.setProperty('--reveal-delay', Math.max(0, siblings.indexOf(el)) * 80 + 'ms');
      el.classList.add('is-visible');
      io.unobserve(el);
      // Hand transitions back to the element's own styles (e.g. card hover) once revealed
      el.addEventListener('transitionend', function done(ev) {
        if (ev.target !== el || ev.propertyName !== 'transform') return;
        el.removeEventListener('transitionend', done);
        el.classList.remove('reveal', 'is-visible');
        el.style.removeProperty('--reveal-delay');
      });
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach(function (el) { io.observe(el); });
})();
