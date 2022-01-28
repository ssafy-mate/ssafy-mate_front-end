import { RouterState } from 'connected-react-router';
import { AnyAction, Reducer } from 'redux';

export type LogInRequestType = {
  userEmail: string;
  password: string;
};

export interface LoginResponseSuccess {
  token: string;
  message: string | null;
  status: number | null;
  success: boolean | null;
}

export interface AuthState {
  token: string | null;
  loading: boolean;
  error: Error | null;
}

export interface RootState {
  auth: AuthState;
  router: Reducer<RouterState<unknown>, AnyAction>;
}
