import { StateUpdater } from 'preact/hooks';
import { DisruptionSeverity } from 'sharedTypes/serviceDisruption';

export type TrainFavProps = {
  line: string;
  from: string;
  to: string;
  setTrainFavsFetched: StateUpdater<number>;
};

export interface TrainStationAPI {
  url: string;
  versionNo: string;
  staleAt: string;
  data?: DataEntity[] | null;
}
export interface DataEntity {
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
