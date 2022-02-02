import { axiosInstance } from '../utils/axios';

interface ProjectTrackRequestType {
  projectId: number;
  projectTrack: string;
}

class UserService {
  public static async userDetailInfoApi(userId: string) {
    const token = 't123456789';
    const response = await axiosInstance.get(`/api/auth/user/${userId}`, {
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
    const response = await axiosInstance.post(`/api/auth/project`, project, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
}

export default UserService;
