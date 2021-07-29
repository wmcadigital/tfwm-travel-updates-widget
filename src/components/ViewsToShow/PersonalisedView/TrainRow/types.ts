// Types
import { TrainFavEntity } from 'sharedHelpers/cookies/types';
import { DisruptionSeverity } from 'sharedTypes';

export type TrainRowProps = {
  favs: TrainFavEntity[];
};

export interface TrainStationAPI {
  url: string;
  versionNo: string;
  staleAt: string;
  data?: TrainStationAPIData[] | null;
}
export interface TrainStationAPIData {
  lineId?: string;
  id: string;
  name: string;
  address?: string[] | null;
  postcode: string;
  nationalLocationCode: string;
  sixteenCharacterName: string;
  lat: number;
  lon: number;
  hasDisruptions: boolean;
  disruptionSeverity: DisruptionSeverity;
  lines?: string[] | null;
  disruptionTimeWindow?: null;
  updatedAt: string;
  mode: string;
}
