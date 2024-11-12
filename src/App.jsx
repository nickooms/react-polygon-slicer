import polygonsplitter from 'polygon-splitter';
import { SVG } from './SVG/index';
import { useJoinedWGO } from './hooks/useJoinedWGO';
import { useWBN } from './hooks/useWBN';
import * as GeoJSON from './GeoJSON/GeoJSON';
import './App.css';

function App() {
  const wgo = useJoinedWGO();
  const wbn = useWBN();

  if ([wgo.status, wbn.status].includes('loading'))
    return <div>Loading...</div>;

  if ([wgo.error, wbn.error].includes('error')) return <div>Error</div>;

  /* const multiLineString = GeoJSON.featureCollection([
    GeoJSON.feature(
      'WGO',
      GeoJSON.multiLineString(
        wgo.data.features.map((feature) => feature.geometry.coordinates)
      )
    ),
  ]); */

  const multiPolygon = polygonsplitter(
    wbn.data.features[0],
    wgo.data.features[0]
    // multiLineString.features[0]
  );
  // console.log(multiPolygon);

  // multiPolygon.id = 'WGO-MultiPolygon';

  return (
    <SVG
      geojson={[
        // wbn.data,
        wgo.data,
        GeoJSON.featureCollection(
          multiPolygon.geometry.coordinates.map((coordinates, index) =>
            GeoJSON.feature(
              `WGO-MultiPolygon.${index}`,
              GeoJSON.polygon(coordinates),
              {
                lbltype: 'kruispuntzone',
              }
            )
          )
        ),
      ]}
    />
  );
}

export default App;
