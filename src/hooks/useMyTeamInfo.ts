import { useSelector } from 'react-redux';

import { RootState } from '../types/authTypes';
import { TeamDataType } from '../types/teamTypes';

const useMyTeamInfo = (): TeamDataType | null => {
  const myTeamInfo = useSelector<RootState, TeamDataType | null>(
    (state) => state.myTeam.team,
  );

  return myTeamInfo;
};

export default useMyTeamInfo;
