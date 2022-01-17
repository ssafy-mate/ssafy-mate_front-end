import React from 'react';

import styled from '@emotion/styled';

import SignUpStepper from './SignUpStepper';
import AuthForm from './AuthForm';
import SignUpForm from './SignUpForm';
import ProfileForm from './ProfileForm';

const SignUpCard: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <Head>회원가입</Head>
        <SignUpStepper />
        {/* 1단계 : 교육생 인증 */}
        <AuthForm />
        {/* 2단계 : 기본 정보 작성 */}
        {/* <SignUpForm /> */}
        {/* 3단계 : 프로필 작성 */}
        {/* <ProfileForm /> */}
      </Wrapper>
    </Container>
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

  @media (max-width: 620px) {
    padding: 40px 28px;
  }

  @media (max-width: 414px) {
    padding: 32px 16px;
  }
`;

const Head = styled.h3`
  margin-bottom: 56px;
  font-size: 26px;
  font-weight: 600;
  text-align: center;
  color: #263747;

  @media (max-width: 580px) {
    margin-bottom: 40px;
  }
`;

export default SignUpCard;
