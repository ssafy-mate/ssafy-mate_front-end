import { axiosInstance } from '../utils/axios';

import {
  ProjectTrackRequestType,
  ProjectParams,
  SignInRequestType,
  SignInResponse,
  EditProfileInfoRequest,
  getProfileInfoRequest,
  updateAuthInfoRequest,
} from '../types/authTypes';
import {
  CodeConfirmForNewPassword,
  EmailForNewPassword,
  FindUserEmailRequest,
  FindUserEmailResponse,
  NewPassword,
  NewPasswordResponse,
} from '../types/accountTypes';
import {
  EditProfileProjectsRequest,
  UserInfoResponse,
} from '../types/userTypes';
import {
  SsafyAuth,
  SignUpResponse,
  EmailVerificationCodeRequest,
  EmailVerificationCodeConfirmRequest,
} from '../types/signUpTypes';

class UserService {
  public static async getUserList(token: string | null, params: object) {
    const response = await axiosInstance.get('/api/auth/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });

    return response;
  }

  public static async getUserInfo(token: string | null, userId: string) {
    const response = await axiosInstance.get(`/api/auth/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  }

  public static async getUserProjects(token: string, userId: number) {
    const response = await axiosInstance.get(
      `/api/auth/users/${userId}/projects`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  }

  public static async getMyTeamId(
    token: string,
    userId: number,
    params: ProjectParams,
  ) {
    const response = await axiosInstance.get(
      `/api/auth/users/${userId}/team-id`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      },
    );

    return response.data.teamId;
  }

  public static async getMyTeamInfo(
    token: string,
    userId: number,
    params: ProjectParams,
  ) {
    const response = await axiosInstance.get(
      `/api/auth/users/${userId}/my-team`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      },
    );

    return response.data;
  }

  public static async selectProjectTrack(
    token: string,
    userId: number,
    project: ProjectTrackRequestType,
  ) {
    const response = await axiosInstance.post(
      `/api/auth/users/${userId}/project-tracks`,
      project,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  }

  public static async getSsafyAuth(data: SsafyAuth): Promise<SignUpResponse> {
    const response = await axiosInstance.get<SignUpResponse>(
      '/api/users/sign-up/verification/ssafy',
      {
        params: data,
      },
    );

    return response.data;
  }

  public static async getEmailVerificationCode(
    data: EmailVerificationCodeRequest,
  ): Promise<SignUpResponse> {
    const response = await axiosInstance.get<SignUpResponse>(
      '/api/users/sign-up/verification/emails',
      {
        params: data,
      },
    );

    return response.data;
  }

  public static async getEmailVerificationCodeConfirm(
    data: EmailVerificationCodeConfirmRequest,
  ): Promise<{ success: boolean }> {
    const response = await axiosInstance.put<{ success: boolean }>(
      '/api/users/sign-up/verification/emails',
      data,
    );

    return response.data;
  }

  public static async signUp(data: FormData): Promise<SignUpResponse> {
    const response = await axiosInstance.post<SignUpResponse>(
      '/api/users',
      data,
    );

    return response.data;
  }

  public static async getUserEmail(
    data: FindUserEmailRequest,
  ): Promise<FindUserEmailResponse> {
    const response = await axiosInstance.get<FindUserEmailResponse>(
      '/api/users/id/searching',
      {
        params: data,
      },
    );

    return response.data;
  }
  public static async getVerificationCodeForNewPassword(
    data: EmailForNewPassword,
  ): Promise<NewPasswordResponse> {
    const response = await axiosInstance.get<NewPasswordResponse>(
      '/api/users/password/new',
      {
        params: data,
      },
    );

    return response.data;
  }

  public static async confirmVerificationCodeForNewPassword(
    data: CodeConfirmForNewPassword,
  ): Promise<NewPasswordResponse> {
    const response = await axiosInstance.post<NewPasswordResponse>(
      '/api/users/password/new',
      data,
    );

    return response.data;
  }

  public static async getNewPassword(
    data: NewPassword,
  ): Promise<NewPasswordResponse> {
    const response = await axiosInstance.put<NewPasswordResponse>(
      '/api/users/password/new',
      data,
    );

    return response.data;
  }

  public static async login(
    requestData: SignInRequestType,
  ): Promise<SignInResponse> {
    const response = await axiosInstance.post<SignInResponse>(
      '/api/users/sign-in',
      requestData,
    );

    return response.data;
  }

  public static async logout(token: string): Promise<void> {
    await axiosInstance.delete('', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  public static async getProfileInfo(
    data: getProfileInfoRequest,
  ): Promise<UserInfoResponse> {
    const response = await axiosInstance.get<UserInfoResponse>(
      `/api/auth/users/${data.userId}`,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      },
    );

    return response.data;
  }

  public static async editProfileInfo(
    data: EditProfileInfoRequest,
  ): Promise<SignUpResponse> {
    const response = await axiosInstance.put<SignUpResponse>(
      `/api/auth/users/${data.userId}/${data.profileInfo}`,
      data.data,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      },
    );

    return response.data;
  }

  public static async editProfileProjectsInfo(
    data: EditProfileProjectsRequest,
  ): Promise<SignUpResponse> {
    const response = await axiosInstance.put<SignUpResponse>(
      `/api/auth/users/${data.userId}/project-tracks`,
      data.data,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      },
    );

    return response.data;
  }

  public static async updateAuthInfo(
    data: updateAuthInfoRequest,
  ): Promise<SignInResponse> {
    const response = await axiosInstance.get<SignInResponse>(
      `/api/auth/users/${data.userId}/my-info`,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      },
    );

    return response.data;
  }

  public static async getReceiveRequests(
    token: string | null,
    userId: number,
    params: ProjectParams,
  ) {
    const response = await axiosInstance.get(
      `/api/auth/users/${userId}/receive-requests`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      },
    );

    return response;
  }

  public static async getSendRequests(
    token: string | null,
    userId: number,
    params: ProjectParams,
  ) {
    const response = await axiosInstance.get(
      `/api/auth/users/${userId}/send-requests`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      },
    );

    return response;
  }
}

export default UserService;
