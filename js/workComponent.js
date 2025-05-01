import workRepository from "./workRepository.js";

export default class workComponent {
  #productenRepository;
  constructor() {
    this.#workRepository = new workRepository();
    this.#initialiseerHtml();
  }

  // deze methode intialiseert de pagina
  #initialiseerHtml() {
    this.#productenToHtml(this.#productenRepository.producten);
    this.#categorieenToHtml(this.#productenRepository.geefAlleCategorieen());

    document.getElementById("categorie").onchange = () => {
      const geselecteerdeCategorie = document.getElementById("categorie").value;
      const productenUitCategorie =
        this.#productenRepository.geefProductenUitCategorie(
          geselecteerdeCategorie
        );
      this.#productenToHtml(productenUitCategorie);
      document.getElementById("productDetails").classList.add("verbergen");
    };

    // voeg een event handler toe aan de keuzelijst categorie
  }

  // voegt de gegeven categorieën toe aan de selectlist #categorie
  #categorieenToHtml(categorieen) {
    categorieen.forEach((c) => {
      document
        .getElementById("categorie")
        .insertAdjacentHTML("beforeend", `<option value="${c}">${c}</option>`);
    });
  }

  // toont het aantal producten in div#aantalProducten
  // en de producten in div#overzichtProducten
  #productenToHtml(producten) {
    document.getElementById("aantalProducten").innerHTML = `
      <h4>Aantal Producten: ${producten.length}</h4>`;

    document.getElementById("overzichtProducten").innerHTML = ` `;

    producten.forEach((p) => {
      const divElement = document.createElement("div");
      divElement.id = p.id;
      const imgElement = document.createElement("img");
      imgElement.src = `./images/${p.id}/thumbs/thumb_${p.afbeeldingen[0]}.jpg`;
      imgElement.alt = p.titel;
      divElement.appendChild(imgElement);
      const pElement = document.createElement("p");
      pElement.innerText = p.titel;
      divElement.appendChild(pElement);
      divElement.onclick = () => {
        this.#zetProductVetjes(divElement);
        this.#productDetailsToHtml(p);
      };
      document.getElementById("overzichtProducten").appendChild(divElement);
    });

    //oplossing 2
    /* producten.forEach((p) => {
      document.getElementById("overzichtProducten").insertAdjacentHTML(
        "beforeend",
        `<div id="${p.id}">
          <img src="./images/${p.id}/thumbs/thumb_${p.afbeeldingen[0]}.jpg" alt="${p.titel}" />
          <p>${p.titel}</p>
        </div>`
      );
    }); */
  }

  // zet in het productoverzicht, het gekozen product vetjes
  #zetProductVetjes(divElement) {
    document
      .querySelector("#overzichtProducten .tekstVet")
      ?.classList.remove("tekstVet");
    divElement.classList.add("tekstVet");
  }

  // toont de details van het gegeven product in de div #productDetails
  #productDetailsToHtml(product) {
    // maak het element #productDetails zichtbaar en leeg
    const divProductDetails = document.getElementById("productDetails");
    divProductDetails.classList.remove("verbergen");
    divProductDetails.innerHTML = "";

    // creëer de 'descendants' voor div#productDetails en voeg ze toe

    const h2Element = document.createElement("h2");
    h2Element.textContent = product.titel;

    const pElement = document.createElement("p");
    pElement.textContent = product.omschrijving;

    const h4Element = document.createElement("h4");
    h4Element.textContent = "Prijs: €" + product.prijs;

    const divElement = document.createElement("div");
    divElement.id = "afbeeldingen";

    // voeg de grote afbeelding toe aan divElement
    const imgGroteAfbeelding = document.createElement("img");
    imgGroteAfbeelding.id = "groteAfbeelding";
    imgGroteAfbeelding.src = `images/${product.id}/${product.afbeeldingen[0]}.jpg`;
    imgGroteAfbeelding.alt = product.titel;
    divElement.appendChild(imgGroteAfbeelding);

    // voeg de 'thumbnails' toe aan het divElement
    const asideElement = document.createElement("aside");
    asideElement.id = "thumbnails";
    product.afbeeldingen.forEach((afbeelding) => {
      const imgElement = document.createElement("img");
      imgElement.src = `images/${product.id}/thumbs/thumb_${afbeelding}.jpg`;
      imgElement.onclick = () => {
        // wijzig de grote afbeelding als er geklikt
        // wordt op één van de 'thumbnails'
        document.getElementById(
          "groteAfbeelding"
        ).src = `images/${product.id}/${afbeelding}.jpg`;
      };
      asideElement.appendChild(imgElement);
    });
    divElement.appendChild(asideElement);

    divProductDetails.appendChild(h2Element);
    divProductDetails.appendChild(pElement);
    divProductDetails.appendChild(h4Element);
    divProductDetails.appendChild(divElement);
  }
}
