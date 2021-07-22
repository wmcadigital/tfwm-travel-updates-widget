// Helpers
import { StateUpdater } from 'preact/hooks';
import { capitaliseFirstChar } from 'sharedHelpers';
// Types
import { DefaultModes } from 'sharedTypes';
// Components
import Icon from '../Icon/Icon';

type PersonalRowTitleProps = {
  isFetching: boolean;
  isRowOpen: boolean | 'all';
  setIsRowOpen: StateUpdater<boolean | 'all'>;
  hasError: boolean;
  mode: DefaultModes;
};

const PersonalRowTitle = ({
  isFetching,
  isRowOpen,
  setIsRowOpen,
  hasError,
  mode,
}: PersonalRowTitleProps): JSX.Element => {
  const toggleRowVisibility = () => {
    setIsRowOpen(prevState => (prevState === 'all' || prevState ? false : 'all'));
  };
  return (
    <>
      <div className="wmnds-travel-update__disruption-title">
        <h3 className="wmnds-m-none">{capitaliseFirstChar(mode)}</h3>
        {isFetching && <strong>Loading...</strong>}

        {!isFetching && !hasError && (
          <button
            type="button"
            className="wmnds-travel-update__disruption-detail-toggle"
            data-show-details={`${isRowOpen}`}
            onClick={toggleRowVisibility}
          >
            <Icon iconName="general-chevron-right" />
          </button>
        )}
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
