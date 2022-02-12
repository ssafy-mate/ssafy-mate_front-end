import { useEffect } from 'react';

import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import TermsOfServiceCard from '../../components/policy/TermsOfServiceCard';

const TermsOfServicePage: React.FC = () => {
  useEffect(() => {
    document.title = '이용약관 | 싸피 메이트';
  }, []);

  return (
    <>
      <Header />
      <TermsOfServiceCard />
      <Footer />
    </>
  );
};

export default TermsOfServicePage;
