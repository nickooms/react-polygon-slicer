import { POINT } from './Types';

export class Point {
  static isEqual = (point1) => (point2) => {
    const [x1, y1] = point1.coordinates;
    const [x2, y2] = point2.coordinates;
    return Math.abs(x1 - x2) < EPSILON && Math.abs(y1 - y2) < EPSILON;
  };

  #type = POINT;
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
}
