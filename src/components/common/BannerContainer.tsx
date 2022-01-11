import React from 'react';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import SwiperCore, {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BannerContainer: React.FC = () => {
  return (
    <Container>
      <Wrapper>
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
          css={swiper}
          className="mySwiper"
        >
          <SwiperSlide>
            <SwiperCard>
              <CardInformation>
                <CardSubHead>특화 프로젝트</CardSubHead>
                <CardHead>Track 1. 인공지능 (AI)</CardHead>
                <TrackDescription>
                  인간의 학습능력과 추론능력, 지각능력, 자연언어의 이해능력 등을
                  컴퓨터 프로그램으로 실현한 기술
                </TrackDescription>
              </CardInformation>
              <CardImgWrapper>
                <CardImg
                  src="/images/projects/ai_animation.gif"
                  alt="인공지능"
                />
              </CardImgWrapper>
            </SwiperCard>
          </SwiperSlide>
          <SwiperSlide>
            <SwiperCard>
              <CardInformation>
                <CardSubHead>특화 프로젝트</CardSubHead>
                <CardHead>Track 2. 빅데이터 (Big Data)</CardHead>
                <TrackDescription>
                  정형·반정형·비정형 데이터세트의 집적물, 그리고 이로부터 경제적
                  가치를 추출 및 분석할 수 있는 기술
                </TrackDescription>
              </CardInformation>
              <CardImgWrapper>
                <CardImg
                  src="/images/projects/bigdata_animation.gif"
                  alt="빅데이터 프로젝트"
                />
              </CardImgWrapper>
            </SwiperCard>
          </SwiperSlide>
          <SwiperSlide>
            <SwiperCard>
              <CardInformation>
                <CardSubHead>특화 프로젝트</CardSubHead>
                <CardHead>Track 3. 블록체인 (Block Chain)</CardHead>
                <TrackDescription>
                  누구나 열람할 수 있는 장부에 거래 내역을 투명하게 기록하고,
                  여러 대의 컴퓨터에 이를 복제해 저장하는 분산형 데이터 저장기술
                </TrackDescription>
              </CardInformation>
              <CardImgWrapper>
                <CardImg
                  src="/images/projects/blockchain_animation.gif"
                  alt="블록체인"
                />
              </CardImgWrapper>
            </SwiperCard>
          </SwiperSlide>
          <SwiperSlide>
            <SwiperCard>
              <CardInformation>
                <CardSubHead>특화 프로젝트</CardSubHead>
                <CardHead>Track 4. IoT 제어 (Internet of Things)</CardHead>
                <TrackDescription>
                  인터넷을 기반으로 모든 사물을 연결하여 정보를 상호 소통하는
                  지능형 기술 및 서비스
                </TrackDescription>
              </CardInformation>
              <CardImgWrapper>
                <CardImg
                  src="/images/projects/iot_animation.gif"
                  alt="IoT 제어"
                />
              </CardImgWrapper>
            </SwiperCard>
          </SwiperSlide>
        </Swiper>
      </Wrapper>
    </Container>
  );
};

SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard, Autoplay]);

const Container = styled.section`
  max-width: 1200px;
  margin: 0 auto 24px;
  padding: 0 16px;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  overflow: hidden;
  border-radius: 12px;
  box-sizing: border-box;
`;

const SwiperCard = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1000px;
  padding: 0 72px;
  box-sizing: border-box;
  color: #fff;

  @media (max-width: 760px) {
    flex-direction: column;
    justify-content: space-around;
    height: 480px;
  }
  @media (max-width: 420px) {
    height: 440px;
  }
`;

const CardInformation = styled.div`
  margin-right: 24px;
  padding: 48px 0;

  @media (max-width: 760px) {
    padding: 12px 0 0 0;
  }
`;

const CardImgWrapper = styled.div`
  height: 280px;

  @media (max-width: 760px) {
    height: 220px;
  }
`;

const CardImg = styled.img`
  height: 260px;

  @media (max-width: 760px) {
    height: 220px;
  }
  @media (max-width: 420px) {
    height: 180px;
  }
`;

const CardSubHead = styled.h5`
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 1.5;
  text-align: left;

  @media (max-width: 760px) {
    margin-bottom: 6px;
  }
  @media (max-width: 420px) {
    margin-bottom: 4px;
    font-size: 12px;
  }
`;

const CardHead = styled.h4`
  margin-bottom: 32px;
  font-size: 28px;
  font-weight: 500;
  line-height: 1.6;
  text-align: left;

  @media (max-width: 760px) {
    margin-bottom: 16px;
    font-size: 26px;
  }
  @media (max-width: 420px) {
    margin-bottom: 12px;
    font-size: 24px;
  }
`;

const TrackDescription = styled.div`
  padding-right: 60px;
  font-size: 16px;
  line-height: 1.6;
  color: #f3f3f3;
  text-align: left;

  @media (max-width: 420px) {
    font-size: 14px;
  }
`;

const swiper = css`
  .swiper {
    overflow: hidden;
    border-radius: 12px;
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
      background-color: #ffc107;
    }
    &:nth-of-type(2) {
      background-color: #52c5b5;
    }
    &:nth-of-type(3) {
      background-color: #000;
    }
    &:nth-of-type(4) {
      background-color: #2e4f87;
    }
  }

  .swiper-pagination-bullet {
    background-color: #fff;
    transition: all 0.08s ease-in-out;
    transition-delay: initial;

    &.swiper-pagination-bullet-active {
      width: 3rem;
      border-radius: 0.3125rem;
    }
  }

  .swiper-button-prev::after {
    content: 'prev';
    margin-left: 24px;
  }
  .swiper-button-next::after {
    content: 'next';
    margin-right: 24px;
  }
  .swiper-button-prev::after,
  .swiper-button-next::after {
    font-size: 24px;
    color: #fff;
    opacity: 0;
    transition: opacity 0.12s ease-in-out;
  }

  .swiper:hover {
    .swiper-button-prev::after,
    .swiper-button-next::after {
      opacity: 1;
    }
  }
`;

export default BannerContainer;
