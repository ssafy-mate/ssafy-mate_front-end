import React from 'react';

import { Link } from 'react-router-dom';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import HowToVoteIcon from '@mui/icons-material/HowToVote';

import Header from '../components/common/Header';
import BannerContainer from '../components/common/BannerContainer';
import FilterForm from '../components/projects/FilterForm';
import Footer from '../components/common/Footer';
import Announcement from '../components/projects/Announcement';

const SpecializationProjectPage: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <NavTabs>
          <NavItem className="active">
            <Link to="#" css={navLink}>
              <ContentPasteSearchIcon css={navLinkIcon} />팀 공고
            </Link>
          </NavItem>
          <NavItem>
            <Link to="#" css={navLink}>
              <PersonSearchIcon css={navLinkIcon} />
              교육생 공고
            </Link>
          </NavItem>
          <NavItem>
            <Link to="#" css={navLink}>
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
        </NavTabs>
        <BannerContainer />
        <FilterForm />
        <Announcement />
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.main`
  width: 100%;
`;

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
`;

const navLinkIcon = css`
  margin-bottom: 4px;

  @media (max-width: 540px) {
    display: none;
  }
`;

export default SpecializationProjectPage;
