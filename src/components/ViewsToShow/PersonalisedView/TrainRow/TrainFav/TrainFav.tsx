import { useContext, useEffect } from 'preact/hooks';
// Components
import DisruptionIndicator from 'components/shared/DisruptionIndicator/DisruptionIndicator';
// Custom hooks
import useFetch from 'customHooks/useFetch';
// State
import { GlobalContext } from 'globalState/GlobalStateContext';
// Types
import { DisruptionIndicatorTypes } from 'sharedTypes';
import { TrainFavProps, TrainStationAPI } from './types';

const TrainFav = ({ line, from, to, setTrainFavsFetched }: TrainFavProps): JSX.Element => {
  const [state, dispatch] = useContext(GlobalContext);
  const { response, isFetching } = useFetch<TrainStationAPI>(`/rail/v2/Station/${from},${to}`);

  // When api is resolved, update our amount of train favs fetched so we can work out whether to keep showing 'loading' text
  useEffect(() => {
    if (response) setTrainFavsFetched(trainFavsFetched => trainFavsFetched + 1);
  }, [response, setTrainFavsFetched]);

  const responseData = response?.data;
  let trainObj = responseData && responseData[0];

  // If from is not same as to station, then check data
  if (from !== to && trainObj && responseData) {
    if (!trainObj.hasDisruptions) [, trainObj] = responseData;
  }

  const showTrain = () => {
    let render;

    if (!isFetching && trainObj) {
      const { id, disruptionSeverity, name } = trainObj;

      const data: DisruptionIndicatorTypes = {
        id,
        disruptionSeverity,
        disruptionUrlSearchParams: `?mode=train&query=${name}&queryTo=${name}&selectedItem=${id}&selectedItemTo=${id}`,
        formatDisruptionIndicatorText: true,
        indicatorText: line,
        modalIcon: 'rail',
        mode: 'train',
      };

      render = (
        <DisruptionIndicator
          id={data.id}
          disruptionSeverity={data.disruptionSeverity}
          disruptionUrlSearchParams={data.disruptionUrlSearchParams}
          formatDisruptionIndicatorText={data.formatDisruptionIndicatorText}
          indicatorText={data.indicatorText}
          modalIcon={data.modalIcon}
          mode={data.mode}
        />
      );
    }
    return render;
  };
  return <>{showTrain()}</>;
};

export default TrainFav;
