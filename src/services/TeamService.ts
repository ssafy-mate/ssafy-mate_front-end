import { axiosInstance } from '../utils/axios';

import { TeamOfferRequestType } from '../types/teamTypes';

class TeamService {
  public static async createMyTeam(token: string, formData: FormData) {
    const response = await axiosInstance.post('/api/auth/team/info', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }

  public static async getTeamInfo(token: string | null, teamId: number) {
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

  public static async leaveTeam(token: string, teamId: number) {
    const response = await axiosInstance.delete(
      `/api/auth/team/leave/${teamId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  }
}

export default TeamService;
