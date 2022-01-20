import React, { useEffect } from 'react';

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = '페이지를 찾을 수 없습니다. | 싸피 메이트';
  }, []);

  return <div>404 페이지</div>;
};

export default NotFoundPage;
