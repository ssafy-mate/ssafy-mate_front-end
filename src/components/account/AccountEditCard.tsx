import { useState } from 'react';

import styled from '@emotion/styled';

import AccountEditTaps from './AccountEditTaps';
import BasicInformationSection from './BasicInformationSection';
import ProfileInformationSection from './ProfileInformationSection';

const AccountEditCard: React.FC = () => {
  const [selectedTap, setSelectedTap] = useState<string>('basicInformation');
  const token_date_expired = localStorage.getItem('token_date');

  if (token_date_expired === null) {
    localStorage.removeItem('persist:root');
    window.location.replace('/');
  }
  return (
    <Container>
      <Wrapper>
        <CardHeader>
          <Head>계정 관리</Head>
          <AccountEditTaps setAcccountEditTap={setSelectedTap} />
        </CardHeader>
        {selectedTap === 'basicInformation' && <BasicInformationSection />}
        {selectedTap === 'profileInformation' && <ProfileInformationSection />}
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  max-width: 576px;
  margin: 0 auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 56px;
  border: 1px solid #d7e2eb;
  border-radius: 6px;

  @media (max-width: 767px) {
    padding: 40px 28px;
  }
  @media (max-width: 575px) {
    padding: 32px 16px;
  }
`;

const CardHeader = styled.div`
  margin-bottom: 40px;

  @media (max-width: 575px) {
    margin-bottom: 36px;
  }
`;

const Head = styled.h1`
  margin-bottom: 16px;
  font-size: 26px;
  font-weight: 600;
  text-align: center;
  color: #263747;

  @media (max-width: 575px) {
    font-size: 22px;
  }
`;
export default AccountEditCard;
