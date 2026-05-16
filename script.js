const image = document.getElementById("image");

/*
IMAGE PRINCIPALE : 1440px
MINIATURE CENTRALE : 180px

1440 / 180 = 8
=> zoom parfait = x8
*/

const MAX_ZOOM = 8;
const MIN_ZOOM = 1;

/* 6 images */

const images = [
  "1.webp",
  "2.webp",
  "3.webp",
  "4.webp",
  "5.webp",
  "6.webp"
];

let current = 0;
let scale = 1;

/* Préchargement */

images.forEach(src => {

  const img = new Image();
  img.src = src;

});

/* Update */

function updateZoom() {

  image.style.transform =
    `scale(${scale})`;

  /* Passage image suivante */

  if (scale >= MAX_ZOOM) {

    current =
      (current + 1) % images.length;

    image.src = images[current];

    /* Reset propre */

    scale = 1;

    image.style.transform =
      `scale(${scale})`;
  }
}

/* Zoom desktop */

window.addEventListener("wheel", (e) => {

  e.preventDefault();

  const zoomSpeed = 1.03;

  if (e.deltaY < 0) {

    scale *= zoomSpeed;

  } else {

    scale /= zoomSpeed;
  }

  /* limite minimum */

  scale = Math.max(
    MIN_ZOOM,
    scale
  );

  updateZoom();

}, { passive: false });

/* Mobile pinch zoom */

let lastDistance = null;

window.addEventListener("touchmove", (e) => {

  if (e.touches.length === 2) {

    e.preventDefault();

    const dx =
      e.touches[0].clientX -
      e.touches[1].clientX;

    const dy =
      e.touches[0].clientY -
      e.touches[1].clientY;

    const distance =
      Math.sqrt(dx * dx + dy * dy);

    if (lastDistance) {

      if (distance > lastDistance) {

        scale *= 1.02;

      } else {

        scale /= 1.02;
      }

      scale = Math.max(
        MIN_ZOOM,
        scale
      );

      updateZoom();
    }

    lastDistance = distance;
  }

}, { passive: false });

window.addEventListener("touchend", () => {

  lastDistance = null;

});
