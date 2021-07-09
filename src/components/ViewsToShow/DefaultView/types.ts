interface CountApiTypes {
  totals: Totals;
  url: string;
  versionNo: string;
  staleAt: string;
}

interface Totals {
  bus: number;
  tram: number;
  train: number;
  road: number;
}

export default CountApiTypes;
