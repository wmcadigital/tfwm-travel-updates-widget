import { TrainEntity } from 'sharedHelpers/cookies/types';

export type CurrentFavs = ['bus' | 'tram' | 'roads', string[]] | ['train', TrainEntity[]];
