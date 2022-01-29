import { push } from 'connected-react-router';

import { Action, createActions, handleActions } from 'redux-actions';
import { call, put, select, takeEvery } from 'redux-saga/effects';

import {
  AuthState,
  SignInRequestType,
  SignInUser,
} from '../../types/signInTypes';

import SignInService from '../../services/SignInService';
import TokenService from '../../services/TokenService';

const initialState: AuthState = {
  userId: null,
  userName: null,
  userEmail: null,
  studentNumber: null,
  campus: null,
  ssafyTrack: null,
  token: null,
  projects: null,
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

const reducer = handleActions<AuthState, SignInUser>(
  {
    PENDING: (state) => ({ ...state, loading: true, error: null }),
    SUCCESS: (state, action) => ({
      userId: action.payload.userId,
      userName: action.payload.userName,
      userEmail: action.payload.userEmail,
      studentNumber: action.payload.studentNumber,
      campus: action.payload.campus,
      ssafyTrack: action.payload.ssafyTrack,
      token: action.payload.token,
      projects: action.payload.projects,
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

function* loginSaga(action: Action<SignInRequestType>) {
  try {
    yield put(pending());

    const data: SignInUser = yield call(SignInService.login, action.payload);

    //localstorage 에 저장 + store에 저장(userId,userEmail,userName,campus,ssafyTrack)
    if (data.token !== null) {
      TokenService.set(data.token);
      yield put(success(data));
    }

    //로그인 성공 시 메인 페이지로 이동
    yield put(push('/'));
  } catch (error: any) {
    //에러처리 -> alert로 변경
    yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN ERROR')));
  }
}

function* logoutSaga() {
  try {
    yield put(pending());
    // const token: string = yield select((state) => state.auth.token);
    // yield call(SignInService.logout, token);
    // TokenService.set(token);
    TokenService.remove();
    yield put(success(null));
  } catch (error: any) {
  } finally {
    // TokenService.remove();
    // yield put(success(null));
  }
}

export function* authSaga() {
  yield takeEvery(`${prefix}/LOGIN`, loginSaga);
  yield takeEvery(`${prefix}/LOGOUT`, logoutSaga);
}
