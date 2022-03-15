import { AxiosResponse, AxiosError } from 'axios';

import { useQuery } from 'react-query';

import { TeamListResponse } from '../../types/teamTypes';
import { ErrorResponse } from '../../types/commonTypes';

import TeamService from '../../services/TeamService';

const useTeamList = (token: string | null, params: object) => {
  const queryFn = () => TeamService.getTeamList(token, params);
  const { isLoading, data, isError, error } = useQuery<
    AxiosResponse<TeamListResponse>,
    AxiosError<ErrorResponse>
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
