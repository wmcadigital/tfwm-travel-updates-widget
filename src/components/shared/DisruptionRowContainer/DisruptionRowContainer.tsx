import { useContext } from 'preact/hooks';
// Helpers
import { capitaliseFirstChar } from 'helpers';
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

const DisruptionRowContainer = ({
  mode,
  isFetching,
  hasError,
}: DisruptionRowContainerProps): JSX.Element => {
  const [state] = useContext(GlobalContext);

  return (
    <>
      <div
        className={`wmnds-travel-update wmnds-travel-update--personal ${
          state?.editMode && 'wmnds-travel-update--edit'
        }`}
      >
        <PersonalRowTitle
          title={capitaliseFirstChar(mode)}
          isFetching={isFetching}
          hasError={hasError}
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
              />
            )
          )}
      </div>
      <hr />
    </>
  );
};

export default DisruptionRowContainer;
