import { useSelector } from 'react-redux';

import { RootState } from '../../types/authTypes';

const useUserIdName = () => {
  const userId = useSelector<RootState, number | null>(
    (state) => state.auth.userId,
  );
  const userName = useSelector<RootState, string | null>(
    (state) => state.auth.userName,
  );

  return [userId, userName];
};

export default useUserIdName;
