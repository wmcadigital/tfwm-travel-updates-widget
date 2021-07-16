// CustomHooks
import useFetch from 'customHooks/useFetch';
// Components
import CTAButtons from './CTAButtons/CTAButtons';
import ModalRow from './ModalRow/ModalRow';
// Types
import ResponseOrNull from './types';

const DefaultView = (): JSX.Element => {
  const { response, isFetching } = useFetch<ResponseOrNull>(`/Disruption/v2/count`);

  return (
    <>
      <ModalRow isFetching={isFetching} response={response} mode="bus" />
      <ModalRow isFetching={isFetching} response={response} mode="train" />
      <ModalRow isFetching={isFetching} response={response} mode="tram" />
      <ModalRow isFetching={isFetching} response={response} mode="roads" />
      <CTAButtons />
    </>
  );
};

export default DefaultView;
