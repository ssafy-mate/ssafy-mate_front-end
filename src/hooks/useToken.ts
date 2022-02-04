import { useSelector } from 'react-redux';

import { RootState } from '../types/authTypes';

function useToken() {
  const token = useSelector<RootState, string | null>(
    (state) => state.auth.token,
  );

  return token;
}

export default useToken;
