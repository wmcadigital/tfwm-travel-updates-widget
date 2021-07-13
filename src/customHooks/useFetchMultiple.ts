import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';
import { TypeOrNull } from 'sharedTypes';
import {
  DataEntity,
  TrainStationAPI,
} from 'components/ViewsToShow/PersonalisedView/TrainRow/TrainFav/types';
import { TrainEntity } from 'helpers/cookies/types';

axios.defaults.baseURL = 'https://wmca-api-portal-staging.azure-api.net';
axios.defaults.headers = { 'Ocp-Apim-Subscription-Key': '0d4cca4a2c5d40c3bfbbfe45d1bbf294' };

interface UseFetchReturn {
  response: TypeOrNull<DataEntity[]>;
  isFetching: boolean;
  hasError: boolean;
}

const useFetch = (favs: TrainEntity[]): UseFetchReturn => {
  const [response, setResponse] = useState<TypeOrNull<DataEntity[]>>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false); // Placeholder to set error messaging

  // Function used to fetch from/to train stations
  const fetchData = ({ from, to, line }: TrainEntity) =>
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
        // eslint-disable-next-line no-console
        console.error({ error });
        setHasError(true);
      });

  // START HERE
  useEffect(() => {
    if (!favs) return;

    // Create a promise that resolves when all train fetches have resolved
    Promise.all(favs.map(item => fetchData(item)))
      .then(data => {
        // Filter out any null or undefined
        const filterData = data.filter(
          trainStation => trainStation !== undefined && trainStation !== null
        ) as DataEntity[]; // marking as DataEntity array as we have filtered out undefined and null items;
        setResponse(filterData);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error({ error });
        setHasError(true);
      })
      .finally(() => setIsFetching(false));
  }, [favs]);

  return { response, isFetching, hasError };
};

export default useFetch;