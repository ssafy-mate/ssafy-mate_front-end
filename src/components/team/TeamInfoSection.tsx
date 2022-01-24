import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

import BorderColorIcon from '@mui/icons-material/BorderColor';
import ShareIcon from '@mui/icons-material/Share';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import GroupsIcon from '@mui/icons-material/Groups';
import WebIcon from '@mui/icons-material/Web';
import StorageIcon from '@mui/icons-material/Storage';
import FlagIcon from '@mui/icons-material/Flag';
import SchoolIcon from '@mui/icons-material/School';
import ComputerIcon from '@mui/icons-material/Computer';
import StyleIcon from '@mui/icons-material/Style';

import { UserType } from '../../types/userTypes';

import RecruitStatusBadge from '../projects/RecruitStatusBadge';
import RecruitStatusTag from '../projects/RecruitStatusTag';
import JobDoughnutChart from '../chart/DoughnutChart';
import TeamTechStack from './TeamTechStack';

const TeamInformationSection: React.FC = () => {
  const [techStacks, setTechStacks] = useState<string[]>([]);
  const [members, setMembers] = useState<UserType[]>([]);

  useEffect(() => {
    const techStacksData = [
      'TypeScript',
      'Redux',
      'Redux-Saga',
      'React-Query',
      'Emotion',
      'Spring-Boot',
      'JPA',
      'MySQL',
    ];

    setTechStacks(techStacksData);
  }, []);

  return (
    <Container>
      <HeadContainer>
        <TitleBox>
          <TeamImgWrapper>
            <TeamImg src="/images/common/ssafy-mate_logo.png" alt="sample" />
          </TeamImgWrapper>
          <TeamTitleWrapper>
            <Notice>실제 운영할 서비스 개발을 도전할 분들을 모집합니다.</Notice>
            <Row>
              <TeamName>데스파시토</TeamName>
              <RecruitStatusBadge isActive={true} />
            </Row>
          </TeamTitleWrapper>
        </TitleBox>
        <ButtonBox>
          <ApplicationButton>
            <BorderColorIcon />
            <span>지원하기</span>
          </ApplicationButton>
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
            <SubHead>요약 정보</SubHead>
            <InfoList>
              <InfoItem>
                <InfoLabel>
                  <SchoolIcon />
                  캠퍼스
                </InfoLabel>
                <InfoContent>서울</InfoContent>
              </InfoItem>
              <InfoItem>
                <InfoLabel>
                  <ComputerIcon />
                  프로젝트
                </InfoLabel>
                <InfoContent>특화 프로젝트</InfoContent>
              </InfoItem>
              <InfoItem>
                <InfoLabel>
                  <StyleIcon />
                  프로젝트 트랙
                </InfoLabel>
                <InfoContent>빅데이터</InfoContent>
              </InfoItem>
              <InfoItem>
                <InfoLabel>
                  <FlagIcon />팀 생성자
                </InfoLabel>
                <InfoContent>조원빈</InfoContent>
              </InfoItem>
            </InfoList>
          </Section>
          <Section>
            <SubHead>소개</SubHead>
            <Introduction>
              환상의 호흡으로 프로젝트 진행해 보고 싶습니다. 백엔드는 ...
              프론트는 ... 이런 식으로 개발 진행하려고 합니다.
            </Introduction>
          </Section>
          <Section>
            <SubHead>계획 중인 기술 스택</SubHead>
            <TechStackList>
              {techStacks.map((techStack, index) => (
                <TeamTechStack key={index} techStackName={techStack} />
              ))}
            </TechStackList>
          </Section>
        </Contents>
        <Aside>
          <SubHead>팀원 모집 현황</SubHead>
          <MemberList>
            <MemberItem>
              <ProfileImgWrapper>
                <ProfileImg
                  src="/images/projects/sample-student_profile-img1.jpeg"
                  alt="샘플 프로필 이미지"
                />
              </ProfileImgWrapper>
              <MemberInfo>
                <MemberName>
                  <MemberLink to="/">조원빈</MemberLink>
                  <FlagIcon />
                </MemberName>
                <SsafyInfo>백엔드 (Front-end)</SsafyInfo>
                <SsafyInfo>Java Track</SsafyInfo>
              </MemberInfo>
            </MemberItem>
            <MemberItem>
              <ProfileImgWrapper>
                <ProfileImg
                  src="/images/projects/sample-student_profile-img3.jpeg"
                  alt="샘플 프로필 이미지"
                />
              </ProfileImgWrapper>
              <MemberInfo>
                <MemberName>
                  <MemberLink to="/">손영배</MemberLink>
                </MemberName>
                <SsafyInfo>백엔드 (Back-end)</SsafyInfo>
                <SsafyInfo>Python Track</SsafyInfo>
              </MemberInfo>
            </MemberItem>
            <MemberItem>
              <ProfileImgWrapper>
                <ProfileImg
                  src="/images/projects/sample-student_profile-img4.jpeg"
                  alt="샘플 프로필 이미지"
                />
              </ProfileImgWrapper>
              <MemberInfo>
                <MemberName>
                  <MemberLink to="/">이정훈</MemberLink>
                </MemberName>
                <SsafyInfo>백엔드 (Back-end)</SsafyInfo>
                <SsafyInfo>Java Track</SsafyInfo>
              </MemberInfo>
            </MemberItem>
            <MemberItem>
              <ProfileImgWrapper>
                <ProfileImg
                  src="/images/projects/sample-student_profile-img5.jpeg"
                  alt="샘플 프로필 이미지"
                />
              </ProfileImgWrapper>
              <MemberInfo>
                <MemberName>
                  <MemberLink to="/">박정환</MemberLink>
                </MemberName>
                <SsafyInfo>프론트엔드 (Front-end)</SsafyInfo>
                <SsafyInfo>Java Track</SsafyInfo>
              </MemberInfo>
            </MemberItem>
          </MemberList>
          <MembersStatus>
            <HeadcountList>
              <HeadcountItem>
                <HeadcountLabel>
                  <GroupsIcon />
                  Total
                </HeadcountLabel>
                <HeadcountContent>
                  <span>4명</span>/<span>6명</span>
                </HeadcountContent>
                <RecruitStatusTag isSufficent={false} />
              </HeadcountItem>
              <HeadcountItem>
                <HeadcountLabel>
                  <WebIcon />
                  Front-end
                </HeadcountLabel>
                <HeadcountContent>
                  <span>1명</span>/<span>3명</span>
                </HeadcountContent>
                <RecruitStatusTag isSufficent={false} />
              </HeadcountItem>
              <HeadcountItem>
                <HeadcountLabel>
                  <StorageIcon />
                  Back-end
                </HeadcountLabel>
                <HeadcountContent>
                  <span>3명</span>/<span>3명</span>
                </HeadcountContent>
                <RecruitStatusTag isSufficent={true} />
              </HeadcountItem>
            </HeadcountList>
          </MembersStatus>
          <JobDoughnutChart frontendHeadcount={1} backendHeadcount={3} />
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

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
`;

const Notice = styled.h1`
  max-width: 640px;
  font-size: 28px;
  font-weight: 600;
  line-height: 1.8;
  color: #263647;

  @media (max-width: 1199px) {
    font-size: 26px;
  }
  @media (max-width: 991px) {
    font-size: 24px;
  }
  @media (max-width: 767px) {
    font-size: 20px;
    line-height: 1.5;
  }
  @media (max-width: 575px) {
    font-size: 18px;
  }
`;

const TeamName = styled.h2`
  margin-right: 20px;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.6;
  color: #98a8b9;

  @media (max-width: 1199px) {
    font-size: 18px;
  }
  @media (max-width: 991px) {
    font-size: 16px;
  }
  @media (max-width: 767px) {
    font-size: 15px;
  }
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
  font-size: 18px;
  font-weight: 500;
  line-height: 1.6;
  color: #263747;

  @media (max-width: 767px) {
    font-size: 16px;
  }
  @media (max-width: 575px) {
    font-size: 15px;
  }
`;

const MemberList = styled.ul`
  box-sizing: border-box;
`;

const MemberItem = styled.li`
  display: flex;
  flex-direction: row;
  min-width: 340px;
  margin-bottom: 12px;
  padding: 14px;
  border: 1px solid #d7e2eb;
  border-radius: 4px;
  box-sizing: border-box;
  transition: all 0.08s ease-in-out;

  &:hover {
    border-color: #84c0f8;

    & a {
      text-decoration: underline;
      color: #3396f4;
    }
  }

  @media (max-width: 575px) {
    min-width: 100%;
  }
`;

const ApplicationButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto 0;
  padding: 10px 24px;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #3396f4;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  color: #fff;
  transition: all 0.08s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #2878c3;
  }

  & svg {
    margin-right: 8px;
    font-size: 22px;
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

const ProfileImgWrapper = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 24px;
  border-radius: 4px;

  @media (max-width: 991px) {
    width: 48px;
    height: 48px;
  }
  @media (max-width: 575px) {
    width: 46px;
    height: 46px;
  }
`;

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 4px;
  object-fit: fill;

  @media (max-width: 991px) {
    width: 48px;
    height: 48px;
  }
  @media (max-width: 575px) {
    width: 46px;
    height: 46px;
  }
`;

const MemberInfo = styled.div`
  margin: auto 0;
`;

const MemberName = styled.h5`
  display: flex;
  align-items: center;

  & svg {
    height: 18px;
    color: #3396f4;
  }

  @media (max-width: 767px) {
    & svg {
      height: 17px;
    }
  }
  @media (max-width: 575px) {
    & svg {
      height: 15px;
    }
  }
`;

const MemberLink = styled(Link)`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.6;
  color: #263647;
  transition: all 0.08s ease-in-out;
  cursor: pointer;

  @media (max-width: 767px) {
    font-size: 15px;
  }
  @media (max-width: 575px) {
    font-size: 14px;
  }
`;

const SsafyInfo = styled.span`
  font-size: 14px;
  line-height: 1.5;
  color: #5f7f90;

  &:first-of-type {
    &::after {
      content: '';
      display: inline-block;
      width: 1px;
      height: 10px;
      margin: 0 6px;
      background-color: #5f7f90;
    }
  }

  @media (max-width: 767px) {
    font-size: 13px;
  }
`;

const MembersStatus = styled.li`
  display: flex;
  flex-direction: column;
  min-width: 340px;
  margin-bottom: 12px;
  padding: 14px;
  border: 1px solid #d7e2eb;
  border-radius: 4px;
  box-sizing: border-box;
  transition: all 0.08s ease-in-out;

  @media (max-width: 575px) {
    min-width: 100%;
  }
`;

const HeadcountList = styled.ul`
  width: 100%;
`;

const HeadcountItem = styled.li`
  overflow: hidden;
  display: flex;
  width: 100%;
  border-bottom: 1px solid #d7e2eb;
  box-sizing: border-box;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const HeadcountLabel = styled.label`
  overflow: hidden;
  display: flex;
  align-items: center;
  min-width: 100px;
  padding: 6px 0;
  font-size: 14px;
  line-height: 1.5;
  color: #263647;
  text-overflow: ellipsis;
  white-space: nowrap;

  svg {
    margin-right: 8px;
    font-size: 18px;
    line-height: 1.5;
  }

  @media (max-width: 767px) {
    font-size: 14px;

    svg {
      font-size: 16px;
    }
  }
`;

const HeadcountContent = styled.p`
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 6px 16px;
  font-size: 14px;
  line-height: 1.5;
  color: #5f7f90;
  text-overflow: ellipsis;
  white-space: nowrap;

  & span {
    &:nth-of-type(1) {
      margin-right: 6px;
    }
    &:nth-of-type(2) {
      margin-left: 6px;
    }
  }
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
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const InfoLabel = styled.label`
  overflow: hidden;
  display: flex;
  align-items: center;
  min-width: 125px;
  padding: 8px 0 8px 8px;
  font-size: 15px;
  line-height: 1.5;
  color: #263647;
  text-overflow: ellipsis;
  white-space: nowrap;

  svg {
    margin-right: 8px;
    font-size: 18px;
    line-height: 1.5;
  }

  @media (max-width: 767px) {
    font-size: 14px;

    svg {
      font-size: 17px;
    }
  }
`;

const InfoContent = styled.p`
  overflow: hidden;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 16px;
  font-size: 15px;
  line-height: 1.5;
  color: #5f7f90;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 767px) {
    font-size: 14px;
  }
`;

const Introduction = styled.p`
  font-size: 15px;
  line-height: 1.5;
  color: #5f7f90;

  @media (max-width: 767px) {
    font-size: 14px;
  }
`;

const TechStackList = styled.ul``;

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

const TeamImg = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 4px;
  object-fit: fill;

  @media (max-width: 1199px) {
    width: 80px;
    height: 80px;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

export default TeamInformationSection;
