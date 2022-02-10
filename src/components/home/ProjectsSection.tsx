import styled from '@emotion/styled';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { ProjectLinkCardType } from '../../types/commonTypes';

import ProjectLinkCard from './ProjectLinkCard';

const PROJECT_LINK_CARD_LIST: ProjectLinkCardType[] = [
  {
    projectId: 1,
    projectName: '공통 프로젝트',
    pageUrl: '/projects/common/teams',
    imgUrl: '/images/projects/common-project_link.png',
    hexColorCode: '#3396f4',
  },
  {
    projectId: 2,
    projectName: '특화 프로젝트',
    pageUrl: '/projects/specialization/teams',
    imgUrl: '/images/projects/specialization-project_link.png',
    hexColorCode: '#84c0f8',
    trackOptions: ['인공지능', '빅데이터', '블록체인', 'IoT 제어'],
  },
  {
    projectId: 3,
    projectName: '자율 프로젝트',
    pageUrl: '/projects/autonomy/teams',
    imgUrl: '/images/projects/autonomy-project_link.png',
    hexColorCode: '#385a7b',
  },
];

const ProjectsSection: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        {PROJECT_LINK_CARD_LIST.map((projectLinkCardData) => (
          <ProjectLinkCard
            key={projectLinkCardData.projectId}
            projectId={projectLinkCardData.projectId}
            projectName={projectLinkCardData.projectName}
            pageUrl={projectLinkCardData.pageUrl}
            imgUrl={projectLinkCardData.imgUrl}
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

const Container = styled.main`
  padding: 0 16px;
  background-color: #f8fafc;
`;

const Wrapper = styled.main`
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

export default ProjectsSection;
