import { axiosInstance } from '../utils/axios';

import { TeamOfferRequestType } from '../types/teamTypes';

class TeamService {
  public static async getTeamInfo(token: string | null, teamId: string) {
    const response = await axiosInstance.get(`/api/auth/team/info/${teamId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  }

  public static async sendTeamOffer(
    token: string | null,
    offer: TeamOfferRequestType,
  ) {
    const response = await axiosInstance.post('/api/auth/team/request', offer, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
}

export default TeamService;
