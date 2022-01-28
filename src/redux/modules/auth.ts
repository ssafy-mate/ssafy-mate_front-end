import { push } from 'connected-react-router';

import { Action, createActions, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';

import {
  AuthState,
  LogInRequestType,
  LoginResponseSuccess,
} from '../../types/signInTypes';

import SignInService from '../../services/SignInService';
import TokenService from '../../services/TokenService';

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

const prefix = 'ssafy-mate/auth';

export const { pending, success, fail } = createActions(
  'PENDING',
  'SUCCESS',
  'FAIL',
  { prefix },
);

const reducer = handleActions<AuthState, string>(
  {
    PENDING: (state) => ({ ...state, loading: true, error: null }),
    SUCCESS: (state, action) => ({
      token: action.payload,
      loading: false,
      error: null,
    }),
    FAIL: (state, action: any) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  { prefix },
);

export default reducer;

// saga
export const { login, logout } = createActions('LOGIN', 'LOGOUT', { prefix });

function* loninSaga(action: Action<LogInRequestType>) {
  try {
    yield put(pending());

    const data: LoginResponseSuccess = yield call(
      SignInService.login,
      action.payload,
    );

    //localstorage 에 저장 + store에 저장(userId,userEmail,userName,campus,ssafyTrack)
    TokenService.set(data.token);
    yield put(success(data.token));

    //로그인 성공 시 메인 페이지로 이동
    yield put(push('/'));
  } catch (error: any) {
    //에러처리 -> alert로 변경
    yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN ERROR')));
  }
}

function* lonoutSaga() {}
export function* authSaga() {
  yield takeEvery(`${prefix}/LOGIN`, loninSaga);

  yield takeEvery(`${prefix}/LOGOUT`, lonoutSaga);
}
