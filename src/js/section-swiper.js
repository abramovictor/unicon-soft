(() => {
  const swiperElements = document.querySelectorAll('.section-swiper');

  swiperElements.forEach(swiperElement => {
    let swiper;

    const swiperWrapper = swiperElement.querySelector('.swiper-wrapper');

    if (!swiperWrapper) {
      return;
    }

    const swiperSlides = swiperElement.querySelectorAll('.swiper-slide');

    if (swiperSlides.length === 0) {
      return;
    }

    const swiperPagination = swiperElement.querySelector('.swiper-pagination');

    const swiperWrapperClassName = swiperWrapper.className;
    const swiperSlidesClassName = swiperSlides.item(0).className;

    const initializeSwiper = () => {
      swiperWrapper.className = 'swiper-wrapper';
      swiperSlides.forEach(swiperSlide => {
        swiperSlide.className = 'swiper-slide'
      });

      swiper = new Swiper(swiperElement, {
        loop: true,
        autoplay: false,
        spaceBetween: 24,
        slidesPerView: 1.2,
        centeredSlides: true,
        pagination: { el: swiperPagination },
      });
    };

    const destroySwiper = () => {
      swiperWrapper.className = swiperWrapperClassName;
      swiperSlides.forEach(swiperSlide => {
        swiperSlide.className = swiperSlidesClassName;
      });

      swiper?.destroy();
    };

    const mql = window.matchMedia('(min-width: 992px)');
    let hasBeenInitialized = false;

    const handleMQLListener = () => {
      if (mql.matches && hasBeenInitialized) {
        destroySwiper();
      } else if (!mql.matches) {
        hasBeenInitialized = true;
        initializeSwiper();
      }
    };

    handleMQLListener();

    if ('addEventListener' in mql) {
      mql.addEventListener('change', handleMQLListener);
    } else {
      mql.addListener(handleMQLListener);
    }
  });
})();
