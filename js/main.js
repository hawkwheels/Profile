/**
 * VARUNRAJ AMIRTHARAJ - LIQUID GLASS INTERACTION ENGINE
 * Butter-smooth physics, organic cursor light tracking, streamlined copy & modals
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. BUTTER-SMOOTH MOUSE LIGHT REFLECTION TRACKING
     ========================================================================== */
  const liquidCards = document.querySelectorAll('.liquid-glass-card');

  window.addEventListener('mousemove', (e) => {
    liquidCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  }, { passive: true });

  /* ==========================================================================
     2. STREAMLINED SCROLLSPY & FLOATING CAPSULE ACTIVE LINKS
     ========================================================================== */
  const navLinks = document.querySelectorAll('.nav-capsule-link');
  const sections = document.querySelectorAll('main section[id]');

  const handleScroll = () => {
    const scrollPos = window.scrollY + 180;
    let currentId = '';

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ==========================================================================
     3. MOBILE NAV DRAWER TOGGLE
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-links');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  /* ==========================================================================
     4. ANIMATED METRICS COUNTER
     ========================================================================== */
  const counters = document.querySelectorAll('.counter');
  let hasCounted = false;

  const runCounterAnimation = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1500;
      const start = performance.now();

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.floor(ease * target);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          counter.textContent = target;
        }
      };

      requestAnimationFrame(step);
    });
  };

  const metricsStrip = document.querySelector('.metrics-strip');
  if (metricsStrip) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasCounted) {
          hasCounted = true;
          runCounterAnimation();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(metricsStrip);
  }

  /* ==========================================================================
     5. TOAST NOTIFICATIONS & 1-CLICK COPY
     ========================================================================== */
  const toastBox = document.getElementById('toast-box');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer;

  const triggerToast = (msg) => {
    if (!toastBox) return;
    toastMessage.textContent = msg;
    toastBox.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastBox.classList.remove('show');
    }, 2400);
  };

  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const val = btn.getAttribute('data-copy');
      if (!val) return;

      try {
        await navigator.clipboard.writeText(val);
        triggerToast(`Copied: ${val}`);

        // Subtle visual flash
        btn.style.transform = 'scale(0.94)';
        setTimeout(() => {
          btn.style.transform = '';
        }, 180);
      } catch (err) {
        window.prompt('Copy to clipboard:', val);
      }
    });
  });

  /* ==========================================================================
     6. QUICK ADVISORY TOPIC SELECTOR
     ========================================================================== */
  const topicPills = document.querySelectorAll('#inquiry-topics .inquiry-topic-pill');
  const btnEmailDispatch = document.getElementById('btn-email-dispatch');

  topicPills.forEach(pill => {
    pill.addEventListener('click', () => {
      topicPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const topic = pill.getAttribute('data-topic');
      if (btnEmailDispatch) {
        const subject = encodeURIComponent(`Security Advisory Inquiry - ${topic}`);
        btnEmailDispatch.href = `mailto:varunraj995@gmail.com?subject=${subject}`;
      }
    });
  });

  /* ==========================================================================
     7. RESUME PREVIEW MODAL
     ========================================================================== */
  const resumeModal = document.getElementById('resume-modal');
  const btnPreviewCv = document.getElementById('btn-preview-cv');
  const btnCloseModal = document.getElementById('btn-close-modal');

  const openResumeModal = () => {
    if (resumeModal) {
      resumeModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeResumeModal = () => {
    if (resumeModal) {
      resumeModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  if (btnPreviewCv) {
    btnPreviewCv.addEventListener('click', openResumeModal);
  }

  if (btnCloseModal) {
    btnCloseModal.addEventListener('click', closeResumeModal);
  }

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        closeResumeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('open')) {
      closeResumeModal();
    }
  });

});
