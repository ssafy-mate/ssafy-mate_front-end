import { useState } from 'react';

import { Redirect } from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';

import { useSelector } from 'react-redux';

import { RootState } from '../../types/authTypes';

import useToken from '../../hooks/reduxHooks/useToken';
import useTeamList from '../../hooks/reactQueryHooks/useTeamList';
import useDocumentTitle from '../../hooks/useDocumentTitle';

import Header from '../../components/common/Header';
import ProjectPageNavigation from '../../components/projects/navigation/ProjectPageNavigation';
import VisuallyHiddenHead from '../../components/common/VisuallyHiddenHead';
import ProjectBannerSection from '../../components/projects/projectTrackBanner/ProjectTrackBannerSection';
import SearchFormWithTeams from '../../components/projects/searchForm/SearchFormWithTeams';
import TeamRecruitmentSection from '../../components/projects/recruitment/TeamRecruitmentSection';
import Pagenation from '../../components/projects/recruitment/Pagenation';
import Footer from '../../components/common/Footer';

const CURRENT_PROJECT_CODE: number = 2;

const SpecializedProjectTeamListPage: React.FC = () => {
  const myCampus = useSelector<RootState, string | null>(
    (state) => state.auth.campus,
  );
  const myProjectTrack = useSelector<RootState, string | null>(
    (state) => state.auth.projects[CURRENT_PROJECT_CODE - 1].projectTrack,
  );
  const [campus, setCampus] = useState<string>(
    myCampus !== null ? myCampus : 'all',
  );
  const [project] = useState<string>('특화 프로젝트');
  const [projectTrack, setProjectTrack] = useState<string>(
    myProjectTrack !== null ? myProjectTrack : 'all',
  );
  const [job1, setJob1] = useState<string>('all');
  const [techStackId, setTechStackId] = useState<number | null>(null);
  const [teamName, setTeamName] = useState<string>('');
  const [exclusion, setExclusion] = useState<boolean>(false);
  const [sort, setSort] = useState<string>('recent');
  const [page, setPage] = useState<number>(1);

  const token = useToken();
  const { isLoading, data, isError, errorMessage } = useTeamList(token, {
    campus,
    project,
    project_track: projectTrack,
    job1,
    techstack_id: techStackId,
    team_name: teamName,
    exclusion,
    sort,
    page,
  });

  const smallMedia = useMediaQuery({
    query: '(max-width: 575px)',
  });

  useDocumentTitle('특화 프로젝트 팀 공고 | 싸피 메이트');

  if (token === null) {
    return <Redirect to="/users/sign_in" />;
  }

  return (
    <>
      <Header />
      <ProjectPageNavigation />
      <VisuallyHiddenHead level={1} text="특화 프로젝트 팀 공고" />
      <ProjectBannerSection />
      <SearchFormWithTeams
        campus={campus}
        projectTrack={projectTrack}
        setCampus={setCampus}
        setProjectTrack={setProjectTrack}
        setJob1={setJob1}
        setTechStackId={setTechStackId}
        setTeamName={setTeamName}
        setPage={setPage}
      />
      <TeamRecruitmentSection
        isLoading={isLoading}
        data={data}
        isError={isError}
        errorMessage={errorMessage}
        setExclusion={setExclusion}
        setSort={setSort}
        setPage={setPage}
      />
      {data !== undefined && (
        <Pagenation totalPage={data.totalPage} page={page} setPage={setPage} />
      )}
      {!smallMedia && <Footer />}
    </>
  );
};

export default SpecializedProjectTeamListPage;
