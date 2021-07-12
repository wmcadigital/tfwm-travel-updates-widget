import DisruptionIndicator from 'components/shared/DisruptionIndicator/DisruptionIndicator';
import DisruptionRowContainer from 'components/shared/DisruptionRowContainer/DisruptionRowContainer';
import PersonalRowTitle from 'components/shared/PersonalRowTitle/PersonalRowTitle';
import useFetch from 'customHooks/useFetch';
import { TramStopsAPI, TramRowProps } from './types';

const TramRow = ({ favs }: TramRowProps): JSX.Element => {
  const { response, isFetching } = useFetch<TramStopsAPI>(`/metro/v2/stop/${favs}`);
  return (
    <>
      <DisruptionRowContainer>
        <PersonalRowTitle title="Tram" isFetching={isFetching} />

        {!isFetching &&
          response?.metroStopsById &&
          response?.metroStopsById.map(tramStop => {
            const { atcoCode: id, disruptionSeverity, name } = tramStop;
            return (
              <DisruptionIndicator
                disruptionSeverity={disruptionSeverity}
                disruptionUrlSearchParams={`?mode=tram&query=${name}&queryTo=${name}&selectedItem=${id}&selectedItemTo=${id}`}
                indicatorText="MM1"
                optionalText={name}
                modalIcon="metro"
              />
            );
          })}
      </DisruptionRowContainer>
      <hr />
    </>
  );
};

export default TramRow;
