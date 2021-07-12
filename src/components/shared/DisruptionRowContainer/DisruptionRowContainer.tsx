import { useContext } from 'preact/hooks';
// State
import { GlobalContext } from 'globalState/GlobalStateContext';

type DisruptionRowContainerProps = {
  children: React.ReactNode;
};

const DisruptionRowContainer = ({ children }: DisruptionRowContainerProps): JSX.Element => {
  const [{ editMode }] = useContext(GlobalContext);

  return (
    <div
      className={`wmnds-travel-update wmnds-travel-update--personal ${
        editMode && 'wmnds-travel-update--edit'
      }`}
    >
      {children}
    </div>
  );
};

export default DisruptionRowContainer;
