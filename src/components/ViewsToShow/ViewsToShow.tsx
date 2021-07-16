import { useContext } from 'preact/hooks';
// State
import { GlobalContext } from 'globalState/GlobalStateContext';
// Components
import DefaultView from './DefaultView/DefaultView';
import PersonalisedView from './PersonalisedView/PersonalisedView';

const ViewsToShow = (): JSX.Element => {
  const [state] = useContext(GlobalContext);

  return (
    <div className="wmnds-p-sm wmnds-col-1">
      <h2 className="wmnds-content-card__title">Travel updates</h2>

      {state.hasFavs ? <PersonalisedView /> : <DefaultView />}
    </div>
  );
};

export default ViewsToShow;
