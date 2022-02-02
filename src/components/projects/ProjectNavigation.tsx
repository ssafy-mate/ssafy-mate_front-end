import { Link, useLocation } from 'react-router-dom';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import GroupsIcon from '@mui/icons-material/Groups';

const ProjectNavigation: React.FC = () => {
  const location = useLocation();

  return (
    <NavTabs>
      <NavItem
        className={
          location.pathname === '/projects/specialization/teams' ||
          location.pathname === '/info/team/1'
            ? 'active'
            : ''
        }
      >
        <NavLink to="/projects/specialization/teams">
          <ContentPasteSearchIcon css={navLinkIcon} />팀 공고
        </NavLink>
      </NavItem>
      <NavItem
        className={
          location.pathname === '/projects/specialization/users' ? 'active' : ''
        }
      >
        <NavLink to="/projects/specialization/users">
          <PersonSearchIcon css={navLinkIcon} />
          교육생 공고
        </NavLink>
      </NavItem>
      <NavItem
        className={
          location.pathname === '/projects/specialization/offer_list'
            ? 'active'
            : ''
        }
      >
        <NavLink to="/projects/specialization/offer_list">
          <VolunteerActivismIcon css={navLinkIcon} />
          받은 제안
        </NavLink>
      </NavItem>
      <NavItem
        className={
          location.pathname === '/projects/applications' ? 'active' : ''
        }
      >
        <NavLink to="/projects/applications">
          <HowToVoteIcon css={navLinkIcon} />
          지원한 팀
        </NavLink>
      </NavItem>
      <NavItem
        className={
          location.pathname === '/projects/team/create' ? 'active' : ''
        }
      >
        <NavLink to="/projects/team/create">
          <GroupsIcon css={navLinkIcon} />팀 생성
        </NavLink>
      </NavItem>
    </NavTabs>
  );
};

const NavTabs = styled.ul`
  display: flex;
  justify-content: center;
  margin: 48px 0 24px;
  border-color: #fff;
  background-color: #fff;
  box-shadow: inset 0 -0.0625rem #d7e2eb;

  @media (max-width: 575px) {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 20;
    width: 100%;
    margin: 0;
    border-top: 1px solid #d7e2eb;
  }
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

  @media (max-width: 575px) {
    &.active {
      box-shadow: none;
    }
  }
`;

const NavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  font-size: 16px;
  line-height: 1.6;

  @media (max-width: 575px) {
    font-size: 12px;
    padding: 6px 0;
  }
`;

const navLinkIcon = css`
  margin-bottom: 4px;

  @media (max-width: 575px) {
    margin-bottom: 2px;
    font-size: 20px;
  }
`;

export default ProjectNavigation;
