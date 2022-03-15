import styled from '@emotion/styled';

import { HomeBannerCardData } from '../../types/commonTypes';

interface HomeBannderCardProps extends HomeBannerCardData {}

const HomeBannerCard: React.FC<HomeBannderCardProps> = ({
  head,
  subHead,
  descriptions,
  imageUrl,
}) => {
  return (
    <BannerCard>
      <InfoWrapper>
        <Head>{head}</Head>
        <SubHead>{subHead}</SubHead>
        {descriptions.map((description, index) => (
          <Description key={index}>{description}</Description>
        ))}
      </InfoWrapper>
      <ImgWrapper>
        <Img src={imageUrl} alt={`${subHead} 애니메이션`} />
      </ImgWrapper>
    </BannerCard>
  );
};

const BannerCard = styled.div`
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
    padding-right: 24px;
    padding-left: 24px;
  }
  @media (max-width: 575px) {
    height: 440px;
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

const Head = styled.p`
  margin-bottom: 8px;
  font-size: 15px;
  line-height: 1.5;
  text-align: left;

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

  @media (max-width: 767px) {
    font-size: 14px;
  }
  @media (max-width: 575px) {
    font-size: 13px;
  }
`;

const ImgWrapper = styled.div`
  height: 280px;

  @media (max-width: 767px) {
    height: 220px;
  }
`;

const Img = styled.img`
  width: 280px;
  height: 280px;

  @media (max-width: 767px) {
    width: 220px;
    height: 220px;
  }
  @media (max-width: 575px) {
    width: 180px;
    height: 180px;
  }
`;

export default HomeBannerCard;
