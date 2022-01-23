import React, { useState } from 'react';

import { useForm } from 'react-hook-form';

import { useHistory } from 'react-router-dom';

import styled from '@emotion/styled';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';

import {
  passwordReg,
  requiredFields,
  validEmailReg,
  verificationCodeReg,
} from '../../data/regularExpressionData';

import { useEffect } from 'react';
import {
  EmailVerificationCodeConfirmRequest,
  EmailVerificationCodeRequest,
  SignInResponse,
} from '../../types/UserInfomationType';
import UserService from '../../services/UserService';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface SignUpProps {
  signUpEmail: string;
  signUpPassword: string;
  signUpStep: number;
  updateSignUpEmail: (email: string) => void;
  updateSignUpPassword: (password: string) => void;
  updateSignUpStep: (signUpStep: number) => void;
}

interface SignUp {
  signUpEmail: string;
  verificationCode: string;
  signUpPassword: string;
  signUpCheckPassword: string;
  signUpConfiromButton: string | undefined;
}

const SignUpForm: React.FC<SignUpProps> = ({
  signUpEmail,
  updateSignUpEmail,
  signUpStep,
  updateSignUpStep,
  signUpPassword,
  updateSignUpPassword,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SignUp>({ mode: 'onChange' });

  //상태 올려보내기
  const updateSignUpProps = (data: SignUp) => {
    const { signUpEmail, signUpPassword } = data;
    updateSignUpEmail(signUpEmail);
    updateSignUpPassword(signUpPassword);
    updateSignUpStep(2);
  };

  //alert 색 다르게
  type Severity = 'error' | 'success' | 'info' | 'warning' | undefined;

  const history = useHistory();

  //alert 열건지 말건지
  const [statusAlertOpen, setStatusAlertOpen] = useState(true);

  //alert 무슨 색으로 열건지
  const [statusAlertSeverity, setStatusAlertSeverity] =
    useState<Severity>('success');

  const codeConfirmButtonOnChange = watch('signUpConfiromButton');

  //alert 문구 뭐로 할건지
  const [statusAlertText, setStatusAlertText] =
    useState('교육생 인증에 성공했습니다.');

  // 이메일 인증 코드 요청하는 버튼 활성화, 비활성화
  const [emailCodeRequestButton, setEmailCodeRequestButton] = useState(true);

  //이메일 인증 코드 확인하는 버튼 활성화 비활성화
  const [codeConfirmButton, setCodeConfirmButton] = useState(true);

  //이메일 인증 코드 입력하는 부분 활성화 비활성화
  const [codeInputDisabled, setCodeInputDisabled] = useState(true);

  //이메일 입력하는 부분 활성화 비활성화
  const [emailInputDisabled, setEmailInputDisabled] = useState(false);

  //이메일 인증 코드 확인하는 버튼 문구
  const [codeConfirmButtonText, setCodeConfirmButtonText] = useState('확인');

  //이메일 인증 코드 요청하는 버튼 문구
  const [verificationCodeButtonText, setVerificationCodeButtonText] =
    useState('이메일 인증');

  // 이메일 적는 input
  const signUpEmailOnChange: string = watch('signUpEmail');

  // 인증코드 적는 input
  const verificationCodeOnChange: string = watch('verificationCode');

  //인증 코드 에러 문구
  const [codeVerificationErrorText, setCodeVerificationErrorText] =
    useState('이메일 인증을 완료해주세요.');

  //인증 코드 에러 종류
  const [codeVerificationError, setCodeVerificationError] = useState(false);

  // 비밀번호
  const signUpPasswordOnChange = watch('signUpPassword');

  // 이메일 재전송 div 보일지 말지
  const [resendEmail, setResendEmail] = useState(false);

  //3분 타이머
  const [time, setTime] = useState(179);

  //3분 타이머
  useEffect(() => {
    time > 0 && setTimeout(() => setTime(time - 1), 1000);
  }, [time]);

  //타이머 mm:ss 형태로 바꾸기
  const timeFormat = (time: number) => {
    const m = Math.floor(time / 60).toString();
    let s = (time % 60).toString();
    if (s.length === 1) s = `0${s}`;
    return `${m}:${s}`;
  };

  //이메일 입력에 따라 이메일 인증 코드 전송 요청 버튼 활성화/비활성화
  useEffect(() => {
    if (errors.signUpEmail) {
      //이메일 형식 안맞으면 비활성화
      setEmailCodeRequestButton(true);
    } else if (
      signUpEmailOnChange !== undefined &&
      signUpEmailOnChange.length >= 1
    ) {
      //형식 만족하면 활성화
      setEmailCodeRequestButton(false);
    }
  }, [errors.signUpEmail, signUpEmailOnChange]);

  //이메일 인증 요청 버튼 누르고 난 다음에 다른 이메일로 인증하려고 하는 경우
  useEffect(() => {
    //사용자 변심으로 이메일 주소 변경해서 활성화됐다면
    if (emailCodeRequestButton === false) {
      //인증 코드 입력 부분 초기화+ 변수 자체 값 할당 전 상태로 만들기
      setValue('verificationCode', '');
      reset({ verificationCode: undefined });
      //입력창 비활성화
      setCodeInputDisabled(true);
    }
  }, [setValue, reset, emailCodeRequestButton]);

  //인증 코드 입력 시 유효성 여부에 따라 코드 확인 버튼 활성화 비활성화
  useEffect(() => {
    setCodeVerificationError(false);

    if (errors.verificationCode || verificationCodeOnChange === '') {
      setCodeConfirmButton(true);
    } else if (
      verificationCodeOnChange !== undefined &&
      verificationCodeOnChange.length === 8
    ) {
      setCodeConfirmButton(false);
    }
  }, [errors.verificationCode, verificationCodeOnChange]);

  //인증 코드 입력에 문제가 있는 경우에 이메일 재전송 버튼 활성화
  useEffect(() => {
    if (!codeInputDisabled) {
      setResendEmail(true);
    } else if (codeConfirmButtonOnChange === 'good') {
      setResendEmail(false);
    }
  }, [codeInputDisabled, codeConfirmButtonOnChange]);

  //이메일 인증 코드 전송 요청 버튼 눌렀을 때, 응답에 따라 동작 변화
  const verificationCodeRequest = async () => {
    //이메일 인증 코드 요청 api
    const data: EmailVerificationCodeRequest = { email: '' };
    data.email = signUpEmailOnChange;
    const response: SignInResponse = await UserService.getEmailVerificationCode(
      data,
    );
    if (response.success) {
      //인증 코드 만료일 때 재전송인 경우 고려해서
      setCodeVerificationError(false);
      // //인증 코드 입력 부분 초기화+ 변수 자체 값 할당 전 상태로 만들기
      setValue('verificationCode', '');
      reset({ verificationCode: undefined });
      //입력창 비활성화
      setCodeInputDisabled(true);
      setCodeVerificationErrorText('올바른 인증 코드가 아닙니다.');

      //메일 전송 성공 alert
      setStatusAlertSeverity('success');
      setStatusAlertText(
        '입력한 이메일로 인증 메일을 발송했습니다.\n 이메일에 표시된 인증코드를 입력해주세요',
      );
      setStatusAlertOpen(true);

      //인증 코드 전송이 성공인 경우 이메일 인증 코드 전송 요청 버튼 비활성화 변경 후
      setEmailCodeRequestButton(true);

      //인증 코드 입력 창 활성화
      setCodeInputDisabled(false);

      //타이머 3분으로 리셋(통신 시간 고려로 179)
      setTime(0);
      setTime(179);
    } else if (response.status === 401) {
      //이미 등록된 이메일인 경우 alert 후
      setStatusAlertSeverity('info');
      setStatusAlertText('이미 가입된 이메일입니다.');
      setStatusAlertOpen(true);

      //로그인 창으로 이동
      // history.push('/');
    } else if (response.status === 500) {
      //서버에서 이메일 인증 코드 전송을 실패한 경우 alert 표시
      setStatusAlertSeverity('warning');
      setStatusAlertText('이메일 인증 코드 전송에 실패했습니다.');
      setStatusAlertOpen(true);

      //이메일 전송 요청 버튼을 활성화 후
      setEmailCodeRequestButton(false);

      //재전송 요청 버튼으로 문구 변경
      setVerificationCodeButtonText('이메일 재전송');
    }
  };

  const EmailVerificationCodeConfirm = async () => {
    //인증 코드 확인 api
    const data: EmailVerificationCodeConfirmRequest = { code: '', email: '' };
    data.email = signUpEmailOnChange;
    data.code = verificationCodeOnChange;
    const response: SignInResponse =
      await UserService.getEmailVerificationCodeConfirm(data);

    if (response.success) {
      //이메일 인증 코드 응답 성공 시 인증 코드 확인 버튼 비활성화
      setCodeConfirmButtonText('인증 완료');
      setCodeConfirmButton(true);
      //이메일, 인증 코드 입력창 비활성화
      setEmailInputDisabled(true);
      setCodeInputDisabled(true);
      setValue('signUpConfiromButton', 'good');
    } else if (response.status === 401) {
      //올바른 인증 코드가 아닌 경우 error 창
      setCodeVerificationError(true);
      setCodeVerificationErrorText('올바른 인증 코드가 아닙니다.');
      setCodeConfirmButton(true);
    } else if (response.status === 403) {
      //에러문구 표시해주고
      setCodeVerificationError(true);
      setCodeVerificationErrorText('인증 코드가 만료되었습니다.');
      //인증 코드 입력 창 막기
      setCodeInputDisabled(true);
      //확인 버튼 비활성화
      setCodeConfirmButton(true);
    }
  };

  //alert
  const alertClose = () => {
    setStatusAlertOpen(false);
  };
  //2단계 form 작성 마무리
  const onSubmit = (data: SignUp) => {
    // alert(JSON.stringify(data));
    updateSignUpProps(data);
  };
  return (
    <>
      {statusAlertOpen && (
        <SsafyAuthSnackBar
          open={statusAlertOpen}
          autoHideDuration={1500}
          onClose={alertClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <ResponseAlert
            onClose={alertClose}
            severity={statusAlertSeverity}
            sx={{ width: '100%' }}
          >
            {statusAlertText}
          </ResponseAlert>
        </SsafyAuthSnackBar>
      )}
      <Container onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <RequirementLabel htmlFor="signup-email">이메일</RequirementLabel>
          <ButtonWrapper>
            <InfoInput
              type="email"
              id="signup-email"
              {...register('signUpEmail', {
                required: {
                  value: true,
                  message: requiredFields,
                },
                pattern: {
                  value: validEmailReg,
                  message: '이메일 형식이 올바르지 않습니다.',
                },
              })}
              placeholder="이메일"
              readOnly={emailInputDisabled}
            />

            <AuthButton
              type="button"
              disabled={emailCodeRequestButton}
              onClick={verificationCodeRequest}
            >
              {verificationCodeButtonText}
            </AuthButton>
          </ButtonWrapper>
          {errors.signUpEmail && (
            <ErrorSpan>{errors.signUpEmail.message}</ErrorSpan>
          )}
        </InputWrapper>

        <InputWrapper>
          <RequirementLabel htmlFor="verification-code">
            인증코드 입력
          </RequirementLabel>
          <ButtonWrapper>
            <VerificationCodeWrapper>
              <InfoInput
                type="text"
                id="verification-code"
                {...register('verificationCode', {
                  required: true,
                  pattern: verificationCodeReg,
                  minLength: 8,
                  maxLength: 8,
                })}
                placeholder="인증코드 8자리 입력"
                disabled={codeInputDisabled}
              />
              {!codeInputDisabled && <TimeLimit>{timeFormat(time)}</TimeLimit>}
            </VerificationCodeWrapper>
            <AuthButton
              type="button"
              onClick={EmailVerificationCodeConfirm}
              disabled={codeConfirmButton}
              {...register('signUpConfiromButton', {
                required: true,
              })}
            >
              {codeConfirmButtonText}
            </AuthButton>
          </ButtonWrapper>
          {(() => {
            if (codeVerificationError) {
              return <ErrorSpan>{codeVerificationErrorText}</ErrorSpan>;
            } else if (errors.verificationCode) {
              return <ErrorSpan>{codeVerificationErrorText}</ErrorSpan>;
            }
          })()}

          {resendEmail && (
            <ResendEmailWrapper>
              <ResendEmailMessageWrapper>
                <ResendEmailIcon />
                이메일을 받지 못하셨나요?
                <ResendLink onClick={verificationCodeRequest}>
                  이메일 재전송하기
                </ResendLink>
              </ResendEmailMessageWrapper>
            </ResendEmailWrapper>
          )}
        </InputWrapper>

        <InputWrapper>
          <RequirementLabel htmlFor="signup-password">
            비밀번호 (영문자와 숫자 포함 최소 6자)
          </RequirementLabel>
          <InfoInput
            type="password"
            id="signup-password"
            {...register('signUpPassword', {
              required: true,
              minLength: 6,
              pattern: passwordReg,
            })}
            placeholder="비밀번호"
          />
          {errors.signUpCheckPassword?.type === 'required' &&
            !(
              errors.signUpPassword?.type === 'pattern' ||
              errors.signUpPassword?.type === 'minLength'
            ) && <ErrorSpan>필수 입력 항목입니다.</ErrorSpan>}
          {(errors.signUpPassword?.type === 'pattern' ||
            errors.signUpPassword?.type === 'minLength') && (
            <ErrorSpan>
              비밀번호는 영문, 숫자를 포함하여 6자 이상이어야 합니다.
            </ErrorSpan>
          )}
        </InputWrapper>

        <InputWrapper>
          <RequirementLabel htmlFor="signup-check-password">
            비밀번호 확인
          </RequirementLabel>
          <InfoInput
            type="password"
            id="signup-check-password"
            {...register('signUpCheckPassword', {
              required: true,
              validate: (confirmPasswordInput) =>
                confirmPasswordInput === signUpPasswordOnChange,
            })}
            placeholder="비밀번호 확인"
          />
          {errors.signUpCheckPassword?.type === 'required' && (
            <ErrorSpan>확인을 위해 비밀번호를 한 번 더 입력해주세요.</ErrorSpan>
          )}
          {errors.signUpCheckPassword?.type === 'validate' && (
            <ErrorSpan>비밀번호가 일치하지 않습니다.</ErrorSpan>
          )}
        </InputWrapper>
        <NextButton type="submit">기본 정보 작성</NextButton>
      </Container>
    </>
  );
};

const Container = styled.form`
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 16px;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const AuthButton = styled.button`
  width: 100px;
  height: 40px;
  margin-left: 8px;
  border: none;
  border-radius: 0.25rem;
  box-sizing: border-box;
  background-color: #3396f4;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  transition: background-color 0.08s ease-in-out;
  cursor: pointer;

  &:disabled {
    background-color: #96a0ac;
  }
  @media (max-width: 540px) {
    font-size: 12px;
  }
`;

const NextButton = styled.button`
  width: 100%;
  height: 40px;
  margin-top: 24px;
  border: none;
  border-radius: 0.25rem;
  box-sizing: border-box;
  background-color: #3396f4;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  transition: background-color 0.08s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #2878c3;
  }

  &:disabled {
    background-color: #96a0ac;
  }
  @media (max-width: 540px) {
    font-size: 15px;
  }
`;

const VerificationCodeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  align-items: center;
`;

const InfoInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  outline: 0;
  border: 1px solid #d7e2eb;
  border-radius: 0.25rem;
  box-sizing: border-box;
  background-color: #fbfbfd;
  font-size: 16px;
  line-height: 24px;
  color: #263747;
  transition: all 0.08s ease-in-out;
  flex: 1 0 0px;
  &:hover {
    border: 1px solid #3396f4;
    box-shadow: inset 0 0 0 1px#3396f4;
  }
  &:focus {
    border: 1px solid #3396f4;
    box-shadow: inset 0 0 0 1px #3396f4;
    background-color: #fff;
    color: #495057;
  }
  &:disabled {
    /* background-color: #f8f8fa; */
    background-color: #dadce0;
    /* &:hover {
      border: 1px solid #dadce0;
    } */
  }
  @media (max-width: 540px) {
    font-size: 13px;
  }
`;

const RequirementLabel = styled.label`
  margin-bottom: 4px;
  font-size: 14px;
  line-height: 1.5;
  color: #263747;

  &::before {
    content: '*';
    display: inline-block;
    vertical-align: top;
    margin: 0 0.125rem 0 0;
    -webkit-font-smoothing: antialiased;
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.25rem;
    color: #f44336;
  }

  @media (max-width: 540px) {
    font-size: 13px;
  }
`;

const ErrorSpan = styled.span`
  padding: 8px 12px;
  font-weight: 400;
  font-size: 13px;
  color: #f44336;
`;

const ResendEmailWrapper = styled.div`
  display: block;
  margin-top: 6px;
`;

const ResendEmailMessageWrapper = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  font-size: 12px;
  color: rgb(130, 140, 148);
`;

const ResendEmailIcon = styled(ForwardToInboxIcon)`
  margin-right: 4px;
  width: 14px;
  height: 14px;
`;

const ResponseAlert = styled(Alert)`
  white-space: pre-line;
`;

const ResendLink = styled.a`
  text-decoration: underline;
  font-weight: 500;
  margin-left: 4px;
  cursor: pointer;
  touch-action: manipulation;
`;
const TimeLimit = styled.span`
  margin-right: 10px;
  margin-left: 10px;
`;
const SsafyAuthSnackBar = styled(Snackbar)`
  height: 20%;
`;

export default SignUpForm;
