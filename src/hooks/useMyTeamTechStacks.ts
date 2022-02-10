import { useSelector } from 'react-redux';

import { RootState } from '../types/authTypes';
import { TechStackWithImg } from '../types/commonTypes';

const useMyTeamTechStacks = () => {
  const myTeamTechStacks = useSelector<
    RootState,
    TechStackWithImg[] | undefined
  >((state) => state.myTeam.team?.techStacks);

  return myTeamTechStacks;
};

export default useMyTeamTechStacks;
