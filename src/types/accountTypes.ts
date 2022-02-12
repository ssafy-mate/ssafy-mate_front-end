// 아이디 찾기, 비밀번호 재설정
export interface NewPasswordResponse {
  status: string | null;
  success: boolean;
  message: string;
}

export interface FindUserEmailResponse {
  status: string | null;
  success: boolean;
  message: string;
  userEmail: string | null;
}

export interface EmailForNewPassword {
  userEmail: string;
}

export interface CodeConfirmForNewPassword {
  code: string;
  userEmail: string;
}

export interface NewPassword {
  userEmail: string;
  password: string;
}

export interface FindUserEmailRequest {
  studentNumber: string;
  userName: string;
}
