import { UserInfoResponse } from '../hooks/useUserInfo';
import { axiosInstance } from '../utils/axios';

export interface getProfileInfoRequest {
  token: string;
  userId: number;
}

class ProfileService {
  public static async getProfileInfo(
    data: getProfileInfoRequest,
  ): Promise<UserInfoResponse> {
    const response = await axiosInstance.get<UserInfoResponse>(
      `/api/auth/user/info/${data.userId}`,
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
