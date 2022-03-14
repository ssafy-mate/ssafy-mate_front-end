import { useState, useEffect } from 'react';

const useDocumentTitle = (title: string): void => {
  const [documentTitle, setDocumentTitle] = useState<string>(title);

  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle, setDocumentTitle]);
};

export default useDocumentTitle;
