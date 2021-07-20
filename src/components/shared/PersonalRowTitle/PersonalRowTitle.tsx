// Helpers
import { GlobalContext } from 'globalState/GlobalStateContext';
import { useContext } from 'preact/hooks';
import { capitaliseFirstChar } from 'sharedHelpers';
// Types
import { DefaultModes } from 'sharedTypes';
// Components
import Icon from '../Icon/Icon';

type PersonalRowTitleProps = {
  isFetching: boolean;
  hasError: boolean;
  mode: DefaultModes;
};

const PersonalRowTitle = ({ isFetching, hasError, mode }: PersonalRowTitleProps): JSX.Element => {
  const [state, dispatch] = useContext(GlobalContext);

  const toggleRowVisibility = () => {
    // dispatch();
  };

  return (
    <>
      <div className="wmnds-travel-update__disruption-title">
        <h3 className="wmnds-m-none">{capitaliseFirstChar(mode)}</h3>
        {isFetching && <strong>Loading...</strong>}

        <button
          type="button"
          className="wmnds-travel-update__disruption-detail-toggle"
          data-show-details={state.rowVisibleOnMobile[mode]}
          onClick={toggleRowVisibility}
        >
          <Icon iconName="general-chevron-right" />
        </button>
      </div>
      {/* If error... */}
      {!isFetching && hasError && (
        <span>
          Apologies, we are having technical difficulties loading your {mode.toLowerCase()} travel
          updates.
          <br />
          Please try again later.
        </span>
      )}
    </>
  );
};

export default PersonalRowTitle;
