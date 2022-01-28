import { axiosInstance } from './../utils/axios';
import { LogInRequestType, LoginResponseSuccess } from '../types/signInTypes';

class SignInService {
  public static async login(
    requestData: LogInRequestType,
  ): Promise<LoginResponseSuccess> {
    const response = await axiosInstance.post<LoginResponseSuccess>(
      '/api/user/sign-in',
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
