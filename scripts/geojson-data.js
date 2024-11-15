import fs from 'fs/promises';
import polygonsplitter from 'polygon-splitter';
import { getStart, getEnd } from '../src/GeoJSON/Feature/LineString.js';
import { feature, featureCollection, polygon, lineString } from '../src/GeoJSON/GeoJSON.js';
import { BBox } from '../src/hooks/BBox.js';

const PATH = 'public/geojson';
const ENCODING = 'utf-8';

const WGO_SIDEWALK_LBLTYPE = 'grens zone zwakke weggebruiker (wcz)';
const WGO_PROPS = { lbltype: WGO_SIDEWALK_LBLTYPE };

const readGeoJsonFile = async (filename) =>
  JSON.parse(await fs.readFile(`${PATH}/${filename}`, ENCODING));

const writeGeoJsonFile = async (filename, data) =>
  fs.writeFile(`${PATH}/${filename}`, JSON.stringify(data, null, 2), ENCODING);

const pointsAreEqual = ([x1, y1], [x2, y2]) => x1 === x2 && y1 === y2;

const lineHasStartPoint = (startPoint) => (line) => pointsAreEqual(startPoint, getStart(line));

const lineHasEndPoint = (endPoint) => (line) => pointsAreEqual(endPoint, getEnd(line));

const main = async () => {
  const wgo = await readGeoJsonFile('WGO.geojson');
  const wbn = await readGeoJsonFile('WBN.geojson');

  const joinedLineStrings = wgo.features
    .filter((line) => !wgo.features.find(lineHasEndPoint(getStart(line))))
    .map((line) => {
      const ids = [line.id];
      const coordinates = line.geometry.coordinates;
      let end = getEnd(line);
      while (end) {
        const nextLine = wgo.features.find(lineHasStartPoint(end));
        if (nextLine) {
          end = getEnd(nextLine);
          ids.push(nextLine.id);
          coordinates.push(...nextLine.geometry.coordinates.slice(1));
        } else {
          break;
        }
      }
      const id = ids.map((id) => id.replace('WGO.', '')).join('-');
      return feature(`WGO.${id}`, lineString(coordinates), WGO_PROPS);
    });

  const wgoJoinedLineStrings = featureCollection(joinedLineStrings);
  await writeGeoJsonFile('WGO-joined-LineStrings.geojson', wgoJoinedLineStrings);

  const wgoSplit = featureCollection(
    polygonsplitter(wbn.features[0], wgoJoinedLineStrings.features[0])
      .geometry.coordinates.filter(
        (coordinates) => BBox.from(feature('', polygon(coordinates))).width > 0
      )
      .map((coordinates, index) =>
        feature(`WGO-split.${index}`, polygon(coordinates), { lbltype: 'kruispuntzone' })
      )
  );
  await writeGeoJsonFile('WGO-split.geojson', wgoSplit);
};

main();
