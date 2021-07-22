/* eslint-disable react/default-props-match-prop-types */
import { StateUpdater } from 'preact/hooks';
// Components
import Icon from 'components/shared/Icon/Icon';
// Types
import { DisruptionIndicatorTypes, IsRowOpen, VisibleDisruptionIndicators } from 'sharedTypes';
// Helper funcs
import { disruptionTextElementToShow, getSeverityVars } from './helpers';
import useDisruptionIndicator from './useDisruptionIndicator';

type DisruptionIndicatorProps = DisruptionIndicatorTypes & typeof defaultProps;

type NewProps = DisruptionIndicatorProps & {
  setIndicatorsVisibility: StateUpdater<VisibleDisruptionIndicators[]>;
  indicatorsVisibility: VisibleDisruptionIndicators[];
  isRowOpen: IsRowOpen;
};

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
  mode,
  modalIcon,
  optionalText,
  setIndicatorsVisibility,
  indicatorsVisibility,
  isRowOpen,
}: NewProps): JSX.Element => {
  const { handleToggleIndicator, handleRemoveService, editMode } = useDisruptionIndicator(
    id,
    mode,
    setIndicatorsVisibility
  );
  const severity = getSeverityVars(disruptionSeverity);
  const disruptionText = disruptionTextElementToShow(severity.text, disruptionUrlSearchParams);
  const currentIndicator = indicatorsVisibility.filter(items => items.id === id);

  return (
    <div className="wmnds-travel-update__disruption">
      <button
        type="button"
        className="wmnds-travel-update__disruption-indicator-btn"
        aria-expanded={isRowOpen && currentIndicator[0] && currentIndicator[0].visible}
        onClick={handleToggleIndicator}
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
          onClick={handleRemoveService}
        >
          <Icon iconName="general-trash" />
        </button>
      )}
    </div>
  );
};

DisruptionIndicator.defaultProps = defaultProps;

export default DisruptionIndicator;
