export interface DisruptionFavs {
  favCookieAllowed: boolean | undefined;
  hideFavsHelpMsg: boolean | undefined;
  favs: Favs | undefined;
}
export interface Favs {
  bus?: string[] | undefined;
  train?: TrainEntity[] | undefined;
  tram?: string[] | undefined;
  roads?: string[] | undefined;
}
export interface TrainEntity {
  from: string | undefined;
  line: string | undefined;
  to: string | undefined;
}
