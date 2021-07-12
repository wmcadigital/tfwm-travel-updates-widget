import DisruptionIndicator from 'components/shared/DisruptionIndicator/DisruptionIndicator';
import DisruptionRowContainer from 'components/shared/DisruptionRowContainer/DisruptionRowContainer';
import PersonalRowTitle from 'components/shared/PersonalRowTitle/PersonalRowTitle';
import useFetch from 'customHooks/useFetch';
import { BusRowProps, BusServicesAPI } from './types';

const BusRow = ({ favs }: BusRowProps): JSX.Element => {
  const { response, isFetching } = useFetch<BusServicesAPI>(`/bus/v1/service/${favs}`);

  return (
    <>
      <DisruptionRowContainer>
        <PersonalRowTitle title="Bus" isFetching={isFetching} />

        {!isFetching &&
          response?.services &&
          response?.services.map(busService => {
            const { id, disruptionSeverity, routes, serviceNumber } = busService;

            return (
              <DisruptionIndicator
                disruptionSeverity={disruptionSeverity}
                disruptionUrlSearchParams={`?mode=bus&query=${serviceNumber}&selectedItem=${id}`}
                indicatorText={serviceNumber}
                optionalText={routes?.length ? routes[0].routeName : ''}
                modalIcon="bus"
              />
            );
          })}
      </DisruptionRowContainer>
      <hr />
    </>
  );
};

export default BusRow;
