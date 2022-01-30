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
  notice,
  techStacks,
  totalRecruitment,
  totalHeadcount,
  frontendRecruitment,
  frontendHeadcount,
  backendRecruitment,
  backendHeadcount,
}) => {
  return (
    <Item>
      <TeamInfoPageLink to={`/teams/${teamId}`}>
        <ItemHeader>
          <TeamImg
            src={
              teamImgUrl !== null
                ? teamImgUrl
                : '/images/assets/basic-team-logo.png'
            }
            alt={`${teamName} 팀 로고`}
          />
        </ItemHeader>
        <ItemBody>
          <Notice>{notice}</Notice>
          <TeamName>
            {teamName}
            <TeamCampus>{campus}</TeamCampus>
          </TeamName>
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
              <TechStackItem key={techStack.id}>
                {techStack.techStackName}
              </TechStackItem>
            ))}
          </TechStackList>
        </ItemBody>
      </TeamInfoPageLink>
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
  cursor: pointer;

  &:hover {
    border: 1px solid #84c0f8;
    background-color: #f8fbfe;

    & h5 {
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

const TeamInfoPageLink = styled(Link)`
  display: flex;
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

const Notice = styled.h1`
  width: 100%;
  margin-bottom: 6px;
  font-size: 18px;
  line-height: 1.5;
  color: #263747;
  transition: all 0.12s ease-in-out;

  @media (max-width: 767px) {
    font-size: 16px;
  }
  @media (max-width: 575px) {
    font-size: 15px;
  }
`;

const TeamName = styled.h2`
  display: flex;
  margin-bottom: 6px;
  font-size: 14px;
  color: #98a8b9;

  @media (max-width: 767px) {
    font-size: 13px;
  }
`;

const TeamCampus = styled.span`
  display: flex;

  &::before {
    content: '';
    display: inline-block;
    width: 1px;
    height: 10px;
    margin: auto 8px;
    background-color: #98a8b9;
  }

  @media (max-width: 575px) {
    &::before {
      height: 9px;
      margin: auto 6px;
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
