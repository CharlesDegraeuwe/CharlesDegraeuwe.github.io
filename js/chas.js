const images = [
  "sitecontent/yung-mutte2.png",
  "sitecontent/foto.jpeg",
  "sitecontent/yung-mutte1.png",
  "sitecontent/fokt.jpeg",
  "sitecontent/carousel1.jpeg",
  "sitecontent/carousel2.jpeg",
  "sitecontent/thumbnail.jpeg",
  "sitecontent/carousel6.jpeg",
];

let index = 0;
const stack = document.getElementById("stack");

function addImageToStack() {
  const img = document.createElement("img");
  img.src = images[index % images.length];
  img.style.zIndex = index;
  stack.appendChild(img);
  index++;
  counter.textContent = (index % images.length) + 1;
}

addImageToStack(); // start met eerste afbeelding
setInterval(addImageToStack, 7000); // voeg elke 7 seconden een nieuwe afbeelding toe

let currentIndex = 0; // Voeg deze regel toe om de huidige index bij te houden

// Functie om afbeelding weer te geven op basis van de huidige index
function showImage(index) {
  stack.innerHTML = ""; // Verwijder bestaande afbeeldingen
  const img = document.createElement("img");
  img.src = images[index % images.length];
  img.style.zIndex = index;
  stack.appendChild(img);
  counter.textContent = (index % images.length) + 1; // update teller
}

document.getElementById("prevBtn").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
});

document.getElementById("nextBtn").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
});

const fireButton = document.getElementById("fireButton");
const dislikeButton = document.getElementById("dislikeButton");
const container = document.getElementById("ontploffing");

const fireEmojis = ["🔥", "🔥", "🔥", "🔥", "🔥", "🔥"];
const dislikeEmojis = ["👎", "👎", "👎", "👎", "👎", "👎"];

function spawnEmojis(emojis, className) {
  for (let i = 0; i < 20; i++) {
    const emoji = document.createElement("span");
    emoji.classList.add(className);
    emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = `${Math.random() * 100}%`;
    emoji.style.top = `${Math.random() * 100}%`;

    const x = `${(Math.random() - 0.5) * 300}px`;
    const y = `${(Math.random() - 0.5) * 300}px`;
    emoji.style.setProperty("--x", x);
    emoji.style.setProperty("--y", y);

    container.appendChild(emoji);

    setTimeout(() => emoji.remove(), 5000);
  }
}

fireButton.addEventListener("click", () => {
  spawnEmojis(fireEmojis, "emoji");
});

dislikeButton.addEventListener("click", () => {
  spawnEmojis(dislikeEmojis, "emoji2");
});

console.log(`
*****   *   *    *    *****
*        *   *   * *   *    
*        *****  *****   *****
*        *   *  *   *      *
*****   *   *  *   *   *****
`);
