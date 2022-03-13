import styled from '@emotion/styled';

import useDocumentTitle from '../../hooks/useDocumentTitle';

import Header from '../../components/common/Header';
import NewPasswordCard from '../../components/account/NewPasswordCard';
import Footer from '../../components/common/Footer';

const NewPasswordPage: React.FC = () => {
  useDocumentTitle('비밀번호 재설정 | 싸피 메이트');

  return (
    <>
      <Header />
      <Container>
        <NewPasswordCard />
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.div`
  margin-top: 140px;
  padding: 0 16px;

  @media (max-width: 575px) {
    margin-top: 120px;
  }
`;

export default NewPasswordPage;
