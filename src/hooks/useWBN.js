import { useFetch } from './useFetch';

export const useWBN = () => {
  const { status, data, error } = useFetch('/geojson/WBN.geojson');

  return { status, data, error };
};
