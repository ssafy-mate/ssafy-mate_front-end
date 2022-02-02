import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import ArticleIcon from '@mui/icons-material/Article';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import MenuBar from './MenuBar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../types/signInTypes';
import { logout } from '../../redux/modules/auth';
import SsafyMateAlert from '../signIn/Alert';

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
  const isMobile = useMediaQuery({
    query: '(max-width: 991px)',
  });
  const dispatch = useDispatch();
  const token = useSelector<RootState, string | null>(
    (state) => state?.auth.token,
  );
  const ssafyMateAlert: any = useSelector<RootState>(
    (state) => state.controlAlert,
  );

  useEffect(() => {
    if (token !== null) {
      setIsLoggedIn(true);
    }
  }, [token]);

  const handleClickLogoutButton = () => {
    dispatch(logout());
  };

  const handleExpandMenu = () => {
    setIsExpanded(!isExpanded);
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
        <SsafyMateAlert
          text={ssafyMateAlert.text}
          show={ssafyMateAlert.show}
          type={ssafyMateAlert.type}
        />
        <MenuList isExpanded={isExpanded}>
          {!isLoggedIn ? (
            <>
              <MenuItem>
                <PageLink to="/users/sign_in">로그인</PageLink>
              </MenuItem>
              <MenuItem>
                <PageLink to="/users/sign_up">회원가입</PageLink>
              </MenuItem>
            </>
          ) : !isMobile ? (
            <>
              <MenuItem>
                <IconLink to="#">
                  <ArticleIcon css={icon} />
                </IconLink>
              </MenuItem>
              <MenuItem>
                <IconLink to="#">
                  <NotificationsIcon css={icon} />
                </IconLink>
              </MenuItem>
              <MenuItem>
                <IconLink to="#">
                  <AccountBoxIcon css={icon} />
                </IconLink>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem>
                <PageLink to="#">계정 관리</PageLink>
              </MenuItem>
              <MenuItem>
                <PageLink to="#">내 프로필</PageLink>
              </MenuItem>
              <MenuItem>
                <PageLink to="#">받은 제안</PageLink>
              </MenuItem>
              <MenuItem>
                <PageLink to="#">지원한 팀</PageLink>
              </MenuItem>
              <MenuItem css={line} />
              <MenuItem>
                <LogoutButton onClick={handleClickLogoutButton}>
                  로그아웃
                </LogoutButton>
              </MenuItem>
            </>
          )}
        </MenuList>
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

const MenuList = styled.ul<MenuListProps>`
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

const MenuItem = styled.li`
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
