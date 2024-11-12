import { LINE_STRING } from './Types';

export const getStartPoint = (coordinates) => coordinates[0];

export const getEndPoint = (coordinates) => coordinates.at(-1);

export class LineString {
  static getEndPoints = (coordinates) => [coordinates[0], coordinates.at(-1)];

  #type = LINE_STRING;
  #coordinates = [];

  constructor(coordinates) {
    this.#coordinates = coordinates;
  }

  get type() {
    return this.#type;
  }

  get coordinates() {
    return this.#coordinates;
  }

  get start() {
    return this.#coordinates[0];
  }

  get end() {
    return this.#coordinates.at(-1);
  }

  get endPoints() {
    return [this.#coordinates[0], this.#coordinates.at(-1)];
  }

  toJSON = () => ({
    type: this.type,
    coordinates: this.coordinates,
  });
}
