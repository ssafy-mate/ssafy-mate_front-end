import styled from '@emotion/styled';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ShareIcon from '@mui/icons-material/Share';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Skeleton from '@mui/material/Skeleton';

const SkeletonTeamInfoSection: React.FC = () => {
  const theme = useTheme();
  const extraLargeMedia = useMediaQuery(theme.breakpoints.up('lg'));
  const smallMedia = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Container>
      <HeadContainer>
        <TitleBox>
          <TeamImgWrapper>
            <Skeleton
              variant="rectangular"
              width={extraLargeMedia ? 90 : 80}
              height={extraLargeMedia ? 90 : 80}
            />
          </TeamImgWrapper>
          <TeamTitleWrapper>
            <Skeleton
              variant="text"
              width={smallMedia ? 340 : 180}
              height={smallMedia ? 50 : 40}
            />
            <Row>
              <Skeleton
                variant="text"
                width={smallMedia ? 100 : 80}
                height={smallMedia ? 40 : 30}
              />
            </Row>
          </TeamTitleWrapper>
        </TitleBox>
        <ButtonBox>
          <ApplicationButton></ApplicationButton>
          <SharingButton>
            <ShareIcon />
            <span>공유하기</span>
            <ArrowDropDownIcon />
          </SharingButton>
        </ButtonBox>
      </HeadContainer>
      <BodyContainer>
        <Contents>
          <Section>
            <SubHead>
              <Skeleton
                variant="text"
                width={smallMedia ? 100 : 80}
                height={smallMedia ? 40 : 30}
              />
            </SubHead>
            <InfoList>
              <InfoItem>
                <InfoLabel>
                  <Skeleton
                    variant="text"
                    width={smallMedia ? 80 : 60}
                    height={smallMedia ? 30 : 20}
                  />
                </InfoLabel>
                <InfoContent>
                  <Skeleton
                    variant="text"
                    width={smallMedia ? 100 : 80}
                    height={smallMedia ? 30 : 20}
                  />
                </InfoContent>
              </InfoItem>
              <InfoItem>
                <InfoLabel>
                  <Skeleton
                    variant="text"
                    width={smallMedia ? 80 : 60}
                    height={smallMedia ? 30 : 20}
                  />
                </InfoLabel>
                <InfoContent>
                  <Skeleton
                    variant="text"
                    width={smallMedia ? 100 : 80}
                    height={smallMedia ? 30 : 20}
                  />
                </InfoContent>
              </InfoItem>
              <InfoItem>
                <InfoLabel>
                  <Skeleton
                    variant="text"
                    width={smallMedia ? 80 : 60}
                    height={smallMedia ? 30 : 20}
                  />
                </InfoLabel>
                <InfoContent>
                  <Skeleton
                    variant="text"
                    width={smallMedia ? 100 : 80}
                    height={smallMedia ? 30 : 20}
                  />
                </InfoContent>
              </InfoItem>
              <InfoItem>
                <InfoLabel>
                  <Skeleton
                    variant="text"
                    width={smallMedia ? 80 : 60}
                    height={smallMedia ? 30 : 20}
                  />
                </InfoLabel>
                <InfoContent>
                  <Skeleton
                    variant="text"
                    width={smallMedia ? 100 : 80}
                    height={smallMedia ? 30 : 20}
                  />
                </InfoContent>
              </InfoItem>
            </InfoList>
          </Section>
          <Section>
            <SubHead>
              <Skeleton
                variant="text"
                width={smallMedia ? 100 : 80}
                height={smallMedia ? 40 : 30}
              />
            </SubHead>
            <Introduction>
              <Skeleton
                variant="text"
                width={'100%'}
                height={smallMedia ? 30 : 20}
              />
              <Skeleton
                variant="text"
                width={'100%'}
                height={smallMedia ? 30 : 20}
              />
            </Introduction>
          </Section>
          <Section>
            <SubHead>
              <Skeleton
                variant="text"
                width={smallMedia ? 120 : 100}
                height={smallMedia ? 40 : 30}
              />
            </SubHead>
            <TechStackList>
              <Skeleton
                variant="text"
                width={'100%'}
                height={smallMedia ? 44 : 42}
              />
              <Skeleton
                variant="text"
                width={'100%'}
                height={smallMedia ? 44 : 42}
              />
              <Skeleton
                variant="text"
                width={'100%'}
                height={smallMedia ? 44 : 42}
              />
            </TechStackList>
          </Section>
        </Contents>
        <Aside>
          <SubHead>
            <Skeleton
              variant="text"
              width={smallMedia ? 120 : 100}
              height={smallMedia ? 40 : 30}
            />
          </SubHead>
          <MemberList>
            <Skeleton
              variant="text"
              width={'100%'}
              height={smallMedia ? 78 : 72}
            />
            <Skeleton
              variant="text"
              width={'100%'}
              height={smallMedia ? 78 : 72}
            />
            <Skeleton
              variant="text"
              width={'100%'}
              height={smallMedia ? 78 : 72}
            />
          </MemberList>
          <Skeleton
            variant="text"
            width={'100%'}
            height={smallMedia ? 300 : 280}
          />
        </Aside>
      </BodyContainer>
    </Container>
  );
};

