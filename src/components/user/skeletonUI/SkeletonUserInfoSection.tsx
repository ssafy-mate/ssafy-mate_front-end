import { useMediaQuery } from 'react-responsive';

import styled from '@emotion/styled';

import ShareIcon from '@mui/icons-material/Share';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Skeleton from '@mui/material/Skeleton';

const SkeletonUserInfoSection: React.FC = () => {
  const extraLargeMedia = useMediaQuery({
    query: '(max-width: 1199px)',
  });

  return (
    <Container>
      <HeadContainer>
        <TitleBox>
          <ProfileImgWrapper>
            <Skeleton
              variant="rectangular"
              width={extraLargeMedia ? 80 : 90}
              height={extraLargeMedia ? 80 : 90}
            />
          </ProfileImgWrapper>
          <NameWrapper>
            <Skeleton
              variant="text"
              width={extraLargeMedia ? 60 : 80}
              height={extraLargeMedia ? 30 : 36}
            />
            <Row>
              <Skeleton
                variant="text"
                width={extraLargeMedia ? 146 : 177}
                height={extraLargeMedia ? 26 : 32}
              />
            </Row>
          </NameWrapper>
        </TitleBox>
        <ButtonBox>
          <RequestButton></RequestButton>
          <SharingButton>
            <ShareIcon />
            <span>공유하기</span>
            <ArrowDropDownIcon />
          </SharingButton>
        </ButtonBox>
      </HeadContainer>
      <BodyContainer>
        <Section>
          <SubHead>
            <Skeleton
              variant="text"
              width={extraLargeMedia ? 65 : 80}
              height={extraLargeMedia ? 24 : 30}
            />
          </SubHead>
          <InfoList>
            <InfoRow>
              <InfoItem>
                <InfoLabel>
                  <Skeleton
                    variant="text"
                    width={extraLargeMedia ? 68 : 80}
                    height={extraLargeMedia ? 36 : 38}
                  />
                </InfoLabel>
                <InfoContent>
                  <Skeleton
                    variant="text"
                    width={extraLargeMedia ? 56 : 60}
                    height={extraLargeMedia ? 36 : 38}
                  />
                </InfoContent>
              </InfoItem>
              <InfoItem>
                <InfoLabel>
                  <Skeleton
                    variant="text"
                    width={extraLargeMedia ? 96 : 100}
                    height={extraLargeMedia ? 36 : 38}
                  />
                </InfoLabel>
                <InfoContent>
                  <Skeleton
                    variant="text"
                    width={extraLargeMedia ? 96 : 100}
                    height={extraLargeMedia ? 36 : 38}
                  />
                </InfoContent>
              </InfoItem>
            </InfoRow>
            <InfoRow>
              <InfoItem>
                <InfoLabel>
                  <Skeleton
                    variant="text"
                    width={extraLargeMedia ? 110 : 120}
                    height={extraLargeMedia ? 36 : 38}
                  />
                </InfoLabel>
                <InfoContent>
                  <Skeleton
                    variant="text"
                    width={extraLargeMedia ? 120 : 140}
                    height={extraLargeMedia ? 36 : 38}
                  />
                </InfoContent>
              </InfoItem>
              <InfoItem>
                <InfoLabel>
                  <Skeleton
                    variant="text"
                    width={extraLargeMedia ? 110 : 120}
                    height={extraLargeMedia ? 36 : 38}
                  />
                </InfoLabel>
                <InfoContent>
                  <Skeleton
                    variant="text"
                    width={extraLargeMedia ? 120 : 140}
                    height={extraLargeMedia ? 36 : 38}
                  />
                </InfoContent>
              </InfoItem>
            </InfoRow>
            <InfoRow>
              <InfoItem>
                <InfoLabel>
                  <Skeleton
                    variant="text"
                    width={extraLargeMedia ? 136 : 152}
                    height={extraLargeMedia ? 36 : 38}
                  />
                </InfoLabel>
                <InfoContent>
                  <Skeleton
                    variant="text"
                    width={extraLargeMedia ? 120 : 138}
                    height={extraLargeMedia ? 36 : 38}
                  />
                </InfoContent>
              </InfoItem>
              <InfoItem>
                <InfoLabel>
                  <Skeleton
                    variant="text"
                    width={extraLargeMedia ? 120 : 138}
                    height={extraLargeMedia ? 36 : 38}
                  />
                </InfoLabel>
                <InfoContent>
                  <Skeleton
                    variant="text"
                    width={extraLargeMedia ? 120 : 138}
                    height={extraLargeMedia ? 36 : 38}
                  />
                </InfoContent>
              </InfoItem>
            </InfoRow>
            <InfoRow>
              <InfoItem>
                <InfoLabel>
                  <Skeleton
                    variant="text"
                    width={extraLargeMedia ? 136 : 152}
                    height={extraLargeMedia ? 36 : 38}
                  />
                </InfoLabel>
                <InfoContent>
                  <Skeleton
                    variant="text"
                    width={extraLargeMedia ? 120 : 138}
                    height={extraLargeMedia ? 36 : 38}
                  />
                </InfoContent>
              </InfoItem>
              <InfoItem>
                <InfoLabel>
                  <Skeleton
                    variant="text"
                    width={extraLargeMedia ? 120 : 138}
                    height={extraLargeMedia ? 36 : 38}
                  />
                </InfoLabel>
                <InfoContent>
                  <Skeleton
                    variant="text"
                    width={extraLargeMedia ? 120 : 138}
                    height={extraLargeMedia ? 36 : 38}
                  />
                </InfoContent>
              </InfoItem>
            </InfoRow>
            <InfoRow>
              <InfoItem>
                <InfoLabel>
                  <Skeleton
                    variant="text"
                    width={extraLargeMedia ? 136 : 152}
                    height={extraLargeMedia ? 36 : 38}
                  />
                </InfoLabel>
                <InfoContent>
                  <Skeleton
                    variant="text"
                    width={extraLargeMedia ? 120 : 138}
                    height={extraLargeMedia ? 36 : 38}
                  />
                </InfoContent>
              </InfoItem>
              <InfoItem>
                <InfoLabel>
                  <Skeleton
                    variant="text"
                    width={extraLargeMedia ? 120 : 138}
                    height={extraLargeMedia ? 36 : 38}
                  />
                </InfoLabel>
                <InfoContent>
                  <Skeleton
                    variant="text"
                    width={extraLargeMedia ? 120 : 138}
                    height={extraLargeMedia ? 36 : 38}
                  />
                </InfoContent>
              </InfoItem>
            </InfoRow>
            <InfoRow>
              <InfoItem>
                <InfoLabel>
                  <Skeleton
                    variant="text"
                    width={extraLargeMedia ? 90 : 100}
                    height={extraLargeMedia ? 36 : 38}
                  />
                </InfoLabel>
                <InfoContent>
                  <Skeleton
                    variant="text"
                    width={extraLargeMedia ? 130 : 160}
                    height={extraLargeMedia ? 36 : 38}
                  />
                </InfoContent>
              </InfoItem>
            </InfoRow>
            <InfoRow>
              <InfoItem>
                <InfoLabel>
                  <Skeleton
                    variant="text"
                    width={extraLargeMedia ? 82 : 90}
                    height={extraLargeMedia ? 36 : 38}
                  />
                </InfoLabel>
                <InfoContent>
                  <Skeleton
                    variant="text"
                    width={extraLargeMedia ? 130 : 160}
                    height={extraLargeMedia ? 36 : 38}
                  />
                </InfoContent>
              </InfoItem>
            </InfoRow>
            <InfoRow>
              <InfoItem>
                <InfoLabel>
                  <Skeleton
                    variant="text"
                    width={extraLargeMedia ? 110 : 120}
                    height={extraLargeMedia ? 36 : 38}
                  />
                </InfoLabel>
                <InfoContent>
                  <Skeleton
                    variant="text"
                    width={extraLargeMedia ? 130 : 160}
                    height={extraLargeMedia ? 36 : 38}
                  />
                </InfoContent>
              </InfoItem>
            </InfoRow>
          </InfoList>
        </Section>
        <Section>
          <SubHead>
            <Skeleton
              variant="text"
              width={extraLargeMedia ? 52 : 62}
              height={extraLargeMedia ? 24 : 30}
            />
          </SubHead>
          <Introduction>
            <Skeleton
              variant="text"
              width={'80%'}
              height={extraLargeMedia ? 24 : 30}
            />
          </Introduction>
        </Section>
        <Section>
          <SubHead>
            <Skeleton
              variant="text"
              width={extraLargeMedia ? 65 : 80}
              height={extraLargeMedia ? 24 : 30}
            />
          </SubHead>
          <TechStackList>
            <Skeleton
              variant="text"
              width={'100%'}
              height={extraLargeMedia ? 71 : 73}
            />
            <Skeleton
              variant="text"
              width={'100%'}
              height={extraLargeMedia ? 71 : 73}
            />
            <Skeleton
              variant="text"
              width={'100%'}
              height={extraLargeMedia ? 71 : 73}
            />
          </TechStackList>
        </Section>
      </BodyContainer>
    </Container>
  );
};

