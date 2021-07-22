/* eslint-disable react/default-props-match-prop-types */
import { StateUpdater, useContext } from 'preact/hooks';
// Components
import Icon from 'components/shared/Icon/Icon';
// State
import { GlobalContext } from 'globalState/GlobalStateContext';
// Types
import { DisruptionIndicatorTypes } from 'sharedTypes';
// Helper funcs
import { disruptionTextElementToShow, getSeverityVars } from './helpers';

type DisruptionIndicatorProps = DisruptionIndicatorTypes & typeof defaultProps;

type VisibleDisruptionIndicatorsProps = { id: string; visible: boolean };

type NewProps = DisruptionIndicatorProps & {
  setVisibleDisruptionIndicators: StateUpdater<VisibleDisruptionIndicatorsProps[]>;
  visibleDisruptionIndicators: VisibleDisruptionIndicatorsProps[];
  isRowOpen: boolean | 'all';
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
  setVisibleDisruptionIndicators,
  visibleDisruptionIndicators,
  isRowOpen,
}: NewProps): JSX.Element => {
  const [{ editMode }, dispatch] = useContext(GlobalContext);
  const severity = getSeverityVars(disruptionSeverity);

  const disruptionText = disruptionTextElementToShow(severity.text, disruptionUrlSearchParams);

  const removeService = () => {
    dispatch({
      type: 'REMOVE_SERVICE',
      payload: {
        mode,
        id,
      },
    });
  };

  const filteredItem = visibleDisruptionIndicators.filter(items => items.id === id);

  const handleToggleIndicator = () => {
    setVisibleDisruptionIndicators(prevState => {
      // Loop through all items
      const newArr = prevState.map(item => {
        // When we find the one that we clicked, then toggle its visibility state
        if (item.id === id) return { ...item, visible: !item.visible };
        return item; // If it's not our item, just return it
      });

      return newArr;
    });
  };

  return (
    <div className="wmnds-travel-update__disruption">
      <button
        type="button"
        className="wmnds-travel-update__disruption-indicator-btn"
        aria-expanded={isRowOpen && filteredItem[0] && filteredItem[0].visible}
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
