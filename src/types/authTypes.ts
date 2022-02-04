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

export interface SignInResponse {
  payload: Error | null;
  status: number;
  success: boolean;
  message: string;
}

export interface Project {
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
  projects: Project[] | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface SignInUser {
  userId: number | null;
  userName: string | null;
  userEmail: string | null;
  studentNumber: string | null;
  campus: string | null;
  ssafyTrack: string | null;
  token: string | null;
  projects: Project[] | null;
  message: string | null;
  status: number | null;
  success: boolean | null;
}

export interface ProjectsState {
  projects: Project[];
}

export interface RootState {
  auth: AuthState;
  router: Reducer<RouterState<unknown>, AnyAction>;
}

export interface ProjectTrackRequestType {
  projectId: number;
  projectTrack: string;
}

export interface ApplicationRequestType {
  teamId: number;
  message: string;
}
