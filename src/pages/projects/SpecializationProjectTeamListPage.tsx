import { useState, useEffect } from 'react';

import { Redirect } from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';

import useToken from '../../hooks/useToken';
import useTeamList from '../../hooks/useTeamList';

import Header from '../../components/common/Header';
import ProjectNavigation from '../../components/projects/ProjectNavigation';
import ProjectBannerSection from '../../components/projects/ProjectBannerSection';
import TeamListSearchForm from '../../components/projects/TeamListSearchForm';
import TeamRecruitmentSection from '../../components/projects/TeamRecruitmentSection';
import Pagenation from '../../components/projects/Pagenation';
import Footer from '../../components/common/Footer';

const SpecializationProjectTeamListPage: React.FC = () => {
  const [campus, setCampus] = useState<string>('all');
  const [project, setProject] = useState<string>('특화 프로젝트');
  const [projectTrack, setProjectTrack] = useState<string>('all');
  const [job1, setJob1] = useState<string>('all');
  const [techStackCode, setTechStackCode] = useState<number | null>(null);
  const [teamName, setTeamName] = useState<string>('');
  const [exclusion, setExclusion] = useState<boolean>(false);
  const [sort, setSort] = useState<string>('recent');
  const [page, setPage] = useState<number>(1);

  const token = useToken();
  const { isLoading, data, isError, errorMessage } = useTeamList({
    campus,
    project,
    project_track: projectTrack,
    job1,
    techstack_code: techStackCode,
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

  if (!token) {
    return <Redirect to="/users/sign_in" />;
  }

  return (
    <>
      <Header />
      <ProjectNavigation />
      <ProjectBannerSection />
      <TeamListSearchForm
        setCampus={setCampus}
        setProjectTrack={setProjectTrack}
        setJob1={setJob1}
        setTechStackCode={setTechStackCode}
        setTeamName={setTeamName}
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
