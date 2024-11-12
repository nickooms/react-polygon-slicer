export const getById = (id) => (feature) => feature.id === id;

// export const getCoordinates = (feature) => feature.geometry.coordinates;

export class Feature {
  static getAllCoordinates = (feature) => {
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
