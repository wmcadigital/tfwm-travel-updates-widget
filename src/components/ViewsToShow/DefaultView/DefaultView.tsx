// CustomHooks
import useFetch from 'customHooks/useFetch';
// Components
import CTAButtons from './CTAButtons/CTAButtons';
import ModalRow from './ModalRow/ModalRow';
// Types
import ResponseOrNull from './types';

const currentDate = new Date();
currentDate.setHours(0, 0, 0, 0);

const from = currentDate.toISOString();

const endOfDay = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate(),
  23,
  59,
  59
);
endOfDay.setHours(endOfDay.getHours() + 2);
const to = endOfDay.toISOString();

const DefaultView = (): JSX.Element => {
  const { response, isFetching } = useFetch<ResponseOrNull>(
    `/Disruption/v2/count?from=${from}&to=${to}`
  );

  return (
    <>
      <ModalRow isFetching={isFetching} response={response} mode="bus" from={from} to={to} />
      <ModalRow isFetching={isFetching} response={response} mode="train" from={from} to={to} />
      <ModalRow isFetching={isFetching} response={response} mode="tram" from={from} to={to} />
      <ModalRow isFetching={isFetching} response={response} mode="roads" from={from} to={to} />
      <CTAButtons />
    </>
  );
};

export default DefaultView;
