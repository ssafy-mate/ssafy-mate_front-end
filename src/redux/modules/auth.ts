import { go, push } from 'connected-react-router';

import { Action, createActions, handleActions } from 'redux-actions';
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import Swal from 'sweetalert2';

import {
  AuthState,
  SignInRequestTypeWithIdSave,
  SignInResponse,
  ProjectsState,
  Project,
  ProjectTrackRequestType,
  UserApplicationRequestType,
} from '../../types/authTypes';
import { TeamOfferRequestType, TeamInfoResponse } from '../../types/teamTypes';

import history from '../../history';

import TokenService from '../../services/TokenService';
import UserService from '../../services/UserService';
import RequestService from '../../services/RequestService';
import PersistReducerService from '../../services/PersistReducerService';

import { showSsafyMateAlert } from './alert';
import { initialState as profileInitialState, updateProfile } from './profile';
import { success as myTeamSuccess } from './myTeam';

interface UserApplicationResponseType {
  success: boolean;
  message: string;
}

interface TeamOfferResponseType {
  success: boolean;
  message: string;
}

const initialState: AuthState = {
  userId: null,
  userName: null,
  userEmail: null,
  studentNumber: null,
  campus: null,
  ssafyTrack: null,
  projects: [
    {
      projectId: 1,
      project: '공통 프로젝트',
      projectTrack: null,
      teamId: null,
    },
    {
      projectId: 2,
      project: '특화 프로젝트',
      projectTrack: null,
      teamId: null,
    },
    {
      projectId: 3,
      project: '자율 프로젝트',
      projectTrack: null,
      teamId: null,
    },
  ],
  token: null,
  loading: false,
  error: null,
};

const prefix = 'ssafy-mate/auth';

export const { pending, success, updateProjects, updateAuth, fail } =
  createActions(
    'PENDING',
    'SUCCESS',
    'UPDATE_PROJECTS',
    'UPDATE_AUTH',
    'FAIL',
    {
      prefix,
    },
  );

const reducer = handleActions<AuthState, SignInResponse, ProjectsState>(
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
      projects: action.payload.projects,
      token: action.payload.token,
      loading: false,
      error: null,
    }),
    UPDATE_PROJECTS: (state, action) => ({
      ...state,
      projects: action.payload.projects,
      loading: false,
      message: action.payload.message,
      error: null,
    }),
    UPDATE_AUTH: (state, action) => ({
      ...state,
      userId: action.payload.userId,
      userName: action.payload.userName,
      userEmail: action.payload.userEmail,
      studentNumber: action.payload.studentNumber,
      campus: action.payload.campus,
      ssafyTrack: action.payload.ssafyTrack,
      projects: action.payload.projects,
      loading: false,
      error: null,
    }),
    FAIL: (state, action: any) => ({
      ...state,
      loading: false,
      error: action.payload.message,
    }),
  },
  initialState,
  { prefix },
);

export default reducer;

// saga
export const {
  login,
  logout,
  selectProjectTrack,
  sendUserApplication,
  sendTeamOffer,
} = createActions(
  'LOGIN',
  'LOGOUT',
  'SELECT_PROJECT_TRACK',
  'SEND_USER_APPLICATION',
  'SEND_TEAM_OFFER',
  {
    prefix,
  },
);

function* loginSaga(action: Action<SignInRequestTypeWithIdSave>) {
  try {
    yield put(pending());

    const data: SignInResponse = yield call(UserService.login, {
      userEmail: action.payload.userEmail,
      password: action.payload.password,
    });

    TokenService.set(data.token);
    yield put(success(data));

    const token: string = yield select((state) => state.auth.token);
    const project: string = '특화 프로젝트';
    const userId: number = yield select((state) => state.auth.userId);
    const teamInfoResponse: TeamInfoResponse = yield call(
      UserService.getMyTeamInfo,
      token,
      userId,
      { project },
    );

    yield put(myTeamSuccess(teamInfoResponse.teamData));

    yield put(
      showSsafyMateAlert({
        show: true,
        text: data.message,
        type: 'success',
      }),
    );

    if (action.payload.IdSave) {
      localStorage.setItem('ssafy-mate-id', action.payload.userEmail);
    } else {
      localStorage.removeItem('ssafy-mate-id');
    }

    yield put(push('/'));
  } catch (error: any) {
    yield put(fail(error.response.data || 'UNKNOWN ERROR'));

    yield put(
      showSsafyMateAlert({
        show: true,
        text: error.response.data.message,
        type: 'warning',
      }),
    );
  }
}

