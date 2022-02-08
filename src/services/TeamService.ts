import { axiosInstance } from '../utils/axios';

class TeamService {
  public static async createMyTeam(token: string, formData: FormData) {
    const response = await axiosInstance.post('/api/auth/teams', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }

  public static async getTeamList(token: string | null, params: object) {
    const response = await axiosInstance.get('/api/auth/teams', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });

    return response;
  }

  public static async getTeamInfo(token: string | null, teamId: number) {
    const response = await axiosInstance.get(`/api/auth/teams/${teamId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  }

  public static async leaveTeam(token: string, teamId: number) {
    const response = await axiosInstance.delete(
      `/api/auth/teams/${teamId}/leave`,
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
