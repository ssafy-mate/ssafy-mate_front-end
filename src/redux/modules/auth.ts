import { go, push } from 'connected-react-router';

import { Action, createActions, handleActions } from 'redux-actions';
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import Swal from 'sweetalert2';

import {
  AuthState,
  SignInRequestTypeWithIdSave,
  SignInUser,
  ProjectsState,
  Project,
  ProjectTrackRequestType,
  ApplicationRequestType,
} from '../../types/authTypes';
import { TeamOfferRequestType } from '../../types/teamTypes';

import history from '../../history';

import SignInService from '../../services/SignInService';
import TokenService from '../../services/TokenService';
import UserService from '../../services/UserService';
import PersistReducerService from '../../services/PersistReducerService';
import TeamService from '../../services/TeamService';

import { showSsafyMateAlert } from './alert';

interface SendApplicationResponseType {
  success: boolean;
  message: string;
}

interface SendTeamOfferResponseType {
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
  projects: null,
  token: null,
  loading: false,
  message: null,
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
  sendApplication,
  sendTeamOffer,
} = createActions(
  'LOGIN',
  'LOGOUT',
  'SELECT_PROJECT_TRACK',
  'SEND_APPLICATION',
  'SEND_TEAM_OFFER',
  {
    prefix,
  },
);

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

      // const message: string = yield select((state) => state.auth.message);

      yield put(showSsafyMateAlert(true, data.message, 'success'));

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
    yield put(fail(error?.response?.data || 'UNKNOWN ERROR'));
  }
}

function* sendApplicationSaga(action: Action<ApplicationRequestType>) {
  try {
    yield put(pending());

    const token: string = yield select((state) => state.auth.token);
    const response: SendApplicationResponseType = yield call(
      UserService.sendApplication,
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
    const projects: Project[] = yield call(UserService.getUserProjects, token);

    yield put(updateProjects(projects));
  }
}

function* sendTeamOfferSaga(action: Action<TeamOfferRequestType>) {
  try {
    yield put(pending());

    const token: string = yield select((state) => state.auth.token);
    const response: SendTeamOfferResponseType = yield call(
      TeamService.sendTeamOffer,
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
    const projects: Project[] = yield call(UserService.getUserProjects, token);

    yield put(updateProjects(projects));
  }
}

export function* authSaga() {
  yield takeEvery(`${prefix}/LOGIN`, loginSaga);
  yield takeEvery(`${prefix}/LOGOUT`, logoutSaga);
  yield takeLatest(`${prefix}/SELECT_PROJECT_TRACK`, selectProjectTrackSaga);
  yield takeLatest(`${prefix}/SEND_APPLICATION`, sendApplicationSaga);
  yield takeLatest(`${prefix}/SEND_TEAM_OFFER`, sendTeamOfferSaga);
}
