export class BBox {
  #minX = Infinity;
  #minY = Infinity;
  #maxX = -Infinity;
  #maxY = -Infinity;

  static fromFeatureCollection = (featureCollection) => {
    const bbox = new BBox();
    const { features } = featureCollection;
    features.forEach((feature) => {
      const { geometry } = feature;
      const { type, coordinates } = geometry;

      switch (type) {
        case 'LineString':
          bbox.add(...coordinates);
          break;

        case 'Polygon':
          bbox.add(...coordinates[0]);
          break;
      }
    });
    return bbox;
  };

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
    points.forEach(([x, y]) => {
      this.x = x;
      this.y = y;
    });
  };
}
