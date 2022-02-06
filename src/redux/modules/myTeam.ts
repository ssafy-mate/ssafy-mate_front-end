import { push } from 'connected-react-router';

import { Action, createActions, handleActions } from 'redux-actions';
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import Swal from 'sweetalert2';

import TeamService from '../../services/TeamService';

import {
  TeamInfoResponse,
  MyTeamState,
  MyTeamResponse,
  TeamType,
} from '../../types/teamTypes';

const initialState: MyTeamState = {
  myTeam: null,
  loading: false,
  error: null,
};

const prefix = 'ssafy-mate/myTeam';

export const { pending, success, fail } = createActions(
  'PENDING',
  'SUCCESS',
  'FAIL',
  {
    prefix,
  },
);

const reducer = handleActions<MyTeamState, TeamType>(
  {
    PENDING: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    SUCCESS: (state, action) => ({
      myTeam: action.payload,
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
  {
    prefix,
  },
);

export default reducer;

export const { createMyTeam, deleteMyTeam } = createActions(
  'CREATE_MY_TEAM',
  'DELETE_MY_TEAM',
  {
    prefix,
  },
);

function* createMyTeamSaga(action: Action<FormData>) {
  try {
    yield put(pending());

    const token: string = yield select((state) => state.auth.token);
    const response: MyTeamResponse = yield call(
      TeamService.createMyTeam,
      token,
      action.payload,
    );
    const teamInfoResponse: TeamInfoResponse = yield call(
      TeamService.getTeamInfo,
      token,
      response.teamId,
    );

    yield put(success(teamInfoResponse.teamData));

    Swal.fire({
      title: '팀 생성 완료',
      text: response.message,
      icon: 'success',
      showConfirmButton: false,
      timer: 2000,
    });

    yield put(push('/projects/specialization/teams'));
  } catch (error: any) {
    yield put(fail(error.response.data));

    Swal.fire({
      title: '팀 생성 실패',
      text: error.response.data.message,
      icon: 'warning',
      confirmButtonColor: '#3396f4',
      confirmButtonText: '확인',
    });
  }
}

export function* myTeamSaga() {
  yield takeEvery(`${prefix}/CREATE_MY_TEAM`, createMyTeamSaga);
}
