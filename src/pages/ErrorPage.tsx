import React, { useEffect } from 'react';

const ErrorPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Error | 싸피 메이트';
  }, []);

  return (
    <div>
      <h1>Error</h1>
    </div>
  );
};

export default ErrorPage;
