import React from 'react';

import styled from '@emotion/styled';

import Header from '../components/common/Header';
import ProjectNavigation from '../components/projects/ProjectNavigation';
import BannerContainer from '../components/common/BannerContainer';
import FilterForm from '../components/projects/FilterForm';
import Footer from '../components/common/Footer';
import TeamAnnouncement from '../components/projects/TeamAnnouncement';

const TeamSpecializationProjectPage: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <ProjectNavigation />
        <BannerContainer />
        <FilterForm />
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