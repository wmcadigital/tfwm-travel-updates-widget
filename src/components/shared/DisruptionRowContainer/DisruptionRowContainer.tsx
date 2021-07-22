// Types
import { DefaultModes } from 'sharedTypes';
// Components
import PersonalRowTitle from '../PersonalRowTitle/PersonalRowTitle';
import DisruptionIndicator from '../DisruptionIndicator/DisruptionIndicator';
import useAccordionLogic from '../../../customHooks/useAccordionLogic';

type DisruptionRowContainerProps = {
  mode: DefaultModes;
  isFetching: boolean;
  hasError: boolean;
};

const DisruptionRowContainer = ({
  mode,
  isFetching,
  hasError,
}: DisruptionRowContainerProps): JSX.Element => {
  const { state, isRowOpen, setIsRowOpen, setIndicatorsVisibility, indicatorsVisibility } =
    useAccordionLogic(mode, isFetching);

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
                setIndicatorsVisibility={setIndicatorsVisibility}
                indicatorsVisibility={indicatorsVisibility}
                isRowOpen={isRowOpen}
              />
            )
          )}
      </div>
      <hr />
    </>
  );
};

export default DisruptionRowContainer;
