const images = document.querySelectorAll(".imagenes img");

images.forEach((image) => {
  image.addEventListener("click", function () {
    const card = image.parentElement;
    const targetId = image.getAttribute("data-target");
    let targetContent = document.getElementById(targetId);

    if (!targetContent) {
      targetContent = card.querySelector("." + targetId);
    }

    if (targetContent) {
      if (targetContent.classList.contains("open")) {
        targetContent.classList.remove("open");
        card.classList.remove("open");
      } else {
        targetContent.classList.add("open");
        card.classList.add("open");
      }
    }
  });
});

