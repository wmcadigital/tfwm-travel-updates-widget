export interface DisruptionFavs {
  favCookieAllowed: boolean | undefined;
  hideFavsHelpMsg: boolean | undefined;
  favs: Favs | undefined;
}
export interface Favs {
  bus?: string[] | undefined;
  train?: TrainFavEntity[] | undefined;
  tram?: string[] | undefined;
  roads?: RoadsFavEntity[] | undefined;
}
export interface TrainFavEntity {
  from: string | undefined;
  line: string | undefined;
  to: string | undefined;
}

export interface RoadsFavEntity {
  address: string | undefined;
  lat: number | undefined;
  lon: number | undefined;
  radius: number | undefined;
}
