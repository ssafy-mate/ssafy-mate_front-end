import { useEffect } from 'react';

import { Redirect } from 'react-router-dom';

import styled from '@emotion/styled';

import useToken from '../../hooks/reduxHooks/useToken';

import Header from '../../components/common/Header';
import FindUserIdCard from '../../components/account/FindUserIdCard';
import Footer from '../../components/common/Footer';

const FindUserIdPage: React.FC = () => {
  const token = useToken();

  useEffect(() => {
    document.title = '아이디 찾기 | 싸피 메이트';
  }, []);

  if (token !== null) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Header />
      <Container>
        <FindUserIdCard />
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.div`
  margin-top: 140px;
  padding: 0 16px;

  @media (max-width: 575px) {
    margin-top: 120px;
  }
`;

export default FindUserIdPage;
