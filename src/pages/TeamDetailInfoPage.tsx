import Header from '../components/common/Header';
import ProjectNavigation from '../components/projects/ProjectNavigation';
import TeamInfoSection from '../components/team/TeamInfoSection';
import Footer from '../components/common/Footer';

const TeamDetailInfoPage: React.FC = () => {
  return (
    <>
      <Header />
      <ProjectNavigation />
      <TeamInfoSection />
      <Footer />
    </>
  );
};

export default TeamDetailInfoPage;
