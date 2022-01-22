import React, { useState } from 'react';

import { useForm } from 'react-hook-form';

import { useHistory } from 'react-router-dom';

import styled from '@emotion/styled';

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
  SignInResopnse,
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
    formState: { errors, isValid },
  } = useForm<SignUp>({ mode: 'onChange' });

  type Severity = 'error' | 'success' | 'info' | 'warning' | undefined;

  const history = useHistory();

  const [statusAlertOpen, setStatusAlertOpen] = useState(true);
  const [statusAlertSeverity, setStatusAlertSeverity] =
    useState<Severity>('success');

  const [statusAlertText, setStatusAlertText] =
    useState('교육생 인증에 성공했습니다.');

  const [signUpEmailValidationButton, setSignUpEmailValidationButton] =
    useState(true);

  const [validationCodeConfirmButton, setValidationCodeConfirmButton] =
    useState(true);

  const [validationCodeInput, setValidationCodeInput] = useState(true);

  const [codeConfirmButtonText, setSodeConfirmButtonText] = useState('확인');

  const signUpEmailOnChange: string = watch('signUpEmail');

  const verificationCodeOnChange: string = watch('verificationCode');

  const signUpPasswordOnChange = watch('signUpPassword');

  const [resendEmail, setResendEmail] = useState(false);

  const updateSignUpProps = (data: SignUp) => {
    const { signUpEmail, signUpPassword } = data;
    updateSignUpEmail(signUpEmail);
    updateSignUpPassword(signUpPassword);
    updateSignUpStep(2);
  };

  useEffect(() => {
    if (errors.signUpEmail) {
      setSignUpEmailValidationButton(true);
    } else if (
      signUpEmailOnChange !== undefined &&
      signUpEmailOnChange.length >= 1
    ) {
      setSignUpEmailValidationButton(false);
    }
  }, [errors.signUpEmail, signUpEmailOnChange]);

  useEffect(() => {
    if (errors.verificationCode) {
      setValidationCodeConfirmButton(true);
    } else if (
      verificationCodeOnChange !== undefined &&
      verificationCodeOnChange.length === 8
    ) {
      setValidationCodeConfirmButton(false);
    }
  }, [errors.verificationCode, verificationCodeOnChange]);

  const EmailVerificationCodeRequest = async () => {
    //이메일 인증 코드 요청
    const data: EmailVerificationCodeRequest = { email: '' };
    data.email = signUpEmailOnChange;
    const response: SignInResopnse = await UserService.getEmailVerificationCode(
      data,
    );
    if (response.success) {
      setValidationCodeInput(false);
      setSignUpEmailValidationButton(true);
      setResendEmail(true);
    } else if (response.status === 401) {
      //이미 등록된 이메일입니다.alert 주고 로그인 페이지로 넘기기
      setStatusAlertSeverity('info');
      setStatusAlertText('이미 가입된 이메일입니다.');
      setStatusAlertOpen(true);
      //history.push() 하면 현재 alert 없이 페이지 그냥 넘어간다.
    } else if (response.status === 500) {
      //error alert
      setStatusAlertSeverity('warning');
      setStatusAlertText('이메일 인증 코드 전송에 실패했습니다.');
      setStatusAlertOpen(true);
    }
  };

  const EmailVerificationCodeConfirm = async () => {
    //이메일 인증 코드 확인 요청
    const data: EmailVerificationCodeConfirmRequest = { code: '', email: '' };
    data.email = signUpEmailOnChange;
    data.code = verificationCodeOnChange;
    const response: SignInResopnse =
      await UserService.getEmailVerificationCodeConfirm(data);
    if (response.success) {
      setSodeConfirmButtonText('인증 완료');
      setValidationCodeConfirmButton(true);
      setValidationCodeInput(true);
    } else if (response.status === 400) {
    } else if (response.status === 500) {
    }
  };

  const onSubmit = (data: SignUp) => {
    updateSignUpProps(data);
  };
  const alertClose = () => {
    setStatusAlertOpen(false);
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
          <Alert
            onClose={alertClose}
            severity={statusAlertSeverity}
            sx={{ width: '100%' }}
          >
            {statusAlertText}
          </Alert>
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
            />

            <AuthButton
              type="button"
              disabled={signUpEmailValidationButton}
              onClick={EmailVerificationCodeRequest}
            >
              이메일 인증
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
                disabled={validationCodeInput}
              />
              <TimeLimit>시간</TimeLimit>
            </VerificationCodeWrapper>
            <AuthButton
              type="button"
              onClick={EmailVerificationCodeConfirm}
              disabled={validationCodeConfirmButton}
            >
              {codeConfirmButtonText}
            </AuthButton>
          </ButtonWrapper>
          {errors.verificationCode && (
            <ErrorSpan>올바른 인증 코드가 아닙니다.</ErrorSpan>
          )}

          {resendEmail && <ErrorSpan>이메일 재전송 버튼</ErrorSpan>}
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
          {errors.signUpCheckPassword?.type === 'required' && (
            <ErrorSpan>필수 입력 항목입니다.</ErrorSpan>
          )}
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

const TimeLimit = styled.span`
  margin-right: 20px;
`;
const SsafyAuthSnackBar = styled(Snackbar)`
  height: 20%;
`;
export default SignUpForm;
