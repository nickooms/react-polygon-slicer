// import { featureCollection } from '@turf/turf';
import { getCoordinates } from '../GeoJSON/GeoJSON';
import { BBox } from './BBox';

const pretty = (json) => JSON.stringify(json, null, 2);

export const getBBox = (geojson) => {
  return BBox.from(geojson);
};
