import { useEffect } from 'react';

import Header from '../components/common/Header';
import ProjectNavigation from '../components/projects/ProjectNavigation';
import ProjectBannerSection from '../components/projects/ProjectBannerSection';
import StudentFilterForm from '../components/projects/StudentFilterForm';
import StudentAnnouncement from '../components/projects/StudentAnnouncement';
import Footer from '../components/common/Footer';

const SpecializationProjectStudentListPage: React.FC = () => {
  useEffect(() => {
    document.title = '특화 프로젝트 교육생 공고 | 싸피 메이트';
  }, []);

  return (
    <>
      <Header />
      <ProjectNavigation />
      <ProjectBannerSection />
      <StudentFilterForm />
      <StudentAnnouncement />
      <Footer />
    </>
  );
};

export default SpecializationProjectStudentListPage;
