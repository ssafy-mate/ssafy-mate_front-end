import {
  CodeConfirmForNewPassword,
  emailForNewPassword,
  newPasswordResponse,
  NewPassword,
} from '../types/authTypes';

import { axiosInstance } from '../utils/axios';

class NewPasswordService {
  public static async getVerificationCodeForNewPassword(
    data: emailForNewPassword,
  ): Promise<newPasswordResponse> {
    const response = await axiosInstance.get<newPasswordResponse>(
      '/api/user/pw-search',
      {
        params: data,
      },
    );

    return response.data;
  }

  public static async confirmVerificationCodeForNewPassword(
    data: CodeConfirmForNewPassword,
  ): Promise<newPasswordResponse> {
    const response = await axiosInstance.post<newPasswordResponse>(
      '/api/user/pw-search',
      data,
    );

    return response.data;
  }

  public static async getNewPassword(
    data: NewPassword,
  ): Promise<newPasswordResponse> {
    const response = await axiosInstance.put<newPasswordResponse>(
      '/api/user/pw-search',
      data,
    );

    return response.data;
  }
}

export default NewPasswordService;
