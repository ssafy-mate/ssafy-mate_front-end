import { useEffect } from 'react';

import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import PrivacySection from '../../components/policy/PrivacySection';

const PrivacyPage: React.FC = () => {
  useEffect(() => {
    document.title = '개인정보 취급방침 | 싸피 메이트';
  }, []);

  return (
    <>
      <Header />
      <PrivacySection />
      <Footer />
    </>
  );
};

export default PrivacyPage;
