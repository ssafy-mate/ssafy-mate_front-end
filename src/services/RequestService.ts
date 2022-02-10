import { axiosInstance } from '../utils/axios';

import { UserApplicationRequestType } from '../types/authTypes';
import { TeamOfferRequestType } from '../types/teamTypes';

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
}

export default RequestService;
