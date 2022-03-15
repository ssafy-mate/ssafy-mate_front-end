import { RootState } from '../../types/authTypes';
import { useSelector } from 'react-redux';

import { UserData } from '../../types/userTypes';

const useProfileInfo = () => {
  const profileInfo = useSelector<RootState, UserData | null>(
    (state) => state.profile.info,
  );

  return profileInfo;
};

export default useProfileInfo;
