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

import { ProjectTrackBannerType } from '../../../types/commonTypes';

import VisuallyHiddenHead from '../../common/VisuallyHiddenHead';
import ProjectTrackCard from './ProjectTrackCard';

const PROJECT_TRACK_BANNER_LIST: ProjectTrackBannerType[] = [
  {
    id: 1,
    head: '특화 프로젝트',
    subHead: 'Track 1. 인공지능 (영상)',
    description:
      '이미지 입력이 들어 갔을 때, 해당 이미지를 묘사하는 텍스트를 생성하는 이미지 캡셔닝 모델 구현 프로젝트',
    imageUrl: '/images/projects/ai-video_animation.webp',
    hexColorCode: '#232930',
  },
  {
    id: 2,
    head: '특화 프로젝트',
    subHead: 'Track 2. 인공지능 (음성)',
    description:
      '딥러닝 알고리즘의 동작 과정 이해 및 구현, 각 팀 별로 개성있는 인공지능 서비스 구축 프로젝트',
    imageUrl: '/images/projects/ai-voice_animation.webp',
    hexColorCode: '#ffbf06',
  },
  {
    id: 3,
    head: '특화 프로젝트',
    subHead: 'Track 3. 빅데이터 (추천)',
    description:
      '사용자에 대한 이해, 추천되는 요소에 대한 이해를 통한 정보 필터링 서비스 제공, 기존의 서비스 이용 기록을 통한 인사이트 도출 및 적용 프로젝트',
    imageUrl: '/images/projects/bigdata-recommendation_animation.webp',
    hexColorCode: '#56c5b6',
  },
  {
    id: 4,
    head: '특화 프로젝트',
    subHead: 'Track 4. 빅데이터 (분산)',
    description:
      '분산 파일 시스템을 활용한 데이터 처리 과정에 대해 이해하고 효율적인 병렬 연산을 위한 알고리즘 구현 및 서비스 적용 프로젝트',
    imageUrl: '/images/projects/bigdata-dispersion_animation.webp',
    hexColorCode: '#2b3749',
  },
  {
    id: 5,
    head: '특화 프로젝트',
    subHead: 'Track 5. 블록체인 (P2P 거래)',
    description:
      '블록체인 오픈소스로 네트워크 인프라를 구축하여 이를 활용하는 프로젝트',
    imageUrl: '/images/projects/blockchain-p2p_animation.webp',
    hexColorCode: '#000',
  },
  {
    id: 6,
    head: '특화 프로젝트',
    subHead: 'Track 6. 블록체인 (디지털화폐)',
    description:
      'NFT(대체 불가한 토큰) 스마트 컨트랙트 구현하여 NFT를 거래할 수 있도록 하는 프로젝트',
    imageUrl: '/images/projects/blockchain-digital-money_animation.webp',
    hexColorCode: '#08091c',
  },
  {
    id: 7,
    head: '특화 프로젝트',
    subHead: 'Track 7. IoT 제어',
    description:
      '가전기기나 센서들을 무선 통신으로 연결하여, 네트워킹, S/W, AI 기술을 기반으로 외부망과 가정을 연결하여 융합 콘텐츠 서비스를 제공하는 프로젝트',
    imageUrl: '/images/projects/iot_animation.webp',
    hexColorCode: '#2d5086',
  },
];

const ProjectTrackBannerSection: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <VisuallyHiddenHead level={2} text="특화 프로젝트 트랙 목록" />
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
          {PROJECT_TRACK_BANNER_LIST.map(
            ({ id, hexColorCode, head, subHead, description, imageUrl }) => (
              <SwiperSlide key={id} style={{ backgroundColor: hexColorCode }}>
                <ProjectTrackCard
                  head={head}
                  subHead={subHead}
                  description={description}
                  imageUrl={imageUrl}
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
  margin-bottom: 24px;

  @media (max-width: 575px) {
    margin-top: 70px;
  }
`;

const Wrapper = styled.div`
  overflow: hidden;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
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

export default ProjectTrackBannerSection;
