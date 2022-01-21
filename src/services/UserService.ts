import { SsafyAuth, SsafyAuthResopnse } from '../types/commonType';
import { axiosInstance } from '../utils/axios';

class UserService {
  public static async getSsafyAuth(
    data: SsafyAuth,
  ): Promise<SsafyAuthResopnse> {
    const response = await axiosInstance.get<SsafyAuthResopnse>(
      '/api/user/sign-up/verification/ssafy',
      {
        params: data,
      },
    );
    return response.data;
  }
} //end for class
export default UserService;
