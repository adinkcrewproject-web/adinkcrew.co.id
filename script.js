
/* ADINK CREW — Navigation, Contact Form & Premium Motion */

(() => {
  /* Mobile navigation */
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');

      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute(
        'aria-label',
        isOpen ? 'Tutup menu' : 'Buka menu'
      );
    });

    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Buka menu');
      });
    });
  }

  /* Automatic copyright year */
  const year = document.getElementById('year');

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /* WhatsApp inquiry form */
  const inquiryForm = document.getElementById('inquiry-form');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(inquiryForm);
      const name = String(formData.get('name') || '').trim();
      const type = String(formData.get('type') || '').trim();
      const location = String(formData.get('location') || '').trim();
      const notes = String(formData.get('notes') || '').trim();

      const message = [
        'Halo ADINK CREW Furniture, saya ingin konsultasi.',
        '',
        `Nama: ${name}`,
        `Kebutuhan: ${type}`,
        `Lokasi proyek: ${location}`,
        notes ? `Detail: ${notes}` : ''
      ].filter(Boolean).join('\n');

      const url =
        `https://wa.me/628812514725?text=${encodeURIComponent(message)}`;

      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  /* Premium motion — no hidden content or loading effect */
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (reduceMotion) return;

  /* Subtle stagger for cards, without hiding them */
  [
    '.service-card',
    '.inspiration-tile'
  ].forEach((selector) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.style.setProperty(
        '--scroll-delay',
        `${Math.min(index * 70, 210)}ms`
      );
    });
  });

  /* Gently highlight sections as they enter the viewport.
     Content remains visible at all times. */
  if ('IntersectionObserver' in window) {
    const sections = document.querySelectorAll(
      '.intro, .services, .inspiration, .about, .process, .contact'
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-in-view');
        }
      });
    }, {
      threshold: 0.12
    });

    sections.forEach((section) => observer.observe(section));
  }
})();
