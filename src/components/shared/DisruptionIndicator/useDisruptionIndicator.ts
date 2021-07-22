import { GlobalContext } from 'globalState/GlobalStateContext';
import { StateUpdater, useContext } from 'preact/hooks';
import { DefaultModes, VisibleDisruptionIndicators } from 'sharedTypes';

type UseDisruptionIndicatorReturn = {
  handleRemoveService: () => void;
  handleToggleIndicator: () => void;
  editMode: boolean;
};

const useDisruptionIndicator = (
  id: string,
  mode: DefaultModes,
  setIndicatorsVisibility: StateUpdater<VisibleDisruptionIndicators[]>
): UseDisruptionIndicatorReturn => {
  const [{ editMode }, dispatch] = useContext(GlobalContext);

  const handleRemoveService = () => {
    dispatch({
      type: 'REMOVE_SERVICE',
      payload: {
        mode,
        id,
      },
    });
  };

  const handleToggleIndicator = () => {
    setIndicatorsVisibility(prevState => {
      // Loop through all items
      const newArr = prevState.map(item => {
        // When we find the one that we clicked, then toggle its visibility state
        if (item.id === id) return { ...item, visible: !item.visible };
        return item; // If it's not our item, just return it
      });

      return newArr;
    });
  };

  return { handleRemoveService, handleToggleIndicator, editMode };
};

export default useDisruptionIndicator;
