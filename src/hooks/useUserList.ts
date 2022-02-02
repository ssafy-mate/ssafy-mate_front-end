import { AxiosResponse, AxiosError } from 'axios';

import { useQuery } from 'react-query';

import { UserListResponse } from '../types/userTypes';
import { ErrorResponse } from '../types/commonTypes';

import ProjectService from '../services/ProjectService';

const useUserList = (params: object) => {
  const queryFn = () => ProjectService.getUserList(params);
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
