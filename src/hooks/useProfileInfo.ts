import { RootState } from './../types/authTypes';
import { useSelector } from 'react-redux';

import { UserData } from './useUserInfo';

const useProfileInfo = () => {
  const profile = useSelector<RootState, UserData | null>(
    (state) => state.profile.info,
  );

  return profile;
};

export default useProfileInfo;
