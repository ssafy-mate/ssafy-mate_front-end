import useDocumentTitle from '../../hooks/useDocumentTitle';

import styled from '@emotion/styled';

import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import AccountEditCard from '../../components/account/AccountEditCard';

const AccountEditPage: React.FC = () => {
  useDocumentTitle('계정 관리 | 싸피 메이트');

  return (
    <>
      <Header />
      <Container>
        <AccountEditCard />
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

export default AccountEditPage;
