const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Tutup menu' : 'Buka menu');
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Buka menu');
    });
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

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

    const url = `https://wa.me/628812514725?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}


/* ADINK CREW — Scroll Reveal */

(() => {
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  const selectors = [
    '.hero-content',
    '.hero-visual',
    '.section-heading',
    '.service-card',
    '.inspiration-tile',
    '.about-content',
    '.about-art',
    '.contact-copy',
    '.contact-form-wrap'
  ];

  const elements = [
    ...new Set(
      selectors.flatMap(selector =>
        [...document.querySelectorAll(selector)]
      )
    )
  ];

  if (!elements.length || reduceMotion ||
      !('IntersectionObserver' in window)) {
    return;
  }

  document.documentElement.classList.add('js-scroll');

  [
    '.service-card',
    '.inspiration-tile'
  ].forEach(selector => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.style.setProperty(
        '--scroll-delay',
        `${Math.min(index * 100, 200)}ms`
      );
    });
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -5% 0px'
  });

  elements.forEach(element => observer.observe(element));
})();
