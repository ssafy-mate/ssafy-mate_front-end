import {
  SsafyAuth,
  SignUpResponse,
  EmailVerificationCodeRequest,
  EmailVerificationCodeConfirmRequest,
  SignUpProfile,
} from '../types/UserInfomationType';
import { axiosInstance } from '../utils/axios';

class UserService {
  public static async getSsafyAuth(data: SsafyAuth): Promise<SignUpResponse> {
    const response = await axiosInstance.get<SignUpResponse>(
      '/api/user/sign-up/verification/ssafy',
      {
        params: data,
      },
    );
    return response.data;
  }

  public static async getEmailVerificationCode(
    data: EmailVerificationCodeRequest,
  ): Promise<SignUpResponse> {
    const response = await axiosInstance.post<SignUpResponse>(
      '/api/user/sign-up/verification/email',
      data,
    );
    return response.data;
  }

  public static async getEmailVerificationCodeConfirm(
    data: EmailVerificationCodeConfirmRequest,
  ): Promise<SignUpResponse> {
    const response = await axiosInstance.put<SignUpResponse>(
      '/api/user/sign-up/verification/email',
      data,
    );
    return response.data;
  }

  public static async signUp(data: SignUpProfile): Promise<SignUpResponse> {
    const response = await axiosInstance.post<SignUpResponse>(
      '/api/user',
      data,
    );
    return response.data;
  }
} //end for class
export default UserService;
