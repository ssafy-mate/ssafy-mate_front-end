import { RootState } from './../types/authTypes';
import { useSelector } from 'react-redux';

import { ProfileState } from '../redux/modules/profile';

const useProfileInfo = () => {
  const profile = useSelector<RootState, ProfileState>(
    (state) => state.profile,
  );

  return profile;
};

export default useProfileInfo;
