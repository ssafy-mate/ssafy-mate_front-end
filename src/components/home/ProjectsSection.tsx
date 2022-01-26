import styled from '@emotion/styled';

import { ProjectLinkCardData } from '../../types/commonTypes';

import ProjectLinkCard from './ProjectLinkCard';

const ProjectsSection: React.FC = () => {
  const projectLinkCardDataList: ProjectLinkCardData[] = [
    {
      projectName: '공통 프로젝트',
      pageUrl: '/projects/common/teams',
      imgUrl: '/images/projects/common-project_link.png',
      hexColorCode: '#3396f4',
    },
    {
      projectName: '특화 프로젝트',
      pageUrl: '/projects/specialization/teams',
      imgUrl: '/images/projects/specialization-project_link.png',
      hexColorCode: '#84c0f8',
    },
    {
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
            key={projectLinkCardData.projectName}
            projectName={projectLinkCardData.projectName}
            pageUrl={projectLinkCardData.pageUrl}
            imgUrl={projectLinkCardData.imgUrl}
            hexColorCode={projectLinkCardData.hexColorCode}
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
