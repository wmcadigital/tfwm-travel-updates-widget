import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';
// Types
import { TypeOrNull } from 'sharedTypes';

// Axios config
const { REACT_APP_API_HOST, REACT_APP_API_KEY } = process.env;

axios.defaults.baseURL = REACT_APP_API_HOST;
axios.defaults.headers = { 'Ocp-Apim-Subscription-Key': REACT_APP_API_KEY };

interface UseFetchReturn<ExpectedResponse> {
  response: TypeOrNull<ExpectedResponse>;
  isFetching: boolean;
  hasError: boolean;
}

const useFetch = <ExpectedResponse>(url: string): UseFetchReturn<ExpectedResponse> => {
  const [response, setResponse] = useState<TypeOrNull<ExpectedResponse>>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false); // Placeholder to set error messaging

  useEffect(() => {
    if (!url) return;

    const fetchData = () => {
      axios
        .get<TypeOrNull<ExpectedResponse>>(url)
        .then(resp => setResponse(resp.data))
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error({ error });
          setHasError(true);
        })
        .finally(() => setIsFetching(false));
    };

    fetchData();
  }, [url]);

  return { response, isFetching, hasError };
};

export default useFetch;
