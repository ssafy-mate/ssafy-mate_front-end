import { useState, useEffect } from 'react';

import { Redirect } from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';

import { useSelector } from 'react-redux';

import { RootState } from '../../types/authTypes';

import useToken from '../../hooks/useToken';
import useTeamList from '../../hooks/useTeamList';

import Header from '../../components/common/Header';
import ProjectNavigation from '../../components/projects/ProjectNavigation';
import ProjectBannerSection from '../../components/projects/ProjectBannerSection';
import TeamListSearchForm from '../../components/projects/TeamListSearchForm';
import TeamRecruitmentSection from '../../components/projects/TeamRecruitmentSection';
import Pagenation from '../../components/projects/Pagenation';
import Footer from '../../components/common/Footer';

const CURRENT_PROJECT_CODE: number = 2;

const SpecializationProjectTeamListPage: React.FC = () => {
  const myCampus = useSelector<RootState, string | null>(
    (state) => state.auth.campus,
  );
  const myProjectTrack = useSelector<RootState, string | null>(
    (state) => state.auth.projects[CURRENT_PROJECT_CODE - 1].projectTrack,
  );
  const [campus, setCampus] = useState<string>(
    myCampus !== null ? myCampus : 'all',
  );
  const [project, setProject] = useState<string>('특화 프로젝트');
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

  useEffect(() => {
    document.title = '특화 프로젝트 팀 공고 | 싸피 메이트';
  }, []);

  if (token === null) {
    return <Redirect to="/users/sign_in" />;
  }

  return (
    <>
      <Header />
      <ProjectNavigation />
      <ProjectBannerSection />
      <TeamListSearchForm
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
      />
      {data !== undefined && (
        <Pagenation totalPage={data.totalPage} setPage={setPage} />
      )}
      {!smallMedia && <Footer />}
    </>
  );
};

export default SpecializationProjectTeamListPage;
