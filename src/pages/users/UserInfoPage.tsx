import { Redirect } from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';

import useToken from '../../hooks/useToken';

import Header from '../../components/common/Header';
import ProjectNavigation from '../../components/projects/ProjectNavigation';
import UserInfoSection from '../../components/user/UserInfoSection';
import Footer from '../../components/common/Footer';

const UserInfoPage: React.FC = () => {
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
      <UserInfoSection />
      {!smallMedia && <Footer />}
    </>
  );
};

export default UserInfoPage;
