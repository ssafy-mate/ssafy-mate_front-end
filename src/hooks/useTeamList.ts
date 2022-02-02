import { AxiosResponse, AxiosError } from 'axios';

import { useQuery } from 'react-query';

import { TeamListResponse } from '../types/teamTypes';
import { ErrorResponse } from '../types/commonTypes';

import ProjectService from '../services/ProjectService';

const useTeamList = (params: object) => {
  const queryFn = () => ProjectService.getTeamList(params);
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
