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
export interface SignInRequest {
  email: string;
  password: string;
}

//회원가입 모든 단계 응답
export interface SignInResopnse {
  status: number;
  success: boolean;
  message: string;
}
