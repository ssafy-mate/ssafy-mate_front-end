import { useEffect } from 'react';

import Header from '../../components/common/Header';
import ProjectNavigation from '../../components/projects/ProjectNavigation';
import OfferListSection from '../../components/projects/OfferListSection';
import Footer from '../../components/common/Footer';

const SpecializationProjectOfferListPage: React.FC = () => {
  useEffect(() => {
    document.title = '특화 프로젝트 받은 제안 | 싸피 메이트';
  }, []);

  return (
    <>
      <Header />
      <ProjectNavigation />
      <OfferListSection />
      <Footer />
    </>
  );
};

export default SpecializationProjectOfferListPage;
