
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const stickyOffset = 100;

  const toggleStickyHeader = () => {
    if (!header) return;
    if (window.scrollY > stickyOffset) {
      if (!header.classList.contains('sticky')) {
        header.classList.add('sticky');
        document.body.classList.add('has-sticky-header');
      }
    } else {
      header.classList.remove('sticky');
      document.body.classList.remove('has-sticky-header');
    }
  };

  toggleStickyHeader();
  window.addEventListener('scroll', toggleStickyHeader, { passive: true });

  const mapMenuToSections = () => {
    const menuLinks = Array.from(document.querySelectorAll('.menu a'));
    const sectionTargets = [
      document.querySelector('.main'),
      document.querySelector('.section_2'),
      document.querySelector('.section_3'),
      document.querySelector('.footer'),
    ];

    menuLinks.forEach((link, index) => {
      const target = sectionTargets[index];
      if (!target) return;

      if (!target.id) {
        target.id = `section-${index + 1}`;
      }

      link.setAttribute('href', `#${target.id}`);
      link.addEventListener('click', (event) => {
        event.preventDefault();
        document.getElementById(target.id)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    });
  };

  mapMenuToSections();

  const initFeaturesSlider = () => {
    const slider = document.querySelector('.features-grid');
    if (!slider) return;

    const slides = Array.from(slider.children);
    if (slides.length <= 1) return;

    const sliderWrapper = slider.parentElement;
    let currentIndex = 0;
    const slideCount = slides.length;
    const slideDuration = 5000;

    const applyBaseStyles = () => {
      if (sliderWrapper) {
        sliderWrapper.style.overflow = 'hidden';
        sliderWrapper.style.position = 'relative';
      }

      slider.style.display = 'flex';
      slider.style.gap = '0px';
      slider.style.transition = 'transform 0.6s ease';
      slider.style.willChange = 'transform';

      slides.forEach((slide) => {
        slide.style.minWidth = '100%';
        slide.style.boxSizing = 'border-box';
      });
    };

    const moveToSlide = (index) => {
      currentIndex = (index + slideCount) % slideCount;
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    applyBaseStyles();
    moveToSlide(0);

    let autoplayTimer = setInterval(() => {
      moveToSlide(currentIndex + 1);
    }, slideDuration);

    const resetAutoplay = () => {
      clearInterval(autoplayTimer);
      autoplayTimer = setInterval(() => {
        moveToSlide(currentIndex + 1);
      }, slideDuration);
    };

    slider.addEventListener('pointerdown', (event) => {
      slider.dataset.startX = event.clientX;
    });

    slider.addEventListener('pointerup', (event) => {
      const startXValue = slider.dataset.startX;
      if (!startXValue) return;
      const deltaX = event.clientX - Number(startXValue);
      slider.dataset.startX = '';

      if (Math.abs(deltaX) > 50) {
        if (deltaX < 0) {
          moveToSlide(currentIndex + 1);
        } else {
          moveToSlide(currentIndex - 1);
        }
        resetAutoplay();
      }
    });

    slider.addEventListener('pointerleave', () => {
      slider.dataset.startX = '';
    });
  };

  initFeaturesSlider();
});
