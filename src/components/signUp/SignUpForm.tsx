import { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import styled from '@emotion/styled';

import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import {
  EmailVerificationCodeConfirmRequest,
  EmailVerificationCodeRequest,
  SignUpProps,
  SignUp,
  Severity,
} from '../../types/signUpTypes';

import {
  passwordReg,
  validEmailReg,
  verificationCodeReg,
} from '../../utils/regularExpressionData';

import AuthService from '../../services/AuthService';

import Loading from '../common/Loading';

const SignUpForm: React.FC<SignUpProps> = ({
  setSignUpStep,
  setSignUpEmail,
  setSignUpPassword,
}) => {
  const [alertOpen, setAlertOpen] = useState<boolean>(true);
  const [alertSeverity, setAlertSeverity] = useState<Severity>('success');
  const [alertText, setAlertText] =
    useState<string>('교육생 인증에 성공했습니다.');
  const [emailCodeRequestButton, setEmailCodeRequestButton] =
    useState<boolean>(true);
  const [codeConfirmButton, setCodeConfirmButton] = useState<boolean>(true);
  const [codeInputDisabled, setCodeInputDisabled] = useState<boolean>(true);
  const [emailInputDisabled, setEmailInputDisabled] = useState<boolean>(false);
  const [verificationCodeButtonText, setVerificationCodeButtonText] =
    useState<string>('이메일 인증');
  const [codeVerificationErrorText, setCodeVerificationErrorText] =
    useState<string>('이메일 인증을 완료해주세요.');
  const [emailInputError, setEmailInputError] = useState<string>('');
  const [codeVerificationError, setCodeVerificationError] =
    useState<boolean>(false);
  const [minutes, setMinutes] = useState<number>(3);
  const [seconds, setSeconds] = useState<number>(0);
  const [showCodeBox, setShowCodeBox] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingColor, setLoadingColor] = useState<string>('##fff');

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
          showAndSetError(true, '인증코드가 만료되었습니다.');
          offCodeInputAndConfirm();
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes, seconds]);

  useEffect(() => {
    emailCodeRequestButton
      ? setLoadingColor('#3396f4')
      : setLoadingColor('#fff');
  }, [emailCodeRequestButton]);

  const signUpEmailOnChange: string = watch('signUpEmail');
  const verificationCodeOnChange: string = watch('verificationCode');
  const signUpPasswordOnChange: string = watch('signUpPassword');

  const updateSignUpProps = (data: SignUp) => {
    const { signUpEmail, signUpPassword } = data;

    setSignUpStep(2);
    setSignUpEmail(signUpEmail);
    setSignUpPassword(signUpPassword);
  };

  const resetTimer = () => {
    setMinutes(3);
    setSeconds(0);
  };

  const showAlert = (type: Severity, message: string) => {
    setAlertSeverity(type);
    setAlertText(message);
    setAlertOpen(true);
  };

  const alertClose = () => {
    setAlertOpen(false);
  };

  const showAndSetError = (isError: boolean, errorMessage: string) => {
    setCodeVerificationError(isError);
    setCodeVerificationErrorText(errorMessage);
  };

  const offCodeInputAndConfirm = () => {
    setCodeInputDisabled(true);
    setCodeConfirmButton(true);
  };

  // 이메일 입력에 따라 이메일 인증 코드 전송 요청 버튼 활성화/비활성화
  useEffect(() => {
    if (errors.signUpEmail) {
      setEmailCodeRequestButton(true);
    } else if (
      signUpEmailOnChange !== undefined &&
      validEmailReg.test(signUpEmailOnChange)
    ) {
      setEmailCodeRequestButton(false);
    }
  }, [errors.signUpEmail, signUpEmailOnChange]);

  // 이메일 인증 요청 버튼 누르고 난 다음에 다른 이메일로 인증하려고 하는 경우
  useEffect(() => {
    if (emailCodeRequestButton === false) {
      setShowCodeBox(false);
    }
  }, [emailCodeRequestButton]);

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
    setLoading(true);
    const data: EmailVerificationCodeRequest = { userEmail: '' };

    data.userEmail = signUpEmailOnChange;

    if (data.userEmail === '' || data.userEmail === undefined) {
      setEmailCodeRequestButton(true);
      setLoading(false);
    }
    AuthService.getEmailVerificationCode(data)
      .then(({ success, message }) => {
        if (success) {
          setLoading(false);
          resetCodeVerificationError();
          showAlert('success', message);
          offEmailCodeInput();
          setShowCodeBox(true);
          resetTimer();
          setVerificationCodeButtonText('이메일 인증');
        }
      })
      .catch((error) => {
        if (error.response) {
          const { status, message } = error.response.data;

          if (status === 409) {
            setLoading(false);
            showAlert('info', message);
          } else if (status === 500) {
            setLoading(false);
            showAlert('warning', message);
            setEmailCodeRequestButton(false);
            setVerificationCodeButtonText('이메일 재전송');
          }
        }
      });
  };

  const EmailVerificationCodeConfirm = () => {
    const data: EmailVerificationCodeConfirmRequest = {
      code: verificationCodeOnChange,
      userEmail: signUpEmailOnChange,
    };

    AuthService.getEmailVerificationCodeConfirm(data)
      .then((response) => {
        offCodeInputAndConfirm();
        setEmailInputDisabled(true);
        setEmailInputError('');
        setShowCodeBox(false);
      })
      .catch((error) => {
        if (error.response) {
          const { status, message } = error.response.data;

          if (status === 401) {
            showAndSetError(true, message);
            setCodeConfirmButton(true);
          } else if (status === 403) {
            showAndSetError(true, message);
            offCodeInputAndConfirm();
          } else if (status === 500) {
            showAlert('warning', message);
          }
        }
      });
  };

  const onSubmit = (data: SignUp) => {
    if (emailInputDisabled) {
      updateSignUpProps(data);
    } else {
      setEmailInputError('이메일 인증을 완료해주세요.');
    }
  };

  return (
    <>
      {alertOpen && (
        <SignUpSnackBar
          open={alertOpen}
          autoHideDuration={2000}
          onClose={alertClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <ResponseAlert
            onClose={alertClose}
            severity={alertSeverity}
            sx={{ width: '100%' }}
          >
            {alertText}
          </ResponseAlert>
        </SignUpSnackBar>
      )}
      <Container onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <RequirementLabel htmlFor="signup-email">이메일</RequirementLabel>
          <EmailInputWrapper>
            <InfoInput
              type="email"
              id="signup-email"
              {...register('signUpEmail', {
                required: {
                  value: true,
                  message: '필수 입력 항목입니다.',
                },
                pattern: {
                  value: validEmailReg,
                  message: '이메일 형식이 올바르지 않습니다.',
                },
              })}
              className={
                errors.signUpEmail || emailInputError !== '' ? 'have-error' : ''
              }
              maxLength={320}
              placeholder="이메일"
              readOnly={emailInputDisabled}
            />
            <AuthButton
              type="button"
              disabled={emailCodeRequestButton}
              onClick={verificationCodeRequest}
            >
              {loading ? (
                <Loading selectColor={loadingColor} />
              ) : (
                verificationCodeButtonText
              )}
            </AuthButton>
          </EmailInputWrapper>
          {errors.signUpEmail !== undefined && (
            <ErrorMessageWrapper>
              <ErrorMessage>{errors.signUpEmail.message}</ErrorMessage>
            </ErrorMessageWrapper>
          )}
          {errors.signUpEmail === undefined && emailInputError !== '' && (
            <ErrorMessageWrapper>
              <ErrorMessage>{emailInputError}</ErrorMessage>
            </ErrorMessageWrapper>
          )}
        </InputWrapper>
        {showCodeBox ? (
          <InputWrapper>
            <RequirementLabel htmlFor="verification-code">
              인증코드 입력
            </RequirementLabel>
            <EmailInputWrapper>
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
                  maxLength={8}
                  placeholder="인증코드 8자리 입력"
                  disabled={codeInputDisabled}
                  className={
                    errors.verificationCode ? 'have-error' : 'no-error'
                  }
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
                확인
              </AuthButton>
            </EmailInputWrapper>
            {(() => {
              if (codeVerificationError) {
                return (
                  <ErrorMessageWrapper>
                    <ErrorMessage>{codeVerificationErrorText}</ErrorMessage>
                  </ErrorMessageWrapper>
                );
              } else if (errors.verificationCode) {
                return (
                  <ErrorMessageWrapper>
                    <ErrorMessage>{codeVerificationErrorText}</ErrorMessage>
                  </ErrorMessageWrapper>
                );
              }
            })()}
            <ResendEmailWrapper>
              <ResendEmailMessage>
                <ResendEmailIcon />
                이메일을 받지 못하셨나요?
                <ResendLink onClick={verificationCodeRequest}>
                  이메일 재전송하기
                </ResendLink>
              </ResendEmailMessage>
            </ResendEmailWrapper>
          </InputWrapper>
        ) : null}
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
            className={errors.signUpPassword ? 'have-error' : ''}
          />
          {errors.signUpPassword?.type === 'required' &&
            !(
              errors.signUpPassword?.type === 'pattern' ||
              errors.signUpPassword?.type === 'minLength'
            ) && (
              <ErrorMessageWrapper>
                <ErrorMessage>필수 입력 항목입니다.</ErrorMessage>
              </ErrorMessageWrapper>
            )}
          {(errors.signUpPassword?.type === 'pattern' ||
            errors.signUpPassword?.type === 'minLength') && (
            <ErrorMessageWrapper>
              <ErrorMessage>
                비밀번호는 영문, 숫자만을 혼합하여 6자 이상이어야 합니다.
              </ErrorMessage>
            </ErrorMessageWrapper>
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
            className={errors.signUpCheckPassword ? 'have-error' : ''}
          />
          {errors.signUpCheckPassword?.type === 'required' && (
            <ErrorMessageWrapper>
              <ErrorMessage>
                확인을 위해 비밀번호를 한 번 더 입력해주세요.
              </ErrorMessage>
            </ErrorMessageWrapper>
          )}
          {errors.signUpCheckPassword?.type !== 'required' &&
            errors.signUpCheckPassword?.type === 'validate' && (
              <ErrorMessageWrapper>
                <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
              </ErrorMessageWrapper>
            )}
        </InputWrapper>
        <SubmitButton type="submit">기본 정보 작성 완료</SubmitButton>
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
`;

const EmailInputWrapper = styled.div`
  display: flex;
`;

const AuthButton = styled.button`
  width: 120px;
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
    background-color: #ededed;
    color: #8e888e;
    cursor: not-allowed;
  }

  @media (max-width: 575px) {
    font-size: 13px;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 40px;
  margin-top: 8px;
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

  @media (max-width: 575px) {
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
  width: 100%;
  height: 40px;
  margin-bottom: 16px;
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
    border: 1px solid #d7e2eb;
    box-shadow: none;
    background-color: #ededed;
    color: #8e888e;
  }
  &:read-only {
    border: 1px solid #d7e2eb;
    box-shadow: none;
    cursor: not-allowed;
  }
  &.have-error {
    margin-bottom: 4px;
    border: 1px solid #f44336;
    box-shadow: inset 0 0 0 1px #ff77774d;
  }
  &.no-error {
    margin-bottom: 4px;
  }
  @media (max-width: 575px) {
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

  @media (max-width: 575px) {
    font-size: 13px;
  }
`;

const ErrorMessageWrapper = styled.div`
  margin-bottom: 8px;
`;

const ErrorMessage = styled.span`
  padding-left: 6px;
  font-size: 13px;
  line-height: 1.5;
  color: #f44336;
`;

const ResendEmailWrapper = styled.div`
  display: block;
  margin-bottom: 12px;
`;

const ResendEmailMessage = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding-left: 6px;
  font-size: 13px;
  color: rgb(130, 140, 148);

  @media (max-width: 349px) {
    font-size: 12px;
  }
`;

const ResendEmailIcon = styled(ForwardToInboxIcon)`
  margin-right: 4px;
  width: 16px;
  height: 16px;
`;

const ResponseAlert = styled(Alert)`
  white-space: pre-line;
`;

const ResendLink = styled.a`
  margin-left: 4px;
  font-weight: 500;
  text-decoration: underline;
  touch-action: manipulation;
  transition: color 0.08s ease-in-out;
  cursor: pointer;

  &:hover {
    color: #3396f4;
  }
`;

const TimeLimit = styled.span`
  margin-bottom: 4px;
  margin-left: 8px;
  font-size: 14px;
  color: #f44336;

  @media (max-width: 575px) {
    font-size: 13px;
  }
`;

const SignUpSnackBar = styled(Snackbar)`
  height: 20%;
`;

const LoadingWrapper = styled.div`
  width: 100px;
  height: 40px;
  margin-left: 8px;
  border: none;
  border-radius: 0.25rem;
  box-sizing: border-box;
  transition: background-color 0.08s ease-in-out;
  cursor: wait;

  @media (max-width: 575px) {
    font-size: 12px;
  }
`;

export default SignUpForm;
