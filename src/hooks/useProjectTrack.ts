import { useSelector } from 'react-redux';

import { Project, RootState } from '../types/authTypes';

const useProjectTrack = (projectId: number) => {
  const projects: Project[] | null = useSelector<RootState, Project[] | null>(
    (state) => state.auth.projects,
  );

  if (projects === null) {
    return null;
  }

  return projects[projectId - 1]?.projectTrack;
};

export default useProjectTrack;
