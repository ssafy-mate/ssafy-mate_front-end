import { useEffect } from 'react';

import styled from '@emotion/styled';

import Header from '../components/common/Header';
import ProjectNavigation from '../components/projects/ProjectNavigation';
import EditTeamForm from '../components/team/EditTeamForm';
import Footer from '../components/common/Footer';

const EditTeamPage: React.FC = () => {
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
  margin-top: 80px;
  padding: 0 16px;

  @media (max-width: 580px) {
    margin-top: 60px;
  }
  @media (max-width: 414px) {
    margin-top: 40px;
  }
`;

export default EditTeamPage;
