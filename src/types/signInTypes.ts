import { RouterState } from 'connected-react-router';
import { AnyAction, Reducer } from 'redux';

export type SignInRequestType = {
  userEmail: string;
  password: string;
};

export type SignInRequestTypeWithIdSave = {
  userEmail: string;
  password: string;
  IdSave: boolean;
};

export interface project {
  projectId: string;
  projectName: string;
  projectTrack: string;
}

export interface AuthState {
  userId: string | null;
  userName: string | null;
  userEmail: string | null;
  studentNumber: string | null;
  campus: string | null;
  ssafyTrack: string | null;
  token: string | null;
  projects: project[] | null;
  loading: boolean;
  error: Error | null;
}

export interface SignInUser {
  userId: string | null;
  userName: string | null;
  userEmail: string | null;
  studentNumber: string | null;
  campus: string | null;
  ssafyTrack: string | null;
  token: string | null;
  projects: project[] | null;
  message: string | null;
  status: number | null;
  success: boolean | null;
}
export interface RootState {
  auth: AuthState;

  router: Reducer<RouterState<unknown>, AnyAction>;
}
