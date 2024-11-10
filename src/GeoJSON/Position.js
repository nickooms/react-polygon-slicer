import { EPSILON } from '.';

export class Position {
  static isEqual = (a, b) =>
    Math.abs(a.longitude - b.longitude) < EPSILON &&
    Math.abs(a.latitude - b.latitude) < EPSILON;

  constructor([longitude, latitude]) {
    this.longitude = longitude;
    this.latitude = latitude;
  }
}
