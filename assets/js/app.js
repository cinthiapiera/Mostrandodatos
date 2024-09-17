var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30, // Espacio entre cards por defecto
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      620: {
        slidesPerView: 1,
        spaceBetween: 10, // Espacio entre cards en pantallas de al menos 620px
      },
      680: {
        slidesPerView: 2,
        spaceBetween: 20, // Espacio entre cards en pantallas de al menos 680px
      },
      920: {
        slidesPerView: 3,
        spaceBetween: 20, // Espacio entre cards en pantallas de al menos 920px
      },
      1240: {
        slidesPerView: 4,
        spaceBetween: 25, // Espacio mayor entre cards en pantallas grandes (al menos 1240px)
      },
    },
  });
  