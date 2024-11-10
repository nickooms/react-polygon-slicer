import { useFetch } from './useFetch';

export const useWBN = () => {
  const { status, data, error } = useFetch('/geojson/WBN.json');

  return { status, data, error };
};
