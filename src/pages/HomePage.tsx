import { useEffect } from 'react';

import Header from '../components/common/Header';
import HomeBannerSection from '../components/home/HomeBannerSection';
import ProjectsSection from '../components/home/ProjectsSection';
import IntroContainer from '../components/home/IntroContainer';
import ToTopButton from '../components/home/ToTopButton';
import Footer from '../components/common/Footer';

import useToken from '../hooks/useToken';
import useSocket from '../hooks/useSocket';
import useUserId from '../hooks/useUserId';

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = '싸피 메이트';
  }, []);

  const token = useToken();
  const userId = useUserId();
  const [socket] = useSocket(userId as number);

  useEffect(() => {
    if (token && socket) {
      socket?.emit('login', { id: userId });
    }
  }, [socket, token, userId]);

  return (
    <>
      <Header />
      <HomeBannerSection />
      <ProjectsSection />
      <IntroContainer />
      <ToTopButton />
      <Footer />
    </>
  );
};

export default HomePage;
