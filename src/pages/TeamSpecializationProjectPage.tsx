import React from 'react';

import styled from '@emotion/styled';

import Header from '../components/common/Header';
import ProjectNavigation from '../components/projects/ProjectNavigation';
import BannerContainer from '../components/common/BannerContainer';
import TeamFilterForm from '../components/projects/TeamFilterForm';
import Footer from '../components/common/Footer';
import TeamAnnouncement from '../components/projects/TeamAnnouncement';

const TeamSpecializationProjectPage: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <ProjectNavigation />
        <BannerContainer />
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
