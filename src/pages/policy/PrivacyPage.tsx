import { useEffect } from 'react';

import styled from '@emotion/styled';

import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import PrivacyCard from '../../components/policy/PrivacyCard';

const PrivacyPage: React.FC = () => {
  useEffect(() => {
    document.title = '개인정보 취급방침 | 싸피 메이트';
  }, []);

  return (
    <>
      <Header />
      <Container>
        <PrivacyCard />
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

export default PrivacyPage;
