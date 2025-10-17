document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector("#carousel");
  const textoElement = document.querySelector("#writer-text");
  const toggleTextElement = document.querySelector("#toggle-text");
  const menuElement = document.querySelector("#menu");
  const menuToggle = document.querySelector("#menu-toggle");

  let currentIndex = 0;
  let totalReviews = 0;
  const INACTIVITY_LIMIT = 15000;
  let inactivityTimer;
  let textoExpandido = false;
  let isMenuOpen = false;

  const writerFullText = `Apasionada de la lectura, la pintura al óleo, la decoración y las artes plásticas, encuentra en cada expresión artística una forma de conectar con lo más íntimo del alma. Viajar ha sido su fuente inagotable de inspiración: cada paisaje, cada cultura y cada encuentro han dejado huellas que se transforman en palabras vivas dentro de sus obras. Su escritura refleja convicción, ternura y una mirada esperanzadora del mundo. Más que contar historias, busca tocar corazones.`;
  const writerTruncatedText = writerFullText.slice(0, 140) + "...";

  function checkIsMobile() {
    return window.innerWidth <= 768;
  }

  function toggleTexto() {
    const arrow = document.getElementById("arrow-path");
    textoExpandido = !textoExpandido;
    textoElement.textContent = textoExpandido
      ? writerFullText
      : writerTruncatedText;

    if (textoExpandido) {
      arrow.setAttribute("d", "M40 50 L50 40 L60 50");
    } else {
      arrow.setAttribute("d", "M40 40 L50 50 L60 40");
    }
  }

  function toggleMenu() {
    menuElement.classList.toggle("open");
    isMenuOpen = menuElement.classList.contains("open");
  }

  function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      moveAhead();
    }, INACTIVITY_LIMIT);
  }

  function moveAhead() {
    if (totalReviews === 0) return;
    currentIndex = (currentIndex + 1) % totalReviews;
    updateCarousel();
    resetInactivityTimer();
  }

  function moveBehind() {
    if (totalReviews === 0) return;
    currentIndex = (currentIndex - 1 + totalReviews) % totalReviews;
    updateCarousel();
    resetInactivityTimer();
  }

  function updateCarousel() {
    const article = carousel.querySelector("article");
    if (!article) return;
    const articleWidth = article.offsetWidth;
    const offset = articleWidth * currentIndex;
    carousel.style.transform = `translateX(-${offset}px)`;
  }

  // Initialize
  totalReviews = carousel.querySelectorAll("article").length;
  updateCarousel();
  resetInactivityTimer();

  // Configuración inicial según dispositivo
  if (checkIsMobile()) {
    toggleTextElement.style.display = "block";
    textoElement.textContent = writerTruncatedText;
  } else {
    toggleTextElement.style.display = "none";
    textoElement.textContent = writerFullText;
  }

  // Eventos
  menuToggle.addEventListener("click", toggleMenu);

  // Expose functions globally if needed
  window.toggleTexto = toggleTexto;
  window.toggleMenu = toggleMenu;
  window.moveAhead = moveAhead;
  window.moveBehind = moveBehind;
});
