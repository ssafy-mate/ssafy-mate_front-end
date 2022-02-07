import {
  useCallback,
  useState,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from 'react';

type ReturnTypes<T = any> = [
  T,
  (e: ChangeEvent<HTMLTextAreaElement>) => void,
  Dispatch<SetStateAction<T>>,
];

const useTextArea = <T>(initialData: T): ReturnTypes<T> => {
  // generic으로 선언
  const [value, setValue] = useState(initialData);
  const handler = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value as unknown as T);
  }, []);

  return [value, handler, setValue];
};

export default useTextArea;
