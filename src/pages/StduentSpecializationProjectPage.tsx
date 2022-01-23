import React, { useEffect } from 'react';

import styled from '@emotion/styled';

import Header from '../components/common/Header';
import ProjectNavigation from '../components/projects/ProjectNavigation';
import ProjectsBannerSection from '../components/projects/ProjectsBannerSection';
import StudentFilterForm from '../components/projects/StudentFilterForm';
import StudentAnnouncement from '../components/projects/StudentAnnouncement';
import Footer from '../components/common/Footer';

const StudentSpecializationProjectPage: React.FC = () => {
  useEffect(() => {
    document.title = '특화 프로젝트 교육생 공고 | 싸피 메이트';
  }, []);

  return (
    <>
      <Header />
      <Container>
        <ProjectNavigation />
        <ProjectsBannerSection />
        <StudentFilterForm />
        <StudentAnnouncement />
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.main`
  width: 100%;
`;

export default StudentSpecializationProjectPage;
