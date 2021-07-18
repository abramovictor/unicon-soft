const swiper = new Swiper('#hero-swiper', {

  loop: true,

  // If we need pagination
  pagination: {
    el: '#hero-swiper .swiper-pagination',
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
