/* ==========================================================================
   Subhankar Pattnaik — Portfolio
   JavaScript: Scroll Spy, Animations, Counters, Mobile Nav
   ========================================================================== */

(function () {
  'use strict';

  // ---- DOM References ----
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const allNavLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const reveals = document.querySelectorAll('.reveal');
  const skillBars = document.querySelectorAll('.skill-bar');
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  // ---- Mobile Nav Toggle ----
  navToggle.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile nav when a link is clicked
  allNavLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ---- Scroll Spy ----
  function updateActiveNav() {
    var scrollY = window.scrollY + nav.offsetHeight + 16;
    var current = '';

    sections.forEach(function (section) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    allNavLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current) {
        link.classList.add('active');
      }
    });
  }

  // ---- IntersectionObserver for Reveal Animations ----
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  reveals.forEach(function (el) {
    revealObserver.observe(el);
  });

  // ---- IntersectionObserver for Skill Bar Animations ----
  var skillObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var fill = entry.target.querySelector('.skill-fill');
          var level = entry.target.getAttribute('data-level');
          if (fill && level) {
            fill.style.width = level + '%';
          }
          skillObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  skillBars.forEach(function (bar) {
    skillObserver.observe(bar);
  });

  // ---- Counter Animation ----
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var duration = 1600;
    var startTime = null;
    var currentDisplay = '0';

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var elapsed = timestamp - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var easedProgress = easeOutCubic(progress);
      var current = Math.floor(easedProgress * target);

      if (current.toString() !== currentDisplay) {
        currentDisplay = current.toString();
        el.textContent = currentDisplay;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toString();
      }
    }

    requestAnimationFrame(step);
  }

  var counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  statNumbers.forEach(function (num) {
    counterObserver.observe(num);
  });

  // ---- Scroll Event (throttled) ----
  var ticking = false;

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        updateActiveNav();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial call
  updateActiveNav();

  // ---- Close mobile nav on resize (if it was open) ----
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768 && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // ---- Smooth scroll for anchor links (fallback for Safari) ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offset = nav.offsetHeight + 8;
        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });
})();
