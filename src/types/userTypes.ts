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
