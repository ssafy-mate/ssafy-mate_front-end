import { useQuery } from 'react-query';

import { AxiosResponse, AxiosError } from 'axios';

import { UserInfoResponse } from '../types/userTypes';
import { ErrorResponse } from '../types/commonTypes';

import UserService from '../services/UserService';

import useToken from './useToken';

const useUserInfo = (userId: string) => {
  const token: string | null = useToken();
  const queryFunction = () => UserService.getUserInfo(token, userId);
  const { isLoading, data, isError, error } = useQuery<
    AxiosResponse<UserInfoResponse>,
    AxiosError<ErrorResponse>
  >(['userDetailInfo', userId], queryFunction, {
    keepPreviousData: true,
  });

  return {
    isLoading,
    userData: data?.data.userData,
    isError,
    errorMessage: error?.response?.data.message,
  };
};

export default useUserInfo;
