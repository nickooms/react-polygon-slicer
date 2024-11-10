import { SVG } from './SVG/index';
// import { useFetch } from './hooks/useFetch';
import { useWGO } from './hooks/useWGO';
import { useWBN } from './hooks/useWBN';
import { /* Feature, */ FeatureCollection } from './GeoJSON/FeatureCollection';
import './App.css';

function App() {
  const wgo = useWGO();
  const wbn = useWBN();

  if ([wgo.status, wbn.status].includes('loading'))
    return <div>Loading...</div>;

  if ([wgo.error, wbn.error].includes('error')) return <div>Error</div>;

  /* const coordinatesWithFeatureId =
    FeatureCollection.getAllCoordinatesWithFeatureId(data);

  const index = new Map();
  coordinatesWithFeatureId.forEach((coordinateWithFeatureId, i) => {
    const [id, coordinate] = coordinateWithFeatureId;
    const key = coordinate.map((value) => value).join(', ');
    if (index.has(key)) {
      const item = index.get(key);
      const { ids } = item;
      if (!ids.includes(id)) {
        index.set(key, {
          ...item,
          ids: [...item.ids, id],
        });
      }
    } else {
      index.set(key, { key, coordinate, ids: [id] });
    }
  });

  console.log(index);

  const coordinates = Array.from(index.values).filter(
    ({ featureIds }) => featureIds.length > 1
  );

  console.log(coordinates); */

  // console.log(index);

  /* return (
    <div>
      <h1>WGO</h1>
      <h2>{coordinates.length} Coordinates</h2>
      <ul>
        {coordinates.map((coordinate, index) => (
          <li key={index}>{coordinate.join(', ')}</li>
        ))}
      </ul>
    </div>
  ); */
  return <SVG geojson={[wbn.data, wgo.data]} />;
}
// function App() {
//   const wbn = useFetch('/geojson/WBN.json');
//   const wgo = useFetch('/geojson/WGO.json');
//   const status = [wbn.status, wgo.status];

//   if (status.includes('loading')) return <div>Loading...</div>;
//   if (status.includes('error')) return <div>Error</div>;
//   if (status.includes('ok')) return <SVG geojson={[wbn.data, wgo.data]} />;
// }

export default App;
