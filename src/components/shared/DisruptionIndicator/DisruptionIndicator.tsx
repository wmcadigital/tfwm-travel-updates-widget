/* eslint-disable react/default-props-match-prop-types */
import { StateUpdater, useContext, useEffect, useState } from 'preact/hooks';
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
  setIsRowOpen: StateUpdater<boolean | 'all'>;
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
  setIsRowOpen,
}: NewProps): JSX.Element => {
  const [{ editMode, isRowExpandedOnMobile }, dispatch] = useContext(GlobalContext);
  // const [toggleState, setToggleState] = useState(false);
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

  // setVisibleDisruptionIndicators(prevState => [...prevState, id]);

  const handleToggleIndicator = () => {
    // if (visibleDisruptionIndicators.includes(id)) {
    //   setVisibleDisruptionIndicators(state => state.filter(item => item.id !== id));
    // } else {
    //   setVisibleDisruptionIndicators(state => [...state, id]);
    // }

    setVisibleDisruptionIndicators(prevState => {
      const newArr = prevState.map(item => {
        if (item.id === id) return { ...item, visible: !item.visible };
        return item;
      });

      return newArr;
    });

    const mapArr = visibleDisruptionIndicators.filter(item => !item.visible);

    setIsRowOpen(true);
  };

  useEffect(() => {
    const mapArr = visibleDisruptionIndicators.filter(item => item.visible);

    console.log(mapArr.length);
    if (mapArr.length === 0 && isRowOpen === true) setIsRowOpen(false);
  }, [isRowOpen, setIsRowOpen, visibleDisruptionIndicators]);

  return (
    <div className="wmnds-travel-update__disruption">
      <button
        type="button"
        className="wmnds-travel-update__disruption-indicator-btn"
        aria-expanded={
          isRowOpen === 'all' || (isRowOpen === true && filteredItem[0] && filteredItem[0].visible)
        }
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
