import { getDisruptionCookieData, getFavouritesFromCookies, setCookie } from 'helpers';
import { Favs, TrainEntity } from 'helpers/cookies/types';
import { createContext } from 'preact';
import { useReducer } from 'preact/hooks';
import {
  ContextProviderProps,
  CreateContextProps,
  DefaultModes,
  DisruptionIndicatorTypes,
} from 'sharedTypes';

export type FavsStateProps = {
  bus: DisruptionIndicatorTypes[];
  tram: DisruptionIndicatorTypes[];
  train: DisruptionIndicatorTypes[];
  roads: DisruptionIndicatorTypes[];
};

type InitialStateProps = {
  editMode: boolean;
  favs: FavsStateProps;
  previousFavs: FavsStateProps;
  favsToRemoveOnSave: { mode: DefaultModes; id: string }[];
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
    }
  | {
      type: 'CANCEL_STATE';
      payload: FavsStateProps;
    }
  | {
      type: 'SAVE_NEW_STATE';
    };

const initialState: InitialStateProps = {
  editMode: false,
  favs: {
    bus: [],
    tram: [],
    train: [],
    roads: [],
  },
  previousFavs: {
    bus: [],
    tram: [],
    train: [],
    roads: [],
  },
  favsToRemoveOnSave: [],
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
          favs: {
            ...state.favs,
            [mode]: data,
          },
          previousFavs: {
            ...state.previousFavs,
            [mode]: data,
          },
        };
      }

      case 'REMOVE_SERVICE': {
        const { mode, id } = action.payload;
        return {
          ...state,
          favs: {
            ...state.favs,
            [mode]: state.favs[mode].filter(item => id !== item.id),
          },
          favsToRemoveOnSave: [...state.favsToRemoveOnSave, { id, mode }],
        };
      }

      case 'CANCEL_STATE':
        return {
          ...state,
          favs: {
            ...state.previousFavs,
          },
          favsToRemoveOnSave: [],
        };

      case 'SAVE_NEW_STATE': {
        const cookieObj = getDisruptionCookieData();

        state.favsToRemoveOnSave.forEach(({ id, mode }) => {
          if (!cookieObj || !cookieObj.favs) return; // No fav object in cookies, then escape out of function
          const cookiesFavsObj = cookieObj.favs;

          const cookiesModeArr = cookiesFavsObj[mode] as TrainEntity[] & string[]; // set as both because TypeScript has a bug with filtering union arrays
          if (!cookiesModeArr) return;

          // Get round the TypeScript filter union array by splitting or filters into two seperate calls and explicitely stating the type of item we expect to be here
          if (mode === 'train') {
            if (!cookiesModeArr) return;
            cookieObj.favs[mode] = cookiesModeArr.filter((item: TrainEntity) => item.line !== id);
          } else {
            if (!cookiesModeArr) return;
            cookieObj.favs[mode] = cookiesModeArr.filter((item: string) => item !== id);
          }
        });

        const favStateString = JSON.stringify(cookieObj);

        setCookie('disruptionsApp', favStateString, 181);

        return { ...state, previousFavs: { ...state.favs }, favsToRemoveOnSave: [] };
      }

      default:
        return initialState;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return <GlobalContext.Provider value={[state, dispatch]}>{children} </GlobalContext.Provider>;
};
