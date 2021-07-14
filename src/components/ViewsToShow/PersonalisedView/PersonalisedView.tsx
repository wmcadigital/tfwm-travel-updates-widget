import { getFavouritesFromCookies } from 'helpers/cookies/cookies';
import BusRow from './BusRow/BusRow';
import PersonalisedCTAButtons from './PersonalisedCTAButtons/PersonalisedCTAButtons';
import TrainRow from './TrainRow/TrainRow';
import TramRow from './TramRow/TramRow';

const PersonalisedView = (): JSX.Element => {
  const currentFavs = getFavouritesFromCookies();

  return (
    <>
      {currentFavs.bus && <BusRow favs={currentFavs.bus} />}
      {currentFavs.tram && <TramRow favs={currentFavs.tram} />}
      {currentFavs.train && <TrainRow favs={currentFavs.train} />}
      <PersonalisedCTAButtons />
    </>
  );
};

export default PersonalisedView;
