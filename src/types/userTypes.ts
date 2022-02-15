import { TechStack } from './commonTypes';

interface TechStackWithLevel {
  techStackName: string;
  techStackLevel: string;
}

export interface UserType {
  userId: number;
  userName: string;
  email: string;
  selfIntroduction: string;
  profileImgUrl: string;
  campus: string;
  ssafyTrack: string;
  projectTrack: string;
  job1: string;
  job2: string;
  techStacks: TechStackWithLevel[];
  githubUrl: string;
  etcUrl: string;
}

export interface UserItemType {
  userId: number;
  userName: string;
  profileImgUrl: string | null;
  campus: string;
  projectTrack: string;
  ssafyTrack: string;
  techStacks: TechStack[];
  job1: string;
  job2: string | null;
  githubUrl: string | null;
  belongToTeam: boolean;
}

export interface UserListResponse {
  users: UserItemType[];
  totalPage: number;
  nowPage: number;
  totalElement: number;
}

export interface GetMyTeamIdParams {
  project: string;
}

interface UserProjectTeam {
  teamId: number;
  teamName: string;
}

interface UserProject {
  projectId: number;
  project: string;
  projectTrack: string | null;
  projectTeam: UserProjectTeam | null;
}

export interface UserTechStack {
  techStackId: number;
  techStackName: string;
  techStackImgUrl: string;
  techStackLevel: string;
}

export interface UserData {
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

export interface UserInfoResponse {
  userData: UserData;
}

export interface ProfileProject {
  project: string;
  projectTrack: string | null;
}

export interface EditProfileProjectsRequest {
  data: ProfileProject;
  token: string;
  userId: number;
}

export interface ProfileState {
  info: UserData | null;
  loading: boolean | null;
  error: string | null;
}

export type RequestStatusType =
  | 'pending'
  | 'approval'
  | 'rejection'
  | 'expiration'
  | 'cancellation';

export type ResponseStatusType = 'approval' | 'rejection' | 'cancellation';

export type RequestType = 'receive' | 'send';

export interface UserRequestType {
  requestId: number;
  requestStatus: RequestStatusType;
  message: string;
  userId: number;
  userName: string;
  profileImgUrl: string | null;
  job1: string;
  createdTime: string;
}

export interface TeamRequestType {
  requestId: number;
  requestStatus: RequestStatusType;
  message: string;
  teamId: number;
  teamImgUrl: string | null;
  teamName: string;
  campus: string;
  createdTime: string;
}

export type OriginType = 'user' | 'team';

export interface Request {
  requestId: number;
  requestStatus: RequestStatusType;
  originType: OriginType;
  originId: number;
  originImgUrl: string | null;
  originName: string;
  originInfo: string;
  message: string;
  createdTime: string;
}

export interface ResponseOfTheRequestType {
  requestId: number;
  response: ResponseStatusType;
}
