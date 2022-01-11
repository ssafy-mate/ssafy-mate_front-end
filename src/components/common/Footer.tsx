import React from 'react';

import { Link } from 'react-router-dom';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <FooterMenuGroup>
          <MenuList>
            <MenuItem>서비스</MenuItem>
            <MenuItem>
              <Link to="#" css={link}>
                교육 프로용 싸피 메이트
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="#" css={link}>
                운영 관리자용 싸피 메이트
              </Link>
            </MenuItem>
          </MenuList>
          <MenuList>
            <MenuItem>문의</MenuItem>
            <MenuItem>
              <Link to="#" css={link}>
                FAQ
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="#" css={link}>
                1대1 문의
              </Link>
            </MenuItem>
          </MenuList>
          <MenuList>
            <MenuItem>고객센터</MenuItem>
            <MenuItem>대표 문의: ssafymate@gmail.com</MenuItem>
            <MenuItem>
              운영 시간: 오전 9시 ~ 오후 6시 (주말 및 공휴일 휴무)
            </MenuItem>
          </MenuList>
        </FooterMenuGroup>
        <FooterAddress>
          <p>SSAFY MATE / 싸피 메이트</p>
          <p>
            서울 강남구 테헤란로 212길, 12층, 싸피 메이트 사무실 (역삼동,
            멀티캠퍼스)
          </p>
        </FooterAddress>
        <FooterOthers>
          <SubMenuList>
            <SubMenuItem>
              <Link to="#" css={link}>
                개인정보 처리방침
              </Link>
            </SubMenuItem>
            <SubMenuItem>
              <Link to="#" css={link}>
                이용약관
              </Link>
            </SubMenuItem>
            <SubMenuItem>
              <Link to="#" css={link}>
                싸피 메이트 인재 채용
              </Link>
            </SubMenuItem>
          </SubMenuList>
          <SnsList>
            <SnsItem href="https://github.com/ssafy-mate" target="_blank">
              <GitHubIcon css={snsIcon} />
            </SnsItem>
            <SnsItem href="#" target="_blank">
              <YouTubeIcon css={snsIcon} />
            </SnsItem>
            <SnsItem href="#" target="_blank">
              <FacebookIcon css={snsIcon} />
            </SnsItem>
            <SnsItem href="#" target="_blank">
              <InstagramIcon css={snsIcon} />
            </SnsItem>
          </SnsList>
        </FooterOthers>
      </Wrapper>
    </Container>
  );
};

const Container = styled.footer`
  margin-top: 80px;
  border-top: 1px solid #f1f1f1;
  background-color: #f9f9f9;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 16px;
  box-sizing: border-box;
`;

const FooterMenuGroup = styled.div`
  display: flex;
  margin-bottom: 48px;

  @media screen and (max-width: 760px) {
    flex-direction: column;
    margin-bottom: 36px;
  }
`;

const FooterAddress = styled.address`
  margin-bottom: 24px;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.6;
  color: #98a8b9;
  cursor: default;

  p:nth-of-type(1) {
    font-weight: 600;
  }
`;

const FooterOthers = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

const MenuList = styled.ul`
  margin-right: 40px;

  @media screen and (max-width: 760px) {
    margin-bottom: 18px;
  }
`;

const MenuItem = styled.li`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.8;
  color: #98a8b9;

  &:nth-of-type(1) {
    margin-bottom: 16px;
    font-weight: 600;
    color: #44576c;
  }

  @media screen and (max-width: 760px) {
    &:nth-of-type(1) {
      margin-bottom: 8px;
    }
  }
`;

const SubMenuList = styled.ul`
  display: flex;
  align-items: center;

  @media screen and (max-width: 480px) {
    margin-bottom: 24px;
  }
`;

const SubMenuItem = styled.li`
  font-size: 12px;
  color: #98a8b9;

  &:nth-of-type(1) {
    color: #44576c;
  }
  &:not(:last-of-type) {
    &:after {
      content: '';
      display: inline-block;
      width: 1px;
      height: 10px;
      margin: 0 8px;
      background-color: #98a8b9;
    }
  }
`;

const SnsList = styled.div`
  display: flex;
`;

const SnsItem = styled.a`
  margin-left: 8px;

  &:first-of-type {
    margin-left: 0;
  }
`;

const link = css`
  transition: color 0.08s ease-in-out;

  &:hover {
    color: #3396f4;
  }
`;

const snsIcon = css`
  color: #98a8b9;
  transition: color 0.08s ease-in-out;

  &:hover {
    color: #3396f4;
  }
`;

export default Footer;
