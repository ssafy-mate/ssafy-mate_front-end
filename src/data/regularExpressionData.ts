export const exceptDefaultReg = /^((?!default).)*$/;

export const onlyNumberReg = /\d+/;

export const onlyKoreanReg = /^[가-힣]*$/i;

export const validEmailReg =
  /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;

export const verificationCodeReg = /^[A-Za-z0-9+]*$/;

export const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

export const requiredFields: string = '필수 입력 항목입니다.';