const Container = styled.section`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 16px;
  box-sizing: border-box;

  @media (max-width: 575px) {
    margin-top: 70px;
  }
`;

const HeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 16px 40px;
  border-bottom: 1px solid #d7e2eb;
  box-sizing: border-box;

  @media (max-width: 1199px) {
    flex-direction: column;
  }
  @media (max-width: 991px) {
    padding-right: 0;
    padding-left: 0;
  }
  @media (max-width: 767px) {
    padding: 10px 0 34px;
  }
`;

const TitleBox = styled.div`
  display: flex;

  @media (max-width: 1199px) {
    margin-bottom: 40px;
  }
  @media (max-width: 767px) {
    margin-bottom: 30px;
  }
`;

const ProfileImgWrapper = styled.div`
  width: 90px;
  height: 90px;
  margin-right: 20px;
  border-radius: 4px;
  box-shadow: 4px 12px 18px 2px rgb(0 0 0 / 8%);
  background-image: url('/images/assets/basic-profile-img.png');
  background-size: contain;

  @media (max-width: 1199px) {
    width: 80px;
    height: 80px;
  }
`;

const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
`;

const RequestButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 183px;
  height: 44px;
  margin: auto 0;
  padding: 10px 24px;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #3396f4;
  color: #fff;
  transition: all 0.08s ease-in-out;

  @media (max-width: 1199px) {
    width: 100%;
    padding-right: 0;
    padding-left: 0;
  }
