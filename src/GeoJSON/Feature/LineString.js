import { equals } from '../Coordinate.js';

export const getCoordinates = (feature) => feature.geometry.coordinates;

export const getStart = (feature) => getCoordinates(feature)[0];

export const getEnd = (feature) => getCoordinates(feature).at(-1);

export const getEndPoints = (feature) => [getStart(feature), getEnd(feature)];

export const byStart = (start) => (feature) => equals(getStart(feature), start);

export const byEnd = (end) => (feature) => equals(getEnd(feature), end);
