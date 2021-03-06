import { Link } from 'react-router-dom';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

interface FooterProps {
  offMarginTop?: boolean;
}

interface ContainerProps extends FooterProps {}

const Footer: React.FC<FooterProps> = ({ offMarginTop }) => {
  return (
    <Container offMarginTop={offMarginTop}>
      <Wrapper>
        <MenuSection>
          <MenuGroup>
            <MenuListHead>서비스</MenuListHead>
            <MenuList>
              <MenuItem>
                <PageLink to="#">교육 프로용 싸피 메이트</PageLink>
              </MenuItem>
              <MenuItem>
                <PageLink to="#">운영 관리자용 싸피 메이트</PageLink>
              </MenuItem>
            </MenuList>
          </MenuGroup>
          <MenuGroup>
            <MenuListHead>문의</MenuListHead>
            <MenuList>
              <MenuItem>
                <PageOuterLink
                  href="https://github.com/ssafy-mate/ssafy-mate_front-end"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  FAQ
                </PageOuterLink>
              </MenuItem>
              <MenuItem>
                <PageOuterLink
                  href="https://github.com/ssafy-mate/ssafy-mate_front-end"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  1대1 문의
                </PageOuterLink>
              </MenuItem>
            </MenuList>
          </MenuGroup>
          <MenuGroup>
            <MenuListHead>고객센터</MenuListHead>
            <MenuList>
              <MenuItem>대표 문의: ssafymate.service@gmail.com</MenuItem>
              <MenuItem>
                운영 시간: 오전 9시 ~ 오후 6시 (주말 및 공휴일 휴무)
              </MenuItem>
            </MenuList>
          </MenuGroup>
        </MenuSection>
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
              <PageLink to="/privacy">개인정보 처리방침</PageLink>
            </SubMenuItem>
            <SubMenuItem>
              <PageLink to="/terms_of_service">이용약관</PageLink>
            </SubMenuItem>
            <SubMenuItem>
              <PageOuterLink
                href="https://github.com/ssafy-mate/ssafy-mate_front-end"
                target="_blank"
                rel="noopener noreferrer"
              >
                싸피 메이트 인재 채용
              </PageOuterLink>
            </SubMenuItem>
          </SubMenuList>
          <SnsList>
            <SnsItem
              href="https://github.com/ssafy-mate/ssafy-mate_front-end"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon css={snsIcon} />
            </SnsItem>
            <SnsItem
              href="https://youtu.be/0q4h3c69dXg"
              target="_blank"
              rel="noopener noreferrer"
            >
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

const Container = styled.footer<ContainerProps>`
  margin-top: ${(props) => (props.offMarginTop ? '0' : '80px')};
  border-top: 1px solid #f1f1f1;
  background-color: #f9f9f9;

  @media (max-width: 767px) {
    margin-top: ${(props) => (props.offMarginTop ? '0' : '60px')};
  }
  @media (max-width: 575px) {
    margin-top: ${(props) => (props.offMarginTop ? '0' : '40px')};
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

const MenuSection = styled.section`
  display: flex;
  margin-bottom: 48px;

  @media (max-width: 991px) {
    flex-direction: column;
    margin-bottom: 36px;
  }
`;

const MenuGroup = styled.div`
  display: flex;
  flex-direction: column;
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

const MenuListHead = styled.p`
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.8;
  color: #44576c;

  @media (max-width: 767px) {
    margin-bottom: 8px;
  }
`;

const MenuItem = styled.li`
  font-size: 14px;
  font-weight: 400;
  line-height: 1.8;
  color: #98a8b9;
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

const PageOuterLink = styled.a`
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
