import { getFavouritesFromCookies } from 'helpers/cookies/cookies';
import BusRow from './BusRow/BusRow';
import PersonalisedCTAButtons from './PersonalisedCTAButtons/PersonalisedCTAButtons';
import TrainRow from './TrainRow/TrainRow';
import TramRow from './TramRow/TramRow';

const PersonalisedView = (): JSX.Element => {
  const currentFavs = getFavouritesFromCookies();

  // Check if we have any favs for each mode, if so then show the relevant row
  return (
    <>
      {currentFavs.bus && currentFavs.bus?.length > 0 && <BusRow favs={currentFavs.bus} />}
      {currentFavs.tram && currentFavs.tram?.length > 0 && <TramRow favs={currentFavs.tram} />}
      {currentFavs.train && currentFavs.train?.length > 0 && <TrainRow favs={currentFavs.train} />}

      <PersonalisedCTAButtons />
    </>
  );
};

export default PersonalisedView;
