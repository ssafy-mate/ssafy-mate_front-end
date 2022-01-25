//회원가입 1단계 가입 정보
export interface SsafyAuth {
  campus: string;
  ssafyTrack: string;
  studentNumber: string;
  studentName: string;
}

//회원가입 2단계 이메일 인증 코드 요청
export interface EmailVerificationCodeRequest {
  email: string;
}

//회원가입 2단계 이메일 인증 코드 확인 요청
export interface EmailVerificationCodeConfirmRequest {
  code: string;
  email: string;
}

//회원가입 2단계 가입 정보
export interface SignUpRequest {
  email: string;
  password: string;
}

export interface TechStacksWithLevel {
  techStackName: string;
  techStackLevel: string;
}

//회원가입 3단계 프로필 작성
export interface SignUpProfile {
  campus: string;
  ssafyTrack: string;
  studentNumber: string;
  studentName: string;
  email: string;
  password: string;
  profileImg: any;
  selfIntroduction: string;
  job1: string;
  job2: string;
  techStacks: Array<TechStacksWithLevel>;
  githubUrl: string;
  etcUrl: string;
  agreement: boolean;
}

//회원가입 모든 단계 응답
export interface SignUpResponse {
  status: number;
  success: boolean;
  message: string;
}

//회원가입 2단계 인자
export interface SignUpProps {
  signUpEmail: string;
  signUpPassword: string;
  signUpStep: number;
  updateSignUpEmail: (email: string) => void;
  updateSignUpPassword: (password: string) => void;
  updateSignUpStep: (signUpStep: number) => void;
}

//회원가입 2단계 정보
export interface SignUp {
  signUpEmail: string;
  verificationCode: string;
  signUpPassword: string;
  signUpCheckPassword: string;
  signUpConfiromButton: string | undefined;
}

//회원가입 3단계 인자
export interface ProfileProps {
  campus: string;
  ssafyTrack: string;
  studentNumber: string;
  studentName: string;
  signUpStep: number;
  signUpEmail: string;
  signUpPassword: string;
  updateSignUpStep: (signUpStep: number) => void;
}
