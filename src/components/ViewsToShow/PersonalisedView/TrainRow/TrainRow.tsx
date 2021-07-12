import { useState } from 'preact/hooks';
import PersonalRowTitle from 'components/shared/PersonalRowTitle/PersonalRowTitle';
import DisruptionRowContainer from 'components/shared/DisruptionRowContainer/DisruptionRowContainer';
import TrainFav from './TrainFav/TrainFav';
import { TrainRowProps } from './types';

const TrainRow = ({ favs }: TrainRowProps): JSX.Element => {
  const [trainFavsFetched, setTrainFavsFetched] = useState(0); // Used to track how many requests have been resolved as train API is multiple API calls
  const isFetching = favs.length !== trainFavsFetched; // Check if our favs length is the same as how many have been fetched. This will let us know that all have been fetched if they match.

  return (
    <>
      <DisruptionRowContainer>
        <PersonalRowTitle title="Train" isFetching={isFetching} />

        {favs.map(({ line, from, to }) => {
          if (line && from && to)
            return (
              <TrainFav line={line} from={from} to={to} setTrainFavsFetched={setTrainFavsFetched} />
            );
          return null;
        })}
      </DisruptionRowContainer>
      <hr />
    </>
  );
};

export default TrainRow;
