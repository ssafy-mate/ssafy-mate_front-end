import React, { useEffect } from 'react';

import styled from '@emotion/styled';

import Header from '../components/common/Header';
import TeamInformationSection from '../components/team/TeamInformationSection';
import Footer from '../components/common/Footer';
import ProjectNavigation from '../components/projects/ProjectNavigation';

const TeamDetailInfoPage: React.FC = () => {
  useEffect(() => {
    document.title = '데스파시토 팀 상세 정보 | 싸피 메이트';
  }, []);

  return (
    <>
      <Header />
      <Container>
        <ProjectNavigation />
        <TeamInformationSection />
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  box-sizing: border-box;
`;

export default TeamDetailInfoPage;
