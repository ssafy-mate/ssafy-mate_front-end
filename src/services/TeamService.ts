import { axiosInstance } from '../utils/axios';

class TeamService {
  public static async getTeamInfo(token: string | null, teamId: string) {
    const response = await axiosInstance.get(`/api/auth/team/info/${teamId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  }
}

export default TeamService;
