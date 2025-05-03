const video = document.querySelector("video");
const main = document.querySelector("main");

video.addEventListener("mouseenter", () => {
  main.classList.add("hovered");
});

video.addEventListener("mouseleave", () => {
  main.classList.remove("hovered");
});

const overview = document.querySelector("#overview-container");

overview.addEventListener("mouseenter", () => {
  main.classList.add("hovered2");
});

overview.addEventListener("mouseleave", () => {
  main.classList.remove("hovered2");
});

document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".menu-item");
  const video = document.getElementById("video-player");
  const source = document.getElementById("video-source");

  // Selecteer het laatste menu-item en toon de video bij het laden
  const lastMenuItem = menuItems[menuItems.length - 1];
  const lastVideoSrc = lastMenuItem.getAttribute("data-video");
  source.setAttribute("src", lastVideoSrc); // Zet de video naar de laatste
  video.load(); // Laad de video
  video.play(); // Speel de video af

  // Voeg de 'active' klasse toe aan het laatste menu-item
  lastMenuItem.classList.add("active");

  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      const videoSrc = item.getAttribute("data-video"); // Haal het pad op van de video

      if (source.src !== videoSrc) {
        // Controleer of de nieuwe video anders is dan de huidige
        source.setAttribute("src", videoSrc); // Zet de nieuwe videobron
        video.load(); // Laad de nieuwe video
        video.play(); // Speel de video af
      }

      // Verwijder de 'active' klasse van alle menu-items en voeg het toe aan de aangeklikte
      menuItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active"); // Markeer het aangeklikte item als actief
    });
  });
});
