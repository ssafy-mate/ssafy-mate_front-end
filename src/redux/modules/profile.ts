import { Action, createActions, handleActions } from 'redux-actions';
import { call, put, select, takeEvery } from 'redux-saga/effects';

import { showSsafyMateAlert } from './alert';
import { success } from './auth';

import { SignUpResponse } from './../../types/signUpTypes';
import {
  EditProfileInfoRequest,
  getProfileInfoRequest,
  SignInResponse,
} from '../../types/authTypes';
import {
  UserData,
  UserInfoResponse,
  UserProject,
  UserTechStack,
} from '../../hooks/useUserInfo';

import ProfileService, {
  EditProfileProjectsRequest,
} from '../../services/ProfileService';

export interface ProfileState {
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

export const profileInitialState: ProfileState = {
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

export interface ProfileStateResponse {
  userId: number;
  userName: string;
  userEmail: string;
  profileImgUrl: string | null;
  campus: string;
  ssafyTrack: string;
  selfIntroduction: string;
  job1: string;
  job2: string | null;
  projects: UserProject[];
  techStacks: UserTechStack[];
  githubUrl: string | null;
  etcUrl: string | null;
}

const prefix = 'ssafy-mate/profile';

export const { pending, updateProfile, fail } = createActions(
  'PENDING',
  'UPDATE_PROFILE',
  'FAIL',
  {
    prefix,
  },
);

const profile = handleActions<ProfileState, UserData>(
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
export const { updateProfileInfo, editProfileInfo, editProfileProjectsInfo } =
  createActions(
    'UPDATE_PROFILE_INFO',
    'EDIT_PROFILE_INFO',
    'EDIT_PROFILE_PROJECTS_INFO',
    {
      prefix,
    },
  );
function* editUserProjectSaga(action: Action<EditProfileProjectsRequest>) {
  try {
    yield put(pending());

    const token: string = yield select((state) => state.auth.token);
    const userId: number = yield select((state) => state.auth.userId);

    const response: SignUpResponse = yield call(
      ProfileService.editProfileProjectsInfo,
      {
        data: action.payload.data,
        token: token,
        userId: userId,
      },
    );

    yield put(
      showSsafyMateAlert({
        show: true,
        text: response.message,
        type: 'success',
      }),
    );
  } catch (error: any) {
    yield put(fail(error?.response?.data || 'UNKNOWN ERROR'));

    yield put(
      showSsafyMateAlert({
        show: true,
        text: error.response.data.message,
        type: 'warning',
      }),
    );
  } finally {
    const token: string = yield select((state) => state.auth.token);
    const userId: number = yield select((state) => state.auth.userId);

    const profileData: UserInfoResponse = yield call(
      ProfileService.getProfileInfo,
      {
        token: token,
        userId: userId,
      },
    );

    yield put(updateProfile(profileData.userData));

    const Authdata: SignInResponse = yield call(ProfileService.updateAuthInfo, {
      token: token,
      userId: userId,
    });

    yield put(success(Authdata));
  }
}

function* editUserInfoSaga(action: Action<EditProfileInfoRequest>) {
  try {
    yield put(pending());

    const token: string = yield select((state) => state.auth.token);
    const userId: number = yield select((state) => state.auth.userId);

    const response: SignUpResponse = yield call(
      ProfileService.editProfileInfo,
      {
        data: action.payload.data,
        token: token,
        userId: userId,
        profileInfo: action.payload.profileInfo,
      },
    );

    yield put(
      showSsafyMateAlert({
        show: true,
        text: response.message,
        type: 'success',
      }),
    );
  } catch (error: any) {
    yield put(fail(error?.response?.data || 'UNKNOWN ERROR'));

    yield put(
      showSsafyMateAlert({
        show: true,
        text: error.response.data.message,
        type: 'warning',
      }),
    );
  } finally {
    const token: string = yield select((state) => state.auth.token);
    const userId: number = yield select((state) => state.auth.userId);

    const profileData: UserInfoResponse = yield call(
      ProfileService.getProfileInfo,
      {
        token: token,
        userId: userId,
      },
    );

    yield put(updateProfile(profileData.userData));

    if (action.payload.profileInfo === 'ssafy-track') {
      const Authdata: SignInResponse = yield call(
        ProfileService.updateAuthInfo,
        {
          token: token,
          userId: userId,
        },
      );

      yield put(success(Authdata));
    }
  }
}

function* updateUserInfoSaga(action: Action<getProfileInfoRequest>) {
  try {
    yield put(pending());

    const token: string = yield select((state) => state.auth.token);
    const userId: number = yield select((state) => state.auth.userId);

    const data: UserInfoResponse = yield call(ProfileService.getProfileInfo, {
      token: token,
      userId: userId,
    });

    yield put(updateProfile(data.userData));
  } catch (error: any) {
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
  yield takeEvery(`${prefix}/UPDATE_PROFILE_INFO`, updateUserInfoSaga);
  yield takeEvery(`${prefix}/EDIT_PROFILE_INFO`, editUserInfoSaga);
  yield takeEvery(`${prefix}/EDIT_PROFILE_PROJECTS_INFO`, editUserProjectSaga);
}
