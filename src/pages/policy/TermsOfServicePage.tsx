import useDocumentTitle from '../../hooks/useDocumentTitle';

import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import TermsOfServiceSection from '../../components/policy/TermsOfServiceSection';

const TermsOfServicePage: React.FC = () => {
  useDocumentTitle('이용약관 | 싸피 메이트');

  return (
    <>
      <Header />
      <TermsOfServiceSection />
      <Footer />
    </>
  );
};

export default TermsOfServicePage;
