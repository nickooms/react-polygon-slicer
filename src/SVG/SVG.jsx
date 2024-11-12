// import { featureCollection } from '@turf/turf';
import { getBBox } from '../hooks/useBBox';
import { Polygon } from './Polygon';
import { Polyline } from './Polyline';
import { MultiPolygon } from './MultiPolygon';

const property = ([name, value]) => [`data-${name.toLowerCase()}`, value];

const dataProperties = (properties) =>
  Object.fromEntries(Object.entries(properties).map(property));

const GeoJSON = ({ geojson, ...props }) => {
  if (Array.isArray(geojson)) {
    return (
      <>
        {geojson.map((object, index) => (
          <GeoJSON
            key={`${object.type}-${index}`}
            geojson={object}
            {...props}
          />
        ))}
      </>
    );
  }

  if (geojson.type === 'FeatureCollection') {
    return <FeatureCollection geojson={geojson} {...props} />;
  }

  if (geojson.type === 'Feature') {
    return <Feature feature={geojson} {...props} />;
  }
  // console.log(geojson);
};

const Feature = ({ feature, ...props }) => {
  const { geometry, properties } = feature;
  const { type, coordinates } = geometry;
  switch (type) {
    case 'LineString':
      return (
        <Polyline
          points={coordinates}
          {...dataProperties(properties)}
          {...props}
        />
      );

    case 'Polygon':
      return (
        <Polygon
          points={coordinates[0]}
          {...dataProperties(properties)}
          {...props}
        />
      );

    case 'MultiPolygon':
      return (
        <MultiPolygon
          points={coordinates}
          {...dataProperties(properties)}
          {...props}
        />
      );
  }
};

const FeatureCollection = ({ geojson, ...props }) => (
  <g {...props}>
    {geojson.features.map((feature) => (
      <Feature key={feature.id} feature={feature} />
    ))}
  </g>
);

export const SVG = ({ geojson, ...props } = {}) => {
  const { width, height, min } = getBBox(geojson);

  return (
    <svg
      width={width}
      height={height}
      viewBox={[...min, width, height]}
      {...props}
    >
      <GeoJSON geojson={geojson} />
      {/* {Array.isArray(geojson) && (
        <>
          {geojson.map((featureCollection, index) => (
            <FeatureCollection
              key={`feature-collection-${index}`}
              geojson={featureCollection}
            />
          ))}
        </>
      )}
      {geojson.type === 'FeatureCollection' && (
        <FeatureCollection geojson={geojson} />
      )} */}
    </svg>
  );
};
