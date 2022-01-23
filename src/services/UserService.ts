import {
  SsafyAuth,
  SignInResponse,
  EmailVerificationCodeRequest,
  EmailVerificationCodeConfirmRequest,
  SignInProfile,
} from '../types/UserInfomationType';
import { axiosInstance } from '../utils/axios';

class UserService {
  public static async getSsafyAuth(data: SsafyAuth): Promise<SignInResponse> {
    const response = await axiosInstance.get<SignInResponse>(
      '/api/user/sign-up/verification/ssafy',
      {
        params: data,
      },
    );
    return response.data;
  }

  public static async getEmailVerificationCode(
    data: EmailVerificationCodeRequest,
  ): Promise<SignInResponse> {
    const response = await axiosInstance.post<SignInResponse>(
      '/api/user/sign-up/verification/email',
      data,
    );
    return response.data;
  }

  public static async getEmailVerificationCodeConfirm(
    data: EmailVerificationCodeConfirmRequest,
  ): Promise<SignInResponse> {
    const response = await axiosInstance.put<SignInResponse>(
      '/api/user/sign-up/verification/email',
      data,
    );
    return response.data;
  }

  public static async signIn(data: SignInProfile): Promise<SignInResponse> {
    const response = await axiosInstance.post<SignInResponse>(
      '/api/user',
      data,
    );
    return response.data;
  }
} //end for class
export default UserService;
