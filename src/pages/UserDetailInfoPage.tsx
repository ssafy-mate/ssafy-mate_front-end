import { useEffect } from 'react';

import Header from '../components/common/Header';
import ProjectNavigation from '../components/projects/ProjectNavigation';
import Footer from '../components/common/Footer';

const UserDetailInfoPage: React.FC = () => {
  useEffect(() => {
    document.title = '00님 상세 정보 | 싸피 메이트';
  }, []);

  return (
    <>
      <Header />
      <ProjectNavigation />
      <Footer />
    </>
  );
};

export default UserDetailInfoPage;
