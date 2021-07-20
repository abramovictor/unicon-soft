const swiper = new Swiper('#hero-swiper', {
  loop: true,

  // If we need pagination
  pagination: {
    el: '#hero-swiper .swiper-pagination',
    type: 'custom',


    renderCustom: (_, current, total) => {
      return Array.from({ length: total }, (_, index) => {
        const numberOfSlide = index + 1;

        return `
          <div class="col-auto">
            <button data-bullet-order="${numberOfSlide}" class="swiper-bullet ${numberOfSlide === current ? 'swiper-bullet--active' : ''}">
              ${numberOfSlide > 9 ? numberOfSlide : '0' + numberOfSlide}
            </button>
          </div>
        `;
      }).join('');
    },
  },

  // Navigation arrows
  navigation: {
    nextEl: '#hero-swiper .swiper-button-next',
    prevEl: '#hero-swiper .swiper-button-prev',
  },

  autoplay: {
    delay: 5000,
    pauseOnMouseEnter: true,
  },
});

const handleSwiperClick = event => {
  const { target } = event;


  if (target.classList.contains('swiper-bullet')) {
    const numberOfSlide = Number(target.getAttribute('data-bullet-order'));
    swiper.slideTo(numberOfSlide);
  }
};

swiper.el.addEventListener('click', handleSwiperClick);
