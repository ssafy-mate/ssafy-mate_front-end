import { useQuery } from 'react-query';

import { AxiosResponse, AxiosError } from 'axios';

import { TeamMember } from '../types/teamTypes';

import TeamService from '../services/TeamService';

interface TeamOwner {
  userId: number;
  userName: string;
}

interface TeamTechStack {
  id: number;
  techStackName: string;
}

interface TeamData {
  teamId: number;
  teamName: string;
  owner: TeamOwner;
  teamImgUrl: string;
  campus: string;
  project: string;
  projectTrack: string;
  notice: string;
  introduction: string;
  createDateTime: string;
  techStacks: TeamTechStack[];
  members: TeamMember[];
  totalRecruitment: number;
  frontendRecruitment: number;
  backendRecruitment: number;
  totalHeadcount: number;
  frontendHeadcount: number;
  backendHeadcount: number;
}

interface TeamDetailInfoResponse {
  teamData?: TeamData;
  status?: number;
  success?: boolean;
  message?: string;
}

const useTeamDetailInfo = (teamId: string) => {
  const queryFunction = () => TeamService.getTeamDetailInfo(teamId);
  const { isLoading, data, isError, error } = useQuery<
    AxiosResponse<TeamDetailInfoResponse>,
    AxiosError
  >(['teamDetailInfo', teamId], queryFunction, {
    keepPreviousData: true,
  });

  return {
    isLoading,
    teamData: data?.data.teamData,
    isError,
    errorMessage: error?.response?.data.message,
  };
};

export default useTeamDetailInfo;
