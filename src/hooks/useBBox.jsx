import { featureCollection } from '@turf/turf';
import { BBox } from './BBox';

const pretty = (json) => JSON.stringify(json, null, 2);

export const getBBox = (geojson) => {
  if (Array.isArray(geojson)) {
    return geojson
      .map((featureCollection) => getBBox(featureCollection))
      .reduce((result, bbox) => {
        result.min = bbox.min;
        result.max = bbox.max;
        return result;
      }, new BBox());
  }
  if (geojson.bbox) {
    return geojson.bbox;
  }

  switch (geojson.type) {
    case 'FeatureCollection':
      return BBox.fromFeatureCollection(geojson);

    case 'Feature':
      return BBox.fromFeature(geojson);

    default:
      throw new Error(`GeoJSON Object ${pretty(geojson)} not recognized.`);
  }
};
