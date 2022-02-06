import { useState, useEffect } from 'react';

import { Redirect } from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';

import useToken from '../../hooks/useToken';
import useUserList from '../../hooks/useUserList';

import Header from '../../components/common/Header';
import ProjectNavigation from '../../components/projects/ProjectNavigation';
import ProjectBannerSection from '../../components/projects/ProjectBannerSection';
import UserListSearchForm from '../../components/projects/UserListSearchForm';
import UserRecruitmentSection from '../../components/projects/UserRecruitmentSection';
import Pagenation from '../../components/projects/Pagenation';
import Footer from '../../components/common/Footer';

const SpecializationProjectUserListPage: React.FC = () => {
  const [campus, setCampus] = useState<string>('all');
  const [project, setProject] = useState<string>('특화 프로젝트');
  const [projectTrack, setProjectTrack] = useState<string>('all');
  const [job1, setJob1] = useState<string>('all');
  const [techStackCode, setTechStackCode] = useState<number | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [ssafyTrack, setSsafyTrack] = useState<string>('all');
  const [exclusion, setExclusion] = useState<boolean>(false);
  const [sort, setSort] = useState<string>('recent');
  const [page, setPage] = useState<number>(1);

  const token = useToken();
  const { isLoading, data, isError, errorMessage } = useUserList({
    campus,
    project,
    project_track: projectTrack,
    job1,
    techstack_code: techStackCode,
    user_name: userName,
    ssafy_track: ssafyTrack,
    exclusion,
    sort,
    page,
  });

  const smallMedia = useMediaQuery({
    query: '(max-width: 575px)',
  });

  useEffect(() => {
    document.title = '특화 프로젝트 교육생 공고 | 싸피 메이트';
  }, []);

  if (token === null) {
    return <Redirect to="/users/sign_in" />;
  }

  return (
    <>
      <Header />
      <ProjectNavigation />
      <ProjectBannerSection />
      <UserListSearchForm
        setCampus={setCampus}
        setProjectTrack={setProjectTrack}
        setJob1={setJob1}
        setTechStackCode={setTechStackCode}
        setUserName={setUserName}
        setSsafyTrack={setSsafyTrack}
      />
      <UserRecruitmentSection
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

export default SpecializationProjectUserListPage;
