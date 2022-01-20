import React, { useRef, useState } from 'react';

import { useForm } from 'react-hook-form';

import styled from '@emotion/styled';
import {
  passwordReg,
  requiredFields,
  validEmailReg,
  verificationCodeReg,
} from '../../data/regularExpressionData';
import { useEffect } from 'react';

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

  const [signUpEmailValidation, setSignUpEmailValidation] = useState(true);
  const [validationCode, setValidationCode] = useState(true);

  const signUpEmailOnChange: string = watch('signUpEmail');
  const verificationCodeOnChange: string = watch('verificationCode');

  const signUpPasswordOnChange = watch('signUpPassword');

  useEffect(() => {
    if (errors.signUpEmail) {
      setSignUpEmailValidation(true);
    } else if (
      signUpEmailOnChange !== undefined &&
      signUpEmailOnChange.length >= 1
    ) {
      setSignUpEmailValidation(false);
    }
  }, [errors.signUpEmail, signUpEmailOnChange]);

  useEffect(() => {
    if (errors.verificationCode) {
      setValidationCode(true);
    } else if (
      verificationCodeOnChange !== undefined &&
      verificationCodeOnChange.length === 8
    ) {
      setValidationCode(false);
    }
  }, [errors.verificationCode, verificationCodeOnChange]);

  const EmailAuthRequest = () => {
    //이메일 인증 코드 요청
  };

  const EmailAuthConfirm = () => {
    //이메일 인증 코드 확인 요청
  };

  const goBack = () => {
    updateSignUpStep(1);
  }; //다 날려버리기

  const updateSignUpProps = (data: SignUp) => {
    const { signUpEmail, signUpPassword } = data;
    updateSignUpEmail(signUpEmail);
    updateSignUpPassword(signUpPassword);
    updateSignUpStep(2);
  };

  const onSubmit = (data: SignUp) => {
    console.log(JSON.stringify(data));
    //post 요청 보내기
    updateSignUpProps(data);
    //SignupCard로 상태 올려보내기
    //요청 실패한 경우 modal
  };

  return (
    <>
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
              disabled={signUpEmailValidation}
              onClick={EmailAuthRequest}
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
            />
            <AuthButton
              type="button"
              onClick={EmailAuthConfirm}
              disabled={validationCode}
            >
              확인
            </AuthButton>
          </ButtonWrapper>
          {errors.verificationCode && (
            <ErrorSpan>올바른 인증 코드가 아닙니다.</ErrorSpan>
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
          {errors.signUpPassword && (
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

        <ButtonGroup>
          <PrevButton type="button" onClick={goBack}>
            이전
          </PrevButton>
          <NextButton type="submit" disabled={!isValid}>
            다음
          </NextButton>
        </ButtonGroup>
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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
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

const PrevButton = styled.button`
  width: 80px;
  height: 40px;
  border: none;
  border-radius: 0.25rem;
  box-sizing: border-box;
  background-color: #7c8998;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  transition: background-color 0.08s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #56677a;
  }
`;

const NextButton = styled.button`
  width: 80px;
  height: 40px;
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

export default SignUpForm;
