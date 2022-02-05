import { useQuery } from 'react-query';

import { AxiosResponse, AxiosError } from 'axios';

import { ErrorResponse } from '../types/commonTypes';

import UserService from '../services/UserService';

import useToken from './useToken';

interface UserProjectTeam {
  teamId: number;
  teamName: string;
}

interface UserProject {
  id: number;
  name: string;
  projectTrack: string | null;
  projectTeam: UserProjectTeam | null;
}

interface UserTechStack {
  id: number;
  techStackName: string;
  techStackImgUrl: string;
  techStackLevel: string;
}

interface UserData {
  userId: number;
  userName: string;
  userEmail: string;
  profileImgUrl: string | null;
  campus: string;
  ssafyTrack: string;
  selfIntroduction: string;
  job1: string;
  job2: string | null;
  projects: UserProject[];
  techStacks: UserTechStack[];
  githubUrl: string | null;
  etcUrl: string | null;
}

interface UserInfoResponse {
  userData: UserData;
}

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
