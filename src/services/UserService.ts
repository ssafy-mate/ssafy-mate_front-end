import { axiosInstance } from '../utils/axios';

const token = 't123456789';

class UserService {
  public static async userDetailInfoApi(userId: string) {
    const response = await axiosInstance.get(`/api/auth/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  }
}

export default UserService;
