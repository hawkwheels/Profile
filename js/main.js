/**
 * VARUNRAJ AMIRTHARAJ — EDITORIAL INTERACTION ENGINE
 * Inspired by Nick Velten (nickvelten.nl) / Dennis Snellenberg
 * Dynamic Navbar Theme Adapters, Active Section Spy,
 * One-Click Clipboard Copying & Smooth Mobile Navigation
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. FLOATING NAVBAR THEME DETECTOR & SCROLLSPY
     -------------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id], .section-wrap-trackrecord');
  const navLinks = document.querySelectorAll('.nav-bar-link[data-target]');
  const body = document.body;

  const updateNavbarState = () => {
    const scrollY = window.scrollY;
    const navHeight = navbar ? navbar.offsetHeight : 60;
    const checkPoint = scrollY + navHeight + 20;

    let currentSectionId = '';
    let currentTheme = 'dark';

    // Find currently active section
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;

      if (checkPoint >= top && checkPoint < top + height) {
        currentSectionId = sec.getAttribute('id') || '';
        const theme = sec.getAttribute('data-theme-section');
        if (theme) {
          currentTheme = theme;
        }
      }
    });

    // Check light theme sections (about, credentials, contact)
    const activeElements = document.elementsFromPoint(window.innerWidth / 2, navHeight / 2 + 10);
    let isOverLight = false;

    activeElements.forEach(el => {
      const themedParent = el.closest('[data-theme-section]');
      if (themedParent && themedParent.getAttribute('data-theme-section') === 'light') {
        isOverLight = true;
      }
    });

    if (isOverLight || currentTheme === 'light') {
      body.classList.add('nav-on-light');
    } else {
      body.classList.remove('nav-on-light');
    }

    // Highlight active nav item
    navLinks.forEach(link => {
      const target = link.getAttribute('data-target');
      if (target === currentSectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', updateNavbarState, { passive: true });
  updateNavbarState();

  /* --------------------------------------------------------------------------
     2. MOBILE MENU TOGGLE
     -------------------------------------------------------------------------- */
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('is-open');
    });

    // Close on clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && e.target !== menuToggle) {
        navMenu.classList.remove('is-open');
      }
    });

    // Close when clicking a nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
      });
    });
  }

  /* --------------------------------------------------------------------------
     3. 1-CLICK CLIPBOARD COPY WITH TOAST NOTIFICATION
     -------------------------------------------------------------------------- */
  const copyButtons = document.querySelectorAll('.copy-btn');
  const toast = document.getElementById('toast');
  let toastTimeout = null;

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  };

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-clipboard');
      if (!textToCopy) return;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          // Fallback for non-https or older browsers
          const textArea = document.createElement('textarea');
          textArea.value = textToCopy;
          textArea.style.position = 'fixed';
          textArea.style.opacity = '0';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }
        showToast(`Copied ID: ${textToCopy} to clipboard!`);
      } catch (err) {
        showToast(`Copied ID: ${textToCopy}`);
      }
    });
  });

  /* --------------------------------------------------------------------------
     4. SMOOTH SCROLL FOR ALL INTERNAL ANCHOR LINKS
     -------------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

});
