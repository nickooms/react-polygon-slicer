import {
  FEATURE_COLLECTION,
  POINT,
  LINE_STRING,
  MULTI_LINE_STRING,
  POLYGON,
  MULTI_POLYGON,
  FEATURE,
} from './Types.js';

export const getCoordinates = (geojson) => {
  if (Array.isArray(geojson)) {
    return geojson.flatMap(getCoordinates);
  }

  const { type } = geojson;
  if (type === FEATURE_COLLECTION) {
    return geojson.features.flatMap(getCoordinates);
  }

  const { coordinates } = geojson.geometry;
  return {
    [POINT]: () => [coordinates],
    [LINE_STRING]: () => coordinates,
    [MULTI_LINE_STRING]: () => coordinates.flat(),
    [POLYGON]: () => coordinates[0],
    [MULTI_POLYGON]: () => coordinates.flat(),
  }[geojson.geometry.type]();
};

export const featureCollection = (features) => ({
  type: FEATURE_COLLECTION,
  features,
});

export const feature = (id, geometry, properties = {}) => ({
  type: FEATURE,
  id,
  geometry,
  properties,
});

export const point = (coordinates) => ({ type: POINT, coordinates });

export const lineString = (coordinates) => ({ type: LINE_STRING, coordinates });

export const multiLineString = (coordinates) => ({
  type: MULTI_LINE_STRING,
  coordinates,
});

export const polygon = (coordinates) => ({ type: POLYGON, coordinates });

export const multiPolygon = (coordinates) => ({
  type: MULTI_POLYGON,
  coordinates,
});
