// Helpers
import { getFavouritesFromCookies } from 'sharedHelpers/cookies/cookies';
// Components
import PersonalisedCTAButtons from './PersonalisedCTAButtons/PersonalisedCTAButtons';
import BusRow from './BusRow/BusRow';
import TramRow from './TramRow/TramRow';
import TrainRow from './TrainRow/TrainRow';
import RoadsRow from './RoadsRow/RoadsRow';

const PersonalisedView = (): JSX.Element => {
  const { bus, tram, train, roads } = getFavouritesFromCookies();

  // Check if we have any favs for each mode, if so then show the relevant row
  return (
    <>
      {bus && bus?.length > 0 && <BusRow favs={bus} />}
      {tram && tram?.length > 0 && <TramRow favs={tram} />}
      {train && train?.length > 0 && <TrainRow favs={train} />}
      {roads && roads?.length > 0 && <RoadsRow favs={roads} />}

      <PersonalisedCTAButtons />
    </>
  );
};

export default PersonalisedView;
