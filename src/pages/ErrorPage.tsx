import { useEffect } from 'react';

import ErrorHeader from '../components/error/ErrorHeader';
import ErrorGuidanceSection from '../components/error/ErrorGuidanceSection';

const ErrorPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Server Error | 싸피 메이트';
  }, []);

  return (
    <>
      <ErrorHeader />
      <ErrorGuidanceSection
        title="Server Error"
        guidance="현재 서버 문제로 에러가 발생 했습니다."
        subGuidance="불편함을 드려서 죄송합니다. 조속히 해결하도록 하겠습니다."
        haveHomeLink={false}
      />
    </>
  );
};

export default ErrorPage;
