import { axiosInstance } from '../utils/axios';

import { UserApplicationRequestType } from '../types/authTypes';
import { TeamOfferRequestType } from '../types/teamTypes';
import { ResponseOfTheRequestType } from '../types/userTypes';

class RequestService {
  public static async sendUserApplication(
    token: string,
    userApplication: UserApplicationRequestType,
  ) {
    const response = await axiosInstance.post(
      '/api/auth/requests/users',
      userApplication,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  }

  public static async sendTeamOffer(
    token: string | null,
    teamOffer: TeamOfferRequestType,
  ) {
    const response = await axiosInstance.post(
      '/api/auth/requests/teams',
      teamOffer,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  }

  public static async sendResponseOfTheRequest(
    token: string | null,
    responseOfTheRequest: ResponseOfTheRequestType,
  ): Promise<string> {
    const response = await axiosInstance.put(
      '/api/auth/requests/responses',
      responseOfTheRequest,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data.message;
  }

  public static async deleteRequestItem(
    token: string | null,
    requestId: number,
  ): Promise<string> {
    const response = await axiosInstance.put(
      `/api/auth/requests/read-check/${requestId}`,
      {
        requestId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data.message;
  }
}

export default RequestService;
