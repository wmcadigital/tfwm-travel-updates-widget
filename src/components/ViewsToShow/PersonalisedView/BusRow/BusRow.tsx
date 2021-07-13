import { useContext, useEffect } from 'preact/hooks';
// Components
import DisruptionRowContainer from 'components/shared/DisruptionRowContainer/DisruptionRowContainer';
// Custom hooks
import useFetch from 'customHooks/useFetch';
// State
import { GlobalContext } from 'globalState/GlobalStateContext';
// Types
import { DisruptionIndicatorTypes } from 'sharedTypes';
import { BusRowProps, BusServicesAPI } from './types';

const BusRow = ({ favs }: BusRowProps): JSX.Element => {
  const [, dispatch] = useContext(GlobalContext);
  const { response, isFetching } = useFetch<BusServicesAPI>(`/bus/v1/service/${favs}`);

  useEffect(() => {
    if (response && response.services) {
      const data = response?.services.map(
        ({ id, disruptionSeverity, routes, serviceNumber }): DisruptionIndicatorTypes => ({
          id,
          disruptionSeverity,
          disruptionUrlSearchParams: `?mode=bus&query=${serviceNumber}&selectedItem=${id}`,
          formatDisruptionIndicatorText: false,
          indicatorText: serviceNumber,
          optionalText: routes?.length ? routes[0].routeName : '',
          modalIcon: 'bus',
          mode: 'bus',
        })
      );

      dispatch({
        type: 'UPDATE_SERVICES',
        payload: {
          mode: 'bus',
          data,
        },
      });
    }
  }, [dispatch, response]);

  return <DisruptionRowContainer mode="bus" isFetching={isFetching} />;
};

export default BusRow;
