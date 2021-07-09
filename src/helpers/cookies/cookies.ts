import { DisruptionFavs, Favs } from './types';

const getDisruptionCookieData = (): DisruptionFavs | undefined => {
  const cookies = document.cookie;
  const favouritesCookieName = 'disruptionsApp';
  const hasDisruptionsCookie = cookies.indexOf(favouritesCookieName) > -1;
  if (!hasDisruptionsCookie) return undefined;

  const cookieSplit = cookies.split('; ').find(row => row.startsWith(`${favouritesCookieName}=`));
  if (cookieSplit === undefined) return undefined;

  const cookieData = cookieSplit.split('=')[1];

  return JSON.parse(cookieData);
};

const getFavouritesFromCookies = (): Favs => {
  const cookieData = getDisruptionCookieData();
  if (cookieData === undefined) return {};
  const { favs } = cookieData;
  if (!favs) return {};
  return favs;
};

const hasAnyFavourites = (): boolean => {
  const modesWithFavourites = Object.values(getFavouritesFromCookies()).reduce(
    (accumulator, favouritesArray) => {
      let hasFavourites = false;
      if (favouritesArray.length) hasFavourites = true;
      return hasFavourites ? accumulator + 1 : accumulator;
    },
    0
  );
  return modesWithFavourites > 0;
};

export { getDisruptionCookieData, getFavouritesFromCookies, hasAnyFavourites };
