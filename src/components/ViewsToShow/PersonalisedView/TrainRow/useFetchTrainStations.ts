import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';
// Types
import { TypeOrNull } from 'sharedTypes';
import { TrainFavEntity } from 'sharedHelpers/cookies/types';
import { TrainStationAPIData, TrainStationAPI } from './types';

// Axios config
const { REACT_APP_API_HOST, REACT_APP_API_KEY } = process.env;

axios.defaults.baseURL = REACT_APP_API_HOST;
axios.defaults.headers = { 'Ocp-Apim-Subscription-Key': REACT_APP_API_KEY };

interface UseFetchReturn {
  response: TypeOrNull<{ filteredData: TrainStationAPIData[] }>;
  isFetching: boolean;
  hasError: boolean;
}

const useFetchTrainStations = (favs: TrainFavEntity[]): UseFetchReturn => {
  const [response, setResponse] =
    useState<TypeOrNull<{ filteredData: TrainStationAPIData[] }>>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false); // Placeholder to set error messaging

  // Function used to fetch from/to train stations
  const fetchData = ({ from, to, line }: TrainFavEntity) =>
    axios
      .get<TypeOrNull<TrainStationAPI>>(`/rail/v2/Station/${from},${to}`)
      .then(resp => {
        const responseData = resp.data?.data; // Will return array with two objects (from/to stations)
        let trainObj = responseData && responseData[0]; // Start off with first object/station in array

        // If from is not same as to object/station, then check data of second station to see if it has disruptions, if so use that one as our trainObj
        if (from !== to && trainObj && responseData) {
          if (!trainObj.hasDisruptions) [, trainObj] = responseData;
        }

        if (trainObj) trainObj.lineId = line; // Finally, add our fav (from cookies) line as lineId so we can remove the right cookie and obj at same time

        return trainObj || null;
      })
      .catch(error => {
        throw new Error(error);
      });

  // START HERE
  useEffect(() => {
    if (!favs) return;

    const resolvePromises = () => {
      // Create a promise that resolves when all train fetches have resolved
      const fetchFavs = favs.map(trainFav => fetchData(trainFav));
      Promise.all(fetchFavs)
        .then(data => {
          // Filter out any null or undefined
          const filteredData = data.filter(
            trainStation => trainStation !== undefined && trainStation !== null
          ); // marking as DataEntity array as we have filtered out undefined and null items;
          setResponse({ filteredData } as unknown as { filteredData: TrainStationAPIData[] });
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error({ error });
          setHasError(true);
        })
        .finally(() => setIsFetching(false));
    };

    resolvePromises();
  }, [favs]);

  return { response, isFetching, hasError };
};

export default useFetchTrainStations;
