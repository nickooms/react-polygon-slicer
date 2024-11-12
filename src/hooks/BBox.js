import { getCoordinates } from '../GeoJSON/GeoJSON';

export class BBox {
  #minX = Infinity;
  #minY = Infinity;
  #maxX = -Infinity;
  #maxY = -Infinity;

  static from = (geojson) => {
    const coordinates = getCoordinates(geojson);
    // console.log('coordinates', coordinates);
    const bbox = new BBox(...coordinates);
    // console.log('bbox', bbox);
    /* bbox.add(...coordinates);
    console.log('bbox', bbox); */
    return bbox;
  };

  /* static #add = (bbox, geojson) => {
    bbox.add(...getCoordinates(geojson));
  };

  static fromFeatureCollection = (featureCollection) => {
    const bbox = new BBox();
    const { features } = featureCollection;
    features.forEach((feature) => BBox.#addFeature(bbox, feature));
    return bbox;
  };

  static fromFeature = (feature) => {
    const bbox = new BBox();
    BBox.#add(bbox, feature);
    return bbox;
  }; */

  constructor(...points) {
    this.add(...points);
  }

  get min() {
    return [this.#minX, this.#minY];
  }

  set min([x, y]) {
    this.minX = x;
    this.minY = y;
  }

  set max([x, y]) {
    this.maxX = x;
    this.maxY = y;
  }

  get max() {
    return [this.#maxX, this.#maxY];
  }

  set minX(x) {
    this.#minX = Math.min(x, this.#minX);
  }

  set minY(y) {
    this.#minY = Math.min(y, this.#minY);
  }

  set maxX(x) {
    this.#maxX = Math.max(x, this.#maxX);
  }

  set maxY(y) {
    this.#maxY = Math.max(y, this.#maxY);
  }

  set x(x) {
    this.minX = x;
    this.maxX = x;
  }

  set y(y) {
    this.minY = y;
    this.maxY = y;
  }

  get width() {
    return this.#maxX - this.#minX;
  }

  get height() {
    return this.#maxY - this.#minY;
  }

  add = (...points) => {
    // console.log('adding points', points.length);
    points.forEach(([x, y]) => {
      // console.log('adding point', x, y);
      this.#minX = Math.min(x, this.#minX);
      this.#minY = Math.min(y, this.#minY);
      this.#maxX = Math.max(x, this.#maxX);
      this.#maxY = Math.max(y, this.#maxY);
    });
  };
}
