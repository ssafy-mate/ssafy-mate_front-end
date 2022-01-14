import React from 'react';

import { Link } from 'react-router-dom';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import GroupsIcon from '@mui/icons-material/Groups';

const ProjectNavigation: React.FC = () => {
  return (
    <NavTabs>
      <NavItem className="active">
        <Link to="/projects/specialization/team" css={navLink}>
          <ContentPasteSearchIcon css={navLinkIcon} />팀 공고
        </Link>
      </NavItem>
      <NavItem>
        <Link to="/projects/specialization/student" css={navLink}>
          <PersonSearchIcon css={navLinkIcon} />
          교육생 공고
        </Link>
      </NavItem>
      <NavItem>
        <Link to="/" css={navLink}>
          <VolunteerActivismIcon css={navLinkIcon} />
          받은 제안
        </Link>
      </NavItem>
      <NavItem>
        <Link to="#" css={navLink}>
          <HowToVoteIcon css={navLinkIcon} />
          지원한 팀
        </Link>
      </NavItem>
      <NavItem>
        <Link to="/projects/team/create" css={navLink}>
          <GroupsIcon css={navLinkIcon} />팀 생성
        </Link>
      </NavItem>
    </NavTabs>
  );
};

const NavTabs = styled.ul`
  display: flex;
  justify-content: center;
  margin: 48px 0 24px;
  border-color: #fff;
  box-shadow: inset 0 -0.0625rem #d7e2eb;
`;

const NavItem = styled.li`
  width: 96px;
  color: #263747;
  transition: all 0.08s ease-in-out;

  &:hover {
    color: #3396f4;
  }
  &.active {
    box-shadow: inset 0 -0.1875rem #3396f4;
    color: #3396f4;
  }
`;

const navLink = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  font-size: 16px;
  line-height: 1.6;

  @media (max-width: 540px) {
    font-size: 14px;
  }
  @media (max-width: 414px) {
    font-size: 13px;
  }
  @media (max-width: 340px) {
    font-size: 12px;
  }
`;

const navLinkIcon = css`
  margin-bottom: 4px;

  @media (max-width: 540px) {
    display: none;
  }
`;

export default ProjectNavigation;
