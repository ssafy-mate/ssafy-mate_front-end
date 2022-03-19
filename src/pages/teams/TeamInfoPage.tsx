import { Redirect } from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';

import useToken from '../../hooks/reduxHooks/useToken';

import Header from '../../components/common/Header';
import ProjectPageNavigation from '../../components/projects/navigation/ProjectPageNavigation';
import TeamInfoSection from '../../components/team/TeamInfoSection';
import Footer from '../../components/common/Footer';

const TeamInfoPage: React.FC = () => {
  const token = useToken();
  const smallMedia = useMediaQuery({
    query: '(max-width: 575px)',
  });

  if (token === null) {
    return <Redirect to="/users/sign_in" />;
  }

  return (
    <>
      <Header />
      <ProjectPageNavigation />
      <TeamInfoSection />
      {!smallMedia && <Footer />}
    </>
  );
};

export default TeamInfoPage;
