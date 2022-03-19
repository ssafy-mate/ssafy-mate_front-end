import styled from '@emotion/styled';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { ProjectLinkCardType } from '../../../types/commonTypes';

import VisuallyHiddenHead from '../../common/VisuallyHiddenHead';
import ProjectLinkCard from './ProjectLinkCard';

const PROJECT_LINK_CARD_LIST: ProjectLinkCardType[] = [
  {
    projectId: 1,
    project: '공통 프로젝트',
    pageUrl: '/projects/common/teams',
    smallImg: {
      imgUrl: '/images/home/common-project_link-img_small.png',
      width: 240,
    },
    mediumImg: {
      imgUrl: '/images/home/common-project_link-img_medium.png',
      width: 320,
    },
    largeImg: {
      imgUrl: '/images/home/common-project_link-img_large.png',
      width: 512,
    },
    hexColorCode: '#3396f4',
  },
  {
    projectId: 2,
    project: '특화 프로젝트',
    pageUrl: '/projects/specialization/teams',
    smallImg: {
      imgUrl: '/images/home/specialization-project_link-img_small.png',
      width: 240,
    },
    mediumImg: {
      imgUrl: '/images/home/specialization-project_link-img_medium.png',
      width: 320,
    },
    largeImg: {
      imgUrl: '/images/home/specialization-project_link-img_large.png',
      width: 512,
    },
    hexColorCode: '#84c0f8',
    trackOptions: [
      '인공지능(영상)',
      '인공지능(음성)',
      '빅데이터(추천)',
      '빅데이터(분산)',
      '블록체인(P2P거래)',
      '블록체인(디지털화폐)',
      'IoT 제어',
    ],
  },
  {
    projectId: 3,
    project: '자율 프로젝트',
    pageUrl: '/projects/autonomy/teams',
    smallImg: {
      imgUrl: '/images/home/autonomy-project_link-img_small.png',
      width: 240,
    },
    mediumImg: {
      imgUrl: '/images/home/autonomy-project_link-img_medium.png',
      width: 320,
    },
    largeImg: {
      imgUrl: '/images/home/autonomy-project_link-img_large.png',
      width: 512,
    },
    hexColorCode: '#385a7b',
  },
];

const ProjectLinksContainer: React.FC = () => {
  return (
    <Container>
      <VisuallyHiddenHead level={2} text="팀 빌딩 페이지 링크 목록" />
      <Wrapper>
        {PROJECT_LINK_CARD_LIST.map((projectLinkCardData) => (
          <ProjectLinkCard
            key={projectLinkCardData.projectId}
            projectId={projectLinkCardData.projectId}
            project={projectLinkCardData.project}
            pageUrl={projectLinkCardData.pageUrl}
            smallImg={projectLinkCardData.smallImg}
            mediumImg={projectLinkCardData.mediumImg}
            largeImg={projectLinkCardData.largeImg}
            hexColorCode={projectLinkCardData.hexColorCode}
            trackOptions={projectLinkCardData.trackOptions}
          />
        ))}
        <ArrowButtonWrapper>
          <ArrowButtonText>
            싸피 메이트 이용이 처음이신가요? 아래 화살표를 클릭!
          </ArrowButtonText>
          <ArrowButton href="#intro-container">
            <ArrowIcon />
          </ArrowButton>
        </ArrowButtonWrapper>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 16px;
  background-color: #fff;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 0;
  box-sizing: border-box;

  @media (max-width: 991px) {
    flex-direction: column;
    padding: 40px 0 0;
  }
`;

const ArrowButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 50px 0;
`;

const ArrowButtonText = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: #98a8b9;

  @media (max-width: 991px) {
    font-size: 16px;
  }
  @media (max-width: 575px) {
    font-size: 14px;
  }
`;

const ArrowButton = styled.a`
  padding: 0;
  margin: 0 auto;
  width: 50px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  @media (max-width: 575px) {
    width: 46px;
  }
`;

const ArrowIcon = styled(KeyboardArrowDownIcon)`
  font-size: 46px;
  color: #98a8b9;
  transition: all 0.08s ease-in-out;

  &:hover {
    color: #747b80;
    transform: translateY(6px);
  }

  @media (max-width: 575px) {
    font-size: 46px;
  }
`;

export default ProjectLinksContainer;
