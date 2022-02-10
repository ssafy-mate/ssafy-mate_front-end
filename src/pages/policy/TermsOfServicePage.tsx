import { useEffect } from 'react';

import styled from '@emotion/styled';

import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import TermsOfServiceCard from '../../components/policy/TermOfServiceCard';

const TermsOfServicePage: React.FC = () => {
  useEffect(() => {
    document.title = '이용약관 | 싸피 메이트';
  }, []);

  return (
    <>
      <Header />
      <Container>
        <TermsOfServiceCard />
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

export default TermsOfServicePage;
