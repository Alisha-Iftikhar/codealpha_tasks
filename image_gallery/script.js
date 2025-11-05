const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const closeBtn = document.querySelector('.close');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let currentIndex = 0;

// Open Lightbox
galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentIndex = index;
    showImage(currentIndex);
    lightbox.classList.add('show');
  });
});

// Close Lightbox
closeBtn.addEventListener('click', () => {
  lightbox.classList.remove('show');
  setTimeout(() => (lightbox.style.display = 'none'), 300);
});

// Next / Prev Navigation
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);

function nextImage() {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  showImage(currentIndex);
}

function prevImage() {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  showImage(currentIndex);
}

function showImage(index) {
  lightboxImage.src = galleryItems[index].src;
  lightbox.style.display = 'flex';
}

// Close when clicking outside image
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('show');
    setTimeout(() => (lightbox.style.display = 'none'), 300);
  }
});
