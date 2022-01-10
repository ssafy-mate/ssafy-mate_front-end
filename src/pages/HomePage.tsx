import React from 'react';

/** @jsxImportSource @emotion/react  */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SwiperCore, {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
} from 'swiper';

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const HomePage: React.FC = () => {
  return (
    <Container>
      <Header />
      <SwiperContainer css={swiper}>
        <Swiper
          cssMode={true}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
          }}
          className="mySwiper"
        >
          <SwiperSlide>
            <SwiperCard>
              <CardInformation>
                <CardSubHead>SSAFY 2학기 프로젝트</CardSubHead>
                <CardHead>공통 프로젝트</CardHead>
                <ProjectDescription>
                  비전공자/전공자가 한 팀으로 웹/모바일 기반 서비스 구현
                  <br />웹 파트(웹기술, 웹 디자인, 웹IoT 중 택 1) / 모바일 파트
                </ProjectDescription>
              </CardInformation>
              <CardImgWrapper>
                <CardImg src="/images/common-project.gif" alt="공통 프로젝트" />
              </CardImgWrapper>
            </SwiperCard>
          </SwiperSlide>
          <SwiperSlide>
            <SwiperCard>
              <CardInformation>
                <CardSubHead>SSAFY 2학기 프로젝트</CardSubHead>
                <CardHead>특화 프로젝트</CardHead>
                <ProjectDescription>
                  4차 산업혁명 분야 신기술 도메인 구현 프로젝트 수행
                  <br />
                  인공지능, 빅데이터, 블록체인 IoT 제어 중 택 1
                </ProjectDescription>
              </CardInformation>
              <CardImgWrapper>
                <CardImg
                  src="/images/specialization-project.gif"
                  alt="특화 프로젝트"
                />
              </CardImgWrapper>
            </SwiperCard>
          </SwiperSlide>
          <SwiperSlide>
            <SwiperCard>
              <CardInformation>
                <CardSubHead>SSAFY 2학기 프로젝트</CardSubHead>
                <CardHead>자율 프로젝트</CardHead>
                <ProjectDescription>
                  공통, 특화 프로젝트 경험바탕으로, 자유 주제로 서비스를
                  개발하여 나만의 포트폴리오 완성
                  <br />
                  기업연계, 오픈소스, 자유주제 중 택 1
                </ProjectDescription>
              </CardInformation>
              <CardImgWrapper>
                <CardImg
                  src="/images/autonomy-project.gif"
                  alt="자율 프로젝트"
                />
              </CardImgWrapper>
            </SwiperCard>
          </SwiperSlide>
        </Swiper>
      </SwiperContainer>
      <LinkContainer>
        <LinkCard>
          <LinkCardImg
            src="/images/common-project_link.png"
            alt="공통 프로젝트"
          />
          <LinkCardTitle>
            공통 프로젝트
            <br />팀 빌딩 바로가기
          </LinkCardTitle>
        </LinkCard>
        <LinkCard>
          <LinkCardImg
            src="/images/specialization-project_link.png"
            alt="특화 프로젝트"
          />
          <LinkCardTitle>
            특화 프로젝트
            <br />팀 빌딩 바로가기
          </LinkCardTitle>
        </LinkCard>
        <LinkCard>
          <LinkCardImg
            src="/images/autonomy-project_link.png"
            alt="자율 프로젝트"
          />
          <LinkCardTitle>
            자율 프로젝트
            <br />팀 빌딩 바로가기
          </LinkCardTitle>
        </LinkCard>
      </LinkContainer>
      <Footer />
    </Container>
  );
};

SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard, Autoplay]);

const Container = styled.div``;

const SwiperContainer = styled.div`
  margin: 0 auto;
`;

const SwiperCard = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1000px;
  box-sizing: border-box;
  padding: 58px 40px 24px;
  color: #fff;

  @media screen and (max-width: 760px) {
    flex-direction: column;
    justify-content: space-around;
    height: 480px;
  }
`;

const CardInformation = styled.div`
  margin-right: 24px;
  padding: 48px 0;

  @media screen and (max-width: 760px) {
    padding: 12px 0 0 0;
  }
`;

const CardImgWrapper = styled.div`
  height: 280px;

  @media screen and (max-width: 760px) {
    height: 220px;
  }
`;

const CardImg = styled.img`
  height: 280px;

  @media screen and (max-width: 760px) {
    height: 220px;
  }
`;

const CardSubHead = styled.h5`
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 1.5;
  text-align: left;
`;

const CardHead = styled.h4`
  margin-bottom: 32px;
  font-size: 28px;
  font-weight: 500;
  line-height: 1.6;
  text-align: left;

  @media screen and (max-width: 760px) {
    margin-bottom: 16px;
  }
`;

const ProjectDescription = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #d2d2d2;
  text-align: left;
`;

const LinkContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 16px;

  @media screen and (max-width: 780px) {
    flex-direction: column;
  }
`;

const LinkCard = styled.a`
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
    width: 160px;
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
`;

const swiper = css`
  .swiper {
    width: 100%;
  }

  .swiper-slide {
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    text-align: center;

    &:nth-of-type(1) {
      background-color: #172335;
    }
    &:nth-of-type(2) {
      background-color: #152029;
    }
    &:nth-of-type(3) {
      background-color: #373549;
    }
  }
`;

export default HomePage;
