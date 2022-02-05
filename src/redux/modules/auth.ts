import { go, push } from 'connected-react-router';

import { Action, createActions, handleActions } from 'redux-actions';
import { call, put, select, takeEvery } from 'redux-saga/effects';

import {
  AuthState,
  SignInRequestTypeWithIdSave,
  SignInUser,
} from '../../types/authTypes';

import SignInService from '../../services/SignInService';
import TokenService from '../../services/TokenService';
import history from '../../history';
import { showSsafyMateAlert } from './alert';

const initialState: AuthState = {
  userId: null,
  userName: null,
  userEmail: null,
  studentNumber: null,
  campus: null,
  ssafyTrack: null,
  token: null,
  projects: null,
  message: null,
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
    PENDING: (state) => ({ ...state }),
    SUCCESS: (state, action) => ({
      userId: action.payload.userId,
      userName: action.payload.userName,
      userEmail: action.payload.userEmail,
      studentNumber: action.payload.studentNumber,
      campus: action.payload.campus,
      ssafyTrack: action.payload.ssafyTrack,
      token: action.payload.token,
      projects: action.payload.projects,
      message: action.payload.message,
      error: null,
    }),
    FAIL: (state, action: any) => ({
      ...state,
      error: action.payload,
    }),
  },
  initialState,
  { prefix },
);

export default reducer;

// saga
export const { login, logout } = createActions('LOGIN', 'LOGOUT', { prefix });

function* loginSaga(action: Action<SignInRequestTypeWithIdSave>) {
  try {
    yield put(pending());

    const data: SignInUser = yield call(SignInService.login, {
      userEmail: action.payload.userEmail,
      password: action.payload.password,
    });

    if (data.token !== null) {
      TokenService.set(data.token);

      yield put(success(data));

      const message: string = yield select((state) => state.auth.message);

      yield put(showSsafyMateAlert(true, message, 'success'));

      if (action.payload.IdSave) {
        localStorage.setItem('ssafy-mate-id', action.payload.userEmail);
      } else {
        localStorage.removeItem('ssafy-mate-id');
      }

      yield put(push('/'));
    }
  } catch (error: any) {
    yield put(fail(error.response.data));
    const message: string = yield select((state) => state.auth.error.message);
    yield put(showSsafyMateAlert(true, message, 'warning'));
    //오류 초기화 시켜야한다면
    //yield put(showAlert(false, '', 'info'));
  }
}

function* logoutSaga() {
  try {
    yield put(pending());
    //const token: string = yield select((state) => state.auth.token);
    // yield call(SignInService.logout, token);
    // TokenService.remove();
    // yield put(success(null));
    // TokenService.remove();
    // yield put(success(null));
  } catch (error: any) {
  } finally {
    yield put(showSsafyMateAlert(true, '로그아웃 되었습니다.', 'success'));

    localStorage.removeItem('persist:root');
    TokenService.remove();

    yield put(success(initialState));

    if (history.location.pathname === '/') {
      yield put(go(0));
    } else {
      yield put(push('/'));
    }
  }
}

export function* authSaga() {
  yield takeEvery(`${prefix}/LOGIN`, loginSaga);
  yield takeEvery(`${prefix}/LOGOUT`, logoutSaga);
}
