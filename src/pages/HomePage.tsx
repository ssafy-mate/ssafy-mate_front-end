import React from 'react';

import { Link } from 'react-router-dom';

/** @jsxImportSource @emotion/react  */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Header from '../components/common/Header';
import SwiperContainer from '../components/common/SwiperContainer';
import Footer from '../components/common/Footer';

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <SwiperContainer />
      <LinkContainer>
        <LinkCard>
          <Link to="/projects/common" css={linkCardWrapper}>
            <LinkCardImg
              src="/images/common-project_link.png"
              alt="공통 프로젝트"
            />
            <LinkCardTitle>
              공통 프로젝트
              <br />팀 빌딩 바로가기
            </LinkCardTitle>
          </Link>
        </LinkCard>
        <LinkCard>
          <Link to="/projects/specialization" css={linkCardWrapper}>
            <LinkCardImg
              src="/images/specialization-project_link.png"
              alt="특화 프로젝트"
            />
            <LinkCardTitle>
              특화 프로젝트
              <br />팀 빌딩 바로가기
            </LinkCardTitle>
          </Link>
        </LinkCard>
        <LinkCard>
          <Link to="/projects/autonomy" css={linkCardWrapper}>
            <LinkCardImg
              src="/images/autonomy-project_link.png"
              alt="자율 프로젝트"
            />
            <LinkCardTitle>
              자율 프로젝트
              <br />팀 빌딩 바로가기
            </LinkCardTitle>
          </Link>
        </LinkCard>
      </LinkContainer>
      <Footer />
    </>
  );
};

const LinkContainer = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 16px;
  box-sizing: border-box;

  @media screen and (max-width: 780px) {
    flex-direction: column;
  }
`;

const LinkCard = styled.div`
  width: 320px;
  margin: 0 auto 24px;
  padding: 24px 16px;
  border: none;
  border-radius: 6px;
  box-sizing: border-box;
  box-shadow: 4px 12px 30px 6px rgb(0 0 0 / 10%);
  color: #fff;
  cursor: pointer;
  transition: transform 0.16s ease-in-out, box-shadow 0.15s ease-in-out;

  &:hover {
    box-shadow: 4px 12px 30px 6px rgb(0 0 0 / 26%);
    transform: translateY(-8px);
  }

  &:nth-of-type(1) {
    background-color: #3396f4;
  }
  &:nth-of-type(2) {
    background-color: #84c0f8;
  }
  &:nth-of-type(3) {
    background-color: #385a7b;
  }

  @media screen and (max-width: 780px) {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-around;
    width: 100%;
  }
`;

const LinkCardImg = styled.img`
  display: block;
  width: 240px;
  margin: 0 auto 36px;

  @media screen and (max-width: 780px) {
    margin: 0 0 0 12px;
    width: 140px;
  }
  @media screen and (max-width: 420px) {
    width: 100px;
  }
`;

const LinkCardTitle = styled.p`
  padding-left: 12px;
  font-size: 24px;
  font-weight: 500;
  line-height: 1.6;

  @media screen and (max-width: 780px) {
    padding-left: 0;
    margin: auto 0;
  }
  @media screen and (max-width: 420px) {
    font-size: 20px;
  }
`;

const linkCardWrapper = css`
  @media screen and (max-width: 780px) {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-around;
    width: 100%;
  }
`;

export default HomePage;
