import work from "./work.js";
import { projecten } from "./workComponent.js";

export default class workRepository {
  #projecten = [];

  constructor() {
    this.#haalProjectenOp();
    console.log(this.#projecten);
  }

  get projecten() {
    return this.#projecten;
  }

  // Voegt een product achteraan toe aan de array #producten
  #voegProjectToe(
    id,
    eigenaar,
    postcode,
    gemeente,
    titel,
    omschrijving,
    prijs,
    categorie,
    afbeeldingen
  ) {
    this.#projecten.push(
      new work(
        id,
        eigenaar,
        postcode,
        gemeente,
        titel,
        omschrijving,
        prijs,
        categorie,
        afbeeldingen
      )
    );
  }

  // Retourneert het product met opgegeven id
  geefProject(id) {
    return this.#projecten.find((p) => p.id === id);
  }

  // Vult de repository met producten
  #haalProjectenOp() {
    projecten.forEach(([id, titel, genre, afbeeldingen, link, id]) =>
      this.#voegProjectToe(id, titel, genre, afbeeldingen, link, id)
    );
  }
}
