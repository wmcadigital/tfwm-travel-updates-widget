import { useContext, useEffect, useState } from 'preact/hooks';
// Components
import DisruptionRowContainer from 'components/shared/DisruptionRowContainer/DisruptionRowContainer';
// State
import { GlobalContext } from 'globalState/GlobalStateContext';
// Types
import { DisruptionIndicatorTypes } from 'sharedTypes';
import { RoadsRowProp } from './types';
// Custom hooks
import useFetchRoads from './useFetchRoads';

const RoadsRow = ({ favs }: RoadsRowProp): JSX.Element => {
  const [, dispatch] = useContext(GlobalContext);
  const [copiedFavs] = useState(favs); // Map favs to react state, if we pass it directly to useFetchTrainStations hook, it will cause unnecessary re-renders of the parent component, which then re-renders this component causing a loop
  const { response, isFetching, hasError } = useFetchRoads(copiedFavs);

  useEffect(() => {
    if (response && response.filteredData) {
      const data = response?.filteredData.map(
        ({ disruptionSeverity, address, radius, lat, lon }): DisruptionIndicatorTypes => ({
          id: address + radius,
          disruptionSeverity,
          disruptionUrlSearchParams: `?mode=roads&query=${address}&address=${address}&lat=${lat}&long=${lon}&radius=${radius}`,
          indicatorText: address,
          optionalText: `${radius} miles`,
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
