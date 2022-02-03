import { axiosInstance } from '../utils/axios';

interface ProjectTrackRequestType {
  projectId: number;
  projectTrack: string;
}

class UserService {
  public static async getUserInfo(token: string | null, userId: string) {
    const response = await axiosInstance.get(`/api/auth/user/info/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  }

  public static async selectProjectTrack(
    token: string,
    project: ProjectTrackRequestType,
  ) {
    const response = await axiosInstance.post(
      '/api/auth/user/project/track',
      project,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  }

  public static async getUserProjects(token: string) {
    const response = await axiosInstance.get('/api/auth/user/projects', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
}

export default UserService;
