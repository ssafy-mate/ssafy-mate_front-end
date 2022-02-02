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

import { ProjectBannerSlideData } from '../../types/commonTypes';

import ProjectBannerCard from './ProjectBannerCard';

const ProjectBannerSection: React.FC = () => {
  const projectsBannerSlideDataList: ProjectBannerSlideData[] = [
    {
      id: 1,
      head: '특화 프로젝트',
      subHead: 'Track 1. 인공지능 (AI)',
      description:
        '인간의 학습능력과 추론능력, 지각능력, 자연언어의 이해능력 등을 컴퓨터 프로그램으로 실현한 기술',
      imgUrl: '/images/projects/ai_animation.gif',
      hexColorCode: '#ffc107',
    },
    {
      id: 2,
      head: '특화 프로젝트',
      subHead: 'Track 2. 빅데이터 (Big Data)',
      description:
        '정형·반정형·비정형 데이터세트의 집적물, 그리고 이로부터 경제적 가치를 추출 및 분석할 수 있는 기술',
      imgUrl: '/images/projects/bigdata_animation.gif',
      hexColorCode: '#52c5b5',
    },
    {
      id: 3,
      head: '특화 프로젝트',
      subHead: 'Track 3. 블록체인 (Block Chain)',
      description:
        '누구나 열람할 수 있는 장부에 거래 내역을 투명하게 기록하고, 여러 대의 컴퓨터에 이를 복제해 저장하는 분산형 데이터 저장기술',
      imgUrl: '/images/projects/blockchain_animation.gif',
      hexColorCode: '#000',
    },
    {
      id: 4,
      head: '특화 프로젝트',
      subHead: 'Track 4. IoT 제어 (Internet of Things)',
      description:
        '인터넷을 기반으로 모든 사물을 연결하여 정보를 상호 소통하는 지능형 기술 및 서비스',
      imgUrl: '/images/projects/iot_animation.gif',
      hexColorCode: '#2e4f87',
    },
  ];

  return (
    <Container>
      <Wrapper>
        <BannerSwiper
          cssMode={true}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          loop={true}
          autoplay={{
            delay: 80000,
            disableOnInteraction: false,
          }}
          className="mySwiper"
        >
          {projectsBannerSlideDataList.map(
            ({ id, hexColorCode, head, subHead, description, imgUrl }) => (
              <SwiperSlide key={id} style={{ backgroundColor: hexColorCode }}>
                <ProjectBannerCard
                  head={head}
                  subHead={subHead}
                  description={description}
                  imgUrl={imgUrl}
                />
              </SwiperSlide>
            ),
          )}
        </BannerSwiper>
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

  @media (max-width: 575px) {
    margin-top: 70px;
  }
`;

const Wrapper = styled.div`
  overflow: hidden;
  border-radius: 12px;
  box-sizing: border-box;
`;

const BannerSwiper = styled(Swiper)`
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
    padding: 12px 0;
    border-radius: 12px;
    text-align: center;
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

export default ProjectBannerSection;
