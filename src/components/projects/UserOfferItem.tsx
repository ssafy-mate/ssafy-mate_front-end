import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

interface UserOfferItemProps {
  userId: number;
  userName: string;
  profileImgUrl: string | null;
  campus: string;
  ssafyTrack: string;
  job1: string;
  offerStatus: boolean | null;
}

interface ButtonProps {
  color: string;
  colorWithHover: string;
}

interface OfferStatusProps {
  color: string;
  backgroundColor: string;
}

const UserOfferItem: React.FC<UserOfferItemProps> = ({
  userId,
  userName,
  profileImgUrl,
  campus,
  ssafyTrack,
  job1,
  offerStatus,
}) => {
  return (
    <Item>
      <ItemBody>
        <ProfileImgWrapper>
          <ProfileImg
            src={
              profileImgUrl !== null
                ? profileImgUrl
                : '/images/assets/basic-profile-img.png'
            }
            alt={`${userName} 프로필 사진`}
          />
        </ProfileImgWrapper>
        <Contents>
          <Link to={`/users/${userId}`}>
            <Head>{userName}</Head>
          </Link>
          <InfoList>
            <InfoMain>
              <InfoItem>{campus}</InfoItem>
              <InfoItem>{ssafyTrack}</InfoItem>
            </InfoMain>
            <InfoSub>{job1}</InfoSub>
          </InfoList>
          <OfferStatusWrapper>
            {offerStatus === null ? (
              <OfferStatus color="#4ab050" backgroundColor="#ecf7ed">
                수락 대기 중
              </OfferStatus>
            ) : offerStatus === true ? (
              <>
                <OfferStatus color="#4ab050" backgroundColor="#ecf7ed">
                  수락 대기 중
                </OfferStatus>
              </>
            ) : (
              <>
                <OfferStatus color="#4ab050" backgroundColor="#ecf7ed">
                  수락 대기 중
                </OfferStatus>
              </>
            )}
          </OfferStatusWrapper>
        </Contents>
      </ItemBody>
      <ItemFooter>
        <Button color="#47a0f5" colorWithHover="#2878c3">
          수락
        </Button>
        <Button color="#f5554a" colorWithHover="#dc4c42">
          거절
        </Button>
      </ItemFooter>
    </Item>
  );
};

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
  padding: 24px;
  border: 1px solid #d7e2eb;
  border-radius: 4px;
  box-sizing: border-box;
  transition: all 0.08s ease-in-out;

  &:last-of-type {
    margin-bottom: 0;
  }

  &.full {
    background-color: #f3f3f3;
    filter: grayscale(80%);
  }

  @media (max-width: 767px) {
    align-items: flex-start;
    flex-direction: column;
  }
  @media (max-width: 575px) {
    padding: 16px;
  }
`;

const ItemBody = styled.div`
  display: flex;

  @media (max-width: 767px) {
    margin-bottom: 20px;
  }
`;

const ProfileImgWrapper = styled.div`
  width: 72px;
  height: 72px;
  margin-right: 24px;
  border-radius: 4px;

  @media (max-width: 575px) {
    width: 40px;
    height: 40px;
  }
`;

const ProfileImg = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 4px;
  object-fit: fill;

  @media (max-width: 575px) {
    width: 40px;
    height: 40px;
  }
`;

const Contents = styled.div`
  box-sizing: border-box;
`;

const Head = styled.h2`
  width: 100%;
  margin-bottom: 4px;
  font-size: 16px;
  line-height: 1.5;
  color: #263747;
  transition: all 0.12s ease-in-out;
  cursor: pointer;

  &:hover {
    color: #3396f4;
    text-decoration: underline;
  }

  @media (max-width: 767px) {
    font-size: 16px;
  }
  @media (max-width: 575px) {
    font-size: 15px;
  }
`;

const InfoList = styled.h3`
  display: flex;
  margin-bottom: 10px;
  font-size: 14px;
  color: #98a8b9;

  @media (max-width: 767px) {
    font-size: 13px;
  }

  @media (max-width: 575px) {
    flex-direction: column;
  }
`;

const InfoMain = styled.div`
  display: flex;
`;

const InfoItem = styled.span`
  display: flex;

  &:not(:first-of-type) {
    ::before {
      content: '';
      display: inline-block;
      width: 1px;
      height: 10px;
      margin: auto 8px;
      background-color: #98a8b9;
    }
  }

  @media (max-width: 575px) {
    margin-bottom: 4px;

    &:not(:first-of-type) {
      &::before {
        height: 9px;
      }
    }
  }
`;

const InfoSub = styled.span`
  ::before {
    content: '';
    display: inline-block;
    width: 1px;
    height: 10px;
    margin: auto 8px;
    background-color: #98a8b9;
  }

  @media (max-width: 575px) {
    &::before {
      content: none;
    }
  }
`;

const OfferStatusWrapper = styled.div``;

const OfferStatus = styled.span<OfferStatusProps>`
  padding: 2px 10px;
  border: 1px solid ${(props) => props.color};
  border-radius: 10px;
  box-sizing: border-box;
  background-color: ${(props) => props.backgroundColor};
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.color};

  @media (max-width: 767px) {
    font-size: 13px;
  }
`;

const ItemFooter = styled.div`
  @media (max-width: 767px) {
    display: flex;
    width: 100%;
    flex-direction: row;
  }
`;

const Button = styled.button<ButtonProps>`
  width: 50px;
  height: 50px;
  margin-left: 8px;
  border-radius: 4px;
  background-color: ${(props) => props.color};
  border: none;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  color: #fff;
  transition: background-color 0.08s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.colorWithHover};
  }

  &:nth-of-type(1) {
    margin-left: 0;
  }

  @media (max-width: 767px) {
    width: 100%;
    height: 30px;
  }
  @media (max-width: 575px) {
    font-size: 13px;
  }
`;

export default UserOfferItem;