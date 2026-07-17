/* ==========================================================================
   Portfolio JS — scroll reveal, nav, project expanders, back-to-top
   ========================================================================== */
(function () {
  'use strict';

  /* ----------------------------------------------------------------------
     Nav scroll behavior (hide on scroll down, show on scroll up)
     ---------------------------------------------------------------------- */
  const nav = document.querySelector('.nav');
  const backToTop = document.querySelector('.back-to-top');
  let lastScrollY = 0;
  let navHidden = false;

  function onScroll() {
    const y = window.scrollY;

    // nav hide/show
    if (y > 80) {
      if (y > lastScrollY + 6 && !navHidden) {
        nav.classList.add('nav--hidden');
        navHidden = true;
      } else if (y < lastScrollY - 6 && navHidden) {
        nav.classList.remove('nav--hidden');
        navHidden = false;
      }
    } else {
      nav.classList.remove('nav--hidden');
      navHidden = false;
    }
    lastScrollY = y;

    // back to top
    if (y > 600) {
      backToTop.classList.add('back-to-top--visible');
    } else {
      backToTop.classList.remove('back-to-top--visible');
    }

    // active nav link
    updateActiveLink(y);
  }

  /* ----------------------------------------------------------------------
     Active nav link based on scroll position
     ---------------------------------------------------------------------- */
  function updateActiveLink(y) {
    const links = document.querySelectorAll('.nav__links a');
    const sections = [];
    links.forEach(function (link) {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const el = document.querySelector(href);
        if (el) sections.push({ id: href, top: el.offsetTop - 120, link: link });
      }
    });
    sections.sort(function (a, b) { return a.top - b.top; });

    let active = null;
    for (var i = 0; i < sections.length; i++) {
      if (y >= sections[i].top) active = sections[i];
    }
    links.forEach(function (l) { l.classList.remove('active'); });
    if (active) active.link.classList.add('active');
  }

  /* ----------------------------------------------------------------------
     Mobile nav toggle
     ---------------------------------------------------------------------- */
  const navToggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('nav__links--open');
    });
  }
  // close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('nav__links--open');
    });
  });

  /* ----------------------------------------------------------------------
     Back to top
     ---------------------------------------------------------------------- */
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ----------------------------------------------------------------------
     Project card expand/collapse
     ---------------------------------------------------------------------- */
  document.querySelectorAll('.project-card__header').forEach(function (header) {
    header.addEventListener('click', function () {
      const card = header.closest('.project-card');
      // close others
      document.querySelectorAll('.project-card--open').forEach(function (open) {
        if (open !== card) open.classList.remove('project-card--open');
      });
      card.classList.toggle('project-card--open');
    });
  });

  /* ----------------------------------------------------------------------
     Scroll reveal
     ---------------------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  function revealOnScroll() {
    const windowH = window.innerHeight;
    revealEls.forEach(function (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top < windowH * 0.88) {
        el.classList.add('reveal--visible');
      }
    });
  }

  /* ----------------------------------------------------------------------
     Skill bar animation
     ---------------------------------------------------------------------- */
  function animateSkillBars() {
    document.querySelectorAll('.skill-bar__fill').forEach(function (bar) {
      const rect = bar.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9 && bar.style.width === '') {
        bar.style.width = bar.getAttribute('data-width') || '0%';
      }
    });
  }

  /* ----------------------------------------------------------------------
     Combined scroll handler
     ---------------------------------------------------------------------- */
  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        onScroll();
        revealOnScroll();
        animateSkillBars();
        ticking = false;
      });
      ticking = true;
    }
  });

  // initial calls
  revealOnScroll();
  animateSkillBars();
  updateActiveLink(window.scrollY);

})();
