import React from 'react';

import styled from '@emotion/styled';

import Header from '../components/common/Header';
import SignUpCard from '../components/signUp/SignUpForm';
import Footer from '../components/common/Footer';

const SignUpPage: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <SignUpCard />
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.div`
  margin-top: 160px;
  padding: 0 16px;

  @media (max-width: 580px) {
    margin-top: 120px;
  }
  @media (max-width: 414px) {
    margin-top: 100px;
  }
`;

export default SignUpPage;
