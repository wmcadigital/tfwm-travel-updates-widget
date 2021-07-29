import { useContext, useEffect, useState } from 'preact/hooks';
// Components
import DisruptionRowContainer from 'components/shared/DisruptionRowContainer/DisruptionRowContainer';
// State
import { GlobalContext } from 'globalState/GlobalStateContext';
// Types
import { DisruptionIndicatorTypes } from 'sharedTypes';
import { RoadsRowProps } from './types';
// Custom hooks
import useFetchRoads from './useFetchRoads';

const RoadsRow = ({ favs }: RoadsRowProps): JSX.Element => {
  const [, dispatch] = useContext(GlobalContext);
  const [copiedFavs] = useState(favs); // Map favs to react state, if we pass it directly to useFetchRoads hook, it will cause unnecessary re-renders of the parent component, which then re-renders this component causing a loop
  const { response, isFetching, hasError } = useFetchRoads(copiedFavs);

  useEffect(() => {
    if (response && response.filteredData) {
      const data = response?.filteredData.map(
        ({ disruptionSeverity, address, radius, lat, lon }): DisruptionIndicatorTypes => ({
          id: address + radius, // Set id to address and radius as that will be unique and the API/fav cookies has an id
          disruptionSeverity,
          disruptionUrlSearchParams: `?mode=roads&query=${address}&address=${address}&lat=${lat}&long=${lon}&radius=${radius}`,
          indicatorText: address.split(',')[0], // Splitting address at comma and getting first item as address names can be really long
          optionalText: `${radius} miles`,
          formatDisruptionIndicatorText: true,
          modalIcon: 'roads',
          mode: 'roads',
        })
      );

      dispatch({
        type: 'UPDATE_SERVICES',
        payload: {
          mode: 'roads',
          data,
        },
      });
    }
  }, [dispatch, response]);

  return (
    <DisruptionRowContainer
      mode="roads"
      isFetching={isFetching}
      hasError={hasError || !response?.filteredData}
    />
  );
};

export default RoadsRow;
