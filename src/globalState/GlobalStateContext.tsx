import { createContext } from 'preact';
import { useReducer } from 'preact/hooks';
// Helpers
import { getDisruptionCookieData, hasAnyFavourites, setCookie } from 'sharedHelpers';
// Types
import { RoadsEntity, TrainEntity } from 'sharedHelpers/cookies/types';
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

export type InitialStateProps = {
  editMode: boolean;
  isRowExpandedOnMobile: {
    bus: boolean;
    tram: boolean;
    train: boolean;
    roads: boolean;
  };
  hasFavs: boolean;
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
      type: 'TOGGLE_ROW_VISIBILITY';
      payload: { mode: DefaultModes; visible: boolean };
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
  isRowExpandedOnMobile: {
    bus: false,
    tram: false,
    train: false,
    roads: false,
  },
  hasFavs: hasAnyFavourites(),
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

      case 'TOGGLE_ROW_VISIBILITY': {
        const { mode, visible } = action.payload;

        return {
          ...state,
          isRowExpandedOnMobile: {
            ...state.isRowExpandedOnMobile,
            [mode]: visible,
          },
        };
      }

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

          const cookiesModeArr = cookiesFavsObj[mode] as TrainEntity[] & RoadsEntity[] & string[]; // set as both because TypeScript has a bug with filtering union arrays

          if (!cookiesModeArr) return; // Avoid any undefined or empty arrays

          // Get round the TypeScript filter union array bug by splitting our filters into two seperate calls via an if statement and explicitely stating the type of item we expect to be here
          if (mode === 'train') {
            cookieObj.favs[mode] = cookiesModeArr.filter((item: TrainEntity) => item.line !== id); // Map filtered array back to our cookieObj
          } else if (mode === 'roads') {
            cookieObj.favs[mode] = cookiesModeArr.filter(
              (item: RoadsEntity) => item.address !== id
            );
          } else {
            cookieObj.favs[mode] = cookiesModeArr.filter((item: string) => item !== id); // Map filtered array back to our cookieObj
          }
        });

        const favStateString = JSON.stringify(cookieObj); // Stringify our cookieObj
        setCookie('disruptionsApp', favStateString, 181); // Set the cookie with our deleted services

        const hasFavs = hasAnyFavourites(); // After we've set the cookies, double check if we still have any favs (used in viewsToShow component to decide if to show personal or general view)

        return { ...state, previousFavs: { ...state.favs }, favsToRemoveOnSave: [], hasFavs }; // Set the previousFavs to our current favs (that we've removed) and reset favsToRemoveOnSave
      }

      default:
        return initialState;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return <GlobalContext.Provider value={[state, dispatch]}>{children} </GlobalContext.Provider>;
};
