import { go, push } from 'connected-react-router';

import { Action, createActions, handleActions } from 'redux-actions';
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import {
  AuthState,
  SignInRequestTypeWithIdSave,
  SignInUser,
  ProjectsState,
  Project,
} from '../../types/authTypes';

import history from '../../history';

import SignInService from '../../services/SignInService';
import TokenService from '../../services/TokenService';
import UserService from '../../services/UserService';
import PersistReducerService from '../../services/PersistReducerService';

interface ProjectTrackRequestType {
  projectId: number;
  projectTrack: string;
}

const initialState: AuthState = {
  userId: null,
  userName: null,
  userEmail: null,
  studentNumber: null,
  campus: null,
  ssafyTrack: null,
  projects: null,
  token: null,
  loading: false,
  error: null,
};

const prefix = 'ssafy-mate/auth';

export const { pending, success, updateProjects, fail } = createActions(
  'PENDING',
  'SUCCESS',
  'UPDATE_PROJECTS',
  'FAIL',
  {
    prefix,
  },
);

const reducer = handleActions<AuthState, SignInUser, ProjectsState>(
  {
    PENDING: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    SUCCESS: (state, action) => ({
      ...state,
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
    UPDATE_PROJECTS: (state, action) => ({
      ...state,
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
export const { login, logout, selectProjectTrack } = createActions(
  'LOGIN',
  'LOGOUT',
  'SELECT_PROJECT_TRACK',
  { prefix },
);

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
    yield put(
      fail(new Error(error?.response?.data?.errorMessage || 'UNKNOWN ERROR')),
    );
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
    PersistReducerService.remove();
    yield put(success(initialState));

    if (history.location.pathname === '/') {
      yield put(go(0));
    } else {
      yield put(push('/'));
    }
  }
}

function* selectProjectTrackSaga(action: Action<ProjectTrackRequestType>) {
  try {
    yield put(pending());

    const token: string = yield select((state) => state.auth.token);

    yield call(UserService.selectProjectTrack, token, action.payload);

    const projects: Project[] = yield call(UserService.getUserProjects, token);

    yield put(updateProjects(projects));
    yield put(push('/projects/specialization/teams'));
  } catch (error: any) {
    yield put(
      fail(new Error(error?.response?.data?.errorMessage || 'UNKNOWN ERROR')),
    );
  }
}

export function* authSaga() {
  yield takeEvery(`${prefix}/LOGIN`, loginSaga);
  yield takeEvery(`${prefix}/LOGOUT`, logoutSaga);
  yield takeLatest(`${prefix}/SELECT_PROJECT_TRACK`, selectProjectTrackSaga);
}
