// Helpers
import { capitaliseFirstChar } from 'sharedHelpers';
// Types
import { DefaultModes } from 'sharedTypes';
// Components
import Icon from '../Icon/Icon';

type PersonalRowTitleProps = {
  isFetching: boolean;
  hasError: boolean;
  title: DefaultModes;
};

const PersonalRowTitle = ({ isFetching, hasError, title }: PersonalRowTitleProps): JSX.Element => (
  <>
    <div className="wmnds-travel-update__disruption-title">
      <h3 className="wmnds-m-none">{capitaliseFirstChar(title)}</h3>
      {isFetching && <strong>Loading...</strong>}

      <button
        type="button"
        className="wmnds-travel-update__disruption-detail-toggle"
        data-show-details="false"
      >
        <Icon iconName="general-chevron-right" />
      </button>
    </div>
    {/* If error... */}
    {!isFetching && hasError && (
      <span>
        Apologies, we are having technical difficulties loading your {title.toLowerCase()} travel
        updates.
        <br />
        Please try again later.
      </span>
    )}
  </>
);

export default PersonalRowTitle;
