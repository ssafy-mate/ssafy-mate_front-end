import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

import WebIcon from '@mui/icons-material/Web';
import StorageIcon from '@mui/icons-material/Storage';
import GroupsIcon from '@mui/icons-material/Groups';

import { TeamItemType } from '../../types/teamTypes';

interface TeamItemProps extends TeamItemType {}

const TeamItem: React.FC<TeamItemProps> = ({
  teamId,
  teamName,
  teamImgUrl,
  campus,
  project,
  projectTrack,
  notice,
  techStacks,
  totalRecruitment,
  totalHeadcount,
  frontendRecruitment,
  frontendHeadcount,
  backendRecruitment,
  backendHeadcount,
  isRecruiting,
}) => {
  return (
    <Item className={isRecruiting ? '' : 'full'}>
      <ItemHeader>
        <TeamImg
          src={
            teamImgUrl !== null
              ? teamImgUrl
              : '/images/common/default-team-logo.png'
          }
          alt={`${teamName} 팀 로고`}
        />
      </ItemHeader>
      <ItemBody>
        <Link to={`/teams/${teamId}`} className="team-item__info-page-link">
          <Notice className="team-item__notice">{notice}</Notice>
        </Link>
        <MainInfoList>
          <InfoName>{teamName}</InfoName>
          <InfoCampus>{campus}</InfoCampus>
        </MainInfoList>
        <SubInfoList>
          <InfoItem>{project}</InfoItem>
          <InfoItem>{projectTrack}</InfoItem>
        </SubInfoList>
        <TeamStatusList>
          <TeamStatusItem>
            <WebIcon />
            <Job>Front-end</Job> {frontendHeadcount} / {frontendRecruitment}
          </TeamStatusItem>
          <TeamStatusItem>
            <StorageIcon />
            <Job>Back-end</Job> {backendHeadcount} / {backendRecruitment}
          </TeamStatusItem>
          <TeamStatusItem>
            <GroupsIcon />
            <Job>Total</Job> {totalHeadcount} / {totalRecruitment}
          </TeamStatusItem>
        </TeamStatusList>
        <TechStackList>
          {techStacks.map((techStack) => (
            <TechStackItem key={techStack.techStackId}>
              {techStack.techStackName}
            </TechStackItem>
          ))}
        </TechStackList>
      </ItemBody>
    </Item>
  );
};

const Item = styled.li`
  display: flex;
  width: calc(50% - 0.5rem);
  max-width: 576px;
  margin-bottom: 16px;
  padding: 24px;
  border: 1px solid #d7e2eb;
  border-radius: 4px;
  box-sizing: border-box;
  transition: all 0.08s ease-in-out;

  &:hover {
    border: 1px solid #add5fa;

    & .team-item__notice {
      color: #3396f4;
      text-decoration: underline;
    }
  }
  &:nth-of-type(even) {
    margin-left: 16px;
  }

  &.full {
    background-color: #f3f3f3;
    filter: grayscale(80%);

    &:hover {
      border: 1px solid #d7e2eb;
      background-color: #f3f3f3;
    }
  }

  @media (max-width: 1199px) {
    width: 100%;
    max-width: 100%;

    &:nth-of-type(even) {
      margin-left: 0;
    }
  }
  @media (max-width: 575px) {
    padding: 16px;
  }
`;

const ItemHeader = styled.div`
  width: 72px;
  height: 72px;
  margin-right: 24px;
  border-radius: 4px;

  @media (max-width: 575px) {
    width: 40px;
    height: 40px;
  }
`;

const TeamImg = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 4px;
  object-fit: fill;

  @media (max-width: 575px) {
    width: 40px;
    height: 40px;
  }
`;

const ItemBody = styled.div`
  box-sizing: border-box;
`;

const Notice = styled.h2`
  width: 100%;
  margin-bottom: 6px;
  font-size: 18px;
  line-height: 1.5;
  color: #263747;
  transition: all 0.08s ease-in-out;

  @media (max-width: 767px) {
    font-size: 16px;
  }
  @media (max-width: 575px) {
    font-size: 15px;
  }
`;

const MainInfoList = styled.div`
  display: flex;
  margin-bottom: 6px;
`;

const SubInfoList = styled.div`
  display: flex;
  margin-bottom: 6px;
`;

const InfoName = styled.h3`
  display: flex;
  font-size: 14px;
  color: #98a8b9;

  @media (max-width: 767px) {
    font-size: 13px;
  }
`;

const InfoCampus = styled.span`
  display: flex;
  font-size: 14px;
  color: #98a8b9;

  ::before {
    content: '';
    display: inline-block;
    width: 1px;
    height: 10px;
    margin: auto 8px;
    background-color: #98a8b9;
  }

  @media (max-width: 767px) {
    font-size: 13px;
  }
  @media (max-width: 575px) {
    ::before {
      height: 9px;
      margin: auto 6px;
    }
  }
`;

const InfoItem = styled.span`
  display: flex;
  font-size: 14px;
  color: #98a8b9;

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

  @media (max-width: 767px) {
    font-size: 13px;
  }
  @media (max-width: 575px) {
    &:not(:first-of-type) {
      ::before {
        height: 9px;
        margin: auto 6px;
      }
    }
  }
`;

const TeamStatusList = styled.ul`
  display: flex;
  margin-bottom: 6px;

  @media (max-width: 575px) {
    flex-direction: column;
  }
`;

const TeamStatusItem = styled.li`
  font-size: 14px;
  color: #98a8b9;
  line-height: 1.6;

  svg {
    margin-right: 2px;
    padding-bottom: 2px;
    font-size: 18px;
    line-height: 1.5;
    vertical-align: middle;
  }

  &:not(:last-of-type) {
    &::after {
      content: '';
      display: inline-block;
      width: 1px;
      height: 10px;
      margin: 0 8px;
      background-color: #98a8b9;
    }
  }

  @media (max-width: 767px) {
    font-size: 13px;

    svg {
      font-size: 15px;
    }
  }
  @media (max-width: 575px) {
    &:not(:last-of-type) {
      &::after {
        content: none;
      }
    }
  }
`;

const Job = styled.span``;

const TechStackList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const TechStackItem = styled.li`
  display: inline-block;
  margin-right: 4px;
  margin-bottom: 4px;
  padding: 3px 8px;
  border-radius: 4px;
  background-color: #e9ecf3;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
  color: #44576c;
  vertical-align: top;

  &:last-of-type {
    margin-right: 0;
  }
`;

export default TeamItem;
