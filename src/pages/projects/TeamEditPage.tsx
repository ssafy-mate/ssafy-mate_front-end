import React, { useEffect } from 'react';

import styled from '@emotion/styled';

import Header from '../../components/common/Header';
import ProjectNavigation from '../../components/projects/ProjectNavigation';
import EditTeamForm from '../../components/team/EditTeamForm';
import Footer from '../../components/common/Footer';

const TeamEditPage: React.FC = () => {
  useEffect(() => {
    document.title = '팀 정보 수정 | 싸피 메이트';
  }, []);

  return (
    <>
      <Header />
      <ProjectNavigation />
      <Container>
        <EditTeamForm />
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 60px auto 0;
  padding: 0 16px;
  box-sizing: border-box;

  @media (max-width: 767px) {
    margin-top: 50px;
  }
  @media (max-width: 575px) {
    margin-top: 70px;
  }
`;

export default TeamEditPage;
