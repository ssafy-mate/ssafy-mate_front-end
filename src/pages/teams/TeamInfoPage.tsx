import { Redirect } from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';

import useToken from '../../hooks/useToken';

import Header from '../../components/common/Header';
import ProjectNavigation from '../../components/projects/ProjectNavigation';
import TeamInfoSection from '../../components/team/TeamInfoSection';
import Footer from '../../components/common/Footer';

const TeamInfoPage: React.FC = () => {
  const token = useToken();
  const smallMedia = useMediaQuery({
    query: '(max-width: 575px)',
  });

  if (!token) {
    return <Redirect to="/users/sign_in" />;
  }

  return (
    <>
      <Header />
      <ProjectNavigation />
      <TeamInfoSection />
      {!smallMedia && <Footer />}
    </>
  );
};

export default TeamInfoPage;
