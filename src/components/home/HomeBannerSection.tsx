import styled from '@emotion/styled';

import SwiperCore, {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
} from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import { HomeBannerSlideType } from '../../types/commonTypes';

import HomeBannerCard from './HomeBannerCard';

const HOME_BANNER_SLIDE_LIST: HomeBannerSlideType[] = [
  {
    id: 1,
    head: 'SSAFY 2학기 프로젝트',
    subHead: '공통 프로젝트',
    descriptions: [
      '비전공자/전공자가 한 팀으로 웹/모바일 기반 서비스 구현',
      '웹 파트(웹기술, 웹 디자인, 웹IoT 중 택 1) / 모바일 파트',
    ],
    imgUrl: '/images/projects/common-project.gif',
    hexColorCode: '#172335',
  },
  {
    id: 2,
    head: 'SSAFY 2학기 프로젝트',
    subHead: '특화 프로젝트',
    descriptions: [
      '4차 산업혁명 분야 신기술 도메인 구현 프로젝트 수행',
      '인공지능, 빅데이터, 블록체인, IoT 제어 중 택 1',
    ],
    imgUrl: '/images/projects/specialization-project.gif',
    hexColorCode: '#152029',
  },
  {
    id: 3,
    head: 'SSAFY 2학기 프로젝트',
    subHead: '자율 프로젝트',
    descriptions: [
      '공통, 특화 프로젝트 경험바탕으로, 자유 주제로 서비스를 개발하여 나만의 포트폴리오 완성',
      '기업연계, 오픈소스, 자유주제 중 택 1',
    ],
    imgUrl: '/images/projects/autonomy-project.gif',
    hexColorCode: '#373549',
  },
];

const HomeBannerSection: React.FC = () => {
  return (
    <>
      <Container>
        <BannerSwiper
          cssMode={true}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          loop={true}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          className="mySwiper"
        >
          {HOME_BANNER_SLIDE_LIST.map(
            ({ id, head, subHead, descriptions, imgUrl, hexColorCode }) => (
              <SwiperSlide key={id} style={{ backgroundColor: hexColorCode }}>
                <HomeBannerCard
                  head={head}
                  subHead={subHead}
                  descriptions={descriptions}
                  imgUrl={imgUrl}
                />
              </SwiperSlide>
            ),
          )}
        </BannerSwiper>
      </Container>
    </>
  );
};

SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard, Autoplay]);

const Container = styled.section`
  margin: 0 auto;
`;

const BannerSwiper = styled(Swiper)`
  width: 100%;

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
  }

  .swiper-pagination-bullet {
    background-color: #fff;
    transition: all 0.08s ease-in-out;

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
    opacity: 0;
    font-size: 24px;
    color: #fff;
    transition: opacity 0.12s ease-in-out;
  }

  &:hover {
    .swiper-button-prev::after,
    .swiper-button-next::after {
      opacity: 1;
    }
  }
`;

export default HomeBannerSection;
