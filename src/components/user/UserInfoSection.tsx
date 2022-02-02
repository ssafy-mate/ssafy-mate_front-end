import { useState, useEffect } from 'react';

import { Link, useParams } from 'react-router-dom';

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
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import useUserInfo from '../../hooks/useUserInfo';

import UserLabel from './UserLabel';
import UserTechStackTag from './UserTechStackTag';
import SkeletonUserInfoSection from './skeletonUI/SkeletonUserInfoSection';
import ErrorSection from '../common/ErrorSection';

type Params = {
  userId: string;
};

const UserInfoSection: React.FC = () => {
  const [openRequestDialog, setOpenRequestDialog] = useState(false);
  const { userId } = useParams<Params>();
  const { isLoading, userData, isError, errorMessage } = useUserInfo(userId);

  useEffect(() => {
    if (isError) {
      document.title = `${errorMessage} | 싸피 메이트`;
    } else {
      document.title = `${
        userData?.userName ? userData.userName : ''
      } 교육생 프로필 | 싸피 메이트`;
    }
  }, [userData, isError, errorMessage]);

  const handleOpenRequestDialog = () => {
    setOpenRequestDialog(true);
  };

  const handleCloseRequestDialog = () => {
    setOpenRequestDialog(false);
  };

  if (isError) {
    return <ErrorSection errorMessage={errorMessage} />;
  }

  return (
    <>
      {isLoading || !userData ? (
        <SkeletonUserInfoSection />
      ) : (
        <Container>
          <HeadContainer>
            <TitleBox>
              <ProfileImgWrapper>
                {userData.profileImgUrl && (
                  <ProfileImg
                    src={userData.profileImgUrl}
                    alt={`${userData.userName}님의 프로필 이미지`}
                  />
                )}
              </ProfileImgWrapper>
              <NameWrapper>
                <UserLabel
                  userId={userData.userId}
                  userName={userData.userName}
                  offProfileMenu={true}
                />
                <Row>
                  <SsafyInfo>
                    <span>{userData.campus}</span>
                    <span>{userData.ssafyTrack}</span>
                  </SsafyInfo>
                </Row>
              </NameWrapper>
            </TitleBox>
            <ButtonBox>
              <RequestButton onClick={handleOpenRequestDialog}>
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
                    <InfoContent>{userData.campus}</InfoContent>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>
                      <IntegrationInstructionsIcon />
                      교육 트랙
                    </InfoLabel>
                    <InfoContent>{userData.ssafyTrack}</InfoContent>
                  </InfoItem>
                </InfoRow>
                <InfoRow>
                  <InfoItem>
                    <InfoLabel>
                      <WorkIcon />
                      희망 직무 1
                    </InfoLabel>
                    <InfoContent>{userData.job1}</InfoContent>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>
                      <WorkOutlineIcon />
                      희망 직무 2
                    </InfoLabel>
                    <InfoContent>
                      {userData.job2 !== null ? userData.job2 : '-'}
                    </InfoContent>
                  </InfoItem>
                </InfoRow>
                <InfoRow>
                  <InfoItem>
                    <InfoLabel>
                      <ComputerIcon />
                      {userData.projects[0].name} 트랙
                    </InfoLabel>
                    <InfoContent>
                      {userData.projects[0].projectTrack !== null
                        ? userData.projects[0].projectTrack
                        : '-'}
                    </InfoContent>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>
                      <GroupsIcon />
                      {userData.projects[0].name} 팀
                    </InfoLabel>
                    {userData.projects[0].projectTeam ? (
                      <InnerLink
                        to={`/teams/${userData.projects[0].projectTeam.teamId}`}
                      >
                        {userData.projects[0].projectTeam.teamName}
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
                      {userData.projects[1].name} 트랙
                    </InfoLabel>
                    <InfoContent>
                      {userData.projects[1].projectTrack}
                    </InfoContent>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>
                      <GroupsIcon />
                      {userData.projects[1].name} 팀
                    </InfoLabel>
                    {userData.projects[1].projectTeam ? (
                      <InnerLink
                        to={`/teams/${userData.projects[1].projectTeam.teamId}`}
                      >
                        {userData.projects[1].projectTeam.teamName}
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
                      {userData.projects[2].name} 트랙
                    </InfoLabel>
                    <InfoContent>-</InfoContent>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>
                      <GroupsIcon />
                      {userData.projects[2].name} 팀
                    </InfoLabel>
                    {userData.projects[2].projectTeam ? (
                      <InnerLink
                        to={`/teams/${userData.projects[2].projectTeam.teamId}`}
                      >
                        {userData.projects[2].projectTeam.teamName}
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
                    <OuterLink href={`mailto:${userData.userEmail}`}>
                      {userData.userEmail}
                    </OuterLink>
                  </InfoItem>
                </InfoRow>
                <InfoRow>
                  <InfoItem>
                    <InfoLabel>
                      <GitHubIcon />
                      GitHub
                    </InfoLabel>
                    {userData.githubUrl ? (
                      <OuterLink
                        href={userData.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {userData.githubUrl}
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
                    {userData.etcUrl ? (
                      <OuterLink
                        href={userData.etcUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {userData.etcUrl}
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
              <Introduction>{userData.selfIntroduction}</Introduction>
            </Section>
            <Section>
              <SubHead>기술 스택</SubHead>
              <TechStackList>
                {userData.techStacks.map((techStack) => (
                  <UserTechStackTag
                    key={techStack.id}
                    techStackName={techStack.techStackName}
                    techStackLevel={techStack.techStackLevel}
                  />
                ))}
              </TechStackList>
            </Section>
          </BodyContainer>
          <Dialog
            open={openRequestDialog}
            onClose={handleCloseRequestDialog}
            fullWidth={true}
            maxWidth={'sm'}
          >
            <RequestDialogTitle>팀 합류 요청하기</RequestDialogTitle>
            <DialogContent>
              <MuiTextField
                autoFocus
                margin="dense"
                id="request-message"
                label="합류 요청 메시지를 입력해주세요."
                type="text"
                variant="standard"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <DialogButton onClick={handleCloseRequestDialog}>
                취소
              </DialogButton>
              <DialogButton onClick={handleCloseRequestDialog}>
                보내기
              </DialogButton>
            </DialogActions>
          </Dialog>
        </Container>
      )}
    </>
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

  & .user-label {
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

const RequestDialogTitle = styled(DialogTitle)`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-size: 18px;
  color: #263747;

  @media (max-width: 575px) {
    font-size: 16px;
  }
`;

const MuiTextField = styled(TextField)`
  & label,
  & input {
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    font-size: 16px;
  }

  & input {
    color: #3396f4;
  }

  @media (max-width: 575px) {
    & label,
    & input {
      font-size: 14px;
    }
  }
`;

const DialogButton = styled(Button)`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  color: #3396f4;
  font-size: 13px;
`;

export default UserInfoSection;
