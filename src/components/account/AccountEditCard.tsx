import styled from '@emotion/styled';
import { useState } from 'react';

import AccountEditTaps from './AccountEditTaps';
import SsafyMateInformation from './SsafyMateInformation';
import SsafyInformation from './SsafyInformation';

const AccountEditCard: React.FC = () => {
  const [acccountEditTap, setAcccountEditTap] =
    useState<string>('ssafyInformation');

  return (
    <>
      <Container>
        <Wrapper>
          <CardHeader>
            <Head>계정 관리</Head>
            <AccountEditTaps setAcccountEditTap={setAcccountEditTap} />
            {acccountEditTap === 'ssafyInformation' && <SsafyInformation />}
            {acccountEditTap === 'ssafyMateInformation' && (
              <SsafyMateInformation />
            )}
          </CardHeader>
        </Wrapper>
      </Container>
    </>
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
