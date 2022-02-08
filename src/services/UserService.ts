import { axiosInstance } from '../utils/axios';

import { ProjectTrackRequestType, GetMyTeamIdParams } from '../types/authTypes';

class UserService {
  public static async getUserList(token: string | null, params: object) {
    const response = await axiosInstance.get('/api/auth/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });

    return response;
  }

  public static async getUserInfo(token: string | null, userId: string) {
    const response = await axiosInstance.get(`/api/auth/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  }

  public static async selectProjectTrack(
    token: string,
    userId: number,
    project: ProjectTrackRequestType,
  ) {
    const response = await axiosInstance.post(
      `/api/auth/users/${userId}/project-tracks`,
      project,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  }

  public static async getUserProjects(token: string, userId: number) {
    const response = await axiosInstance.get(
      `/api/auth/users/${userId}/projects`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  }

  public static async getMyTeamId(
    token: string,
    userId: number,
    params: GetMyTeamIdParams,
  ) {
    const response = await axiosInstance.get(
      `/api/auth/users/${userId}/team-id`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      },
    );

    return response.data.teamId;
  }
}

export default UserService;
