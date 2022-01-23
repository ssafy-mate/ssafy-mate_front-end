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
        <MenuGroup>
          <MenuList>
            <MenuItem>서비스</MenuItem>
            <MenuItem>
              <PageLink to="#">교육 프로용 싸피 메이트</PageLink>
            </MenuItem>
            <MenuItem>
              <PageLink to="#">운영 관리자용 싸피 메이트</PageLink>
            </MenuItem>
          </MenuList>
          <MenuList>
            <MenuItem>문의</MenuItem>
            <MenuItem>
              <PageLink to="#">FAQ</PageLink>
            </MenuItem>
            <MenuItem>
              <PageLink to="#">1대1 문의</PageLink>
            </MenuItem>
          </MenuList>
          <MenuList>
            <MenuItem>고객센터</MenuItem>
            <MenuItem>대표 문의: ssafymate@gmail.com</MenuItem>
            <MenuItem>
              운영 시간: 오전 9시 ~ 오후 6시 (주말 및 공휴일 휴무)
            </MenuItem>
          </MenuList>
        </MenuGroup>
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
              <PageLink to="#">개인정보 처리방침</PageLink>
            </SubMenuItem>
            <SubMenuItem>
              <PageLink to="#">이용약관</PageLink>
            </SubMenuItem>
            <SubMenuItem>
              <PageLink to="#">싸피 메이트 인재 채용</PageLink>
            </SubMenuItem>
          </SubMenuList>
          <SnsList>
            <SnsItem
              href="https://github.com/ssafy-mate"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon css={snsIcon} />
            </SnsItem>
            <SnsItem href="#" target="_blank" rel="noopener noreferrer">
              <YouTubeIcon css={snsIcon} />
            </SnsItem>
            <SnsItem href="#" target="_blank" rel="noopener noreferrer">
              <FacebookIcon css={snsIcon} />
            </SnsItem>
            <SnsItem href="#" target="_blank" rel="noopener noreferrer">
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

  @media (max-width: 767px) {
    margin-top: 60px;
  }
  @media (max-width: 575px) {
    margin-top: 40px;
  }
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 16px;
  box-sizing: border-box;

  @media (max-width: 575px) {
    padding-top: 40px;
    padding-bottom: 40px;
  }
`;

const MenuGroup = styled.div`
  display: flex;
  margin-bottom: 48px;

  @media (max-width: 991px) {
    flex-direction: column;
    margin-bottom: 36px;
  }
`;

const FooterAddress = styled.address`
  margin-bottom: 24px;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.6;
  color: #98a8b9;
  cursor: default;

  p:nth-of-type(1) {
    margin-bottom: 6px;
    font-weight: 600;
  }
`;

const FooterOthers = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const MenuList = styled.ul`
  margin-right: 40px;

  @media (max-width: 991px) {
    margin-right: 0;
    margin-bottom: 32px;
  }
`;

const MenuItem = styled.li`
  font-size: 14px;
  font-weight: 400;
  line-height: 1.8;
  color: #98a8b9;

  &:nth-of-type(1) {
    margin-bottom: 16px;
    font-weight: 600;
    color: #44576c;
  }

  @media (max-width: 767px) {
    &:nth-of-type(1) {
      margin-bottom: 8px;
    }
  }
`;

const SubMenuList = styled.ul`
  display: flex;
  align-items: center;

  @media (max-width: 767px) {
    margin-bottom: 24px;
  }
  @media (max-width: 349px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SubMenuItem = styled.li`
  font-size: 13px;
  line-height: 1.6;
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

  @media (max-width: 349px) {
    margin-bottom: 4px;

    &:not(:last-of-type) {
      &:after {
        content: none;
      }
    }
  }
`;

const SnsList = styled.div`
  display: flex;
`;

const SnsItem = styled.a`
  margin-left: 10px;

  &:first-of-type {
    margin-left: 0;
  }
`;

const PageLink = styled(Link)`
  transition: color 0.08s ease-in-out;

  &:hover {
    color: #3396f4;
  }
`;

const snsIcon = css`
  font-size: 26px;
  color: #98a8b9;
  transition: color 0.08s ease-in-out;

  &:hover {
    color: #3396f4;
  }
`;

export default Footer;
