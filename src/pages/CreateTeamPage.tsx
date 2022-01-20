import React, { useEffect } from 'react';

import styled from '@emotion/styled';

import Header from '../components/common/Header';
import ProjectNavigation from '../components/projects/ProjectNavigation';
import CreateTeamForm from '../components/team/CreateTeamForm';
import Footer from '../components/common/Footer';

const CreateTeamPage: React.FC = () => {
  useEffect(() => {
    document.title = '팀 생성 | 싸피 메이트';
  }, []);

  return (
    <>
      <Header />
      <ProjectNavigation />
      <Container>
        <CreateTeamForm />
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.div`
  margin-top: 80px;
  padding: 0 16px;

  @media (max-width: 580px) {
    margin-top: 60px;
  }
  @media (max-width: 414px) {
    margin-top: 40px;
  }
`;

export default CreateTeamPage;
