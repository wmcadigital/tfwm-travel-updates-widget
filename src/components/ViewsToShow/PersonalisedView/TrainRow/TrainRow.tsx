import { useContext, useEffect, useState } from 'preact/hooks';
// Components
import DisruptionRowContainer from 'components/shared/DisruptionRowContainer/DisruptionRowContainer';
// State
import { GlobalContext } from 'globalState/GlobalStateContext';
// Types
import { DisruptionIndicatorTypes } from 'sharedTypes';
import { TrainRowProps } from './types';
// Custom hooks
import useFetchTrainStations from './useFetchTrainStations';

const TrainRow = ({ favs }: TrainRowProps): JSX.Element => {
  const [, dispatch] = useContext(GlobalContext);
  const [copiedFavs] = useState(favs); // Map favs to react state, if we pass it directly to useFetchTrainStations hook, it will cause unnecessary re-renders of the parent component, which then re-renders this component causing a loop
  const { response, isFetching, hasError } = useFetchTrainStations(copiedFavs);

  useEffect(() => {
    if (response && response.filteredData) {
      const data = response?.filteredData.map(
        ({ id, lineId, disruptionSeverity, name }): DisruptionIndicatorTypes => ({
          id: lineId || '',
          disruptionSeverity,
          disruptionUrlSearchParams: `?mode=train&query=${name}&queryTo=${name}&selectedItem=${id}&selectedItemTo=${id}`,
          formatDisruptionIndicatorText: true,
          indicatorText: lineId || '',
          modalIcon: 'rail',
          mode: 'train',
        })
      );

      dispatch({
        type: 'UPDATE_SERVICES',
        payload: {
          mode: 'train',
          data,
        },
      });
    }
  }, [dispatch, response]);

  return (
    <DisruptionRowContainer
      mode="train"
      isFetching={isFetching}
      hasError={hasError || !response?.filteredData}
    />
  );
};

export default TrainRow;
