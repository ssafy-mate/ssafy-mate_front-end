import React, { useState, useEffect, useRef, useCallback } from 'react';

import { Link } from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/modules/auth';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import ArticleIcon from '@mui/icons-material/Article';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuItem from '@mui/material/MenuItem';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';

import { RootState } from '../../types/authTypes';

import useToken from '../../hooks/useToken';
import useUserId from '../../hooks/useUserId';

import SsafyMateAlert from './Alert';
import MenuBar from './MenuBar';

import { updateUserInfo } from '../../redux/modules/profile';
import getProfileInfoRequest from '../../services/ProfileService';

interface MenuListProps {
  isExpanded: boolean;
}

interface HeaderProps {
  offFixed?: boolean;
}

interface ContainerProps {
  offFixed?: boolean;
}

const Header: React.FC<HeaderProps> = ({ offFixed }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [accountBoxOpen, setAccountBoxOpen] = useState<boolean>(false);

  const accountBoxAnchorRef = useRef<HTMLButtonElement>(null);
  const prevAccoutBoxOpen = useRef(accountBoxOpen);

  const dispatch = useDispatch();

  const token = useToken();
  const userId = useUserId();

  const isMobile = useMediaQuery({
    query: '(max-width: 991px)',
  });

  const ssafyMateAlert: any = useSelector<RootState>(
    (state) => state.controlAlert,
  );

  useEffect(() => {
    if (token !== null) {
      setIsLoggedIn(true);
    }
  }, [token]);

  useEffect(() => {
    if (isMobile) {
      setAccountBoxOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    if (
      !isMobile &&
      prevAccoutBoxOpen.current === true &&
      accountBoxOpen === false
    ) {
      accountBoxAnchorRef.current!.focus();
    }

    prevAccoutBoxOpen.current = accountBoxOpen;
  }, [accountBoxOpen, isMobile]);

  const handleClickLogoutButton = () => {
    dispatch(logout());
  };

  const handleExpandMenu = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAccountBoxToggle = () => {
    setAccountBoxOpen((prevAccoutBoxOpen) => !prevAccoutBoxOpen);
  };

  const handleAccountBoxClose = (event: Event | React.SyntheticEvent) => {
    if (
      accountBoxAnchorRef.current &&
      accountBoxAnchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setAccountBoxOpen(false);
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setAccountBoxOpen(false);
    } else if (event.key === 'Escape') {
      setAccountBoxOpen(false);
    }
  };

  const update = useCallback(
    (requestData: getProfileInfoRequest) => {
      dispatch(updateUserInfo(requestData));
    },
    [dispatch],
  );

  const handleUserAccountEdit = (evevt: React.MouseEvent) => {
    if (token !== null && userId !== null) {
      update({ token: token, userId: userId });
    }
  };

  return (
    <Container offFixed={offFixed}>
      <Wrapper>
        <BrandWrapper>
          <Brand to="/">
            <LogoWrapper>
              <Logo
                src="/images/common/ssafy-mate_logo.png"
                alt="SSAFY MATE 로고 이미지"
              />
            </LogoWrapper>
            <LogoName>SSAFY MATE</LogoName>
          </Brand>
          {isMobile ? (
            <MenuBar isExpanded={isExpanded} onExpandMenu={handleExpandMenu} />
          ) : null}
        </BrandWrapper>
        <AccountMenuList isExpanded={isExpanded}>
          <SsafyMateAlert
            text={ssafyMateAlert.text}
            show={ssafyMateAlert.show}
            type={ssafyMateAlert.type}
          />
          {!isLoggedIn ? (
            <>
              <AccountMenuItem>
                <PageLink to="/users/sign_in">로그인</PageLink>
              </AccountMenuItem>
              <AccountMenuItem>
                <PageLink to="/users/sign_up">회원가입</PageLink>
              </AccountMenuItem>
            </>
          ) : !isMobile ? (
            <>
              <AccountMenuItem>
                <IconLink to={`/users/${userId}`}>
                  <ArticleIcon css={icon} />
                </IconLink>
              </AccountMenuItem>
              <AccountMenuItem>
                <IconLink to="#">
                  <NotificationsIcon css={icon} />
                </IconLink>
              </AccountMenuItem>
              <AccountMenuItem>
                <IconButton
                  ref={accountBoxAnchorRef}
                  id="composition-button"
                  aria-controls={
                    accountBoxOpen ? 'composition-menu' : undefined
                  }
                  aria-expanded={accountBoxOpen ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleAccountBoxToggle}
                >
                  <AccountBoxIcon css={icon} />
                </IconButton>
              </AccountMenuItem>
              <AccountBox
                open={accountBoxOpen}
                anchorEl={accountBoxAnchorRef.current}
                role={undefined}
                placement="top-end"
                transition
                disablePortal
              >
                {({ TransitionProps }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin: 'right top',
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleAccountBoxClose}>
                        <AccountBoxList
                          autoFocusItem={accountBoxOpen}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListKeyDown}
                        >
                          <AccountBoxItem>
                            <Link
                              to={`/users/account/edit`}
                              onClick={handleUserAccountEdit}
                            >
                              계정 관리
                            </Link>
                            {/* <Link to={`/users/${userId}/account`}>
                              계정 관리
                            </Link> */}
                          </AccountBoxItem>
                          <AccountBoxItem onClick={handleAccountBoxClose}>
                            <Link to={`/users/${userId}/offers`}>
                              받은 제안
                            </Link>
                          </AccountBoxItem>
                          <AccountBoxItem onClick={handleAccountBoxClose}>
                            <Link to={`/users/${userId}/applications`}>
                              지원 이력
                            </Link>
                          </AccountBoxItem>
                          <Divider />
                          <AccountBoxItem onClick={handleClickLogoutButton}>
                            로그아웃
                            <AccountBoxItemIcon>
                              <LogoutIcon fontSize="small" />
                            </AccountBoxItemIcon>
                          </AccountBoxItem>
                        </AccountBoxList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </AccountBox>
            </>
          ) : (
            <>
              <AccountMenuItem>
                <PageLink
                  to={`/users/account/edit`}
                  onClick={handleUserAccountEdit}
                >
                  계정 관리
                </PageLink>
                {/* <PageLink to={`/users/${userId}/account`}>계정 관리</PageLink> */}
              </AccountMenuItem>
              <AccountMenuItem>
                <PageLink to={`/users/${userId}`}>내 프로필</PageLink>
              </AccountMenuItem>
              <AccountMenuItem>
                <PageLink to={`/users/${userId}/offers`}>받은 제안</PageLink>
              </AccountMenuItem>
              <AccountMenuItem>
                <PageLink to={`/users/${userId}/applications`}>
                  지원 이력
                </PageLink>
              </AccountMenuItem>
              <AccountMenuItem css={line} />
              <AccountMenuItem>
                <LogoutButton onClick={handleClickLogoutButton}>
                  로그아웃
                </LogoutButton>
              </AccountMenuItem>
            </>
          )}
        </AccountMenuList>
      </Wrapper>
    </Container>
  );
};

const Container = styled.header<ContainerProps>`
  position: ${(props) => (props.offFixed ? 'relative' : 'fixed')};
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  background-color: #0d161c;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 6px 16px;
  box-sizing: border-box;

  @media (max-width: 991px) {
    flex-direction: column;
    padding-top: 0;
    padding-bottom: 0;
  }
`;

const BrandWrapper = styled.div`
  height: 34px;

  @media (max-width: 991px) {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 6px 0;
  }
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  height: inherit;
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

const AccountMenuList = styled.ul<MenuListProps>`
  display: flex;

  @media (max-width: 991px) {
    overflow-y: hidden;
    flex-direction: column;
    width: 100%;
    max-height: ${(props) => (props.isExpanded ? '100vh' : '0')};
    box-sizing: border-box;
    background-color: #0d161c;
    transition: all 0.35s ease;
  }
`;

const AccountMenuItem = styled.li`
  @media (max-width: 992px) {
    padding: 12px 4px;
    box-sizing: border-box;
  }
`;

const PageLink = styled(Link)`
  padding: 4px 8px;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.6;
  color: #b2c0cc;
  text-decoration: none;
  transition: color 0.08s ease-in-out;

  &:hover {
    color: #fff;
  }

  @media (max-width: 991px) {
    padding: 0;
    font-size: 15px;
    line-height: 1.4669;
  }
`;

const LogoutButton = styled.button`
  padding: 4px 8px;
  background-color: transparent;
  border: none;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.6;
  color: #b2c0cc;
  text-decoration: none;
  transition: color 0.08s ease-in-out;
  cursor: pointer;

  &:hover {
    color: #fff;
  }

  @media (max-width: 991px) {
    padding: 0;
    font-size: 15px;
    line-height: 1.4669;
  }
`;

const IconLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 3px 8px;
  box-sizing: border-box;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  padding: 3px 8px;
  border: none;
  box-sizing: border-box;
  background-color: transparent;
  cursor: pointer;
`;

const AccountBoxList = styled(MenuList)``;

const AccountBoxItem = styled(MenuItem)`
  padding-right: 22px;
  padding-left: 22px;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-weight: 500;
  color: #263747;
  transition: color 0.08s ease-in-out;

  &:hover {
    color: #3396f4;
    background-color: transparent;

    & svg {
      color: #3396f4;
    }
  }
`;

const AccountBoxItemIcon = styled(ListItemIcon)`
  display: flex;
  justify-content: center;
  margin-right: 4px;
  margin-left: 12px;
  color: #b2c0cc;
`;

const AccountBox = styled(Popper)``;

const icon = css`
  font-size: 27px;
  color: #b2c0cc;
  transition: color 0.08s ease-in-out;

  &:hover {
    color: #fff;
  }
`;

const line = css`
  margin: 12px 0;
  padding: 0;
  border-top: 0.0625rem solid #172334;

  @media (max-width: 992px) {
    padding: 0;
  }
`;

export default Header;
