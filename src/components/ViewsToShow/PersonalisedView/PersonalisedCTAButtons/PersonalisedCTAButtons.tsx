// Components
import Icon from 'components/shared/Icon/Icon';
import Link from 'components/shared/Link/Link';
// CustomHooks
import usePersonalisedCTAButtons from './usePersonalisedCTAButtons';

const PersonalisedCTAButtons = (): JSX.Element => {
  const {
    disruptionsLink,
    editMode,
    handleEditServicesClick,
    handleSaveChanges,
    handleCancelChanges,
  } = usePersonalisedCTAButtons();

  return (
    <div className="wmnds-grid wmnds-grid--spacing-sm-2-lg wmnds-p-t-md">
      {/* Add services button */}
      <div className="wmnds-col-1 wmnds-col-sm-1-2">
        {!editMode ? (
          <button
            className="wmnds-btn wmnds-btn--mode wmnds-btn--block wmnds-m-b-md"
            type="button"
            data-btn-name="edit-services"
            onClick={handleEditServicesClick}
          >
            Edit your services {editMode}
          </button>
        ) : (
          <button
            type="button"
            className="wmnds-btn wmnds-btn--mode wmnds-btn--block wmnds-m-b-md"
            onClick={handleCancelChanges}
          >
            Cancel
          </button>
        )}
      </div>
      {/* View all updates button */}
      <div className="wmnds-col-1 wmnds-col-sm-1-2">
        {!editMode ? (
          <Link className="wmnds-btn wmnds-btn--block" href={disruptionsLink} isButton>
            View all updates
            <Icon
              className="wmnds-btn__icon wmnds-btn__icon--right"
              iconName="general-chevron-right"
            />
          </Link>
        ) : (
          <button type="button" className="wmnds-btn wmnds-btn--block" onClick={handleSaveChanges}>
            Save changes
          </button>
        )}
      </div>
    </div>
  );
};

export default PersonalisedCTAButtons;
