import { axiosInstance } from '../utils/axios';

import {
  SsafyAuth,
  SignUpResponse,
  EmailVerificationCodeRequest,
  EmailVerificationCodeConfirmRequest,
} from '../types/signUpTypes';

class AuthService {
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
}

export default AuthService;
