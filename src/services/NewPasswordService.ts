import {
  CodeConfirmForNewPassword,
  EmailForNewPassword,
  NewPasswordResponse,
  NewPassword,
} from '../types/accountTypes';

import { axiosInstance } from '../utils/axios';

class NewPasswordService {
  public static async getVerificationCodeForNewPassword(
    data: EmailForNewPassword,
  ): Promise<NewPasswordResponse> {
    const response = await axiosInstance.get<NewPasswordResponse>(
      '/api/users/password/new',
      {
        params: data,
      },
    );

    return response.data;
  }

  public static async confirmVerificationCodeForNewPassword(
    data: CodeConfirmForNewPassword,
  ): Promise<NewPasswordResponse> {
    const response = await axiosInstance.post<NewPasswordResponse>(
      '/api/users/password/new',
      data,
    );

    return response.data;
  }

  public static async getNewPassword(
    data: NewPassword,
  ): Promise<NewPasswordResponse> {
    const response = await axiosInstance.put<NewPasswordResponse>(
      '/api/users/password/new',
      data,
    );

    return response.data;
  }
}

export default NewPasswordService;
