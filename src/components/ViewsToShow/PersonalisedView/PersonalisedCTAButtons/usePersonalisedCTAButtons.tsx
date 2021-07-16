import { useContext } from 'preact/hooks';
// State
import { GlobalContext } from 'globalState/GlobalStateContext';

type UsePersonalisedCTAButtonsTypes = {
  disruptionsLink: string;
  editMode: boolean;
  handleEditServicesClick: () => void;
  handleCancelChanges: () => void;
  handleSaveChanges: () => void;
};

const usePersonalisedCTAButtons = (): UsePersonalisedCTAButtonsTypes => {
  const disruptionsLink = '//disruptions.tfwm.org.uk/?when=now&amp;isMapVisible=false';
  const [state, dispatch] = useContext(GlobalContext);

  const { editMode, favs: prevFavs } = state; // Get favs outside of handleCancelChanges as we want what they favs WERE not what they are NOW (as we are about to cancel) This is so we can go back to our previous favs when we press cancel

  const handleEditServicesClick = () => dispatch({ type: 'SET_EDIT_MODE', payload: true });

  const handleCancelChanges = () => {
    dispatch({ type: 'SET_EDIT_MODE', payload: false });
    dispatch({ type: 'CANCEL_STATE', payload: prevFavs });
  };

  const handleSaveChanges = () => {
    dispatch({ type: 'SET_EDIT_MODE', payload: false });
    dispatch({ type: 'SAVE_NEW_STATE' });
  };

  return {
    disruptionsLink,
    editMode,
    handleEditServicesClick,
    handleCancelChanges,
    handleSaveChanges,
  };
};

export default usePersonalisedCTAButtons;
