import { useState, useEffect } from 'react';

const useOnScreen = (ref: any) => {
  const [isIntersecting, setIntersecting] = useState<boolean>(false);
  const observer = new IntersectionObserver(([entry]) =>
    setIntersecting(entry.isIntersecting),
  );

  useEffect(() => {
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return isIntersecting;
};

export default useOnScreen;
