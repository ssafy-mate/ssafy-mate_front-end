import { useEffect } from 'react';

import Header from '../components/common/Header';
import ProjectNavigation from '../components/projects/ProjectNavigation';
import TeamInfoSection from '../components/team/TeamInfoSection';
import Footer from '../components/common/Footer';

const TeamDetailInfoPage: React.FC = () => {
  useEffect(() => {
    document.title = '데스파시토 팀 상세 정보 | 싸피 메이트';
  }, []);

  return (
    <>
      <Header />
      <ProjectNavigation />
      <TeamInfoSection />
      <Footer />
    </>
  );
};

export default TeamDetailInfoPage;
