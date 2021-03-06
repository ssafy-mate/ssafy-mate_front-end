import { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { showSsafyMateAlert } from '../../redux/modules/alert';

import { useForm } from 'react-hook-form';

import styled from '@emotion/styled';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';

import {
  EmailCodeConfirmRequest,
  EmailCodeRequest,
  SignUpProps,
  SignUp,
  Severity,
} from '../../types/signUpTypes';

import {
  passwordReg,
  validEmailReg,
  emailCodeReg,
} from '../../utils/regularExpressionData';

import UserService from '../../services/UserService';

import Loading from '../common/Loading';

const SignUpForm: React.FC<SignUpProps> = ({
  setSignUpStep,
  setSignUpEmail,
  setSignUpPassword,
}) => {
  const [emailCodeRequestButtonDisabled, setEmailCodeRequestButtonDisabled] =
    useState<boolean>(true);
  const [emailCodeConfirmButtonDisabled, setEmailCodeConfirmButtonDisabled] =
    useState<boolean>(true);
  const [emailCodeInputDisabled, setEmailCodeInputDisabled] =
    useState<boolean>(true);
  const [emailInputDisabled, setEmailInputDisabled] = useState<boolean>(false);
  const [emailCodeButtonText, setEmailCodeButtonText] =
    useState<string>('이메일 인증');
  const [emailCodeErrorText, setEmailCodeErrorText] =
    useState<string>('이메일 인증을 완료해주세요.');
  const [emailInputError, setEmailInputError] = useState<string>('');
  const [emailCodeError, setEmailCodeError] = useState<boolean>(false);
  const [minutes, setMinutes] = useState<number>(3);
  const [seconds, setSeconds] = useState<number>(0);
  const [showCodeBox, setShowCodeBox] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingColor, setLoadingColor] = useState<string>('#fff');
  const [timerIntervalTime, setTimerIntervalTime] = useState<number>(0);

  const dispatch = useDispatch();

  const showAlert = (
    alertShow: boolean,
    alertText: string,
    alertType: Severity,
  ) => {
    dispatch(
      showSsafyMateAlert({
        show: alertShow,
        text: alertText,
        type: alertType,
      }),
    );
  };

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
        setSeconds(seconds - timerIntervalTime);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timer);
          showAndSetError(true, '인증코드가 만료되었습니다.');

          if (timerIntervalTime === 1) {
            offCodeInputAndConfirm();
          }
        } else {
          setMinutes(minutes - timerIntervalTime);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes, seconds, timerIntervalTime]);

  useEffect(() => {
    emailCodeRequestButtonDisabled
      ? setLoadingColor('#3396f4')
      : setLoadingColor('#fff');
  }, [emailCodeRequestButtonDisabled]);

  const signUpEmailInput: string = watch('signUpEmail');
  const emailCodeInput: string = watch('emailCode');
  const signUpPasswordInput: string = watch('signUpPassword');
  const signUpCheckPasswordInput: string = watch('signUpCheckPassword');

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

  const showAndSetError = (isError: boolean, errorMessage: string) => {
    setEmailCodeError(isError);
    setEmailCodeErrorText(errorMessage);
  };

  const offCodeInputAndConfirm = () => {
    setEmailCodeInputDisabled(true);
    setEmailCodeConfirmButtonDisabled(true);
  };

  useEffect(() => {
    if (errors.signUpEmail) {
      setEmailCodeRequestButtonDisabled(true);
    } else if (
      signUpEmailInput !== undefined &&
      validEmailReg.test(signUpEmailInput)
    ) {
      setEmailCodeRequestButtonDisabled(false);
    }
  }, [errors.signUpEmail, signUpEmailInput]);

  useEffect(() => {
    if (emailCodeRequestButtonDisabled === false) {
      setShowCodeBox(false);
    }
  }, [emailCodeRequestButtonDisabled]);

  useEffect(() => {
    setEmailCodeError(false);

    if (errors.emailCode || emailCodeInput === '') {
      setEmailCodeConfirmButtonDisabled(true);
    } else if (emailCodeInput !== undefined && emailCodeInput.length === 8) {
      setEmailCodeConfirmButtonDisabled(false);
    }
  }, [errors.emailCode, emailCodeInput]);

  const emailCodeInputAndButtonDisabled = () => {
    setEmailCodeRequestButtonDisabled(true);
    setEmailCodeInputDisabled(false);
  };

  const resetEmailCodeError = () => {
    setEmailCodeError(false);
    setValue('emailCode', '');
    reset({ emailCode: undefined });
    setEmailCodeErrorText('올바른 인증 코드가 아닙니다.');
  };

  const handleEmailCodeRequestButtonClick = (event: React.MouseEvent) => {
    setLoading(true);
    const data: EmailCodeRequest = { userEmail: '' };

    data.userEmail = signUpEmailInput;

    if (data.userEmail === '' || data.userEmail === undefined) {
      setEmailCodeRequestButtonDisabled(true);
      setLoading(false);
    }

    UserService.getEmailCode(data)
      .then(({ success, message }) => {
        if (success) {
          setLoading(false);
          resetEmailCodeError();
          showAlert(true, message, 'success');
          emailCodeInputAndButtonDisabled();
          setShowCodeBox(true);
          setTimerIntervalTime(1);
          resetTimer();
          setEmailCodeButtonText('이메일 인증');
        }
      })
      .catch((error) => {
        if (error.response) {
          const { status, message } = error.response.data;

          if (status === 409) {
            setLoading(false);
            showAlert(true, message, 'info');
          } else if (status === 500) {
            setLoading(false);
            showAlert(true, message, 'error');
            setEmailCodeRequestButtonDisabled(false);
            setEmailCodeButtonText('이메일 재전송');
          }
        }
      });
  };

  const handleEmailCodeConfirmButtonClick = (event: React.MouseEvent) => {
    const data: EmailCodeConfirmRequest = {
      code: emailCodeInput,
      userEmail: signUpEmailInput,
    };

    UserService.getEmailCodeConfirm(data)
      .then((response) => {
        offCodeInputAndConfirm();
        setEmailInputDisabled(true);
        setEmailInputError('');
        setShowCodeBox(false);
        setTimerIntervalTime(0);
      })
      .catch((error) => {
        if (error.response) {
          const { status, message } = error.response.data;

          if (status === 401) {
            showAndSetError(true, message);
            setEmailCodeConfirmButtonDisabled(true);
          } else if (status === 403) {
            showAndSetError(true, message);
            offCodeInputAndConfirm();
          } else if (status === 500) {
            showAlert(true, message, 'error');
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
          <EmailCodeRequestButton
            type="button"
            disabled={emailCodeRequestButtonDisabled}
            onClick={handleEmailCodeRequestButtonClick}
            className={loading ? 'cursor-wait' : ''}
          >
            {loading ? (
              <Loading selectColor={loadingColor} />
            ) : (
              emailCodeButtonText
            )}
          </EmailCodeRequestButton>
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
          <RequirementLabel htmlFor="email-code">
            인증코드 입력
          </RequirementLabel>
          <VerificationCodeWrapper>
            <VerificationCodeConfirmWrapper
              className={
                errors.emailCode || emailCodeError || emailCodeInputDisabled
                  ? 'have-error'
                  : ''
              }
            >
              <VerificationCodeInputWrapper>
                <VerificationCodeInput
                  type="text"
                  id="email-code"
                  {...register('emailCode', {
                    required: true,
                    pattern: emailCodeReg,
                    minLength: 8,
                    maxLength: 8,
                  })}
                  maxLength={8}
                  placeholder="인증코드 8자리 입력"
                  disabled={emailCodeInputDisabled}
                />
                {!emailCodeInputDisabled && (
                  <TimeLimit>
                    {minutes.toString().padStart(2, '0')}:
                    {seconds.toString().padStart(2, '0')}
                  </TimeLimit>
                )}
                <EmailCodeConfirmButton
                  type="button"
                  onClick={handleEmailCodeConfirmButtonClick}
                  disabled={emailCodeConfirmButtonDisabled}
                  {...register('signUpConfirmButton', {
                    required: true,
                  })}
                >
                  확인
                </EmailCodeConfirmButton>
              </VerificationCodeInputWrapper>
              {(() => {
                if (emailCodeError) {
                  return (
                    <ErrorMessageWrapper>
                      <ErrorMessage>{emailCodeErrorText}</ErrorMessage>
                    </ErrorMessageWrapper>
                  );
                } else if (errors.emailCode) {
                  return (
                    <ErrorMessageWrapper>
                      <ErrorMessage>{emailCodeErrorText}</ErrorMessage>
                    </ErrorMessageWrapper>
                  );
                }
              })()}
            </VerificationCodeConfirmWrapper>
          </VerificationCodeWrapper>
          {timerIntervalTime === 1 ? (
            <ResendEmailWrapper>
              <ResendEmailMessage>
                <ResendEmailIcon />
                이메일을 받지 못하셨나요?
                <ResendLink onClick={handleEmailCodeRequestButtonClick}>
                  이메일 재전송하기
                </ResendLink>
              </ResendEmailMessage>
            </ResendEmailWrapper>
          ) : null}
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
              confirmPasswordInput === signUpPasswordInput,
          })}
          placeholder="비밀번호 확인"
          className={
            errors.signUpCheckPassword ||
            (signUpCheckPasswordInput !== '' &&
              signUpCheckPasswordInput !== signUpPasswordInput)
              ? 'have-error'
              : ''
          }
        />
        {errors.signUpCheckPassword?.type === 'required' && (
          <ErrorMessageWrapper>
            <ErrorMessage>
              확인을 위해 비밀번호를 한 번 더 입력해주세요.
            </ErrorMessage>
          </ErrorMessageWrapper>
        )}
        {(errors.signUpCheckPassword?.type !== 'required' &&
          errors.signUpCheckPassword?.type === 'validate') ||
        (signUpCheckPasswordInput !== '' &&
          signUpCheckPasswordInput !== signUpPasswordInput) ? (
          <ErrorMessageWrapper>
            <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
          </ErrorMessageWrapper>
        ) : null}
      </InputWrapper>
      <SubmitButton type="submit">기본 정보 작성 완료</SubmitButton>
    </Container>
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

const EmailCodeRequestButton = styled.button`
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
    background-color: #ebf0fe;
    color: #8e888e;
    cursor: not-allowed;
  }

  &.cursor-wait {
    cursor: wait;
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

const VerificationCodeConfirmWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  min-height: 45px;
  margin-bottom: 10px;
  padding: 0px 16px;
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
  &.have-error {
    border: 1px solid #f44336;
    box-shadow: inset 0 0 0 1px #ff77774d;
  }
`;

const VerificationCodeInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 45px;
`;

const VerificationCodeInput = styled.input`
  flex: 1 0 0px;
  width: 100%;
  border: none;
  background-color: #fbfbfd;
  font-size: 15px;
  line-height: 15px;

  &:disabled {
    cursor: not-allowed;
  }
`;

const EmailCodeConfirmButton = styled.button`
  height: 30px;
  margin-left: 8px;
  padding: 7px 10px;
  border: none;
  border-radius: 0.25rem;
  box-sizing: border-box;
  background-color: #3396f4;
  font-size: 14px;
  font-weight: 500;
  line-height: 15px;
  transition: background-color 0.08s ease-in-out;
  color: #fff;
  cursor: pointer;

  &:disabled {
    background-color: #ebf0fe;
    color: #8e888e;
    cursor: not-allowed;
  }
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

export default SignUpForm;
