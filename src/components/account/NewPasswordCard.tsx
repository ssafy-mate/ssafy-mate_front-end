import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { showSsafyMateAlert as showSsafyMateAlertSagaStart } from '../../redux/modules/alert';

import styled from '@emotion/styled';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';

import {
  passwordReg,
  validEmailReg,
  verificationCodeReg,
} from '../../utils/regularExpressionData';

import { Severity } from '../../types/signUpTypes';

import history from '../../history';

import NewPasswordService from '../../services/NewPasswordService';

import NewPassWordCardSubHead from './NewPassWordCardSubHead';
import Loading from '../common/Loading';

const NewPasswordCard: React.FC = () => {
  const [loadingColor, setLoadingColor] = useState<string>('#3396f4');
  const [minutes, setMinutes] = useState<number>(3);
  const [seconds, setSeconds] = useState<number>(0);
  const [stepForNewPassword, setStepForNewPassword] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputError, setInputError] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>('');
  const [bottomConfirmButtonDisalbed, setBottomConfirmButtonDisabled] =
    useState<boolean>(false);
  const [bottomConfirmButtonText, setBottomConfirmButtonText] =
    useState<string>('이메일로 인증코드 받기');
  const [verificationCodeInput, setVerificationCodeInput] =
    useState<string>('');
  const [codeConfirmButtonDisalbed, setCodeConfirmButtonDisabled] =
    useState<boolean>(false);
  const [newPasswordInput, setNewPasswordInput] = useState<string>('');
  const [newPasswordCheckInput, setNewPasswordCheckInput] =
    useState<string>('');
  const [newPasswordCheckInputError, setNewPasswordCheckInputError] =
    useState<string>('');
  const [timeStop, setTimeStop] = useState<number>(0);

  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - timeStop);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timer);
          setInputError('인증코드가 만료되었습니다.');

          if (timeStop === 1) {
            verificationCodeButtonsOff();
          }
        } else {
          setMinutes(minutes - timeStop);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes, seconds, timeStop]);

  useEffect(() => {
    bottomConfirmButtonDisalbed
      ? setLoadingColor('#3396f4')
      : setLoadingColor('#fff');
  }, [bottomConfirmButtonDisalbed]);

  const resetTimer = () => {
    setMinutes(3);
    setSeconds(0);
  };

  const showAlert = (
    alertShow: boolean,
    alertText: string,
    alertType: Severity,
  ) => {
    dispatch(
      showSsafyMateAlertSagaStart({
        show: alertShow,
        text: alertText,
        type: alertType,
      }),
    );
  };

  const onCheckEnter = (event: React.KeyboardEvent) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      event.preventDefault();
    }
  };

  const verificationCodeButtonsOff = () => {
    setCodeConfirmButtonDisabled(true);
    setBottomConfirmButtonDisabled(true);
  };

  const handleEmailIput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailInputOnchange = event.target.value;

    setEmailInput(emailInputOnchange);

    if (showError) {
      if (emailInputOnchange === '') {
        setInputError('필수 입력 항목입니다.');
      } else if (validEmailReg.test(emailInputOnchange)) {
        setInputError('');
      } else {
        setInputError('이메일 형식이 올바르지 않습니다.');
      }
    }
  };

  const handleCheckEmailFormat = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (emailInput === '') {
      setInputError('필수 입력 항목입니다.');
    } else if (validEmailReg.test(emailInput)) {
      verificationCodeRequst(emailInput);
      setInputError('');
      setBottomConfirmButtonText('비밀번호 재설정하기');
    } else {
      setInputError('이메일 형식이 올바르지 않습니다.');
    }
  };

  const verificationCodeRequst = (emailInput: string) => {
    setLoading(true);
    setVerificationCodeInput('');
    NewPasswordService.getVerificationCodeForNewPassword({
      userEmail: emailInput,
    })
      .then(({ message }) => {
        setLoading(false);
        showAlert(true, message, 'success');
        setStepForNewPassword(2);
        setTimeStop(1);
        resetTimer();
        verificationCodeButtonsOff();
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          const { status, message } = error.response.data;

          switch (status) {
            case 401:
              showAlert(true, message, 'warning');
              break;
            case 500:
              showAlert(true, message, 'error');
              break;
          }
        }
      });
  };

  const handleVerificationCodeInput = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const codeOnChange = event.target.value;

    setVerificationCodeInput(codeOnChange);

    if (showError) {
      if (codeOnChange === '') {
        setInputError('필수 입력 항목입니다.');
        verificationCodeButtonsOff();
      } else if (
        !verificationCodeReg.test(codeOnChange) ||
        codeOnChange.length !== 8
      ) {
        setInputError('올바른 인증 코드가 아닙니다.');
        verificationCodeButtonsOff();
      } else {
        setInputError('');
        setCodeConfirmButtonDisabled(false);
      }
    } else if (codeOnChange.length === 8 && timeStop !== 0) {
      setCodeConfirmButtonDisabled(false);
    } else if (codeOnChange.length === 8 && timeStop === 1) {
      if (seconds === 0 && minutes === 0) {
        verificationCodeButtonsOff();
        setInputError('인증코드가 만료되었습니다.');
      }
    }
  };

  const handleVerificationCodeConfirm = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    setShowError(true);

    if (verificationCodeInput === '') {
      setInputError('필수 입력 항목입니다.');
    } else if (verificationCodeReg.test(verificationCodeInput)) {
      setInputError('');
      setCodeConfirmButtonDisabled(true);
      verificationCodeConfirmRequest(verificationCodeInput);
    } else {
      setInputError('올바른 인증 코드가 아닙니다.');
    }
  };

  const verificationCodeConfirmRequest = (verificationCodeInput: string) => {
    NewPasswordService.confirmVerificationCodeForNewPassword({
      code: verificationCodeInput,
      userEmail: emailInput,
    })
      .then(({ message }) => {
        setShowError(false);
        setTimeStop(0);
        setBottomConfirmButtonDisabled(false);
        setCodeConfirmButtonDisabled(true);
      })
      .catch((error) => {
        if (error.response) {
          const { status, message } = error.response.data;

          switch (status) {
            case 401:
              setInputError(message);
              break;
            case 403:
              setInputError(message);
              break;
            case 500:
              showAlert(true, message, 'error');
              break;
          }
        }
      });
  };

  const handleEmailResend = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    resetTimer();
    setInputError('');
    verificationCodeRequst(emailInput);
  };

  const handleNextStep = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setStepForNewPassword(3);
    setShowError(false);
  };

  const handleNewPasswordInput = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newPasswordOnChange = event.target.value;
    setNewPasswordInput(newPasswordOnChange);

    if (showError) {
      if (newPasswordOnChange === '') {
        setInputError('필수 입력값입니다.');
      } else if (passwordReg.test(newPasswordOnChange)) {
        setInputError('');
      } else {
        setInputError(
          '비밀번호는 영문, 숫자만을 혼합하여 6자 이상이어야 합니다.',
        );
      }
    }
  };

  const handleNewPasswordCheckInput = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newPasswordCheckOnChange = event.target.value;
    setNewPasswordCheckInput(newPasswordCheckOnChange);

    if (showError) {
      if (newPasswordCheckOnChange === '') {
        setNewPasswordCheckInputError(
          '비밀번호 확인을 위해 한번 더 입력해주세요.',
        );
      } else if (newPasswordInput !== newPasswordCheckOnChange) {
        setNewPasswordCheckInputError('비밀번호가 일치하지 않습니다.');
      } else {
        setNewPasswordCheckInputError('');
      }
    }
  };

  const handleNewPasswordRequestButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    if (newPasswordInput === '') {
      setInputError('필수 입력값입니다.');
      setShowError(true);
    } else if (!passwordReg.test(newPasswordInput)) {
      setInputError(
        '비밀번호는 영문, 숫자만을 혼합하여 6자 이상이어야 합니다.',
      );
      setShowError(true);
    } else {
      setInputError('');
    }

    if (newPasswordCheckInput === '') {
      setNewPasswordCheckInputError(
        '비밀번호 확인을 위해 한번 더 입력해주세요.',
      );
      setShowError(true);
    } else if (newPasswordInput !== newPasswordCheckInput) {
      setNewPasswordCheckInputError('비밀번호가 일치하지 않습니다.');
      setShowError(true);
    } else {
      setNewPasswordCheckInputError('');
    }

    if (
      newPasswordInput !== '' &&
      newPasswordCheckInput !== '' &&
      passwordReg.test(newPasswordInput) &&
      newPasswordInput === newPasswordCheckInput
    ) {
      NewPasswordRequest();
    }
  };

  const NewPasswordRequest = () => {
    NewPasswordService.getNewPassword({
      userEmail: emailInput,
      password: newPasswordInput,
    })
      .then(({ message }) => {
        showAlert(true, message, 'success');

        history.push('/users/sign_in');
      })
      .catch((error) => {
        if (error.response) {
          const { message } = error.response.data;

          showAlert(true, message, 'warning');
        }
      });
  };

  return (
    <>
      <Container>
        <Wrapper>
          <CardHeader>
            <Head>비밀번호 재설정</Head>
            <NewPassWordCardSubHead step={stepForNewPassword} />
          </CardHeader>
          <CardForm onKeyPress={onCheckEnter}>
            {stepForNewPassword === 1 && (
              <InputWrapper>
                <RequirementLabel htmlFor="email">
                  비밀번호를 재설정 할 이메일
                </RequirementLabel>
                <Input
                  type="email"
                  id="email"
                  onChange={handleEmailIput}
                  required
                  className={inputError ? 'have-error' : ''}
                />
                {stepForNewPassword === 1 && inputError !== '' && (
                  <ErrorMessageWrapper>
                    <ErrorMessage>{inputError}</ErrorMessage>
                  </ErrorMessageWrapper>
                )}
              </InputWrapper>
            )}
            {stepForNewPassword === 2 && (
              <InputWrapper>
                <RequirementLabel htmlFor="verification-code">
                  인증코드 입력
                </RequirementLabel>
                <VerificationCodeWrapper>
                  <VerificationCodeConfirmWrapper
                    className={inputError ? 'have-error' : ''}
                  >
                    <VerificationCodeInputWrapper>
                      <VerificationCodeInput
                        type="text"
                        id="verification-code"
                        placeholder="인증코드 8자리 입력"
                        required
                        maxLength={8}
                        value={verificationCodeInput}
                        onChange={handleVerificationCodeInput}
                        disabled={minutes === 0 && seconds === 0}
                      />
                      {(minutes !== 0 || seconds !== 0) && (
                        <TimeLimit>
                          {minutes.toString().padStart(2, '0')}:
                          {seconds.toString().padStart(2, '0')}
                        </TimeLimit>
                      )}
                      <CodeConfimtButton
                        onClick={handleVerificationCodeConfirm}
                        disabled={codeConfirmButtonDisalbed}
                      >
                        확인
                      </CodeConfimtButton>
                    </VerificationCodeInputWrapper>
                    {inputError !== '' && (
                      <ErrorMessageWrapper>
                        <ErrorMessage className="verification-code">
                          {inputError}
                        </ErrorMessage>
                      </ErrorMessageWrapper>
                    )}
                  </VerificationCodeConfirmWrapper>
                </VerificationCodeWrapper>
                {timeStop === 1 ? (
                  <ResendEmailWrapper>
                    <ResendEmailMessage>
                      <ResendEmailIcon />
                      이메일을 받지 못하셨나요?
                      <ResendLink onClick={handleEmailResend}>
                        이메일 재전송하기
                      </ResendLink>
                    </ResendEmailMessage>
                  </ResendEmailWrapper>
                ) : null}
              </InputWrapper>
            )}
            {stepForNewPassword === 3 && (
              <InputWrapper>
                <RequirementLabel htmlFor="new-password">
                  새로운 비밀번호 (영문자와 숫자만 포함 최소 6자)
                </RequirementLabel>
                <Input
                  id="new-password"
                  type="password"
                  required
                  className={inputError !== '' ? 'have-error' : ''}
                  onChange={handleNewPasswordInput}
                />
                {inputError !== '' && (
                  <ErrorMessageWrapper>
                    <ErrorMessage>{inputError}</ErrorMessage>
                  </ErrorMessageWrapper>
                )}
                <RequirementLabel htmlFor="new-password-check">
                  새로운 비밀번호 확인
                </RequirementLabel>
                <Input
                  id="new-password-check"
                  type="password"
                  required
                  className={
                    newPasswordCheckInputError !== '' ? 'have-error' : ''
                  }
                  onChange={handleNewPasswordCheckInput}
                />
                {newPasswordCheckInputError !== '' && (
                  <ErrorMessageWrapper>
                    <ErrorMessage>{newPasswordCheckInputError}</ErrorMessage>
                  </ErrorMessageWrapper>
                )}
              </InputWrapper>
            )}
          </CardForm>
          <CardFooter>
            {stepForNewPassword === 1 && (
              <SubmitButton
                type="submit"
                onClick={handleCheckEmailFormat}
                disabled={bottomConfirmButtonDisalbed}
                className={loading ? 'cursor-wait' : ''}
              >
                {loading ? (
                  <Loading selectColor="#fff" />
                ) : (
                  bottomConfirmButtonText
                )}
              </SubmitButton>
            )}
            {stepForNewPassword === 2 && (
              <SubmitButton
                type="submit"
                onClick={handleNextStep}
                disabled={bottomConfirmButtonDisalbed}
              >
                {loading ? (
                  <Loading selectColor={loadingColor} />
                ) : (
                  bottomConfirmButtonText
                )}
              </SubmitButton>
            )}
            {stepForNewPassword === 3 && (
              <SubmitButton
                type="submit"
                onClick={handleNewPasswordRequestButton}
              >
                {bottomConfirmButtonText}
              </SubmitButton>
            )}
          </CardFooter>
        </Wrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  max-width: 576px;
  margin: 0 auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 56px;
  border: 1px solid #d7e2eb;
  border-radius: 6px;

  @media (max-width: 767px) {
    padding: 40px 28px;
  }
  @media (max-width: 575px) {
    padding: 32px 16px;
  }
`;

const Head = styled.h1`
  margin-bottom: 16px;
  font-size: 26px;
  font-weight: 600;
  text-align: left;
  color: #263747;

  @media (max-width: 575px) {
    font-size: 22px;
  }
`;

const CardHeader = styled.div`
  margin-bottom: 40px;
`;

const SubHead = styled.h2`
  font-size: 16px;
  line-height: 1.6;
  color: #98a8b9;

  @media (max-width: 575px) {
    font-size: 15px;
  }
`;

const CardForm = styled.form``;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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

const Input = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 24px;
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

  &.have-error {
    margin-bottom: 4px;
    border: 1px solid #f44336;
    box-shadow: inset 0 0 0 1px #ff77774d;
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

  &.verification-code {
    padding: 2px;
  }
`;

const VerificationCodeWrapper = styled.div`
  display: flex;
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

const TimeLimit = styled.span`
  margin-right: 8px;
  margin-left: 8px;
  font-size: 14px;
  color: #f44336;

  @media (max-width: 575px) {
    font-size: 13px;
  }
`;

const CodeConfimtButton = styled.button`
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

const ResendEmailWrapper = styled.div`
  display: flex;
  margin-bottom: 16px;
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
  width: 16px;
  height: 16px;
  margin-right: 4px;
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

const CardFooter = styled.div``;

const SubmitButton = styled.button`
  width: 100%;
  height: 40px;
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
    background-color: #ebf0fe;
    color: #8e888e;
    cursor: not-allowed;
  }

  &.cursor-wait {
    cursor: wait;
  }

  @media (max-width: 575px) {
    font-size: 15px;
  }
`;

export default NewPasswordCard;
