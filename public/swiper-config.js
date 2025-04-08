var swiper = new Swiper(".swiper-container", {
    slidesPerView: 3, /* Muestra 3 tarjetas a la vez */
    spaceBetween: 20, /* Espacio entre tarjetas */
    loop: true, /* Hace que el carrusel sea infinito */
    autoplay: {
      delay: 2000, /* Cada 2 segundos cambia de tarjeta */
      disableOnInteraction: false, /* Sigue auto-reproduciéndose aunque el usuario interactúe */
    },
    breakpoints: {
      1024: { slidesPerView: 3 }, /* En pantallas grandes, 3 tarjetas */
      768: { slidesPerView: 2 }, /* En tablets, 2 tarjetas */
      480: { slidesPerView: 1 }, /* En móviles, 1 tarjeta */
    },
  });