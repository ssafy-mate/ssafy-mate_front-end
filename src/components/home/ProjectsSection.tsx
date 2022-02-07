import styled from '@emotion/styled';

import { ProjectLinkCardData } from '../../types/commonTypes';

import ProjectLinkCard from './ProjectLinkCard';

const ProjectsSection: React.FC = () => {
  const projectLinkCardDataList: ProjectLinkCardData[] = [
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

  return (
    <Container>
      <Wrapper>
        {projectLinkCardDataList.map((projectLinkCardData) => (
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
      </Wrapper>
    </Container>
  );
};

const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
`;

const Wrapper = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 50px 0;
  box-sizing: border-box;

  @media (max-width: 991px) {
    flex-direction: column;
    padding: 40px 0;
  }
`;

export default ProjectsSection;
