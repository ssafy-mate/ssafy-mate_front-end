import { axiosInstance } from '../utils/axios';

const token = 't123456789';

class ProjectService {
  public static async getTeamList(params: object) {
    const response = await axiosInstance.get('/api/auth/project/team-list', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });

    return response;
  }

  public static async getUserList(params: object) {
    const response = await axiosInstance.get('/api/auth/project/user-list', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });

    return response;
  }
}

export default ProjectService;
