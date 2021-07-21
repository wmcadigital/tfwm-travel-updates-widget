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

  // useEffect(() => {
  //   const mapArr = visibleDisruptionIndicators.map(item => !item.visible);
  //   console.log({ mapArr });
  //   if (mapArr.length === 0) {
  //     setIsRowOpen(false);
  //   }
  // }, [visibleDisruptionIndicators]);
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
                setIsRowOpen={setIsRowOpen}
              />
            )
          )}
      </div>
      <hr />
    </>
  );
};

export default DisruptionRowContainer;
