import { useContext } from 'preact/hooks';
// Components
import Icon from 'components/shared/Icon/Icon';
// State
import { GlobalContext } from 'globalState/GlobalStateContext';
// Types
import { DisruptionIndicatorTypes } from 'sharedTypes';
// Helper funcs
import { disruptionTextElementToShow, getSeverityVars } from './helpers';

type DisruptionIndicatorProps = DisruptionIndicatorTypes & typeof defaultProps;

const defaultProps = {
  disruptionUrlSearchParams: '',
  formatDisruptionIndicatorText: false,
  optionalText: '',
};

const DisruptionIndicator = ({
  id,
  disruptionSeverity,
  disruptionUrlSearchParams,
  formatDisruptionIndicatorText,
  indicatorText,
  modalIcon,
  optionalText,
}: DisruptionIndicatorProps): JSX.Element => {
  const [{ editMode }, dispatch] = useContext(GlobalContext);
  const severity = getSeverityVars(disruptionSeverity);

  const disruptionText = disruptionTextElementToShow(severity.text, disruptionUrlSearchParams);

  const removeService = () => {
    dispatch({
      type: 'REMOVE_SERVICE',
      payload: {
        mode: 'bus',
        id,
      },
    });
  };

  return (
    <div className="wmnds-travel-update__disruption">
      <button
        type="button"
        className="wmnds-travel-update__disruption-indicator-btn"
        aria-expanded="false"
      >
        <div
          className={`wmnds-disruption-indicator-medium wmnds-disruption-indicator-medium--with-icon wmnds-disruption-indicator-medium--narrow
          ${!editMode && `wmnds-disruption-indicator-medium--${severity.class}`} ${
            formatDisruptionIndicatorText && 'wmnds-disruption-indicator-medium--capitalize'
          }`}
        >
          <Icon
            className="wmnds-disruption-indicator-medium__icon wmnds-disruption-indicator-medium__icon--left"
            iconName={`modes-isolated-${modalIcon}`}
          />

          <span className="wmnds-disruption-indicator-medium__service ">{indicatorText}</span>

          <Icon
            className="wmnds-disruption-indicator-medium__icon wmnds-disruption-indicator-medium__icon--right"
            iconName={`general-${severity.icon}`}
          />
        </div>
      </button>

      <div className="wmnds-travel-update__disruption-text">
        {optionalText && <strong>{optionalText}</strong>}

        {!editMode && disruptionText}
      </div>

      {editMode && (
        <button
          type="button"
          className="wmnds-travel-update__disruption-delete"
          title={`Delete ${indicatorText}${optionalText && ` - ${optionalText}`} service`}
          onClick={removeService}
        >
          <Icon iconName="general-trash" />
        </button>
      )}
    </div>
  );
};

DisruptionIndicator.defaultProps = defaultProps;

export default DisruptionIndicator;
