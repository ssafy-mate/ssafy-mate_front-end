import { TechStack } from './commonTypes';

export interface TeamMemberType {
  userId: number;
  userName: string;
  profileImgUrl: string;
  job1: string;
  ssafyTrack: string;
}

export interface TeamMember {
  userId: number;
  userName: string;
  profileImgUrl: string;
  ssafyTrack: string;
  job1: string;
  job2?: string;
}

export interface TeamItemType {
  teamId: number;
  teamName: string;
  teamImgUrl: string | null;
  campus: string;
  project: string;
  projectTrack?: string | null;
  notice: string;
  techStacks: TechStack[];
  totalRecruitment: number;
  totalHeadcount: number;
  frontendRecruitment: number;
  frontendHeadcount: number;
  backendRecruitment: number;
  backendHeadcount: number;
  createDateTime: Date;
  isRecruiting: boolean;
}

export interface TeamListResponse {
  teams: TeamItemType[];
  totalPage: number;
  nowPage: number;
  totalElement: number;
}
