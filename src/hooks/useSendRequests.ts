import { AxiosResponse, AxiosError } from 'axios';

import { useQuery } from 'react-query';

import { ProjectParams } from '../types/authTypes';
import { ErrorResponse } from '../types/commonTypes';
import { UserRequestType, TeamRequestType } from '../types/userTypes';

import UserService from '../services/UserService';

interface SendRequestsResponse {
  userRequests: UserRequestType[] | null;
  teamRequests: TeamRequestType[] | null;
}

const useSendRequests = (
  token: string | null,
  userId: number,
  params: ProjectParams,
) => {
  const queryFn = () => UserService.getSendRequests(token, userId, params);
  const { isLoading, data, isError, error, refetch } = useQuery<
    AxiosResponse<SendRequestsResponse>,
    AxiosError<ErrorResponse>
  >(['receiveRequests', userId], queryFn, {
    keepPreviousData: true,
  });

  return {
    isLoading,
    userRequests: data?.data.userRequests,
    teamRequests: data?.data.teamRequests,
    isError,
    errorMessage: error?.response?.data.message,
    refetch,
  };
};

export default useSendRequests;