function* logoutSaga() {
  try {
    yield put(pending());
  } catch (error: any) {
  } finally {
    yield put(
      showSsafyMateAlert({
        show: true,
        text: '로그아웃 되었습니다.',
        type: 'success',
      }),
    );

    TokenService.remove();
    PersistReducerService.remove();

    yield put(success(initialState));
    yield put(updateProfile(profileInitialState));

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
    const userId: number = yield select((state) => state.auth.userId);

    yield call(UserService.selectProjectTrack, token, userId, action.payload);

    const projects: Project[] = yield call(
      UserService.getUserProjects,
      token,
      userId,
    );

    yield put(updateProjects(projects));
    yield put(push('/projects/specialization/teams'));
  } catch (error: any) {
    yield put(fail(error?.response?.data || 'UNKNOWN ERROR'));
  }
}

function* sendUserApplicationSaga(action: Action<UserApplicationRequestType>) {
  try {
    yield put(pending());

    const token: string = yield select((state) => state.auth.token);
    const response: UserApplicationResponseType = yield call(
      RequestService.sendUserApplication,
      token,
      action.payload,
    );

    Swal.fire({
      title: '팀 지원 완료',
      text: response.message,
      icon: 'success',
      showConfirmButton: false,
      timer: 2000,
    });
  } catch (error: any) {
    yield put(fail(error?.response?.data || 'UNKNOWN ERROR'));

    Swal.fire({
      title: '팀 지원 실패',
      text: error.response.data.message,
      icon: 'warning',
      confirmButtonColor: '#3396f4',
      confirmButtonText: '확인',
    });
  } finally {
    const token: string = yield select((state) => state.auth.token);
    const userId: number = yield select((state) => state.auth.userId);
    const projects: Project[] = yield call(
      UserService.getUserProjects,
      token,
      userId,
    );

    yield put(updateProjects(projects));
  }
}

function* sendTeamOfferSaga(action: Action<TeamOfferRequestType>) {
  try {
    yield put(pending());

    const token: string = yield select((state) => state.auth.token);
    const response: TeamOfferResponseType = yield call(
      RequestService.sendTeamOffer,
      token,
      action.payload,
    );

    Swal.fire({
      title: '팀 합류 요청 완료',
      text: response.message,
      icon: 'success',
      showConfirmButton: false,
      timer: 2000,
    });
  } catch (error: any) {
    yield put(fail(error?.response?.data || 'UNKNOWN ERROR'));

    Swal.fire({
      title: '팀 합류 요청 실패',
      text: error.response.data.message,
      icon: 'warning',
      confirmButtonColor: '#3396f4',
      confirmButtonText: '확인',
    });
  } finally {
    const token: string = yield select((state) => state.auth.token);
    const userId: number = yield select((state) => state.auth.userId);
    const projects: Project[] = yield call(
      UserService.getUserProjects,
      token,
      userId,
    );

    yield put(updateProjects(projects));
  }
}

export function* authSaga() {
  yield takeEvery(`${prefix}/LOGIN`, loginSaga);
  yield takeEvery(`${prefix}/LOGOUT`, logoutSaga);
  yield takeLatest(`${prefix}/SELECT_PROJECT_TRACK`, selectProjectTrackSaga);
  yield takeLatest(`${prefix}/SEND_USER_APPLICATION`, sendUserApplicationSaga);
  yield takeLatest(`${prefix}/SEND_TEAM_OFFER`, sendTeamOfferSaga);
}
