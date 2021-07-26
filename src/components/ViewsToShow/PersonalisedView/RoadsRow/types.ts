// Types
import { RoadsFavEntity } from 'sharedHelpers/cookies/types';
import { DisruptionSeverity } from 'sharedTypes';

export type RoadsRowProps = {
  favs: RoadsFavEntity[];
};

export interface RoadsAPI {
  totals: RoadsAPITotals;
  status: RoadsAPIStatus;
  url: string;
  versionNo: string;
  staleAt: string;
}
export interface RoadsAPITotals {
  road: number;
}
export interface RoadsAPIStatus {
  road: DisruptionSeverity;
}

export type RoadsAPIReturn = {
  address: string;
  radius: number;
  lat: number;
  lon: number;
  amountOfDisruptions: number;
  disruptionSeverity: DisruptionSeverity;
};
