import { push } from 'connected-react-router';

import { Action, createActions, handleActions } from 'redux-actions';

import { call, put, select, takeEvery } from 'redux-saga/effects';

import UserService from '../../services/UserService';

import type { ProjectTrack } from '../../types/commonTypes';

interface ProjectType {
  projectId: number;
  projectName: string;
  projectTrack?: string | null;
  team: string | null;
}

interface UserState {
  projects: ProjectType[] | null;
  loading: boolean;
  error: Error | null;
}

interface ProjectTrackRequestType {
  projectId: number;
  projectTrack: string;
}

const initialState: UserState = {
  projects: [
    // {
    //   projectId: 1,
    //   projectName: '공통 프로젝트',
    //   projectTrack: null,
    //   team: null,
    // },
    // {
    //   projectId: 2,
    //   projectName: '특화 프로젝트',
    //   projectTrack: null,
    //   team: null,
    // },
    // {
    //   projectId: 3,
    //   projectName: '자율 프로젝트',
    //   team: null,
    // },
  ],
  loading: false,
  error: null,
};

const prefix = 'ssafy-mate/user';

export const { pending, success, fail } = createActions(
  'PENDING',
  'SUCCESS',
  'FAIL',
  { prefix },
);

const reducer = handleActions<UserState, ProjectType[]>(
  {
    PENDING: (state) => ({ ...state, loading: true, error: null }),
    SUCCESS: (state, action) => ({
      projects: action.payload,
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

export const { selectProjectTrack } = createActions('SElECT_PROJECT_TRACK', {
  prefix,
});

function* selectProjectTrackSaga(action: Action<ProjectTrackRequestType>) {
  try {
    yield put(pending());

    const token: string = 't123456789';
    const project: ProjectType = yield call(
      UserService.selectProjectTrack,
      token,
      action.payload,
    );
    const projects: ProjectTrack[] = yield select(
      (state) => state.user.projects,
    );

    yield put(success([...projects, project]));
    yield put(push('/projects/specialization/teams'));
  } catch (error) {
    yield put(fail(new Error('UNKNOWN_ERROR')));
  }
}

export function* userSaga() {
  yield takeEvery(`${prefix}/SElECT_PROJECT_TRACK`, selectProjectTrackSaga);
}
