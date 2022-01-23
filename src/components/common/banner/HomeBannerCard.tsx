import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

import { HomeBannderCardProps } from '../../../types/commonTypes';

const HomeBannerCard: React.FC<HomeBannderCardProps> = ({
  head,
  subHead,
  descriptions,
  pageUrl,
  imgUrl,
}) => {
  return (
    <BannerCard to={pageUrl}>
      <InfoWrapper>
        <Head>{head}</Head>
        <SubHead>{subHead}</SubHead>
        {descriptions.map((description, index) => (
          <Description key={index}>{description}</Description>
        ))}
      </InfoWrapper>
      <ImgWrapper>
        <Img src={imgUrl} alt={`${subHead} 이미지`} />
      </ImgWrapper>
    </BannerCard>
  );
};

const BannerCard = styled(Link)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  padding: 58px 40px 30px;
  box-sizing: border-box;
  color: #fff;

  @media (max-width: 767px) {
    flex-direction: column;
    justify-content: space-around;
    height: 480px;
  }
  @media (max-width: 575px) {
    height: 440px;
  }

  &:hover {
    & h2 {
      text-decoration: underline 2px;
    }
  }
`;

const InfoWrapper = styled.div`
  margin-right: 24px;
  padding: 48px 0;

  @media (max-width: 767px) {
    margin-right: 0;
    margin-bottom: 20px;
    padding: 12px 0 0 0;
  }
`;

const ImgWrapper = styled.div`
  height: 280px;

  @media (max-width: 767px) {
    height: 220px;
  }
`;

const Img = styled.img`
  height: 280px;

  @media (max-width: 767px) {
    height: 220px;
  }
  @media (max-width: 575px) {
    height: 180px;
  }
`;

const Head = styled.h1`
  margin-bottom: 8px;
  font-size: 15px;
  line-height: 1.5;
  text-align: left;

  @media (max-width: 767px) {
    margin-bottom: 6px;
  }
  @media (max-width: 575px) {
    margin-bottom: 4px;
    font-size: 12px;
  }
`;

const SubHead = styled.h2`
  margin-bottom: 32px;
  font-size: 30px;
  font-weight: 500;
  line-height: 1.6;
  text-align: left;

  @media (max-width: 767px) {
    margin-bottom: 16px;
    font-size: 26px;
  }
  @media (max-width: 575px) {
    margin-bottom: 12px;
    font-size: 24px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #d2d2d2;
  text-align: left;

  @media (max-width: 575px) {
    font-size: 13px;
  }
`;

export default HomeBannerCard;
