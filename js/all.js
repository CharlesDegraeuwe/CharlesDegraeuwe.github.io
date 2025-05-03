class Work {
  #id;
  #titel;
  #genre;
  #datum;
  #tekst;
  #iframe;

  constructor(id, titel, genre, datum, tekst, iframe) {
    this.#id = id;
    this.#titel = titel;
    this.#genre = genre;
    this.#datum = datum;
    this.#tekst = tekst;
    this.#iframe = iframe;
  }

  get id() {
    return this.#id;
  }
  get titel() {
    return this.#titel;
  }
  get genre() {
    return this.#genre;
  }

  get datum() {
    return this.#datum;
  }
  get tekst() {
    return this.#tekst;
  }
  get iframe() {
    return this.#iframe;
  }
}

class WorkRepository {
  #works = [];

  constructor() {
    this.#haalWorkOp();
    console.log(this.#works);
  }

  #voegWorkToe(id, titel, genre, datum, tekst, iframe) {
    this.#works.push(new Work(id, titel, genre, datum, tekst, iframe));
  }

  geefWork(id) {
    return this.#works.find((w) => w.id === id);
  }

  #haalWorkOp() {
    window.works.forEach(([id, titel, genre, datum, tekst, iframe]) =>
      this.#voegWorkToe(id, titel, genre, datum, tekst, iframe)
    );
  }

  get allWork() {
    return this.#works;
  }
}

class workComponent {
  #workRepository;
  #currentOverlay;

  constructor() {
    this.#workRepository = new WorkRepository();
    this.#currentOverlay = null;
    this.#initialiseerHtml();
  }

  #initialiseerHtml() {
    this.#workToHtml(this.#workRepository.allWork);
  }

  #workToHtml(workArray) {
    workArray.forEach((w) => {
      const divElement = document.createElement("div");
      divElement.className = "grid-item";
      divElement.id = w.id;

      const imgElement = document.createElement("img");
      imgElement.src = `./sitecontent/work/${w.id}.png`;
      imgElement.alt = w.titel;

      const titel = document.createElement("div");
      titel.className = "title";
      titel.innerText = w.titel;

      divElement.appendChild(imgElement);
      divElement.appendChild(titel);

      divElement.onclick = (event) => {
        event.stopPropagation();
        this.#workDetails(w);
      };

      document.getElementById("grid-container").appendChild(divElement);
    });

    this.#setupOutsideClickHandler();
  }

  #workDetails(w) {
    const workSection = document.getElementById("work");

    if (this.#currentOverlay) {
      this.#currentOverlay.remove();
      this.#currentOverlay = null;
    }

    const overlay = document.createElement("div");
    overlay.id = "overlay";
    overlay.style.display = "block";

    const controlsContainer = document.createElement("div");
    controlsContainer.id = "overlay-controls-container";

    const closeIcon = document.createElement("img");
    closeIcon.src = "./images/svgs/cross.svg";
    closeIcon.className = "social-logos";
    closeIcon.id = "closing-cross";
    closeIcon.onclick = (event) => {
      event.stopPropagation();
      overlay.style.display = "none";
      this.#currentOverlay = null;
    };

    controlsContainer.appendChild(closeIcon);

    const titleContainer = document.createElement("div");
    titleContainer.id = "overlay-title-container";

    const titleSpan = document.createElement("span");
    titleSpan.id = "overlay-title-span";
    titleSpan.textContent = w.titel;

    const genreLine = document.createElement("h4");

    const genreVak = document.createElement("span");
    genreVak.id = "genre-vak";
    genreVak.textContent = w.genre;

    const separator = document.createTextNode(" - ");

    const jaarVak = document.createElement("span");
    jaarVak.id = "jaar-vak";
    jaarVak.textContent = w.datum;

    genreLine.appendChild(genreVak);
    genreLine.appendChild(separator);
    genreLine.appendChild(jaarVak);

    const tekstVak = document.createElement("span");
    tekstVak.id = "tekst-vak";
    tekstVak.textContent = w.tekst;

    const videoVak = document.createElement("div");
    videoVak.id = "video-vak";

    const iframe = document.createElement("iframe");
    iframe.src = w.iframe.replace("watch?v=", "embed/");
    iframe.title = "YouTube video player";
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "");
    iframe.setAttribute(
      "allow",
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    );
    iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");

    videoVak.appendChild(iframe);

    titleContainer.appendChild(titleSpan);
    titleContainer.appendChild(genreLine);
    titleContainer.appendChild(tekstVak);
    titleContainer.appendChild(videoVak);

    overlay.appendChild(controlsContainer);
    overlay.appendChild(titleContainer);

    workSection.appendChild(overlay);
    this.#currentOverlay = overlay;
  }

  #setupOutsideClickHandler() {
    document.addEventListener("click", (event) => {
      if (
        this.#currentOverlay &&
        this.#currentOverlay.style.display === "block" &&
        !this.#currentOverlay.contains(event.target)
      ) {
        this.#currentOverlay.style.display = "none";
        this.#currentOverlay = null;
      }
    });
  }
}

window.onload = () => {
  new workComponent();
};
