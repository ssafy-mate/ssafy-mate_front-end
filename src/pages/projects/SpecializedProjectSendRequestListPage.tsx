import { Redirect } from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';

import useToken from '../../hooks/reduxHooks/useToken';
import useDocumentTitle from '../../hooks/useDocumentTitle';

import Header from '../../components/common/Header';
import ProjectPageNavigation from '../../components/projects/navigation/ProjectPageNavigation';
import SendRequestListSection from '../../components/projects/requestList/SendRequestListSection';
import Footer from '../../components/common/Footer';

const SpecializedProjectSendRequestListPage: React.FC = () => {
  const token = useToken();
  const smallMedia = useMediaQuery({
    query: '(max-width: 575px)',
  });

  useDocumentTitle('특화 프로젝트 보낸 요청 | 싸피 메이트');

  if (token === null) {
    return <Redirect to="/users/sign_in" />;
  }

  return (
    <>
      <Header />
      <ProjectPageNavigation />
      <SendRequestListSection />
      {!smallMedia && <Footer />}
    </>
  );
};

export default SpecializedProjectSendRequestListPage;
