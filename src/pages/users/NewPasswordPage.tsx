import { useEffect } from 'react';

import styled from '@emotion/styled';

import Header from '../../components/common/Header';
import NewPasswordCard from '../../components/idAndPassword/NewPasswordCard';
import Footer from '../../components/common/Footer';

const NewPasswordPage: React.FC = () => {
  useEffect(() => {
    document.title = '비밀번호 재설정 | 싸피 메이트';
  }, []);

  return (
    <>
      <Header />
      <Container>
        <NewPasswordCard />
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

export default NewPasswordPage;
