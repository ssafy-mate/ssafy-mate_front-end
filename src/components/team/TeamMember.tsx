import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

import FlagIcon from '@mui/icons-material/Flag';

import { TeamMemberType } from '../../types/teamTypes';

const TeamMember: React.FC<TeamMemberType> = ({
  userId,
  userName,
  profileImgUrl,
  job1,
  ssafyTrack,
}) => {
  return (
    <Item>
      <ProfileImgWrapper>
        <ProfileImg src={profileImgUrl} alt={`${userName}님의 프로필 이미지`} />
      </ProfileImgWrapper>
      <Contents>
        <Name>
          <MemberLink to={`/users/${userId}`}>{userName}</MemberLink>
          <FlagIcon />
        </Name>
        <Info>{job1}</Info>
        <Info>{ssafyTrack}</Info>
      </Contents>
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

    & a {
      text-decoration: underline;
      color: #3396f4;
    }
  }

  @media (max-width: 540px) {
    min-width: 100%;
  }
`;

const ProfileImgWrapper = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 24px;
  border-radius: 4px;

  @media (max-width: 960px) {
    width: 48px;
    height: 48px;
  }
  @media (max-width: 540px) {
    width: 46px;
    height: 46px;
  }
`;

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 4px;
  object-fit: fill;

  @media (max-width: 960px) {
    width: 48px;
    height: 48px;
  }
  @media (max-width: 428px) {
    width: 46px;
    height: 46px;
  }
`;

const Contents = styled.div`
  margin: auto 0;
`;

const Name = styled.h5`
  display: flex;
  align-items: center;

  & svg {
    height: 18px;
    color: #3396f4;
  }

  @media (max-width: 720px) {
    & svg {
      height: 17px;
    }
  }
  @media (max-width: 540px) {
    & svg {
      height: 15px;
    }
  }
`;

const MemberLink = styled(Link)`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.6;
  color: #263647;
  transition: all 0.08s ease-in-out;
  cursor: pointer;

  @media (max-width: 720px) {
    font-size: 15px;
  }
  @media (max-width: 540px) {
    font-size: 14px;
  }
`;

const Info = styled.span`
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

  @media (max-width: 720px) {
    font-size: 13px;
  }
`;

export default TeamMember;
