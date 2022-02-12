import { useSelector } from 'react-redux';

import { RootState } from '../types/authTypes';

const useUserProjectInfo = (projectId: number) => {
  const campus: string | null = useSelector<RootState, string | null>(
    (state) => state.auth.campus,
  );
  const project: string | null = useSelector<RootState, string | null>(
    (state) => state.auth.projects[projectId - 1].project,
  );
  const projectTrack: string | null = useSelector<RootState, string | null>(
    (state) => state.auth.projects[projectId - 1].projectTrack,
  );
  const teamId: string | null = useSelector<RootState, string | null>(
    (state) => state.auth.projects[projectId - 1].teamId,
  );

  return [campus, project, projectTrack, teamId];
};

export default useUserProjectInfo;
