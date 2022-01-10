import React from 'react';

import styled from '@emotion/styled';

import Header from '../components/common/Header';
import SignInCard from '../components/signIn/SignInCard';
import Footer from '../components/common/Footer';

const SignInPage: React.FC = () => {
  return (
    <Container>
      <Header />
      <Wrapper>
        <SignInCard />
      </Wrapper>
      <Footer />
    </Container>
  );
};

const Container = styled.div``;

const Wrapper = styled.div`
  max-width: 1200px;
  margin-top: 160px;
  padding: 0 16px;
`;

export default SignInPage;
