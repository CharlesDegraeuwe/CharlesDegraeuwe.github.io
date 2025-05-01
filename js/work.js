export default class Product {
  #id;
  #titel;
  #genre;
  #afbeeldingen;
  #link;

  constructor(id, titel, genre, afbeeldingen) {
    this.#id = id;
    this.#titel = titel;
    this.#genre = genre;
    this.#afbeeldingen = afbeeldingen;
    this.#link = link;
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
  get afbeeldingen() {
    return this.#afbeeldingen;
  }
  get link() {
    return this.#link;
  }
}
