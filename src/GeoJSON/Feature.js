export class Feature {
  static getAllCoordinates = (feature) => {
    // console.log(feature);
    const {
      geometry: { type, coordinates },
    } = feature;

    switch (type) {
      case 'Point':
        return coordinates;
      case 'LineString':
        return coordinates;
      case 'Polygon':
        return coordinates[0];
      default:
        return [];
    }
  };

  constructor(geometry, properties) {
    this.type = 'Feature';
    this.geometry = geometry;
    this.properties = properties;
  }

  getCoordinates() {
    return this.geometry.coordinates;
  }
}
