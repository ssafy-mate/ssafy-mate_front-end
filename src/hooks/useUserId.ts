import { useSelector } from 'react-redux';

import { RootState } from '../types/authTypes';

const useUserId = (): number | null => {
  const userId = useSelector<RootState, number | null>(
    (state) => state.auth.userId,
  );

  return userId;
};

export default useUserId;
