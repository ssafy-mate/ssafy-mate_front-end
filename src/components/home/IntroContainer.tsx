import styled from '@emotion/styled';

import { ServiceIntroductionType } from '../../types/commonTypes';

import IntroSection from './IntroSection';
import MobileServiceIntroSection from './MobileServiceIntroSection';

const SERVICE_INTRODUCTION_LIST: ServiceIntroductionType[] = [
  {
    id: 1,
    headText: '팀 공고',
    subHeadText: '나와 맞는 팀을 빠르게 검색',
    descriptionText:
      '팀들의 정보를 비교하고 검색 폼을 통해 내가 원하는 프로젝트 트랙, 직무, 기술 스택 등을 검색하여 내게 꼭 맞는 팀을 찾아보세요.',
    imgUrl: '/images/home/pc-team-list-sample.png',
  },
  {
    id: 2,
    headText: '팀 상세 정보',
    subHeadText: '팀 정보를 한눈에',
    descriptionText:
      '팀이 추구하는 개발 목표와 어떤 교육생들이 팀에 합류되어 있는지 등과 같은 팀의 더 자세한 정보를 확인하고 내게 맞다면 팀에 지원해보세요.',
    imgUrl: '/images/home/pc-team-info-sample.png',
  },
  {
    id: 3,
    headText: '교육생 공고',
    subHeadText: '팀에 필요한 역량을 가진 교육생을 빠르게 검색',
    descriptionText:
      '교육생들의 정보를 한눈에 확인하고 검색 폼을 통해 나의 팀에 필요한 직무, 기술 역량 등을 갖춘 교육생을 찾아보세요.',
    imgUrl: '/images/home/pc-user-list-sample.png',
  },
  {
    id: 4,
    headText: '교육생 상세 정보',
    subHeadText: '교육생 정보를 한눈에',
    descriptionText:
      '교육생이 추구하는 개발 목표와 기술 스택 숙련도 그리고 깃 허브, 기술 블로그 활동 기록들을 확인해 보며 나의 팀에 필요한 교육생들을 영입해보세요.',
    imgUrl: '/images/home/pc-user-info-sample.png',
  },
];

const MOBILE_SERVICE_INTRODUCTION_LIST = [
  {
    id: 1,
    headText: '반응형 웹',
    subHeadText: '모바일 웹 서비스 제공',
    descriptionText:
      'PC, 테블릿, 모바일 등 어떤 기기에서든 최적화된 싸피 메이트 서비스를 이용하실 수 있습니다.',
    imgUrl: '/images/home/mobile-team-list-sample.png',
  },
  {
    id: 2,
    headText: '1대1 채팅',
    subHeadText: '실시간 채팅 서비스 제공',
    descriptionText:
      '내게 맞는 팀 또는 나의 팀에 필요한 교육생이 있다면 실시간 1대1 채팅을 통해 이야기를 나눠보세요.',
    imgUrl: '/images/home/mobile-team-list-sample.png',
  },
];

const IntroContainer: React.FC = () => {
  return (
    <Container id="intro-container">
      {SERVICE_INTRODUCTION_LIST.map((introduction) => (
        <IntroSection
          key={introduction.id}
          headText={introduction.headText}
          subHeadText={introduction.subHeadText}
          descriptionText={introduction.descriptionText}
          imgUrl={introduction.imgUrl}
          reversed={introduction.id % 2 === 0 ? true : false}
        />
      ))}
      {MOBILE_SERVICE_INTRODUCTION_LIST.map((introduction) => (
        <MobileServiceIntroSection
          key={introduction.id}
          headText={introduction.headText}
          subHeadText={introduction.subHeadText}
          descriptionText={introduction.descriptionText}
          imgUrl={introduction.imgUrl}
          reversed={introduction.id % 2 === 0 ? true : false}
        />
      ))}
    </Container>
  );
};

const Container = styled.div``;

export default IntroContainer;
