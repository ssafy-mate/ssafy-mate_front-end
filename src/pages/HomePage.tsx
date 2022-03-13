import { useEffect } from 'react';

import Header from '../components/common/Header';
import HomeBannerSection from '../components/home/HomeBannerSection';
import ProjectsSection from '../components/home/ProjectsSection';
import IntroContainer from '../components/home/IntroContainer';
import ToTopButton from '../components/home/ToTopButton';
import Footer from '../components/common/Footer';

import useToken from '../hooks/reduxHooks/useToken';
import useUserId from '../hooks/reduxHooks/useUserId';
import useSocket from '../hooks/useSocket';
import useDocumentTitle from '../hooks/useDocumentTitle';

const HomePage: React.FC = () => {
  const token = useToken();
  const userId = useUserId();
  const [socket] = useSocket(userId as number);

  useDocumentTitle('싸피 메이트');

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
