import { createContext } from 'preact';
import { useReducer } from 'preact/hooks';
import {
  ContextProviderProps,
  CreateContextProps,
  DefaultModes,
  DisruptionIndicatorTypes,
} from 'sharedTypes';

type InitialStateProps = {
  editMode: boolean;
  bus: DisruptionIndicatorTypes[];
  tram: DisruptionIndicatorTypes[];
  train: DisruptionIndicatorTypes[];
  roads: DisruptionIndicatorTypes[];
};

type ActionType =
  | {
      type: 'SET_EDIT_MODE';
      payload: boolean;
    }
  | {
      type: 'UPDATE_SERVICES';
      payload: {
        mode: DefaultModes;
        data: DisruptionIndicatorTypes[];
      };
    }
  | {
      type: 'REMOVE_SERVICE';
      payload: {
        mode: DefaultModes;
        id: string;
      };
    };

const initialState: InitialStateProps = {
  editMode: false,
  bus: [],
  tram: [],
  train: [],
  roads: [],
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

      case 'UPDATE_SERVICES': {
        const { mode, data } = action.payload;
        return {
          ...state,
          [mode]: data,
        };
      }

      case 'REMOVE_SERVICE': {
        const { mode, id } = action.payload;

        return {
          ...state,
          [mode]: state[mode].filter(item => id !== item.id),
        };
      }
      default:
        return initialState;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return <GlobalContext.Provider value={[state, dispatch]}>{children} </GlobalContext.Provider>;
};
