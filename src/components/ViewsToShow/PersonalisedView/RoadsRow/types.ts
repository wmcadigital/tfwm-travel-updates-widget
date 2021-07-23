// Types
import { RoadsEntity } from 'sharedHelpers/cookies/types';
import { DisruptionSeverity } from 'sharedTypes';

export type RoadsRowProp = {
  favs: RoadsEntity[];
};

export interface RoadsAPI {
  disruptionTimeWindow: RoadsAPITimeWindow;
  extent: RoadsAPIExtent;
  disruptions?: RoadsAPIDisruptions[] | null;
  url: string;
  versionNo: string;
  staleAt: string;
}
export interface RoadsAPITimeWindow {
  start: string;
  end: string;
}
export interface RoadsAPIExtent {
  minLat: number;
  maxLat: number;
  minLon: number;
  maxLon: number;
}
export interface RoadsAPIDisruptions {
  id: string;
  mode: string;
  disruptionTimeWindow: RoadsAPITimeWindow;
  publicationTimeWindow: RoadsAPITimeWindow;
  title: string;
  description?: string | null;
  subtitle: string;
  disruptionSeverity: DisruptionSeverity;
  lat: number;
  lon: number;
  servicesAffected?: null;
}

export type RoadsAPIReturn = {
  address: string;
  radius: number;
  lat: number;
  lon: number;
  amountOfDisruptions: number;
  disruptionSeverity: DisruptionSeverity;
};
