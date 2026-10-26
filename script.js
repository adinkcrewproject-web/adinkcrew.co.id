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
