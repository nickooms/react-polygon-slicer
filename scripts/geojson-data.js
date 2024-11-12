import fs from 'fs/promises';
import { getStart, getEnd } from '../src/GeoJSON/Feature/LineString.js';
import { feature, lineString } from '../src/GeoJSON/GeoJSON.js';

const PATH = 'public/geojson';
const ENCODING = 'utf-8';

const readFile = async (filename) =>
  JSON.parse(await fs.readFile(`${PATH}/${filename}`, ENCODING));

const writeFile = async (filename, data) =>
  fs.writeFile(`${PATH}/${filename}`, JSON.stringify(data, null, 2), ENCODING);

const pointsAreEqual = ([x1, y1], [x2, y2]) => x1 === x2 && y1 === y2;

const lineHasStartPoint = (startPoint) => (line) =>
  pointsAreEqual(startPoint, getStart(line));

const lineHasEndPoint = (endPoint) => (line) =>
  pointsAreEqual(endPoint, getEnd(line));

const main = async () => {
  const wgo = await readFile('WGO.geojson');

  const { features } = wgo;

  const lines = features
    .filter((line) => !features.find(lineHasEndPoint(getStart(line))))
    .map((line) => {
      const ids = [line.id];
      const coordinates = line.geometry.coordinates;
      let end = getEnd(line);
      while (end) {
        const nextLine = features.find(lineHasStartPoint(end));
        if (nextLine) {
          end = getEnd(nextLine);
          ids.push(nextLine.id);
          coordinates.push(...nextLine.geometry.coordinates.slice(1));
        } else {
          break;
        }
      }
      const id = ids.map((id) => id.replace('WGO.', '')).join('-');
      return feature(`WGO.${id}`, lineString(coordinates), {
        lbltype: 'grens zone zwakke weggebruiker (wcz)',
      });
    });

  console.log(lines);

  await writeFile('WGO-joined.geojson', {
    type: 'FeatureCollection',
    features: lines,
  });
};

main();
