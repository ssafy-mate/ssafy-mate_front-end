import { Action, createActions, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  UserData,
  UserInfoResponse,
  UserProject,
  UserTechStack,
} from '../../hooks/useUserInfo';
import ProfileService, {
  getProfileInfoRequest,
} from '../../services/ProfileService';
import { showSsafyMateAlert } from './alert';

export interface ProfileData {
  userId: number | null;
  userName: string | null;
  userEmail: string | null;
  profileImgUrl: string | null;
  campus: string | null;
  ssafyTrack: string | null;
  selfIntroduction: string | null;
  job1: string | null;
  job2: string | null;
  projects: UserProject[] | null;
  techStacks: UserTechStack[] | null;
  githubUrl: string | null;
  etcUrl: string | null;
  loading: boolean | null;
  error: string | null;
}

export const profileInitialState: ProfileData = {
  userId: null,
  userName: null,
  userEmail: null,
  profileImgUrl: null,
  campus: null,
  ssafyTrack: null,
  selfIntroduction: null,
  job1: null,
  job2: null,
  projects: null,
  techStacks: null,
  githubUrl: null,
  etcUrl: null,
  loading: false,
  error: null,
};

const prefix = 'ssafy-mate/profile';

export const { pending, updateProfile, fail } = createActions(
  'PENDING',
  'UPDATE_PROFILE',
  'FAIL',
  {
    prefix,
  },
);

const profile = handleActions<ProfileData, UserData>(
  {
    PENDING: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    UPDATE_PROFILE: (state, action) => ({
      ...state,
      userId: action.payload.userId,
      userName: action.payload.userName,
      userEmail: action.payload.userEmail,
      profileImgUrl: action.payload.profileImgUrl,
      campus: action.payload.campus,
      ssafyTrack: action.payload.ssafyTrack,
      selfIntroduction: action.payload.selfIntroduction,
      job1: action.payload.job1,
      job2: action.payload.job2,
      projects: action.payload.projects,
      techStacks: action.payload.techStacks,
      githubUrl: action.payload.githubUrl,
      etcUrl: action.payload.etcUrl,
      loading: true,
      error: null,
    }),
    FAIL: (state, action: any) => ({
      ...state,
      loading: false,
      error: action.payload.message,
    }),
  },
  profileInitialState,
  {
    prefix,
  },
);

export default profile;

//saga
export const { updateUserInfo } = createActions('UPDATE_USER_INFO', {
  prefix,
});

function* updateUserInfoSaga(action: Action<getProfileInfoRequest>) {
  try {
    yield put(pending());

    const data: UserInfoResponse = yield call(ProfileService.getProfileInfo, {
      token: action.payload.token,
      userId: action.payload.userId,
    });

    yield put(updateProfile(data.userData));
  } catch (error: any) {
    alert(JSON.stringify(action));
    yield put(fail(error?.response?.data || 'UNKNOWN ERROR'));

    yield put(
      showSsafyMateAlert({
        show: true,
        text: error.response.data.message,
        type: 'warning',
      }),
    );
  }
}

export function* profileSaga() {
  yield takeEvery(`${prefix}/UPDATE_USER_INFO`, updateUserInfoSaga);
}
