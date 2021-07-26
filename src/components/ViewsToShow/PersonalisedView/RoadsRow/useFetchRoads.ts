import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';
// Types
import { TypeOrNull } from 'sharedTypes';
import { RoadsFavEntity } from 'sharedHelpers/cookies/types';
import { RoadsAPI, RoadsAPIReturn } from './types';

const { REACT_APP_API_HOST, REACT_APP_API_KEY } = process.env;

// Axios config
axios.defaults.baseURL = REACT_APP_API_HOST;
axios.defaults.headers = { 'Ocp-Apim-Subscription-Key': REACT_APP_API_KEY };

interface UseFetchReturn {
  response: TypeOrNull<{ filteredData: RoadsAPIReturn[] }>;
  isFetching: boolean;
  hasError: boolean;
}

const useFetchRoads = (favs: RoadsFavEntity[]): UseFetchReturn => {
  const [response, setResponse] = useState<TypeOrNull<{ filteredData: RoadsAPIReturn[] }>>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false); // Placeholder to set error messaging

  // Function used to fetch from/to train stations
  const fetchData = ({ lat, lon, radius, address }: RoadsFavEntity) => {
    const milesToMeters = (miles: number) => Math.round(miles * 1609.344) || miles;

    return axios
      .get<TypeOrNull<RoadsAPI>>(
        `/Disruption/v2/Count/road?${lat}&lon=${lon}&rad=${milesToMeters(radius || 1)}`
      )
      .then(resp => {
        const responseData = resp.data; // Will return array with two objects (from/to stations)

        const roadsObj: RoadsAPIReturn = {
          address: address || 'No location found',
          radius: radius || 0,
          lat: lat || 0,
          lon: lon || 0,
          amountOfDisruptions: responseData?.totals.road || 0,
          disruptionSeverity: responseData?.status.road || 'normal',
        };

        return roadsObj;
      })
      .catch(error => {
        throw new Error(error);
      });
  };

  // START HERE
  useEffect(() => {
    if (!favs) return;

    const resolvePromises = () => {
      // Create a promise that resolves when all train fetches have resolved
      const fetchFavs = favs.map(roadsFav => fetchData(roadsFav));
      Promise.all(fetchFavs)
        .then(data => {
          // Filter out any null or undefined
          const filteredData = data.filter(
            roadsDisruptions => roadsDisruptions !== undefined && roadsDisruptions !== null
          ); // marking as DataEntity array as we have filtered out undefined and null items;
          setResponse({ filteredData } as { filteredData: RoadsAPIReturn[] });
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

export default useFetchRoads;
