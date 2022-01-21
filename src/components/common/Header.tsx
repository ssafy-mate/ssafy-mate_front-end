import { useState } from 'react';

import { Link } from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import ArticleIcon from '@mui/icons-material/Article';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MenuBar from './MenuBar';

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isMobile = useMediaQuery({
    query: '(max-width: 992px)',
  });
  const [menuBarStatus, setMenuBarStatus] = useState<boolean>(false);

  const handleOpenMenuBar = () => {
    setMenuBarStatus(!menuBarStatus);
  };

  return (
    <Container>
      <Wrapper>
        <Link to="/" css={brand}>
          <LogoWrapper>
            <Logo src="/images/common/ssafy-mate_logo.png" alt="SSAFY MATE" />
          </LogoWrapper>
          <LogoName>SSAFY MATE</LogoName>
        </Link>
        {isMobile ? (
          <MenuBar isActive={menuBarStatus} onOpenMenuBar={handleOpenMenuBar} />
        ) : !isLoggedIn ? (
          <AuthContainer>
            <AuthItem>
              <Link to="/users/sign_in" css={signInLink}>
                로그인
              </Link>
            </AuthItem>
            <AuthItem>
              <Link to="/users/sign_up" css={signUpLink}>
                회원가입
              </Link>
            </AuthItem>
          </AuthContainer>
        ) : (
          <AccountContainer>
            <AccountItem>
              <Link to="#">
                <ArticleIcon css={accountLinkIcon} />
              </Link>
            </AccountItem>
            <AccountItem>
              <Link to="#">
                <NotificationsIcon css={accountLinkIcon} />
              </Link>
            </AccountItem>
            <AccountItem>
              <Link to="#">
                <AccountBoxIcon css={accountLinkIcon} />
              </Link>
            </AccountItem>
          </AccountContainer>
        )}
      </Wrapper>
    </Container>
  );
};

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 48px;
  background-color: #0d161c;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 0 16px;
  box-sizing: border-box;
`;

const LogoWrapper = styled.div`
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 1px solid #fff;
  border-radius: 5px;
  background-color: #fff;
`;

const Logo = styled.img`
  width: 24px;
  height: 100%;
  margin: 0 auto;
`;

const LogoName = styled.span`
  margin-left: 6px;
  padding-top: 1px;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
`;

const AuthContainer = styled.ul`
  display: flex;
`;

const AuthItem = styled.li`
  margin-left: 16px;
`;

const AccountContainer = styled.ul`
  display: flex;
`;

const AccountItem = styled.li`
  margin-left: 16px;

  &:first-of-type {
    margin-left: 0;
  }
`;

const signInLink = css`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.6;
  color: #b2c0cc;
  text-decoration: none;
  transition: color 0.08s ease-in-out;

  &:hover {
    color: #fff;
  }
`;

const brand = css`
  display: flex;
  align-items: center;
  height: inherit;
`;

const signUpLink = css`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.6;
  color: #b2c0cc;
  text-decoration: none;
  transition: color 0.08s ease-in-out;

  &:hover {
    color: #fff;
  }
`;

const accountLinkIcon = css`
  font-size: 27px;
  color: #b2c0cc;
  transition: color 0.08s ease-in-out;

  &:hover {
    color: #fff;
  }
`;

export default Header;
