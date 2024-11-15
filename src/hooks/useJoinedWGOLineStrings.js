import { useFetch } from './useFetch';

export const useJoinedWGOLineStrings = () => {
  const { status, data, error } = useFetch(
    '/geojson/WGO-joined-LineStrings.geojson'
  );

  return { status, data, error };
};
