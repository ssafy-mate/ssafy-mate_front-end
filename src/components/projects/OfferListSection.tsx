import styled from '@emotion/styled';

import TeamOfferItem from './TeamOfferItem';
import UserOfferItem from './UserOfferItem';

const OfferListSection: React.FC = () => {
  const data = {
    teamOffers: [
      {
        offerId: 1,
        teamId: 1,
        teamName: '디벨로파시토',
        teamImgUrl: null,
        campus: '서울',
        notice: '실제 운영할 서비스 개발을 도전할 분들을 모집합니다.',
        offerStatus: null,
      },
    ],
    userOffers: [
      {
        offerId: 2,
        userId: 5,
        userName: '박정환',
        profileImgUrl: null,
        campus: '서울',
        ssafyTrack: 'Java Track',
        job1: '프론트엔드 (Front-end)',
        offerStatus: null,
      },
    ],
  };

  return (
    <Container>
      <Wrapper>
        <Head>특화 프로젝트 | 받은 제안</Head>
        <OfferList>
          {data.teamOffers.map((teamOffer) => (
            <TeamOfferItem
              key={teamOffer.offerId}
              teamId={teamOffer.teamId}
              teamName={teamOffer.teamName}
              teamImgUrl={teamOffer.teamImgUrl}
              campus={teamOffer.campus}
              notice={teamOffer.notice}
              offerStatus={teamOffer.offerStatus}
            />
          ))}
          {data.userOffers.map((userOffer) => (
            <UserOfferItem
              key={userOffer.offerId}
              userId={userOffer.userId}
              userName={userOffer.userName}
              profileImgUrl={userOffer.profileImgUrl}
              campus={userOffer.campus}
              ssafyTrack={userOffer.ssafyTrack}
              job1={userOffer.job1}
              offerStatus={userOffer.offerStatus}
            />
          ))}
        </OfferList>
      </Wrapper>
    </Container>
  );
};

const Container = styled.section`
  max-width: 800px;
  margin: 0 auto 24px;
  padding: 16px;
  box-sizing: border-box;

  @media (max-width: 575px) {
    margin-top: 70px;
  }
`;

const Wrapper = styled.div`
  border: 1px solid #d7e2eb;
  border-radius: 4px;
`;

const Head = styled.h1`
  padding: 14px 20px;
  border-radius: 4px 4px 0 0;
  background-color: #3396f4;
  font-size: 16px;
  font-weight: 600;
  color: #fff;

  @media (max-width: 575px) {
    font-size: 15px;
  }
`;

const OfferList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export default OfferListSection;
