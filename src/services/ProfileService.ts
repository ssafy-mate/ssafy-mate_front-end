import { UserInfoResponse } from '../hooks/useUserInfo';
import {
  EditProfileInfoRequest,
  getProfileInfoRequest,
  SignInResponse,
  updateAuthInfoRequest,
} from '../types/authTypes';
import { SignUpResponse } from '../types/signUpTypes';
import { axiosInstance } from '../utils/axios';
export interface project {
  project: string;
  projectTrack: string | null;
}
export interface EditProfileProjectsRequest {
  data: project;
  token: string;
  userId: number;
}

class ProfileService {
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
}

export default ProfileService;
