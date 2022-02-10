import { AxiosResponse, AxiosError } from 'axios';

import { useQuery } from 'react-query';

import { UserListResponse } from '../types/userTypes';
import { ErrorResponse } from '../types/commonTypes';

import UserService from '../services/UserService';

const useUserList = (token: string | null, params: object) => {
  const queryFn = () => UserService.getUserList(token, params);
  const { isLoading, data, isError, error } = useQuery<
    AxiosResponse<UserListResponse>,
    AxiosError<ErrorResponse>
  >(['userList', { params }], queryFn, {
    keepPreviousData: true,
  });

  return {
    isLoading,
    data: data?.data,
    isError,
    errorMessage: error?.response?.data.message,
  };
};

export default useUserList;
