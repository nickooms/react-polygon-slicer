import { Feature } from './Feature';

export class FeatureCollection {
  static getAllCoordinates = ({ features }) =>
    features.flatMap((feature) => Feature.getAllCoordinates(feature));

  static getAllCoordinatesWithFeatureId = ({ features }) =>
    features.flatMap((feature) =>
      Feature.getAllCoordinates(feature).map((coordinate) => [
        feature.id,
        coordinate,
      ])
    );

  constructor(features) {
    this.type = 'FeatureCollection';
    this.features = features;
  }

  getCoordinates() {
    return this.features.map((feature) => feature.geometry.coordinates);
  }
}
