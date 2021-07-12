import { createContext } from 'preact';
import { useReducer } from 'preact/hooks';
import { ContextProviderProps, CreateContextProps } from 'sharedTypes';

type InitialStateProps = {
  editMode: boolean;
};

type ActionType = {
  payload: boolean;
  type: 'SET_EDIT_MODE';
};

const initialState: InitialStateProps = {
  editMode: false,
};

export const GlobalContext = createContext<CreateContextProps<InitialStateProps, ActionType>>([
  initialState,
  () => {},
]);

export const GlobalContextProvider = ({ children }: ContextProviderProps): JSX.Element => {
  const reducer = (state: InitialStateProps, action: ActionType) => {
    switch (action.type) {
      case 'SET_EDIT_MODE':
        return {
          ...state,
          editMode: action.payload,
        };
      default:
        return initialState;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return <GlobalContext.Provider value={[state, dispatch]}>{children} </GlobalContext.Provider>;
};
