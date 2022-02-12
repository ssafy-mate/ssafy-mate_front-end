import { useEffect } from 'react';

import ErrorHeader from '../components/error/ErrorHeader';
import ErrorGuidanceSection from '../components/error/ErrorGuidanceSection';
import Footer from '../components/common/Footer';

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = '페이지를 찾을 수 없습니다. | 싸피 메이트';
  }, []);

  return (
    <>
      <ErrorHeader />
      <ErrorGuidanceSection
        title="Page Not Found"
        guidance="요청하신 페이지를 찾을 수 없습니다."
        subGuidance="입력하신 주소가 정확한지 다시 한번 확인해 주세요."
        haveHomeLink={true}
      />
      <Footer offMarginTop={true} />
    </>
  );
};

export default NotFoundPage;
