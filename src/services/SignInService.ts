import { axiosInstance } from '../utils/axios';

export const Studuent = (studentData: any) =>
  axiosInstance.post('/api/verification/ssafy', studentData);
