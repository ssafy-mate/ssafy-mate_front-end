import React from 'react';

import styled from '@emotion/styled';

import Header from '../components/common/Header';
import SignInCard from '../components/signIn/SignInCard';
import Footer from '../components/common/Footer';

const SignInPage: React.FC = () => {
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
  margin-top: 160px;
  padding: 0 16px;
`;

export default SignInPage;
