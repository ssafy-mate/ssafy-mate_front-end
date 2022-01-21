import { SsafyAuth } from './../types/commonType';
import { axiosInstance } from '../utils/axios';

const getSsafyAuth = async (data: SsafyAuth) => {
  return await axiosInstance.get('/api/user/sign-up/verification/ssafy', {
    params: data,
  });
};

export default getSsafyAuth;
