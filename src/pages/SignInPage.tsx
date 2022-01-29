import { useEffect } from 'react';

import { Redirect } from 'react-router-dom';

import { useSelector } from 'react-redux';

import styled from '@emotion/styled';

import { RootState } from '../types/signInTypes';

import Header from '../components/common/Header';
import SignInContainer from '../containers/SignInContainer';
import Footer from '../components/common/Footer';

const SignInPage: React.FC = () => {
  const token = useSelector<RootState, string | null>(
    (state) => state?.auth.token,
  );

  useEffect(() => {
    document.title = '로그인 | 싸피 메이트';
  }, []);

  if (token !== null) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <Header />
      <Container>
        <SignInContainer />
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
