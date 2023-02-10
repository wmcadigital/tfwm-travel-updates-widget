import { DefaultModes, TypeOrNull } from 'sharedTypes';
import CountApiTypes from '../types';

export type ModalRowProps = {
  isFetching: boolean;
  response: TypeOrNull<CountApiTypes>;
  mode: DefaultModes;
  from: string;
  to: string;
};
