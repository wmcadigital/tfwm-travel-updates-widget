import { DisruptionSeverity } from 'sharedTypes/serviceDisruption';

export type BusRowProps = {
  favs: string[];
};

export interface BusServicesAPI {
  disruptionTimeWindow: DisruptionTimeWindow;
  services?: ServicesEntity[] | null;
  url: string;
  versionNo: string;
  staleAt: string;
}
export interface DisruptionTimeWindow {
  start: string;
  end: string;
}
export interface ServicesEntity {
  id: string;
  mode: string;
  serviceNumber: string;
  hasDisruptions: boolean;
  disruptionSeverity: DisruptionSeverity;
  routes?: RoutesEntity[] | null;
}
export interface RoutesEntity {
  direction: string;
  routeName: string;
  operatorCode: string;
  hasDisruption: boolean;
  disruptionSeverity: string;
}
