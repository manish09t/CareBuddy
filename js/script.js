// Smooth scroll for nav links
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      const section = document.querySelector(href);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = href;
    }
  });
});

// Header hide/show on scroll
let lastScrollTop = 0;
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  if (currentScroll > lastScrollTop && currentScroll > 100) {
    header.classList.add('hide');
  } else {
    header.classList.remove('hide');
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Lightbox Functionality for .gallery-row images
const galleryImages = document.querySelectorAll('.gallery-row img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.querySelector('.close-lightbox');

galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.style.display = 'flex';
  });
});

closeLightbox.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target === closeLightbox) {
    lightbox.style.display = 'none';
  }
});

// Fullscreen modal gallery (#productGallery)
document.addEventListener('DOMContentLoaded', () => {
  const productImages = document.querySelectorAll('#productGallery img');
  const modal = document.getElementById('fullscreenModal');
  const modalImg = document.getElementById('fullscreenImage');
  const closeBtn = modal.querySelector('.close-fullscreen');
  const prevBtn = modal.querySelector('.prev-btn');
  const nextBtn = modal.querySelector('.next-btn');

  let currentIndex = 0;

  function showImage(index) {
    currentIndex = (index + productImages.length) % productImages.length;
    modalImg.src = productImages[currentIndex].src;
    modal.style.display = 'flex';
    modalImg.focus();
  }

  function hideModal() {
    modal.style.display = 'none';
  }

  productImages.forEach((img, i) => {
    img.addEventListener('click', () => showImage(i));
  });

  closeBtn.addEventListener('click', hideModal);
  prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
  nextBtn.addEventListener('click', () => showImage(currentIndex + 1));

  document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
      if (e.key === 'Escape') hideModal();
      else if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
      else if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) hideModal();
  });
});
