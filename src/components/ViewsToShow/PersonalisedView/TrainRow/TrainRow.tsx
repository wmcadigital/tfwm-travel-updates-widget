import { useContext, useEffect } from 'preact/hooks';
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
  const { response, isFetching, hasError } = useFetchTrainStations(favs);

  useEffect(() => {
    if (response) {
      const data = response.map(
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
    <DisruptionRowContainer isFetching={isFetching} mode="train" hasError={hasError || !response} />
  );
};

export default TrainRow;
