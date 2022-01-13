import React from 'react';

import styled from '@emotion/styled';

const SignUpForm: React.FC = () => {
  return (
    <Container>
      <InputWrapper>
        <RequirementLabel htmlFor="signup-email">이메일</RequirementLabel>
        <ButtonWrapper>
          <InfoInput
            type="email"
            id="signup-email"
            name="signup-email"
            placeholder="이메일"
          />
          <AuthButton>이메일 인증</AuthButton>
        </ButtonWrapper>
      </InputWrapper>
      <InputWrapper>
        <RequirementLabel htmlFor="verification-code">
          인증번호 입력
        </RequirementLabel>
        <ButtonWrapper>
          <InfoInput
            type="text"
            id="verification-code"
            name="verification-code"
            placeholder="이메일로 전송된 인증번호를 입력하세요."
          />
          <AuthButton>확인</AuthButton>
        </ButtonWrapper>
      </InputWrapper>
      <InputWrapper>
        <RequirementLabel htmlFor="signup-password">
          비밀번호 (영문자와 숫자 포함 최소 6자)
        </RequirementLabel>
        <InfoInput
          type="password"
          id="signup-password"
          name="signup-password"
          placeholder="비밀번호"
        />
      </InputWrapper>
      <InputWrapper>
        <RequirementLabel htmlFor="signup-check-password">
          비밀번호 확인
        </RequirementLabel>
        <InfoInput
          type="password"
          id="signup-check-password"
          name="signup-check-password"
          placeholder="비밀번호 확인"
        />
      </InputWrapper>
      <ButtonGroup>
        <PrevButton>이전</PrevButton>
        <NextButton>다음</NextButton>
      </ButtonGroup>
    </Container>
  );
};

const Container = styled.div`
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
`;

const AuthButton = styled.button`
  width: 100px;
  height: 40px;
  margin-left: 8px;
  border: none;
  border-radius: 0.25rem;
  box-sizing: border-box;
  background-color: #96a0ac;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  transition: background-color 0.08s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #3396f4;
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

  &:hover {
    background-color: #2878c3;
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

export default SignUpForm;
