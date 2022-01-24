import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

import ShareIcon from '@mui/icons-material/Share';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SchoolIcon from '@mui/icons-material/School';
import ComputerIcon from '@mui/icons-material/Computer';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import WorkIcon from '@mui/icons-material/Work';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import GitHubIcon from '@mui/icons-material/GitHub';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import GroupsIcon from '@mui/icons-material/Groups';
import EmailIcon from '@mui/icons-material/Email';
import StorefrontIcon from '@mui/icons-material/Storefront';

import UserTechStackTag from './UserTechStackTag';

const UserInfoSection: React.FC = () => {
  const tempUserData = {
    userId: 1,
    userName: '박정환',
    userEmail: 'jeonghwan.dev@gmail.com',
    profileImgUrl: '/images/projects/sample-student_profile-img5.jpeg',
    campus: '서울',
    ssafyTrack: 'Java Track',
    selfIntroduction:
      '안녕하세요. 개발을 좋아하고 UI/UX 개선을 고민하는 프론트엔드 개발자 박정환입니다.',
    job1: '프론트엔드 (Front-end)',
    job2: '',
    projects: [
      {
        id: 1,
        name: '공통 프로젝트',
        projectTrack: '웹 기술',
        projectTeam: {
          teamId: 1,
          teamName: '데스파시토',
        },
      },
      {
        id: 2,
        name: '특화 프로젝트',
        projectTrack: '빅데이터',
        projectTeam: null,
      },
      {
        id: 3,
        name: '자율 프로젝트',
        projectTrack: '',
        projectTeam: null,
      },
    ],
    techStacks: [
      {
        id: 1,
        techStackName: 'JavaScript',
        techStackLevel: '상',
      },
      {
        id: 2,
        techStackName: 'TypeScript',
        techStackLevel: '중',
      },
      {
        id: 3,
        techStackName: 'React',
        techStackLevel: '중',
      },
      {
        id: 4,
        techStackName: 'Redux',
        techStackLevel: '하',
      },
      {
        id: 5,
        techStackName: 'Redux-Saga',
        techStackLevel: '하',
      },
      {
        id: 5,
        techStackName: 'React-Query',
        techStackLevel: '하',
      },
      {
        id: 6,
        techStackName: 'Emotion',
        techStackLevel: '중',
      },
    ],
    githubUrl: 'https://github.com/JeongHwan-dev',
    etcUrl: 'https://codingjhj.tistory.com/',
  };

  return (
    <Container>
      <HeadContainer>
        <TitleBox>
          <ProfileImgWrapper>
            <ProfileImg
              src={tempUserData.profileImgUrl}
              alt={`${tempUserData.userName}님의 프로필 이미지`}
            />
          </ProfileImgWrapper>
          <NameWrapper>
            <Name>{tempUserData.userName}</Name>
            <Row>
              <SsafyInfo>
                <span>{tempUserData.campus}</span>
                <span>{tempUserData.ssafyTrack}</span>
              </SsafyInfo>
            </Row>
          </NameWrapper>
        </TitleBox>
        <ButtonBox>
          <RequestButton>
            <VolunteerActivismIcon />
            <span>팀 합류 요청하기</span>
          </RequestButton>
          <SharingButton>
            <ShareIcon />
            <span>공유하기</span>
            <ArrowDropDownIcon />
          </SharingButton>
        </ButtonBox>
      </HeadContainer>
      <BodyContainer>
        <Section>
          <SubHead>요약 정보</SubHead>
          <InfoList>
            <InfoRow>
              <InfoItem>
                <InfoLabel>
                  <SchoolIcon />
                  캠퍼스
                </InfoLabel>
                <InfoContent>{tempUserData.campus}</InfoContent>
              </InfoItem>
              <InfoItem>
                <InfoLabel>
                  <IntegrationInstructionsIcon />
                  교육 트랙
                </InfoLabel>
                <InfoContent>{tempUserData.ssafyTrack}</InfoContent>
              </InfoItem>
            </InfoRow>
            <InfoRow>
              <InfoItem>
                <InfoLabel>
                  <WorkIcon />
                  희망 직무 1
                </InfoLabel>
                <InfoContent>{tempUserData.job1}</InfoContent>
              </InfoItem>
              <InfoItem>
                <InfoLabel>
                  <WorkOutlineIcon />
                  희망 직무 2
                </InfoLabel>
                <InfoContent>
                  {tempUserData.job2 ? tempUserData.job2 : '-'}
                </InfoContent>
              </InfoItem>
            </InfoRow>
            <InfoRow>
              <InfoItem>
                <InfoLabel>
                  <ComputerIcon />
                  {tempUserData.projects[0].name} 트랙
                </InfoLabel>
                <InfoContent>
                  {tempUserData.projects[0].projectTrack}
                </InfoContent>
              </InfoItem>
              <InfoItem>
                <InfoLabel>
                  <GroupsIcon />
                  {tempUserData.projects[0].name} 팀
                </InfoLabel>
                {tempUserData.projects[0].projectTeam ? (
                  <InnerLink
                    to={`/teams/${tempUserData.projects[0].projectTeam.teamId}`}
                  >
                    {tempUserData.projects[0].projectTeam.teamName}
                  </InnerLink>
                ) : (
                  <InfoContent>-</InfoContent>
                )}
              </InfoItem>
            </InfoRow>
            <InfoRow>
              <InfoItem>
                <InfoLabel>
                  <ComputerIcon />
                  {tempUserData.projects[1].name} 트랙
                </InfoLabel>
                <InfoContent>
                  {tempUserData.projects[1].projectTrack}
                </InfoContent>
              </InfoItem>
              <InfoItem>
                <InfoLabel>
                  <GroupsIcon />
                  {tempUserData.projects[1].name} 팀
                </InfoLabel>
                {tempUserData.projects[1].projectTeam ? (
                  <InnerLink
                    to={`/teams/${tempUserData.projects[1].projectTeam.teamId}`}
                  >
                    {tempUserData.projects[1].projectTeam.teamName}
                  </InnerLink>
                ) : (
                  <InfoContent>-</InfoContent>
                )}
              </InfoItem>
            </InfoRow>
            <InfoRow>
              <InfoItem>
                <InfoLabel>
                  <ComputerIcon />
                  {tempUserData.projects[2].name} 트랙
                </InfoLabel>
                <InfoContent>-</InfoContent>
              </InfoItem>
              <InfoItem>
                <InfoLabel>
                  <GroupsIcon />
                  {tempUserData.projects[2].name} 팀
                </InfoLabel>
                {tempUserData.projects[2].projectTeam ? (
                  <InnerLink
                    to={`/teams/${tempUserData.projects[2].projectTeam.teamId}`}
                  >
                    {tempUserData.projects[2].projectTeam.teamName}
                  </InnerLink>
                ) : (
                  <InfoContent>-</InfoContent>
                )}
              </InfoItem>
            </InfoRow>
            <InfoRow>
              <InfoItem>
                <InfoLabel>
                  <EmailIcon />
                  Email
                </InfoLabel>
                <OuterLink href={`mailto:${tempUserData.userEmail}`}>
                  {tempUserData.userEmail}
                </OuterLink>
              </InfoItem>
            </InfoRow>
            <InfoRow>
              <InfoItem>
                <InfoLabel>
                  <GitHubIcon />
                  GitHub
                </InfoLabel>
                {tempUserData.githubUrl ? (
                  <OuterLink
                    href={tempUserData.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {tempUserData.githubUrl}
                  </OuterLink>
                ) : (
                  <InfoContent>-</InfoContent>
                )}
              </InfoItem>
            </InfoRow>
            <InfoRow>
              <InfoItem>
                <InfoLabel>
                  <StorefrontIcon />
                  기술 블로그 및 기타
                </InfoLabel>
                {tempUserData.etcUrl ? (
                  <OuterLink
                    href={tempUserData.etcUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {tempUserData.etcUrl}
                  </OuterLink>
                ) : (
                  <InfoContent>-</InfoContent>
                )}
              </InfoItem>
            </InfoRow>
          </InfoList>
        </Section>
        <Section>
          <SubHead>소개</SubHead>
          <Introduction>{tempUserData.selfIntroduction}</Introduction>
        </Section>
        <Section>
          <SubHead>기술 스택</SubHead>
          <TechStackList>
            {tempUserData.techStacks.map((techStack) => (
              <UserTechStackTag
                key={techStack.id}
                techStackName={techStack.techStackName}
                techStackLevel={techStack.techStackLevel}
              />
            ))}
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

  @media (max-width: 1199px) {
    width: 80px;
    height: 80px;
  }
`;

const ProfileImg = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 4px;
  object-fit: fill;

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

const Name = styled.h1`
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

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const SsafyInfo = styled.h2`
  margin-right: 20px;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.6;
  color: #98a8b9;

  & span:first-of-type::after {
    content: '';
    display: inline-block;
    width: 1px;
    height: 15px;
    margin: 0 8px;
    background-color: #98a8b9;
  }

  @media (max-width: 1199px) {
    font-size: 18px;

    & span:first-of-type::after {
      height: 14px;
    }
  }
  @media (max-width: 991px) {
    font-size: 16px;

    & span:first-of-type::after {
      height: 13px;
    }
  }
  @media (max-width: 767px) {
    font-size: 15px;

    & span:first-of-type::after {
      height: 12px;
    }
  }
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
`;

const RequestButton = styled.button`
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

const InfoList = styled.ul`
  width: 100%;
`;

const InfoRow = styled.li`
  overflow: hidden;
  display: flex;
  width: 100%;
  border-top: 1px solid #d7e2eb;
  box-sizing: border-box;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 991px) {
    flex-direction: column;
    border: none;
  }
`;

const InfoLabel = styled.label`
  overflow: hidden;
  display: flex;
  align-items: center;
  min-width: 155px;
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
  @media (max-width: 575px) {
    min-width: 138px;
  }
`;

const InfoContent = styled.p`
  overflow: hidden;
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

const InnerLink = styled(Link)`
  overflow: hidden;
  width: 100%;
  padding: 8px 16px;
  font-size: 15px;
  line-height: 1.5;
  color: #5f7f90;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: all 0.08s ease-in-out;

  &:hover {
    color: #3396f4;
    text-decoration: underline;
  }

  @media (max-width: 767px) {
    font-size: 14px;
  }
`;

const OuterLink = styled.a`
  overflow: hidden;
  width: 100%;
  padding: 8px 16px;
  font-size: 15px;
  line-height: 1.5;
  color: #5f7f90;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    color: #3396f4;
    text-decoration: underline;
  }

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

const InfoItem = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: 991px) {
    border-top: 1px solid #d7e2eb;
  }
`;

export default UserInfoSection;