const Container = styled.section`
  max-width: 1200px;
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
  padding: 16px 0 40px;
  border-bottom: 1px solid #d7e2eb;
  box-sizing: border-box;

  @media (max-width: 1199px) {
    flex-direction: column;
  }
  @media (max-width: 767px) {
    padding: 10px 0 34px;
  }
`;

const BodyContainer = styled.div`
  display: flex;
  box-sizing: border-box;

  @media (max-width: 1199px) {
    flex-direction: column;
  }
`;

const Section = styled.section`
  margin-bottom: 40px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const TitleBox = styled.div`
  display: flex;
  padding: 0 16px;

  @media (max-width: 1199px) {
    margin-bottom: 40px;
    padding: 0;
  }
  @media (max-width: 767px) {
    margin-bottom: 30px;
  }
`;

const TeamImgWrapper = styled.div`
  width: 90px;
  height: 90px;
  margin-right: 20px;
  border-radius: 4px;
  box-shadow: 4px 12px 18px 2px rgb(0 0 0 / 8%);

  @media (max-width: 1199px) {
    width: 80px;
    height: 80px;
  }
`;

const TeamTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const Contents = styled.div`
  width: 100%;
  padding: 40px 80px 0 16px;
  border-right: 1px solid #d7e2eb;
  box-sizing: border-box;

  @media (max-width: 1199px) {
    padding-right: 0;
    padding-left: 0;
    border-right: 0;
  }
`;

const Aside = styled.aside`
  min-width: 400px;
  box-sizing: border-box;
  padding: 40px 16px 0 40px;

  @media (max-width: 1199px) {
    padding: 40px 0 0;
    min-width: 100%;
  }
`;

const SubHead = styled.h3`
  margin-bottom: 8px;
`;

const MemberList = styled.ul`
  box-sizing: border-box;
`;

const InfoList = styled.ul`
  width: 100%;
`;

const InfoItem = styled.li`
  overflow: hidden;
  display: flex;
  width: 100%;
  border-top: 1px solid #d7e2eb;
  box-sizing: border-box;
`;

const InfoLabel = styled.label`
  overflow: hidden;
  display: flex;
  align-items: center;
  min-width: 125px;
  padding: 8px 0 8px 8px;

  svg {
    margin-right: 8px;
  }
`;

const InfoContent = styled.p`
  overflow: hidden;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 16px;
`;

const Introduction = styled.p``;

const TechStackList = styled.ul``;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
`;

const ApplicationButton = styled.button`
  min-width: 130px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto 0;
  padding: 10px 24px;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #3396f4;
  transition: all 0.08s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #2878c3;
  }

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
  cursor: pointer;

  &:hover {
    background-color: #d1d4da;
  }

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

export default SkeletonTeamInfoSection;
