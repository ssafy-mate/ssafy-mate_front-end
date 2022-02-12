import { useEffect } from 'react';

import { Redirect } from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';

import styled from '@emotion/styled';

import useToken from '../../hooks/useToken';

import Header from '../../components/common/Header';
import ProjectNavigation from '../../components/projects/ProjectNavigation';
import TeamEditForm from '../../components/team/TeamEditForm';
import Footer from '../../components/common/Footer';

const TeamEditPage: React.FC = () => {
  const token = useToken();
  const smallMedia = useMediaQuery({
    query: '(max-width: 575px)',
  });

  useEffect(() => {
    document.title = '팀 정보 수정 | 싸피 메이트';
  }, []);

  if (token === null) {
    return <Redirect to="/users/sign_in" />;
  }

  return (
    <>
      <Header />
      <ProjectNavigation />
      <Container>
        <TeamEditForm />
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

export default TeamEditPage;
