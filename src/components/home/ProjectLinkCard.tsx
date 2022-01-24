import { Link } from 'react-router-dom';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { ProjectLinkCardProps } from '../../types/commonTypes';

const ProjectLinkCard: React.FC<ProjectLinkCardProps> = ({
  projectName,
  pageUrl,
  imgUrl,
  hexColorCode,
}) => {
  return (
    <LinkCard to={pageUrl} css={{ backgroundColor: hexColorCode }}>
      <LinkCardImg src={imgUrl} alt={`${projectName} 이미지`} />
      <LinkCardTitle>
        {projectName}
        <br />팀 빌딩 바로가기
      </LinkCardTitle>
    </LinkCard>
  );
};

const LinkCard = styled(Link)`
  width: 320px;
  padding: 24px 16px;
  border: none;
  border-radius: 6px;
  box-sizing: border-box;
  box-shadow: 4px 12px 30px 6px rgb(0 0 0 / 10%);
  color: #fff;
  transition: box-shadow 0.26s ease, transform 0.26s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 4px 12px 30px 6px rgb(0 0 0 / 26%);
    transform: translateY(-8px);
  }

  @media (max-width: 1199px) {
    width: 300px;
  }
  @media (max-width: 991px) {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-around;
    width: 100%;
    margin-bottom: 18px;
  }
`;

const LinkCardImg = styled.img`
  display: block;
  width: 240px;
  margin: 0 auto 36px;

  @media (max-width: 991px) {
    width: 140px;
    margin: 0 0 0 12px;
  }
  @media (max-width: 575px) {
    width: 100px;
  }
`;

const LinkCardTitle = styled.p`
  padding-left: 12px;
  font-size: 24px;
  font-weight: 500;
  line-height: 1.6;

  @media (max-width: 991px) {
    margin: auto 0;
    padding-left: 0;
  }
  @media (max-width: 575px) {
    font-size: 20px;
  }
`;

export default ProjectLinkCard;
