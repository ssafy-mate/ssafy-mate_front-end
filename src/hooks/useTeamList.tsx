import { AxiosResponse, AxiosError } from 'axios';

import { useQuery } from 'react-query';

import TeamService from '../services/TeamService';

import { TeamListResponse } from '../types/teamTypes';

interface TeamListErrorResponse {
  status: number;
  success: boolean;
  message: string;
}

const useTeamList = (params: object) => {
  const queryFn = () => TeamService.getTeamList(params);
  const { isLoading, data, isError, error } = useQuery<
    AxiosResponse<TeamListResponse>,
    AxiosError<TeamListErrorResponse>
  >(['teamList', { params }], queryFn, {
    keepPreviousData: true,
  });

  return {
    isLoading,
    data: data?.data,
    isError,
    errorMessage: error?.response?.data.message,
  };
};

export default useTeamList;
