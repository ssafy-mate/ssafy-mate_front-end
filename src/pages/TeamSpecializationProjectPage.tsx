import React, { useEffect } from 'react';

import styled from '@emotion/styled';

import Header from '../components/common/Header';
import ProjectNavigation from '../components/projects/ProjectNavigation';
import ProjectsBannerSection from '../components/projects/ProjectsBannerSection';
import TeamFilterForm from '../components/projects/TeamFilterForm';
import Footer from '../components/common/Footer';
import TeamAnnouncement from '../components/projects/TeamAnnouncement';

const TeamSpecializationProjectPage: React.FC = () => {
  useEffect(() => {
    document.title = '특화 프로젝트 팀 공고 | 싸피 메이트';
  }, []);

  return (
    <>
      <Header />
      <Container>
        <ProjectNavigation />
        <ProjectsBannerSection />
        <TeamFilterForm />
        <TeamAnnouncement />
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.main`
  width: 100%;
`;

export default TeamSpecializationProjectPage;
