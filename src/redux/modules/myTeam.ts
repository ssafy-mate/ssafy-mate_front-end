import { AxiosResponse } from 'axios';

import { push } from 'connected-react-router';

import { Action, createActions, handleActions } from 'redux-actions';
import { call, put, select, takeEvery } from 'redux-saga/effects';

import Swal from 'sweetalert2';

import UserService from '../../services/UserService';
import TeamService from '../../services/TeamService';

import { ProjectParams } from '../../types/authTypes';
import {
  TeamInfoResponse,
  MyTeamState,
  MyTeamResponse,
  TeamDataType,
  TeamEditRequest,
  LeaveMyTeamResponse,
  DeleteTeamResponse,
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

export const { createTeam, getTeam, editTeam, deleteTeam, leaveTeam } =
  createActions(
    'CREATE_TEAM',
    'GET_TEAM',
    'EDIT_TEAM',
    'DELETE_TEAM',
    'LEAVE_TEAM',
    {
      prefix,
    },
  );

function* createTeamSaga(action: Action<FormData>) {
  try {
    yield put(pending());

    const token: string = yield select((state) => state.auth.token);
    const myTeamResponse: MyTeamResponse = yield call(
      TeamService.createTeam,
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

function* getTeamSaga(action: Action<ProjectParams>) {
  try {
    yield put(pending());

    const token: string = yield select((state) => state.auth.token);
    const userId: number = yield select((state) => state.auth.userId);
    const teamInfoResponse: TeamInfoResponse = yield call(
      UserService.getMyTeamInfo,
      token,
      userId,
      action.payload,
    );

    yield put(success(teamInfoResponse.teamData));
  } catch (error: any) {
    yield put(fail(error.response.data));

    Swal.fire({
      title: '합류된 팀 정보 조회 실패',
      text: error.response.data.message,
      icon: 'warning',
      confirmButtonColor: '#3396f4',
      confirmButtonText: '확인',
    });
  }
}

function* editTeamSaga(action: Action<TeamEditRequest>) {
  try {
    yield put(pending());

    const token: string = yield select((state) => state.auth.token);
    const myTeamResponse: MyTeamResponse = yield call(
      TeamService.editTeam,
      token,
      action.payload.teamId,
      action.payload.formData,
    );
    const teamInfoResponse: AxiosResponse<TeamInfoResponse> = yield call(
      TeamService.getTeamInfo,
      token,
      myTeamResponse.teamId,
    );

    yield put(success(teamInfoResponse.data.teamData));

    Swal.fire({
      title: '팀 정보 수정 완료',
      text: myTeamResponse.message,
      icon: 'success',
      showConfirmButton: false,
      timer: 2000,
    });

    yield put(push(`/teams/${myTeamResponse.teamId}`));
  } catch (error: any) {
    yield put(fail(error.response.data));

    Swal.fire({
      title: '팀 정보 수정 생성 실패',
      text: error.response.data.message,
      icon: 'warning',
      confirmButtonColor: '#3396f4',
      confirmButtonText: '확인',
    });
  }
}

function* deleteTeamSaga(action: Action<number>) {
  try {
    yield put(pending());
    const token: string = yield select((state) => state.auth.token);
    const response: DeleteTeamResponse = yield call(
      TeamService.deleteTeam,
      token,
      action.payload,
    );

    yield put(success(null));

    Swal.fire({
      title: '팀 삭제 완료',
      text: response.message,
      icon: 'success',
      showConfirmButton: false,
      timer: 2000,
    });

    yield put(push('/projects/specialization/teams'));
  } catch (error: any) {
    yield put(fail(error.response.data));

    Swal.fire({
      title: '팀 삭제 처리 실패',
      text: error.response.data.message,
      icon: 'warning',
      confirmButtonColor: '#3396f4',
      confirmButtonText: '확인',
    });
  }
}

function* leaveTeamSaga(action: Action<number>) {
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
      title: '팀 탈퇴 처리 완료',
      text: response.message,
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
  yield takeEvery(`${prefix}/CREATE_TEAM`, createTeamSaga);
  yield takeEvery(`${prefix}/GET_TEAM`, getTeamSaga);
  yield takeEvery(`${prefix}/EDIT_TEAM`, editTeamSaga);
  yield takeEvery(`${prefix}/DELETE_TEAM`, deleteTeamSaga);
  yield takeEvery(`${prefix}/LEAVE_TEAM`, leaveTeamSaga);
}
