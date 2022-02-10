import { Severity } from './signUpTypes';

export const SHOW_ALERT = 'SHOW_ALERT';

export const HIDE_ALERT = 'HIDE_ALERT';

export interface AlertState {
  show: boolean;
  text: string;
  type: Severity;
}
