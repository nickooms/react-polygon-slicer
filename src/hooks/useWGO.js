import { useFetch } from './useFetch';

export const useWGO = () => {
  const { status, data, error } = useFetch('/geojson/WGO.json');

  return { status, data, error };
};
