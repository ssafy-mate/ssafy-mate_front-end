import { RouterState } from 'connected-react-router';

import { AnyAction, Reducer } from 'redux';

import { ProfileState } from './userTypes';
import { AlertState } from './alertTypes';
import { MyTeamState } from './teamTypes';

export interface SignInRequestType {
  userEmail: string;
  password: string;
}

export interface SignInRequestTypeWithIdSave {
  userEmail: string;
  password: string;
  IdSave: boolean;
}

export interface SignInResponse {
  payload: Error | null;
  status: number;
  success: boolean;
  message: string;
}

export interface SignInResponse {
  userId: number;
  userName: string;
  userEmail: string;
  studentNumber: string;
  campus: string;
  ssafyTrack: string;
  token: string;
  projects: Project[];
}

export interface Project {
  projectId: number;
  project: string;
  projectTrack: string | null;
  teamId: string | null;
}

export interface AuthState {
  userId: number | null;
  userName: string | null;
  userEmail: string | null;
  studentNumber: string | null;
  campus: string | null;
  ssafyTrack: string | null;
  projects: Project[];
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface ProjectsState {
  projects: Project[];
}

export interface ProjectTrackRequestType {
  projectId: number;
  projectTrack: string;
}

export interface UserApplicationRequestType {
  teamId: number;
  message: string;
}

export interface updateAuthInfoRequest {
  userId: number;
  token: string;
}

export interface EditProfileInfoRequest {
  data: FormData;
  token: string;
  userId: number;
  profileInfo: string;
}

export interface getProfileInfoRequest {
  token: string;
  userId: number;
}

export interface ProjectParams {
  project: string;
}

export interface RootState {
  auth: AuthState;
  myTeam: MyTeamState;
  controlAlert: AlertState;
  profile: ProfileState;
  router: Reducer<RouterState<unknown>, AnyAction>;
}
