import { useEffect } from 'react';

import NotFoundHeader from '../components/common/NotFoundHeader';
import NotFoundGuidanceSection from '../components/notFound/NotFoundGuidanceSection';
import Footer from '../components/common/Footer';

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = '페이지를 찾을 수 없습니다. | 싸피 메이트';
  }, []);

  return (
    <>
      <NotFoundHeader />
      <NotFoundGuidanceSection />
      <Footer offMarginTop={true} />
    </>
  );
};

export default NotFoundPage;
