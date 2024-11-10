import { useEffect, useState } from 'react';

const INITIAL_STATE = { status: 'loading', data: null, error: null };

export const useFetch = (url) => {
  const [state, setState] = useState(INITIAL_STATE);

  const update = (values) => setState({ ...state, ...values });

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => update({ status: 'ok', data }))
      .catch((error) => update({ status: 'error', error }));
  }, [url]);

  return state;
};
