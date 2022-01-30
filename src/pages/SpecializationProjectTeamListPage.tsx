import { useEffect } from 'react';

import Header from '../components/common/Header';
import ProjectNavigation from '../components/projects/ProjectNavigation';
import ProjectBannerSection from '../components/projects/ProjectBannerSection';
import TeamFilterForm from '../components/projects/TeamFilterForm';
import Footer from '../components/common/Footer';
import TeamRecruitmentSection from '../components/projects/TeamRecruitmentSection';

const SpecializationProjectTeamListPage: React.FC = () => {
  useEffect(() => {
    document.title = '특화 프로젝트 팀 공고 | 싸피 메이트';
  }, []);

  return (
    <>
      <Header />
      <ProjectNavigation />
      <ProjectBannerSection />
      <TeamFilterForm />
      <TeamRecruitmentSection />
      <Footer />
    </>
  );
};

export default SpecializationProjectTeamListPage;
