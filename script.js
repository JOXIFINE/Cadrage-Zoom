const image = document.getElementById("image");

const images = [
  "1.jpg",
  "2.jpg",
  "3.jpg"
];

let current = 0;
let scale = 1;

function updateZoom() {
  image.style.transform = `scale(${scale})`;

  // Quand le zoom devient énorme
  if (scale >= 16) {

    // image suivante
    current = (current + 1) % images.length;

    // changer image
    image.src = images[current];

    // reset zoom
    scale = 1;
  }
}

window.addEventListener("wheel", (e) => {

  e.preventDefault();

  if (e.deltaY < 0) {
    scale *= 1.1;
  } else {
    scale /= 1.1;
  }

  updateZoom();

}, { passive: false });