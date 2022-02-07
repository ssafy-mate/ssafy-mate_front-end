import { AxiosResponse } from 'axios';

import { push } from 'connected-react-router';

import { Action, createActions, handleActions } from 'redux-actions';
import { call, put, select, takeEvery } from 'redux-saga/effects';

import Swal from 'sweetalert2';

import TeamService from '../../services/TeamService';

import {
  TeamInfoResponse,
  MyTeamState,
  MyTeamResponse,
  TeamDataType,
  LeaveMyTeamResponse,
} from '../../types/teamTypes';

const initialState: MyTeamState = {
  team: null,
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

const reducer = handleActions<MyTeamState, TeamDataType>(
  {
    PENDING: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    SUCCESS: (state, action) => ({
      ...state,
      team: action.payload,
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

export const { createMyTeam, deleteMyTeam, leaveMyTeam } = createActions(
  'CREATE_MY_TEAM',
  'DELETE_MY_TEAM',
  'LEAVE_MY_TEAM',
  {
    prefix,
  },
);

function* createMyTeamSaga(action: Action<FormData>) {
  try {
    yield put(pending());

    const token: string = yield select((state) => state.auth.token);
    const myTeamResponse: MyTeamResponse = yield call(
      TeamService.createMyTeam,
      token,
      action.payload,
    );
    const teamInfoResponse: AxiosResponse<TeamInfoResponse> = yield call(
      TeamService.getTeamInfo,
      token,
      myTeamResponse.teamId,
    );

    yield put(success(teamInfoResponse.data.teamData));

    Swal.fire({
      title: '팀 생성 완료',
      text: myTeamResponse.message,
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

function* leaveMyTeamSaga(action: Action<number>) {
  try {
    yield put(pending());

    const teamId = action.payload;
    const token: string = yield select((state) => state.auth.token);
    const response: LeaveMyTeamResponse = yield call(
      TeamService.leaveTeam,
      token,
      teamId,
    );

    yield put(success(null));

    Swal.fire({
      title: response.message,
      text: '새로운 팀을 다시 지원해보세요.',
      icon: 'success',
      showConfirmButton: false,
      timer: 2000,
    });

    yield put(push('/projects/specialization/teams'));
  } catch (error: any) {
    yield put(fail(error.response.data));

    Swal.fire({
      title: '팀 탈퇴 오류',
      text: error.response.data.message,
      icon: 'warning',
      confirmButtonColor: '#3396f4',
      confirmButtonText: '확인',
    });
  }
}

export function* myTeamSaga() {
  yield takeEvery(`${prefix}/CREATE_MY_TEAM`, createMyTeamSaga);
  yield takeEvery(`${prefix}/LEAVE_MY_TEAM`, leaveMyTeamSaga);
}
