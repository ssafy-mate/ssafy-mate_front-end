import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

import { RootState } from '../../types/authTypes';

const useToken = (): string | null => {
  const token = useSelector<RootState, string | null>(
    (state) => state.auth.token,
  );
  const token_date_expired = localStorage.getItem('token_date');
  if (dayjs().isSameOrAfter(token_date_expired)) {
    localStorage.removeItem('token');
    localStorage.removeItem('token_date');
    localStorage.removeItem('persist:root');

    window.location.replace('/');

    return null;
  }

  return token;
};

export default useToken;
