import DisruptionIndicator from 'components/shared/DisruptionIndicator/DisruptionIndicator';
import useFetch from 'customHooks/useFetch';
import { useEffect } from 'preact/hooks';
import { TrainFavProps, TrainStationAPI } from './types';

const TrainFav = ({ line, from, to, setTrainFavsFetched }: TrainFavProps): JSX.Element => {
  const { response, isFetching } = useFetch<TrainStationAPI>(`/rail/v2/Station/${from},${to}`);

  // When api is resolved, update our amount of train favs fetched so we can work out whether to keep showing 'loading' text
  useEffect(() => {
    if (response) setTrainFavsFetched(trainFavsFetched => trainFavsFetched + 1);
  }, [response, setTrainFavsFetched]);

  const data = response?.data;
  let trainObj = data && data[0];

  // If from is not same as to station, then check data
  if (from !== to && trainObj && data) {
    if (!trainObj.hasDisruptions) [, trainObj] = data;
  }

  const showTrain = () => {
    let render;
    if (!isFetching && trainObj) {
      const { id, disruptionSeverity, name } = trainObj;
      render = (
        <DisruptionIndicator
          disruptionSeverity={disruptionSeverity}
          disruptionUrlSearchParams={`?mode=train&query=${name}&queryTo=${name}&selectedItem=${id}&selectedItemTo=${id}`}
          formatDisruptionIndicatorText
          indicatorText={line}
          modalIcon="rail"

          // ?mode=${mode}&query=${indicatorText}&selectedItem=${id}
        />
      );
    }
    return render;
  };
  return <>{showTrain()}</>;
};

export default TrainFav;
