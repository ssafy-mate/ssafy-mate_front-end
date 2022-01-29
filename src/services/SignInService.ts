import { axiosInstance } from './../utils/axios';
import { SignInRequestType, SignInUser } from '../types/signInTypes';

class SignInService {
  public static async login(
    requestData: SignInRequestType,
  ): Promise<SignInUser> {
    const response = await axiosInstance.post<SignInUser>(
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
