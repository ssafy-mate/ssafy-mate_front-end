import { axiosInstance } from './../utils/axios';

import { SignInRequestType, SignInResponse } from '../types/authTypes';

class SignInService {
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
}

export default SignInService;
