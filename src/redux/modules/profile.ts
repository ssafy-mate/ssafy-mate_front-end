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
import { UserData, UserInfoResponse } from '../../hooks/useUserInfo';

import ProfileService, {
  EditProfileProjectsRequest,
} from '../../services/ProfileService';

export interface ProfileState {
  info: UserData | null;
  loading: boolean | null;
  error: string | null;
}

export const profileInitialState: ProfileState = {
  info: null,
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

const profile = handleActions<ProfileState, UserData>(
  {
    PENDING: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    UPDATE_PROFILE: (state, action) => ({
      info: action.payload,
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

    if (error.reponse.data.status === 500) {
      yield put(
        showSsafyMateAlert({
          show: true,
          text: error.response.data.message,
          type: 'error',
        }),
      );
    } else {
      yield put(
        showSsafyMateAlert({
          show: true,
          text: error.response.data.message,
          type: 'warning',
        }),
      );
    }
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
    yield (Authdata.token = token);
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

    if (error.reponse.data.status === 500) {
      yield put(
        showSsafyMateAlert({
          show: true,
          text: error.response.data.message,
          type: 'error',
        }),
      );
    } else {
      yield put(
        showSsafyMateAlert({
          show: true,
          text: error.response.data.message,
          type: 'warning',
        }),
      );
    }
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
      yield (Authdata.token = token);
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

    if (error.reponse.data.status === 500) {
      yield put(
        showSsafyMateAlert({
          show: true,
          text: error.response.data.message,
          type: 'error',
        }),
      );
    } else {
      yield put(
        showSsafyMateAlert({
          show: true,
          text: error.response.data.message,
          type: 'warning',
        }),
      );
    }
  }
}

export function* profileSaga() {
  yield takeEvery(`${prefix}/UPDATE_PROFILE_INFO`, updateUserInfoSaga);
  yield takeEvery(`${prefix}/EDIT_PROFILE_INFO`, editUserInfoSaga);
  yield takeEvery(`${prefix}/EDIT_PROFILE_PROJECTS_INFO`, editUserProjectSaga);
}
