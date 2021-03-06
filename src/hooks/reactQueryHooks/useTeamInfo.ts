import { useQuery } from 'react-query';

import { AxiosResponse, AxiosError } from 'axios';

import { TeamInfoResponse } from '../../types/teamTypes';
import { ErrorResponse } from '../../types/commonTypes';

import TeamService from '../../services/TeamService';

import useToken from '../reduxHooks/useToken';

const useTeamInfo = (teamId: number) => {
  const token: string | null = useToken();
  const queryFn = () => TeamService.getTeamInfo(token, teamId);
  const { isLoading, data, isError, error } = useQuery<
    AxiosResponse<TeamInfoResponse>,
    AxiosError<ErrorResponse>
  >(['teamDetailInfo', teamId], queryFn, {
    keepPreviousData: true,
  });

  return {
    isLoading,
    teamData: data?.data.teamData,
    role: data?.data.role,
    isError,
    errorMessage: error?.response?.data.message,
  };
};

export default useTeamInfo;
