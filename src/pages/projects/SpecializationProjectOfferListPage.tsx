import { useEffect } from 'react';

import { useMediaQuery } from 'react-responsive';

import Header from '../../components/common/Header';
import ProjectNavigation from '../../components/projects/ProjectNavigation';
import OfferListSection from '../../components/projects/OfferListSection';
import Footer from '../../components/common/Footer';

const SpecializationProjectOfferListPage: React.FC = () => {
  const smallMedia = useMediaQuery({
    query: '(max-width: 575px)',
  });

  useEffect(() => {
    document.title = '특화 프로젝트 받은 제안 | 싸피 메이트';
  }, []);

  return (
    <>
      <Header />
      <ProjectNavigation />
      <OfferListSection />
      {!smallMedia && <Footer />}
    </>
  );
};

export default SpecializationProjectOfferListPage;
