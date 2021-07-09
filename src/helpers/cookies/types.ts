export interface DisruptionFavs {
  favCookieAllowed: boolean | undefined;
  hideFavsHelpMsg: boolean | undefined;
  favs: Favs | undefined;
}
export interface Favs {
  bus?: string[] | null | undefined;
  train?: TrainEntity[] | null | undefined;
  tram?: string[] | null | undefined;
  roads?: null[] | null | undefined;
}
export interface TrainEntity {
  from: string | undefined;
  line: string | undefined;
  to: string | undefined;
}
