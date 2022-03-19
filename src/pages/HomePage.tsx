import { useEffect } from 'react';

import useSocket from '../hooks/useSocket';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useToken from '../hooks/reduxHooks/useToken';
import useUserId from '../hooks/reduxHooks/useUserId';

import Header from '../components/common/Header';
import VisuallyHiddenHead from '../components/common/VisuallyHiddenHead';
import HomeBannerContainer from '../components/home/homeBanner/HomeBannerContainer';
import ProjectLinksContainer from '../components/home/projectLinks/ProjectLinksContainer';
import ServiceIntroContainer from '../components/home/serviceIntro/ServiceIntroContainer';
import ToTopButton from '../components/home/common/ToTopButton';
import Footer from '../components/common/Footer';

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
      <VisuallyHiddenHead level={1} text="싸피 메이트" />
      <HomeBannerContainer />
      <ProjectLinksContainer />
      <ServiceIntroContainer />
      <ToTopButton />
      <Footer />
    </>
  );
};

export default HomePage;
