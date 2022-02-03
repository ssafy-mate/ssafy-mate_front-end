import { useEffect } from 'react';

import { useMediaQuery } from 'react-responsive';

import styled from '@emotion/styled';

import Header from '../../components/common/Header';
import ProjectNavigation from '../../components/projects/ProjectNavigation';
import TeamCreateForm from '../../components/team/TeamCreateForm';
import Footer from '../../components/common/Footer';

const CreateTeamPage: React.FC = () => {
  const smallMedia = useMediaQuery({
    query: '(max-width: 575px)',
  });

  useEffect(() => {
    document.title = '팀 생성 | 싸피 메이트';
  }, []);

  return (
    <>
      <Header />
      <ProjectNavigation />
      <Container>
        <TeamCreateForm />
      </Container>
      {!smallMedia && <Footer />}
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
    margin-bottom: 90px;
  }
`;

export default CreateTeamPage;
