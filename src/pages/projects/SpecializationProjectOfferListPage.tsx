import { useEffect } from 'react';

import { Redirect } from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';

import useToken from '../../hooks/useToken';

import Header from '../../components/common/Header';
import ProjectNavigation from '../../components/projects/ProjectNavigation';
import OfferListSection from '../../components/projects/OfferListSection';
import Footer from '../../components/common/Footer';

const SpecializationProjectOfferListPage: React.FC = () => {
  const token = useToken();
  const smallMedia = useMediaQuery({
    query: '(max-width: 575px)',
  });

  useEffect(() => {
    document.title = '특화 프로젝트 받은 제안 | 싸피 메이트';
  }, []);

  if (token === null) {
    return <Redirect to="/users/sign_in" />;
  }

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
