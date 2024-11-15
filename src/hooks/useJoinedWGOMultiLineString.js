import { useFetch } from './useFetch';

export const useJoinedWGOMultiLineString = () => {
  const { status, data, error } = useFetch(
    '/geojson/WGO-joined-MultiLineString.geojson'
  );

  return { status, data, error };
};
