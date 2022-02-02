import { RouterState } from 'connected-react-router';
import { AnyAction, Reducer } from 'redux';
import { Severity } from './signUpTypes';

export type SignInRequestType = {
  userEmail: string;
  password: string;
};

export type SignInRequestTypeWithIdSave = {
  userEmail: string;
  password: string;
  IdSave: boolean;
};

export interface SignInResponse {
  payload: Error | null;
  status: number;
  success: boolean;
  message: string;
}

export interface project {
  projectId: number | null;
  projectName: string | null;
  projectTrack: string | null;
  projectTeamId: string | null;
}

export interface AuthState {
  userId: number | null;
  userName: string | null;
  userEmail: string | null;
  studentNumber: string | null;
  campus: string | null;
  ssafyTrack: string | null;
  token: string | null;
  projects: project[] | null;
  message: string | null;
  error: Error | null;
}

export interface SignInUser {
  userId: number | null;
  userName: string | null;
  userEmail: string | null;
  studentNumber: string | null;
  campus: string | null;
  ssafyTrack: string | null;
  token: string | null;
  projects: project[] | null;
  message: string;
  status: number | null;
  success: boolean | null;
  error: Error | null;
}

export interface RootState {
  auth: AuthState;
  controlAlert: alertState | string;
  router: Reducer<RouterState<unknown>, AnyAction>;
}

export const SHOW_ALERT = 'SHOW_ALERT';

export const HIDE_ALERT = 'HIDE_ALERT';

export interface alertState {
  show: boolean;
  text: string | null;
  type: Severity;
}
