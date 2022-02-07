import { axiosInstance } from '../utils/axios';

import {
  ProjectTrackRequestType,
  ApplicationRequestType,
  GetMyTeamIdParams,
} from '../types/authTypes';
import { CheckBelongToTeamRequestParams } from '../types/userTypes';

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

  public static async sendApplication(
    token: string,
    application: ApplicationRequestType,
  ) {
    const response = await axiosInstance.post(
      '/api/auth/user/request',
      application,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  }

  public static async checkBelongToTeam(
    token: string,
    params: CheckBelongToTeamRequestParams,
  ) {
    const response = await axiosInstance.get('/api/auth/user/team', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });

    return response;
  }

  public static async getMyTeamId(token: string, params: GetMyTeamIdParams) {
    const response = await axiosInstance.get('/api/auth/user/team-id', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });

    return response.data.teamId;
  }
}

export default UserService;
