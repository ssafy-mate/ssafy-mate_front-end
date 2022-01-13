import React from 'react';

import { Link } from 'react-router-dom';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const SignInCard: React.FC = () => {
  return (
    <Container>
      <CardHead>로그인</CardHead>
      <SignInForm>
        <SignInLabel>이메일</SignInLabel>
        <SignInInput placeholder="이메일" />
        <SignInLabel>비밀번호</SignInLabel>
        <SignInInput placeholder="비밀번호" />
        <Options>
          <IdSaveCheckBox>
            <IdSaveCheckInput type="checkbox" id="idSave" name="idSave" />
            <IdSaveCheckLabel htmlFor="idSave">아이디 저장</IdSaveCheckLabel>
          </IdSaveCheckBox>
          <AccountManagementMenu>
            <Link to="#" css={accountLink}>
              아이디 찾기
            </Link>
            <Link to="#" css={accountLink}>
              비밀번호 찾기
            </Link>
          </AccountManagementMenu>
        </Options>
        <SignInButton>로그인</SignInButton>
        <SignUpLinkBox>
          아직 계정이 없으신가요?
          <Link to="/users/sign_up" className="sign-up-link">
            계정 만들기
          </Link>
        </SignUpLinkBox>
      </SignInForm>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
  padding: 56px;
  border: 1px solid #d7e2eb;
  border-radius: 6px;
  box-sizing: border-box;

  @media (max-width: 580px) {
    padding: 56px 28px;
  }
  @media (max-width: 414px) {
    padding: 32px 16px;
  }
`;

const CardHead = styled.h3`
  margin-bottom: 56px;
  font-size: 26px;
  font-weight: 600;
  text-align: center;
`;

const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const SignInLabel = styled.label`
  margin-bottom: 4px;
  font-size: 14px;
  line-height: 1.5;
  color: #263747;

  @media (max-width: 540px) {
    font-size: 13px;
  }
`;

const SignInInput = styled.input`
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

  @media (max-width: 540px) {
    font-size: 13px;
  }
`;

const Options = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  @media (max-width: 420px) {
    flex-direction: column;
  }
`;

const IdSaveCheckBox = styled.div`
  @media (max-width: 420px) {
    margin-bottom: 8px;
  }
`;

const IdSaveCheckInput = styled.input``;

const IdSaveCheckLabel = styled.label`
  font-size: 14px;
  color: #98a8b9;
  transition: color 0.08s ease-in-out;
  cursor: pointer;
  line-height: 1.5;

  &:hover {
    color: #3396f4;
  }
`;

const AccountManagementMenu = styled.div``;

const SignInButton = styled.button`
  height: 40px;
  margin-bottom: 24px;
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

  @media (max-width: 540px) {
    font-size: 15px;
  }
`;

const SignUpLinkBox = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: #98a8b9;
  text-align: center;

  .sign-up-link {
    padding-left: 4px;
    font-weight: 500;
    color: #263747;

    &::after {
      content: '〉';
      display: inline-block;
      margin-left: 0.25rem;
      vertical-align: top;
      transition: all 0.08s ease-in-out;
      transition-delay: initial;
    }
    &:hover {
      color: #2878c3;

      &::after {
        content: '〉';
        transform: translateX(3px);
      }
    }
  }

  @media (max-width: 540px) {
    font-size: 13px;
  }
`;

const accountLink = css`
  font-size: 14px;
  line-height: 1.5;
  color: #98a8b9;
  transition: color 0.08s ease-in-out;
  cursor: pointer;

  &:hover {
    color: #3396f4;
  }

  &:first-of-type {
    &:after {
      content: '';
      display: inline-block;
      width: 1px;
      height: 10px;
      margin: 0 8px;
      background-color: #98a8b9;
    }
  }

  @media (max-width: 540px) {
    font-size: 13px;
  }
`;

export default SignInCard;
