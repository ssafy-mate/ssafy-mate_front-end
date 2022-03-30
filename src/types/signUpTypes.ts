// 회원가입 1단계 가입 정보
export interface SsafyAuth {
  campus: string;
  ssafyTrack: string;
  studentNumber: string;
  userName: string;
}

export interface SsafyTrack {
  id: number;
  name: string;
}

export interface SsafyAuthProps {
  setSignUpStep: (signUpStep: number) => void;
  setCampus: (campus: string) => void;
  setSsafyTrack: (ssafyTrack: string) => void;
  setStudentNumber: (studentNumber: string) => void;
  setStudentName: (studentName: string) => void;
}

// 회원가입 2단계 이메일 인증 코드 요청
export interface EmailCodeRequest {
  userEmail: string;
}

// 회원가입 2단계 이메일 인증 코드 확인 요청
export interface EmailCodeConfirmRequest {
  code: string;
  userEmail: string;
}

export interface TechStacksWithLevel {
  techStackId: number;
  techStackLevel: TechStackLevel | string;
}

export type TechStackLevel = '상' | '중' | '하';

export interface SignUpProfile {
  campus: string;
  ssafyTrack: string;
  studentNumber: string;
  userEmail: string;
  email: string;
  password: string;
  profileImg: any | null;
  selfIntroduction: string;
  job1: string;
  job2: string | null;
  techStacks: Array<TechStacksWithLevel>;
  githubUrl: string | null;
  etcUrl: string | null;
  agreement: boolean;
}

export interface SignUpResponse {
  status: number | null;
  success: boolean;
  message: string;
}

export interface SignUpProps {
  setSignUpStep: (signUpStep: number) => void;
  setSignUpEmail: (email: string) => void;
  setSignUpPassword: (password: string) => void;
}

export interface SignUp {
  signUpEmail: string;
  emailCode: string;
  signUpPassword: string;
  signUpCheckPassword: string;
  signUpConfirmButton: string | undefined;
}

export interface ProfileProps {
  campus: string;
  ssafyTrack: string;
  studentNumber: string;
  studentName: string;
  signUpEmail: string;
  signUpPassword: string;
}

export type Severity = 'error' | 'success' | 'info' | 'warning' | undefined;
