export const exceptDefaultReg = /^((?!default).)*$/;

export const onlyNumberReg = /\d+/;

export const onlyKoreanReg = /^[가-힣]*$/i;

export const validEmailReg =
  /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;

export const emailCodeReg = /^[A-Za-z0-9+]*$/;

export const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

export const validUrlReg = /^(https?:\/\/)/;
