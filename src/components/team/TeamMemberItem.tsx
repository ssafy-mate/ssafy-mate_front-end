import styled from '@emotion/styled';

import FlagIcon from '@mui/icons-material/Flag';

import { TeamMember } from '../../types/teamTypes';

import UserLabel from '../user/UserLabel';

interface TeamMemberItemProps extends TeamMember {
  isOwner: boolean;
}

const TeamMemberItem: React.FC<TeamMemberItemProps> = ({
  userId,
  userName,
  profileImgUrl,
  ssafyTrack,
  job1,
  isOwner,
}) => {
  return (
    <Item>
      <ProfileImgWrapper>
        <ProfileImg
          src={
            profileImgUrl !== null
              ? profileImgUrl
              : '/images/assets/basic-profile-img.png'
          }
          alt={`${userName}님의 프로필 이미지`}
        />
      </ProfileImgWrapper>
      <MemberInfo>
        <MemberName>
          <UserLabel userId={userId} userName={userName} />
          {isOwner ? <FlagIcon /> : null}
        </MemberName>
        <InfoBox>
          <InfoItem>{job1.split('(')[0]}</InfoItem>
          <InfoItem>{ssafyTrack}</InfoItem>
        </InfoBox>
      </MemberInfo>
    </Item>
  );
};

const Item = styled.li`
  display: flex;
  flex-direction: row;
  min-width: 340px;
  margin-bottom: 12px;
  padding: 14px;
  border: 1px solid #d7e2eb;
  border-radius: 4px;
  box-sizing: border-box;
  transition: all 0.08s ease-in-out;

  &:hover {
    border-color: #84c0f8;

    & .user-label {
      color: #3396f4;
      text-decoration: underline;
    }
  }

  @media (max-width: 575px) {
    min-width: 100%;
  }
`;

const ProfileImgWrapper = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 24px;
  border-radius: 4px;

  @media (max-width: 991px) {
    width: 48px;
    height: 48px;
  }
  @media (max-width: 575px) {
    width: 46px;
    height: 46px;
  }
`;

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 4px;
  object-fit: fill;

  @media (max-width: 991px) {
    width: 48px;
    height: 48px;
  }
  @media (max-width: 575px) {
    width: 46px;
    height: 46px;
  }
`;

const MemberInfo = styled.div`
  margin: auto 0;
`;

const MemberName = styled.h5`
  display: flex;
  align-items: center;

  & svg {
    height: 18px;
    color: #3396f4;
  }

  & .user-label {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.6;
    color: #263647;
    transition: all 0.08s ease-in-out;

    &:hover {
      color: #3396f4;
    }

    @media (max-width: 767px) {
      font-size: 15px;
    }
    @media (max-width: 575px) {
      font-size: 14px;
    }
  }

  @media (max-width: 767px) {
    & svg {
      height: 17px;
    }
  }
  @media (max-width: 575px) {
    & svg {
      height: 15px;
    }
  }
`;

const InfoBox = styled.div``;

const InfoItem = styled.span`
  font-size: 14px;
  line-height: 1.5;
  color: #5f7f90;

  &:first-of-type {
    &::after {
      content: '';
      display: inline-block;
      width: 1px;
      height: 10px;
      margin: 0 6px;
      background-color: #5f7f90;
    }
  }

  @media (max-width: 767px) {
    font-size: 13px;
  }
`;

export default TeamMemberItem;
