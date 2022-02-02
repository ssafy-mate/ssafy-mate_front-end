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
