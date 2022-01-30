import { AxiosResponse, AxiosError } from 'axios';

import { useQuery } from 'react-query';

import TeamService from '../services/TeamService';

import { TeamItemType } from '../types/teamTypes';

interface TeamListResponse {
  teams: TeamItemType[];
  totalPage: number;
  nowPage: number;
}

interface TeamListErrorResponse {
  status: number;
  success: boolean;
  message: string;
}

const useTeamList = () => {
  const queryFunction = () => TeamService.getTeamList();
  const { isLoading, data, isError, error } = useQuery<
    AxiosResponse<TeamListResponse>,
    AxiosError<TeamListErrorResponse>
  >(['teamList'], queryFunction, {
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
