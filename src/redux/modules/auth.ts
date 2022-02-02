import { go, push } from 'connected-react-router';

import { Action, createActions, handleActions } from 'redux-actions';
import { call, put, select, takeEvery } from 'redux-saga/effects';

import {
  AuthState,
  SignInRequestTypeWithIdSave,
  SignInUser,
} from '../../types/signInTypes';

import SignInService from '../../services/SignInService';
import TokenService from '../../services/TokenService';
import history from '../../history';

const initialState: AuthState = {
  userId: null,
  userName: null,
  userEmail: null,
  studentNumber: null,
  campus: null,
  ssafyTrack: null,
  token: null,
  projects: null,
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
    }),
    FAIL: (state, action: any) => ({
      ...state,
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

    //localstorage 에 저장 + store에 저장(userId,userEmail,userName,campus,ssafyTrack)
    if (data.token !== null) {
      TokenService.set(data.token);
      yield put(success(data));

      // 로그인 성공한 경우에만 아이디 로컬 스토리지에 저장
      if (action.payload.IdSave) {
        localStorage.setItem('ssafy-mate-id', action.payload.userEmail);
      } else {
        localStorage.removeItem('ssafy-mate-id');
      }
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
    //const token: string = yield select((state) => state.auth.token);
    // yield call(SignInService.logout, token);
    // TokenService.remove();
    // yield put(success(null));
    // TokenService.remove();
    // yield put(success(null));
  } catch (error: any) {
  } finally {
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
