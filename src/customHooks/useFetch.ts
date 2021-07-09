import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';
import { TypeOrNull } from 'sharedTypes';

axios.defaults.baseURL = 'https://wmca-api-portal-staging.azure-api.net';
axios.defaults.headers = { 'Ocp-Apim-Subscription-Key': '0d4cca4a2c5d40c3bfbbfe45d1bbf294' };

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
