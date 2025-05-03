const grid_items = document.getElementsByClassName("grid-item");
const overlay = document.getElementById("overlay");
const closing = document.getElementById("closing-cross");

// Open overlay bij klik op een grid-item
for (let i = 0; i < grid_items.length; i++) {
  grid_items[i].addEventListener("click", function (event) {
    event.stopPropagation(); // Belangrijk: voorkomt dat klik als "buiten overlay" wordt gezien
    overlay.style.display = "block";
  });
}

// Sluit overlay bij klik op het kruisje
closing.addEventListener("click", function (event) {
  event.stopPropagation();
  overlay.style.display = "none";
});

// Sluit overlay bij klik buiten overlay
document.addEventListener("click", function (event) {
  if (overlay.style.display === "block" && !overlay.contains(event.target)) {
    overlay.style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const closing = document.getElementById("closing-cross");
  if (closing) {
    closing.onclick = () => {
      const overlay = document.getElementById("overlay");
      if (overlay) overlay.remove();
    };
  } else {
    console.error("Closing cross element not found");
  }
});
