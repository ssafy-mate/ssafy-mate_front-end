import { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import styled from '@emotion/styled';

import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import {
  passwordReg,
  requiredFields,
  validEmailReg,
  verificationCodeReg,
} from '../../utils/regularExpressionData';

import {
  EmailVerificationCodeConfirmRequest,
  EmailVerificationCodeRequest,
  SignUpProps,
  SignUp,
  Severity,
} from '../../types/userInfomationTypes';

import AuthService from '../../services/AuthService';

const SignUpForm: React.FC<SignUpProps> = ({
  signUpEmail,
  updateSignUpEmail,
  signUpStep,
  updateSignUpStep,
  signUpPassword,
  updateSignUpPassword,
}) => {
  const [statusAlertOpen, setStatusAlertOpen] = useState<boolean>(true);
  const [statusAlertSeverity, setStatusAlertSeverity] =
    useState<Severity>('success');
  const [statusAlertText, setStatusAlertText] =
    useState<string>('교육생 인증에 성공했습니다.');
  const [emailCodeRequestButton, setEmailCodeRequestButton] =
    useState<boolean>(true);
  const [codeConfirmButton, setCodeConfirmButton] = useState<boolean>(true);
  const [codeInputDisabled, setCodeInputDisabled] = useState<boolean>(true);
  const [emailInputDisabled, setEmailInputDisabled] = useState<boolean>(false);
  const [codeConfirmButtonText, setCodeConfirmButtonText] =
    useState<string>('확인');
  const [verificationCodeButtonText, setVerificationCodeButtonText] =
    useState<string>('이메일 인증');
  const [codeVerificationErrorText, setCodeVerificationErrorText] =
    useState<string>('이메일 인증을 완료해주세요.');
  const [codeVerificationError, setCodeVerificationError] =
    useState<boolean>(false);
  const [resendEmail, setResendEmail] = useState<boolean>(false);
  const [minutes, setMinutes] = useState<number>(3);
  const [seconds, setSeconds] = useState<number>(0);
  const [showCodeBox, setShowCodeBox] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SignUp>({ mode: 'onChange' });

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timer);
          offCodeInputAndConfirm();
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes, seconds]);

  const updateSignUpProps = (data: SignUp) => {
    const { signUpEmail, signUpPassword } = data;

    updateSignUpEmail(signUpEmail);
    updateSignUpPassword(signUpPassword);
    updateSignUpStep(2);
  };

  const codeConfirmButtonOnChange: string | undefined = watch(
    'signUpConfiromButton',
  );
  const signUpEmailOnChange: string = watch('signUpEmail');
  const verificationCodeOnChange: string = watch('verificationCode');
  const signUpPasswordOnChange: string = watch('signUpPassword');

  const offCodeInputAndConfirm = () => {
    setCodeInputDisabled(true);
    setCodeConfirmButton(true);
  };

  const resetTimer = () => {
    setMinutes(3);
    setSeconds(0);
  };

  // 이메일 입력에 따라 이메일 인증 코드 전송 요청 버튼 활성화/비활성화
  useEffect(() => {
    if (errors.signUpEmail) {
      setEmailCodeRequestButton(true);
    } else if (
      signUpEmailOnChange !== undefined &&
      signUpEmailOnChange.length >= 4
    ) {
      setEmailCodeRequestButton(false);
    }
  }, [errors.signUpEmail, signUpEmailOnChange]);

  // 이메일 인증 요청 버튼 누르고 난 다음에 다른 이메일로 인증하려고 하는 경우
  useEffect(() => {
    if (emailCodeRequestButton === false) {
      setValue('verificationCode', '');
      reset({ verificationCode: undefined });
      setShowCodeBox(false);
      offCodeInputAndConfirm();
    }
  }, [setValue, reset, emailCodeRequestButton]);

  // 인증 코드 입력 시 유효성 여부에 따라 코드 확인 버튼 활성화 비활성화
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

  // 인증 코드 입력에 문제가 있는 경우에 이메일 재전송 버튼 활성화
  useEffect(() => {
    if (!codeInputDisabled) {
      setResendEmail(true);
    } else if (codeConfirmButtonOnChange === 'getAuth') {
      setResendEmail(false);
    }
  }, [codeInputDisabled, codeConfirmButtonOnChange]);

  const showAlert = (type: Severity, message: string) => {
    setStatusAlertSeverity(type);
    setStatusAlertText(message);
    setStatusAlertOpen(true);
  };

  const offEmailCodeInput = () => {
    setEmailCodeRequestButton(true);
    setCodeInputDisabled(false);
  };

  const resetCodeVerificationError = () => {
    setCodeVerificationError(false);
    setValue('verificationCode', '');
    reset({ verificationCode: undefined });
    setCodeVerificationErrorText('올바른 인증 코드가 아닙니다.');
  };

  const verificationCodeRequest = () => {
    const data: EmailVerificationCodeRequest = { userEmail: '' };

    data.userEmail = signUpEmailOnChange;

    if (data.userEmail === '' || data.userEmail === undefined) {
      setEmailCodeRequestButton(true);
    }
    AuthService.getEmailVerificationCode(data)
      .then((response) => {
        if (response.success) {
          resetCodeVerificationError();
          showAlert('success', response.message);
          offEmailCodeInput();
          setShowCodeBox(true);
          resetTimer();
        }
      })
      .catch((error) => {
        if (error.response) {
          const data = error.response.data;

          if (data.status === 409) {
            showAlert('info', data.message);
          } else if (data.status === 500) {
            showAlert('warning', data.message);
            setEmailCodeRequestButton(false);
            setVerificationCodeButtonText('이메일 재전송');
          }
        }
      });
  };

  const EmailVerificationCodeConfirm = () => {
    const data: EmailVerificationCodeConfirmRequest = {
      code: '',
      userEmail: '',
    };

    data.userEmail = signUpEmailOnChange;
    data.code = verificationCodeOnChange;

    AuthService.getEmailVerificationCodeConfirm(data)
      .then((response) => {
        setCodeConfirmButtonText('인증 완료');
        offCodeInputAndConfirm();
        setEmailInputDisabled(true);
        setValue('signUpConfiromButton', 'getAuth');
        setShowCodeBox(false);
      })
      .catch((error) => {
        if (error.response) {
          const data = error.response.data;

          if (data.status === 401) {
            showAndSetError(true, data.message);
            setCodeConfirmButton(true);
          } else if (data.status === 403) {
            showAndSetError(true, data.message);
            offCodeInputAndConfirm();
          } else if (data.status === 500) {
            showAlert('warning', data.message);
          }
        }
      });
  };

  const showAndSetError = (isError: boolean, errorMessage: string) => {
    setCodeVerificationError(isError);
    setCodeVerificationErrorText(errorMessage);
  };

  const alertClose = () => {
    setStatusAlertOpen(false);
  };

  const onSubmit = (data: SignUp) => {
    updateSignUpProps(data);
  };

  return (
    <>
      {statusAlertOpen && (
        <SsafyAuthSnackBar
          open={statusAlertOpen}
          autoHideDuration={2000}
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
        {showCodeBox ? (
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
                {!codeInputDisabled && (
                  <TimeLimit>
                    {minutes.toString().padStart(2, '0')}:
                    {seconds.toString().padStart(2, '0')}
                  </TimeLimit>
                )}
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
        ) : null}
        <InputWrapper>
          <RequirementLabel htmlFor="signup-password">
            비밀번호 (영문자와 숫자 혼합 최소 6자)
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
              비밀번호는 영문, 숫자만을 혼합하여 6자 이상이어야 합니다.
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
  align-items: center;
  width: 100%;
  height: 100%;
`;

const InfoInput = styled.input`
  flex: 1 0 0px;
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
    background-color: #dadce0;
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
  margin-left: 4px;
  font-weight: 500;
  text-decoration: underline;
  touch-action: manipulation;
  cursor: pointer;
`;

const TimeLimit = styled.span`
  margin-right: 10px;
  margin-left: 10px;
`;

const SsafyAuthSnackBar = styled(Snackbar)`
  height: 20%;
`;

export default SignUpForm;
