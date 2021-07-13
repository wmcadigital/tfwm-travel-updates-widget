import PersonalRowTitle from 'components/shared/PersonalRowTitle/PersonalRowTitle';
import DisruptionRowContainer from 'components/shared/DisruptionRowContainer/DisruptionRowContainer';
import { DisruptionIndicatorTypes } from 'sharedTypes';
import useFetchMultiple from 'customHooks/useFetchMultiple';
import { useContext, useEffect } from 'preact/hooks';
import { GlobalContext } from 'globalState/GlobalStateContext';
import DisruptionIndicator from 'components/shared/DisruptionIndicator/DisruptionIndicator';
import { TrainRowProps } from './types';

const TrainRow = ({ favs }: TrainRowProps): JSX.Element => {
  const [state, dispatch] = useContext(GlobalContext);
  const { response, isFetching } = useFetchMultiple(favs);

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
    <>
      <DisruptionRowContainer>
        <PersonalRowTitle title="Train" isFetching={isFetching} />

        {/* {favs.map(({ line, from, to }) => {
          if (line && from && to)
            return (
              <TrainFav line={line} from={from} to={to} setTrainFavsFetched={setTrainFavsFetched} />
            );
          return null;
        })} */}

        {!isFetching &&
          state.train.map(
            ({
              id,
              disruptionSeverity,
              disruptionUrlSearchParams,
              formatDisruptionIndicatorText,
              indicatorText,
              optionalText,
              modalIcon,
              mode,
            }) => (
              <DisruptionIndicator
                id={id}
                disruptionSeverity={disruptionSeverity}
                disruptionUrlSearchParams={disruptionUrlSearchParams}
                formatDisruptionIndicatorText={formatDisruptionIndicatorText}
                indicatorText={indicatorText}
                optionalText={optionalText}
                modalIcon={modalIcon}
                mode={mode}
              />
            )
          )}
      </DisruptionRowContainer>
      <hr />
    </>
  );
};

export default TrainRow;
