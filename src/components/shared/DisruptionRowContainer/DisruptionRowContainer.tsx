import { useContext, useEffect, useState } from 'preact/hooks';
// State
import { GlobalContext } from 'globalState/GlobalStateContext';
// Types
import { DefaultModes } from 'sharedTypes';
// Components
import PersonalRowTitle from '../PersonalRowTitle/PersonalRowTitle';
import DisruptionIndicator from '../DisruptionIndicator/DisruptionIndicator';

type DisruptionRowContainerProps = {
  mode: DefaultModes;
  isFetching: boolean;
  hasError: boolean;
};

type VisibleDisruptionIndicatorsProps = { id: string; visible: boolean };

const DisruptionRowContainer = ({
  mode,
  isFetching,
  hasError,
}: DisruptionRowContainerProps): JSX.Element => {
  const [state] = useContext(GlobalContext);

  const [visibleDisruptionIndicators, setVisibleDisruptionIndicators] = useState<
    VisibleDisruptionIndicatorsProps[]
  >([]);
  const [isRowOpen, setIsRowOpen] = useState<boolean | 'all'>(false);

  useEffect(() => {
    if (!isFetching) {
      const arr = state?.favs[mode].map(({ id }) => ({ id, visible: false }));
      setVisibleDisruptionIndicators(arr);
    }
  }, [isFetching, mode, state?.favs]);

  // Run everytime the disruptionIndicators changes state
  useEffect(() => {
    const mapArr = visibleDisruptionIndicators.filter(item => item.visible); // Loop through all disruption indicators and only return the visible ones

    if (mapArr.length === 0) setIsRowOpen(false); // If there are no visible ones, then the isRowOpen toggle button needs to be set to false
    if (mapArr.length > 0) setIsRowOpen(true); // Otherwise set it to true (open)
  }, [setIsRowOpen, visibleDisruptionIndicators]);

  // Run everytime the isRowOpen button changes state
  useEffect(() => {
    // Function to set all disruption indicators of a row to visible or not
    const setVisibilityOfAllInidicators = (visible: boolean) => {
      setVisibleDisruptionIndicators(prevState => {
        const newArr = prevState.map(item => ({ ...item, visible }));

        return newArr;
      });
    };

    if (isRowOpen === 'all') setVisibilityOfAllInidicators(true); // If isRowOpen is all then we need to show everything so set visible to true
    if (!isRowOpen) setVisibilityOfAllInidicators(false); // Otherwise if the row isn't open, then we need to set all indicators to not show
  }, [isRowOpen, setVisibleDisruptionIndicators]);

  return (
    <>
      <div
        className={`wmnds-travel-update wmnds-travel-update--personal ${
          state?.editMode ? 'wmnds-travel-update--edit' : ''
        }`}
      >
        <PersonalRowTitle
          mode={mode}
          isFetching={isFetching}
          hasError={hasError}
          isRowOpen={isRowOpen}
          setIsRowOpen={setIsRowOpen}
        />

        {/* Loop through modes services and show a disruption indicator for them */}
        {!isFetching &&
          state?.favs[mode].map(
            ({
              id,
              disruptionSeverity,
              disruptionUrlSearchParams,
              formatDisruptionIndicatorText,
              indicatorText,
              optionalText,
              modalIcon,
            }) => (
              <DisruptionIndicator
                id={id}
                disruptionSeverity={disruptionSeverity}
                disruptionUrlSearchParams={disruptionUrlSearchParams}
                formatDisruptionIndicatorText={formatDisruptionIndicatorText}
                indicatorText={indicatorText}
                optionalText={optionalText}
                modalIcon={modalIcon}
                mode={mode}
                setVisibleDisruptionIndicators={setVisibleDisruptionIndicators}
                visibleDisruptionIndicators={visibleDisruptionIndicators}
                isRowOpen={isRowOpen}
                // setIsRowOpen={setIsRowOpen}
              />
            )
          )}
      </div>
      <hr />
    </>
  );
};

export default DisruptionRowContainer;
