import { useState } from 'react';

import { Redirect } from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';

import { useSelector } from 'react-redux';

import { RootState } from '../../types/authTypes';

import useToken from '../../hooks/reduxHooks/useToken';
import useUserList from '../../hooks/reactQueryHooks/useUserList';
import useDocumentTitle from '../../hooks/useDocumentTitle';

import Header from '../../components/common/Header';
import ProjectNavigation from '../../components/projects/ProjectNavigation';
import VisuallyHiddenHead from '../../components/common/VisuallyHiddenHead';
import ProjectBannerSection from '../../components/projects/ProjectBannerSection';
import UserListSearchForm from '../../components/projects/UserListSearchForm';
import UserRecruitmentSection from '../../components/projects/UserRecruitmentSection';
import Pagenation from '../../components/projects/Pagenation';
import Footer from '../../components/common/Footer';

const CURRENT_PROJECT_CODE: number = 2;

const SpecializationProjectUserListPage: React.FC = () => {
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
  const [userName, setUserName] = useState<string>('');
  const [ssafyTrack, setSsafyTrack] = useState<string>('all');
  const [exclusion, setExclusion] = useState<boolean>(false);
  const [sort, setSort] = useState<string>('recent');
  const [page, setPage] = useState<number>(1);

  const token = useToken();
  const { isLoading, data, isError, errorMessage } = useUserList(token, {
    campus,
    project,
    project_track: projectTrack,
    job1,
    techstack_id: techStackId,
    user_name: userName,
    ssafy_track: ssafyTrack,
    exclusion,
    sort,
    page,
  });

  const smallMedia = useMediaQuery({
    query: '(max-width: 575px)',
  });

  useDocumentTitle('특화 프로젝트 교육생 공고 | 싸피 메이트');

  if (token === null) {
    return <Redirect to="/users/sign_in" />;
  }

  return (
    <>
      <Header />
      <ProjectNavigation />
      <VisuallyHiddenHead level={1} text="특화 프로젝트 교육생 공고" />
      <ProjectBannerSection />
      <UserListSearchForm
        campus={campus}
        projectTrack={projectTrack}
        setCampus={setCampus}
        setProjectTrack={setProjectTrack}
        setJob1={setJob1}
        setTechStackId={setTechStackId}
        setUserName={setUserName}
        setSsafyTrack={setSsafyTrack}
        setPage={setPage}
      />
      <UserRecruitmentSection
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

export default SpecializationProjectUserListPage;
