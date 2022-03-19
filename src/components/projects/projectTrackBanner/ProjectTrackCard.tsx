import styled from '@emotion/styled';

import { ProjectTrackCardType } from '../../../types/commonTypes';

interface ProjectTrackCardProps extends ProjectTrackCardType {}

const ProjectTrackCard: React.FC<ProjectTrackCardProps> = ({
  head,
  subHead,
  description,
  imageUrl,
}) => {
  return (
    <Card>
      <InfoWrapper>
        <Head>{head}</Head>
        <SubHead>{subHead}</SubHead>
        <Description>{description}</Description>
      </InfoWrapper>
      <ImgWrapper>
        <Img src={imageUrl} alt={`${subHead} 애니메이션`} />
      </ImgWrapper>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1000px;
  padding: 0 20px;
  box-sizing: border-box;
  color: #fff;

  @media (max-width: 1199px) {
    padding: 0 30px;
  }
  @media (max-width: 767px) {
    flex-direction: column;
    justify-content: space-around;
    height: 460px;
  }
  @media (max-width: 575px) {
    height: 420px;
    padding: 0 24px;
  }
`;

const InfoWrapper = styled.div`
  margin-right: 60px;
  padding: 48px 0;

  @media (max-width: 767px) {
    margin-right: 0;
    margin-bottom: 12px;
    padding: 12px 0 0 0;
  }
`;

const Head = styled.p`
  margin-bottom: 8px;
  font-size: 15px;
  line-height: 1.5;
  text-align: left;

  @media (max-width: 991px) {
    font-size: 14px;
  }
  @media (max-width: 767px) {
    margin-bottom: 6px;
    font-size: 13px;
  }
  @media (max-width: 575px) {
    margin-bottom: 4px;
    font-size: 12px;
  }
`;

const SubHead = styled.h3`
  margin-bottom: 32px;
  font-size: 30px;
  font-weight: 500;
  line-height: 1.6;
  text-align: left;

  @media (max-width: 991px) {
    margin-bottom: 24px;
  }
  @media (max-width: 767px) {
    margin-bottom: 16px;
    font-size: 26px;
  }
  @media (max-width: 575px) {
    margin-bottom: 12px;
    font-size: 22px;
  }
`;

const Description = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #f3f3f3;
  text-align: left;

  @media (max-width: 991px) {
    font-size: 14px;
  }
  @media (max-width: 575px) {
    font-size: 13px;
  }
`;

const ImgWrapper = styled.div`
  margin-top: 16px;
  height: 280px;

  @media (max-width: 991px) {
    height: 250px;
  }
  @media (max-width: 767px) {
    margin-top: 0;
    height: 220px;
  }
`;

const Img = styled.img`
  width: 260px;
  height: 260px;

  @media (max-width: 991px) {
    width: 240px;
    height: 240px;
  }
  @media (max-width: 767px) {
    width: 220px;
    height: 220px;
  }
  @media (max-width: 575px) {
    width: 200px;
    height: 200px;
  }
`;

export default ProjectTrackCard;
