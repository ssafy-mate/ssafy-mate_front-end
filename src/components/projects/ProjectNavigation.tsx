import { Link, useLocation } from 'react-router-dom';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import GroupsIcon from '@mui/icons-material/Groups';
import useUserId from '../../hooks/useUserId';

const ProjectNavigation: React.FC = () => {
  const location = useLocation();
  const userId: number | null = useUserId();

  return (
    <NavTabs>
      <NavItem
        className={
          location.pathname === '/projects/specialization/teams' ||
          location.pathname.split('/')[1] === 'teams'
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
          location.pathname === '/projects/specialization/users' ||
          location.pathname.split('/')[1] === 'users'
            ? 'active'
            : ''
        }
      >
        <NavLink to="/projects/specialization/users">
          <PersonSearchIcon css={navLinkIcon} />
          교육생 공고
        </NavLink>
      </NavItem>
      <NavItem
        className={
          location.pathname.split('/')[4] === 'receive_requests' ? 'active' : ''
        }
      >
        <NavLink to={`/projects/specialization/${userId}/receive_requests`}>
          <VolunteerActivismIcon css={navLinkIcon} />
          받은 제안
        </NavLink>
      </NavItem>
      <NavItem
        className={
          location.pathname.split('/')[4] === 'send_requests' ? 'active' : ''
        }
      >
        <NavLink to={`/projects/specialization/${userId}/send_requests`}>
          <HowToVoteIcon css={navLinkIcon} />
          보낸 요청
        </NavLink>
      </NavItem>
      <NavItem
        className={location.pathname === '/projects/teams/new' ? 'active' : ''}
      >
        <NavLink to="/projects/teams/new">
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
      box-shadow: inset 0 0.1875rem #3396f4;
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
    padding: 7px 0;
    font-size: 9px;
  }
`;

const navLinkIcon = css`
  margin-bottom: 4px;

  @media (max-width: 575px) {
    margin-bottom: 3px;
    font-size: 22px;
  }
`;

export default ProjectNavigation;
