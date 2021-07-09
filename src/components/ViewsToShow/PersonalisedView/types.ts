import { TrainEntity } from 'helpers/cookies/types';
import { DefaultModes } from 'sharedTypes';

export type CurrentFavs = ['bus' | 'tram' | 'roads', string[]] | ['train', TrainEntity[]];
