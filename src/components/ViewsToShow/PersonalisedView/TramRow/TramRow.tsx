import { useContext, useEffect } from 'preact/hooks';
// Components
import DisruptionIndicator from 'components/shared/DisruptionIndicator/DisruptionIndicator';
import DisruptionRowContainer from 'components/shared/DisruptionRowContainer/DisruptionRowContainer';
import PersonalRowTitle from 'components/shared/PersonalRowTitle/PersonalRowTitle';
// Custom hooks
import useFetch from 'customHooks/useFetch';
// State
import { GlobalContext } from 'globalState/GlobalStateContext';
// Types
import { DisruptionIndicatorTypes } from 'sharedTypes';
import { TramStopsAPI, TramRowProps } from './types';

const TramRow = ({ favs }: TramRowProps): JSX.Element => {
  const [state, dispatch] = useContext(GlobalContext);
  const { response, isFetching } = useFetch<TramStopsAPI>(`/metro/v2/stop/${favs}`);

  useEffect(() => {
    if (response && response.metroStopsById) {
      const data = response?.metroStopsById.map(
        ({ atcoCode: id, disruptionSeverity, name }): DisruptionIndicatorTypes => ({
          id,
          disruptionSeverity,
          disruptionUrlSearchParams: `?mode=tram&query=${name}&queryTo=${name}&selectedItem=${id}&selectedItemTo=${id}`,
          formatDisruptionIndicatorText: false,
          indicatorText: 'MM1',
          optionalText: name,
          modalIcon: 'metro',
        })
      );

      dispatch({
        type: 'UPDATE_SERVICES',
        payload: {
          mode: 'tram',
          data,
        },
      });
    }
  }, [dispatch, response]);
  return (
    <>
      <DisruptionRowContainer>
        <PersonalRowTitle title="Tram" isFetching={isFetching} />

        {!isFetching &&
          state.tram.map(
            ({
              id,
              disruptionSeverity,
              disruptionUrlSearchParams,
              formatDisruptionIndicatorText,
              indicatorText,
              optionalText,
              modalIcon,
            }) => (
              <DisruptionIndicator
                id={id}
                disruptionSeverity={disruptionSeverity}
                disruptionUrlSearchParams={disruptionUrlSearchParams}
                formatDisruptionIndicatorText={formatDisruptionIndicatorText}
                indicatorText={indicatorText}
                optionalText={optionalText}
                modalIcon={modalIcon}
              />
            )
          )}
      </DisruptionRowContainer>
      <hr />
    </>
  );
};

export default TramRow;
