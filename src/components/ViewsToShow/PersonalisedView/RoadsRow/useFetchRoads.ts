import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';
// Types
import { TypeOrNull } from 'sharedTypes';
import { RoadsEntity } from 'sharedHelpers/cookies/types';
import { RoadsAPI, RoadsAPIReturn } from './types';

// Axios config
axios.defaults.baseURL = 'https://wmca-api-portal-staging.azure-api.net';
axios.defaults.headers = { 'Ocp-Apim-Subscription-Key': '0d4cca4a2c5d40c3bfbbfe45d1bbf294' };

interface UseFetchReturn {
  response: TypeOrNull<{ filteredData: RoadsAPIReturn[] }>;
  isFetching: boolean;
  hasError: boolean;
}

const useFetchRoads = (favs: RoadsEntity[]): UseFetchReturn => {
  const [response, setResponse] = useState<TypeOrNull<{ filteredData: RoadsAPIReturn[] }>>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false); // Placeholder to set error messaging

  // Function used to fetch from/to train stations
  const fetchData = ({ lat, lon, radius, address }: RoadsEntity) =>
    axios
      .get<TypeOrNull<RoadsAPI>>(`/Disruption/v2/road?lat=${lat}&lon=${lon}&rad=${radius}`)
      .then(resp => {
        const responseData = resp.data; // Will return array with two objects (from/to stations)
        // let trainObj = responseData && responseData[0]; // Start off with first object/station in array

        let roadsObj: RoadsAPIReturn = {
          address: address || 'No location found',
          radius: radius || 0,
          lat: lat || 0,
          lon: lon || 0,
          amountOfDisruptions: 0,
          disruptionSeverity: 'normal',
        };
        if (responseData?.disruptions?.length)
          roadsObj = {
            ...roadsObj,
            amountOfDisruptions: responseData?.disruptions?.length,
            disruptionSeverity: responseData?.disruptions[0].disruptionSeverity || 'normal',
          };

        return roadsObj;
      })
      .catch(error => {
        throw new Error(error);
      });

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
