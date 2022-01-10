import React from 'react';

import { Link } from 'react-router-dom';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const Header: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <Link to="/" css={brand}>
          <LogoWrapper>
            <Logo src="/images/ssafy-mate_logo.png" alt="SSAFY MATE" />
          </LogoWrapper>
          <LogoName>SSAFY MATE</LogoName>
        </Link>
        <AuthContainer>
          <Link to="/users/sign_in" css={signInLink}>
            로그인
          </Link>
          <Link to="/users/sign_up" css={signUpLink}>
            회원가입
          </Link>
        </AuthContainer>
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
  padding-top: 4px;
  font-size: 22px;
  font-weight: 700;
  color: #fff;
`;

const AuthContainer = styled.div``;

const signInLink = css`
  font-size: 16px;
  font-weight: 500;
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
  margin-left: 12px;
  font-size: 16px;
  font-weight: 500;
  color: #b2c0cc;
  text-decoration: none;
  transition: color 0.08s ease-in-out;

  &:hover {
    color: #fff;
  }
`;

export default Header;
