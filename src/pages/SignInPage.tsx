import React, { useEffect } from 'react';

import styled from '@emotion/styled';

import Header from '../components/common/Header';
import SignInCard from '../components/signIn/SignInCard';
import Footer from '../components/common/Footer';

const SignInPage: React.FC = () => {
  useEffect(() => {
    document.title = '로그인 | 싸피 메이트';
  }, []);

  return (
    <>
      <Header />
      <Container>
        <SignInCard />
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.div`
  margin-top: 140px;
  padding: 0 16px;

  @media (max-width: 580px) {
    margin-top: 120px;
  }
  @media (max-width: 414px) {
    margin-top: 100px;
  }
`;

export default SignInPage;
