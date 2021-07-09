import { DisruptionSeverity } from 'sharedTypes/serviceDisruption';

export type TramRowProps = {
  favs: string[];
};

export interface TramStopsAPI {
  metroStopsById?: MetroStopsByIdEntity[] | null;
  url: string;
  versionNo: string;
  staleAt: string;
}
export interface MetroStopsByIdEntity {
  atcoCode: string;
  mode: string;
  name: string;
  index: number;
  lat: number;
  lon: number;
  hasDisruptions: boolean;
  disruptionSeverity: DisruptionSeverity;
  disruptions?: DisruptionsEntity[] | null;
  disruptionTimeWindow: ValidityPeriodOrPublicationTimeWindowOrDisruptionTimeWindow;
  lastModified: string;
}
export interface DisruptionsEntity {
  id: string;
  infoId: string;
  validityPeriod: ValidityPeriodOrPublicationTimeWindowOrDisruptionTimeWindow;
  publicationTimeWindow: ValidityPeriodOrPublicationTimeWindowOrDisruptionTimeWindow;
  disruptionSeverity: DisruptionSeverity;
  disruptionSeverityNumeric: string;
  title: string;
  description: string;
  subtitle: string;
  lastModified: string;
}
export interface ValidityPeriodOrPublicationTimeWindowOrDisruptionTimeWindow {
  start: string;
  end: string;
}
