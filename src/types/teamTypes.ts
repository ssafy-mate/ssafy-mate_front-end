import { TechStack, TechStackWithImg } from './commonTypes';

export type RoleType = 'owner' | 'member' | 'outsider';

interface TeamOwner {
  userId: number;
  userName: string;
}

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

export interface TeamDataType {
  teamId: number;
  teamName: string;
  teamImgUrl: string | null;
  campus: string;
  project: string;
  projectTrack: string;
  owner: TeamOwner;
  notice: string;
  introduction: string | null;
  techStacks: TechStackWithImg[];
  members: TeamMember[];
  totalRecruitment: number;
  totalHeadcount: number;
  frontendRecruitment: number;
  frontendHeadcount: number;
  backendRecruitment: number;
  backendHeadcount: number;
  createDateTime: string;
}

export interface TeamInfoResponse {
  teamData: TeamDataType;
  role: RoleType;
}

export interface MyTeamResponse {
  teamId: number;
  message: string;
}

export interface MyTeamState {
  team: TeamDataType | null;
  loading: boolean;
  error: string | null;
}

export interface LeaveMyTeamResponse {
  message: string;
}

export interface TeamEditRequest {
  teamId: number;
  formData: FormData;
}

export interface TeamEditInfoResponse {
  teamId: number;
  teamName: string;
  teamImgUrl: any | null;
  campus: string;
  project: string;
  projectTrack: string;
  notice: string;
  introduction: string | null;
  techStacks: TechStackWithImg[];
  totalRecruitment: number;
  totalHeadcount: number;
  frontendRecruitment: number;
  frontendHeadcount: number;
  backendRecruitment: number;
  backendHeadcount: number;
}

export interface DeleteTeamResponse {
  message: string;
}
