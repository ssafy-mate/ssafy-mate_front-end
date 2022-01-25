import { axiosInstance } from '../utils/axios';

const token = 't123456789';

export const teamDetailInfoApi = (teamId: string) =>
  axiosInstance.get(`/api/auth/team/${teamId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
