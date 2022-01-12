import React from 'react';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import SignUpSteeper from './SignUpStepper';
import AuthForm from './AuthForm';

const SignUpForm: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <Head>회원가입</Head>
        <SignUpSteeper />
        <AuthForm />
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
`;

const Head = styled.h3`
  margin-bottom: 56px;
  font-size: 26px;
  font-weight: 600;
  text-align: center;
`;

export default SignUpForm;
