// 아이디 찾기, 비밀번호 재설정
export interface newPasswordResponse {
  status: string | null;
  success: boolean;
  message: string;
}

export interface findIdResponse {
  status: string | null;
  success: boolean;
  message: string;
  userEmail: string | null;
}

export interface emailForNewPassword {
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

export interface findId {
  studentNumber: string;
  userName: string;
}