`;

const SharingButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto 0 auto 12px;
  padding: 10px 24px;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #e9ecf3;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  color: #263747;
  transition: all 0.08s ease-in-out;

  & svg {
    font-size: 22px;
    margin-right: 8px;

    &:last-of-type {
      margin-right: 0;
    }
  }

  @media (max-width: 1199px) {
    width: 100%;
    padding-right: 0;
    padding-left: 0;
  }
  @media (max-width: 991px) {
    font-size: 15px;

    & svg {
      font-size: 20px;
    }
  }
`;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 40px 16px 16px;

  @media (max-width: 991px) {
    padding-right: 0;
    padding-left: 0;
  }
`;

const Section = styled.section`
  margin-bottom: 40px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const SubHead = styled.h3`
  margin-bottom: 8px;
  line-height: 1.6;
`;

const InfoList = styled.ul`
  width: 100%;
`;

const InfoRow = styled.li`
  display: flex;
  width: 100%;
  border-top: 1px solid #d7e2eb;
  box-sizing: border-box;

  @media (max-width: 991px) {
    flex-direction: column;
    border: none;
  }
`;

const InfoLabel = styled.label`
  display: flex;
  align-items: center;
  min-width: 155px;
  padding: 8px 0 8px 8px;

  @media (max-width: 575px) {
    min-width: 138px;
  }
`;

const InfoContent = styled.p`
  width: 100%;
  padding: 8px 16px;
`;

const Introduction = styled.p``;

const TechStackList = styled.ul``;

const InfoItem = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: 991px) {
    border-top: 1px solid #d7e2eb;
  }
`;

export default SkeletonUserInfoSection;
