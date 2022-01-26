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
