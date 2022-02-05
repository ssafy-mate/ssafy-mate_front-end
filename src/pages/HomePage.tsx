import { useEffect } from 'react';

import Header from '../components/common/Header';
import HomeBannerSection from '../components/home/HomeBannerSection';
import ProjectsSection from '../components/home/ProjectsSection';
import Footer from '../components/common/Footer';

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = '싸피 메이트';
  }, []);

  return (
    <>
      <Header />
      <HomeBannerSection />
      <ProjectsSection />
      <Footer />
    </>
  );
};

export default HomePage;
