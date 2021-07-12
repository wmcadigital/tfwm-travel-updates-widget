import { TransformedModes } from 'sharedTypes';

export type DisruptionSeverity = 'none' | 'normal' | 'high' | 'veryHigh' | undefined;

export type DisruptionIndicatorTypes = {
  id: string;
  disruptionSeverity: DisruptionSeverity;
  disruptionUrlSearchParams?: string;
  formatDisruptionIndicatorText?: boolean;
  indicatorText: string;
  optionalText?: string;
  modalIcon: TransformedModes;
};
