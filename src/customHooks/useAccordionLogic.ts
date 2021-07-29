import { StateUpdater, useContext, useEffect, useState } from 'preact/hooks';
// State
import { GlobalContext, InitialStateProps } from 'globalState/GlobalStateContext';
// Types
import { DefaultModes, IsRowOpen, VisibleDisruptionIndicators } from 'sharedTypes';

type UseAccordionLogicReturn = {
  state: InitialStateProps;
  isRowOpen: IsRowOpen;
  setIsRowOpen: StateUpdater<IsRowOpen>;
  indicatorsVisibility: VisibleDisruptionIndicators[];
  setIndicatorsVisibility: StateUpdater<VisibleDisruptionIndicators[]>;
};

const useAccordionLogic = (mode: DefaultModes, isFetching: boolean): UseAccordionLogicReturn => {
  const [state] = useContext(GlobalContext); // Global state
  const [indicatorsVisibility, setIndicatorsVisibility] = useState<VisibleDisruptionIndicators[]>(
    []
  ); // Array used to track visibility state of indicators
  const [isRowOpen, setIsRowOpen] = useState<IsRowOpen>(false); // boolean | 'all' used to track the open/close of the arrow button

  // ***
  // USEEFFECTS TO HELP WITH ACCORDION AND INDICATOR STATE

  // Run when isFetching complete
  useEffect(() => {
    // When fetching is complete and we don't already have disruptionIndicators already populated...
    if (!isFetching && indicatorsVisibility.length === 0) {
      const indicatorInitialState = state?.favs[mode].map(({ id }) => ({ id, visible: false }));
      setIndicatorsVisibility(indicatorInitialState); // Then populate disruptionIndicators array with ids and visibility
    }
  }, [isFetching, mode, state?.favs, indicatorsVisibility.length]);

  // Run everytime the disruptionIndicators changes state
  useEffect(() => {
    const visibleIndicators = indicatorsVisibility.filter(item => item.visible); // Loop through all disruption indicators and only return the visible ones

    if (visibleIndicators.length === 0) setIsRowOpen(false); // If there are no visible ones, then the isRowOpen toggle button needs to be set to false
    if (visibleIndicators.length > 0) setIsRowOpen(true); // Otherwise set it to true (open)
  }, [setIsRowOpen, indicatorsVisibility]);

  // Run everytime the isRowOpen button changes state
  useEffect(() => {
    // Function to set all disruption indicators of a row to visible or not
    const setVisibilityOfAllInidicators = (visible: boolean) => {
      setIndicatorsVisibility(prevState => {
        const updatedIndicatorsVisibility = prevState.map(item => ({ ...item, visible }));

        return updatedIndicatorsVisibility;
      });
    };

    if (isRowOpen === 'all') setVisibilityOfAllInidicators(true); // If isRowOpen is all then we need to show everything so set visible to true
    if (!isRowOpen) setVisibilityOfAllInidicators(false); // Otherwise if the row isn't open, then we need to set all indicators to not show
  }, [isRowOpen, setIndicatorsVisibility]);

  return {
    state,
    isRowOpen,
    setIsRowOpen,
    indicatorsVisibility,
    setIndicatorsVisibility,
  };
};

export default useAccordionLogic;
