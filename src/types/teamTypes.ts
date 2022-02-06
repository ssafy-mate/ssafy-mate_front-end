import { TechStack, TechStackWithImg } from './commonTypes';

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

export interface TeamOfferRequestType {
  project: string;
  userId: number;
  message: string;
}

interface TeamOwner {
  userId: number;
  userName: string;
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
  techStacks: TechStackWithImg[];
  members: TeamMember[];
  totalRecruitment: number;
  frontendRecruitment: number;
  backendRecruitment: number;
  totalHeadcount: number;
  frontendHeadcount: number;
  backendHeadcount: number;
}

export interface TeamInfoResponse {
  teamData: TeamData;
}

interface TeamOwner {
  userId: number;
  userName: string;
}

export interface TeamType {
  teamId: number;
  teamName: string;
  teamImgUrl: string | null;
  owner: TeamOwner;
  campus: string;
  project: string;
  projectTrack: string;
  notice: string;
  introduction: string | null;
  techStacks: TechStackWithImg[];
  totalRecruitment: 6;
  totalHeadcount: 5;
  frontendRecruitment: 3;
  frontendHeadcount: 3;
  backendRecruitment: 3;
  backendHeadcount: 2;
  members: TeamMember[];
  createDateTime: string;
}

export interface MyTeamResponse {
  teamId: number;
  message: string;
}

export interface MyTeamState {
  myTeam: TeamType | null;
  loading: boolean;
  error: string | null;
}
