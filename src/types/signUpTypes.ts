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
export interface EmailVerificationCodeRequest {
  userEmail: string;
}

// 회원가입 2단계 이메일 인증 코드 확인 요청
export interface EmailVerificationCodeConfirmRequest {
  code: string;
  userEmail: string;
}

export interface TechStacksWithLevel {
  techStackCode: number;
  techStackLevel: TechStackLevel | string;
}

export type TechStackLevel = '상' | '중' | '하';

// 회원가입 3단계 프로필 작성
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

// 회원가입 모든 단계 응답
export interface SignUpResponse {
  status: number | null;
  success: boolean;
  message: string;
}

// 회원가입 2단계 인자
export interface SignUpProps {
  setSignUpStep: (signUpStep: number) => void;
  setSignUpEmail: (email: string) => void;
  setSignUpPassword: (password: string) => void;
}

// 회원가입 2단계 정보
export interface SignUp {
  signUpEmail: string;
  verificationCode: string;
  signUpPassword: string;
  signUpCheckPassword: string;
  signUpConfiromButton: string | undefined;
}

// 회원가입 3단계 인자
export interface ProfileProps {
  campus: string;
  ssafyTrack: string;
  studentNumber: string;
  studentName: string;
  signUpEmail: string;
  signUpPassword: string;
}

// Alert
export type Severity = 'error' | 'success' | 'info' | 'warning' | undefined;
