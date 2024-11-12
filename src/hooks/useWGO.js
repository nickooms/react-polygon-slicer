import { useFetch } from './useFetch';

export const useWGO = () => {
  const { status, data, error } = useFetch('/geojson/WGO.geojson');

  return { status, data, error };
};
