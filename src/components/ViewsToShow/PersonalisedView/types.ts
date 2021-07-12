import { TrainEntity } from 'helpers/cookies/types';

export type CurrentFavs = ['bus' | 'tram' | 'roads', string[]] | ['train', TrainEntity[]];
