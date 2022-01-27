import Header from '../components/common/Header';
import ProjectNavigation from '../components/projects/ProjectNavigation';
import UserInfoSection from '../components/user/UserInfoSection';
import Footer from '../components/common/Footer';

const UserDetailInfoPage: React.FC = () => {
  return (
    <>
      <Header />
      <ProjectNavigation />
      <UserInfoSection />
      <Footer />
    </>
  );
};

export default UserDetailInfoPage;
