import useFetch from 'customHooks/useFetch';
import CTAButtons from './CTAButtons/CTAButtons';
import ModalRow from './ModalRow/ModalRow';
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
