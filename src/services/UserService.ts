import {
  SsafyAuth,
  SignInResopnse,
  EmailVerificationCodeRequest,
  EmailVerificationCodeConfirmRequest,
} from '../types/UserInfomationType';
import { axiosInstance } from '../utils/axios';

class UserService {
  public static async getSsafyAuth(data: SsafyAuth): Promise<SignInResopnse> {
    const response = await axiosInstance.get<SignInResopnse>(
      '/api/user/sign-up/verification/ssafy',
      {
        params: data,
      },
    );
    return response.data;
  }

  public static async getEmailVerificationCode(
    data: EmailVerificationCodeRequest,
  ): Promise<SignInResopnse> {
    const response = await axiosInstance.post<SignInResopnse>(
      '/api/user/sign-up/verification/email',
      data,
    );
    return response.data;
  }

  public static async getEmailVerificationCodeConfirm(
    data: EmailVerificationCodeConfirmRequest,
  ): Promise<SignInResopnse> {
    const response = await axiosInstance.put<SignInResopnse>(
      '/api/user/sign-up/verification/email',
      data,
    );
    return response.data;
  }
} //end for class
export default UserService;
