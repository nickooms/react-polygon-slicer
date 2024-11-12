import { useFetch } from './useFetch';

export const useJoinedWGO = () => {
  const { status, data, error } = useFetch('/geojson/WGO-joined.geojson');

  return { status, data, error };
};
