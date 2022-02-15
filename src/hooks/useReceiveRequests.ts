import { AxiosResponse, AxiosError } from 'axios';

import { useQuery } from 'react-query';

import { ProjectParams } from '../types/authTypes';
import { ErrorResponse } from '../types/commonTypes';
import { Request } from '../types/userTypes';

import UserService from '../services/UserService';

interface ReceiveRequestsResponse {
  requests: Request[];
}

const useReceiveRequests = (
  token: string | null,
  userId: number,
  params: ProjectParams,
) => {
  const queryFn = () => UserService.getReceiveRequests(token, userId, params);
  const { isLoading, data, isError, error, refetch } = useQuery<
    AxiosResponse<ReceiveRequestsResponse>,
    AxiosError<ErrorResponse>
  >(['receiveRequests', userId], queryFn, {
    keepPreviousData: true,
  });

  return {
    isLoading,
    requests: data?.data.requests,
    isError,
    errorMessage: error?.response?.data.message,
    refetch,
  };
};

export default useReceiveRequests;
