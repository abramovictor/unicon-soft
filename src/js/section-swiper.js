(() => {
  let swiper;

  const swiperElement = document.querySelector('.section-swiper');
  const swiperWrapper = swiperElement.querySelector('.swiper-wrapper');
  const swiperSlides = swiperElement.querySelectorAll('.swiper-slide');


  const swiperWrapperClassName = swiperWrapper.className;
  const swiperSlidesClassName = swiperSlides.item(0).className;

  const initializeSwiper = () => {
    swiperWrapper.className = 'swiper-wrapper';
    swiperSlides.forEach(swiperSlide => {
      swiperSlide.className = 'swiper-slide'
    });


    swiper = new Swiper('.section-swiper', {
      loop: true,
      autoplay: false,
      spaceBetween: 24,
      slidesPerView: 1.2,
      centeredSlides: true,

      // If we need pagination
      pagination: {
        el: '.section-swiper .swiper-pagination',
      },
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
})();
