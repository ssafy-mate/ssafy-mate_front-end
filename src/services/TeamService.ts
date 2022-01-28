import { axiosInstance } from '../utils/axios';

const token = 't123456789';

class TeamService {
  public static async getTeamDetailInfo(teamId: string) {
    const response = await axiosInstance.get(`/api/auth/team/${teamId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  }
}

export default TeamService;
