import { Redirect } from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';

import styled from '@emotion/styled';

import useToken from '../../hooks/reduxHooks/useToken';
import useDocumentTitle from '../../hooks/useDocumentTitle';

import Header from '../../components/common/Header';
import ProjectPageNavigation from '../../components/projects/navigation/ProjectPageNavigation';
import TeamCreateForm from '../../components/team/TeamCreateForm';
import Footer from '../../components/common/Footer';

const CreateTeamPage: React.FC = () => {
  const token = useToken();
  const smallMedia = useMediaQuery({
    query: '(max-width: 575px)',
  });

  useDocumentTitle('팀 생성 | 싸피 메이트');

  if (token === null) {
    return <Redirect to="/users/sign_in" />;
  }

  return (
    <>
      <Header />
      <ProjectPageNavigation />
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
