import { useSelector } from 'react-redux';

import { RootState } from '../types/authTypes';

const useUserProjectInfo = (projectId: number) => {
  const campus: string | null = useSelector<RootState, string | null>(
    (state) => state.auth.campus,
  );
  const project: string | null = useSelector<RootState, string | null>(
    (state) => state.auth.projects[projectId - 1].projectName,
  );
  const projectTrack: string | null = useSelector<RootState, string | null>(
    (state) => state.auth.projects[projectId - 1].projectTrack,
  );
  const projectTeamId: string | null = useSelector<RootState, string | null>(
    (state) => state.auth.projects[projectId - 1].projectTeamId,
  );

  return [campus, project, projectTrack, projectTeamId];
};

export default useUserProjectInfo;
