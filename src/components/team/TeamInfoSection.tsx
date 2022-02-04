import { useState, useEffect, useMemo, useCallback } from 'react';

import { Redirect, useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import BorderColorIcon from '@mui/icons-material/BorderColor';
import ShareIcon from '@mui/icons-material/Share';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FlagIcon from '@mui/icons-material/Flag';
import SchoolIcon from '@mui/icons-material/School';
import ComputerIcon from '@mui/icons-material/Computer';
import StyleIcon from '@mui/icons-material/Style';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { ApplicationRequestType } from '../../types/authTypes';

import { sendApplication as sendApplicationSagaStart } from '../../redux/modules/auth';

import useToken from '../../hooks/useToken';
import useTeamInfo from '../../hooks/useTeamInfo';

import UserLabel from '../user/UserLabel';
import RecruitStatusBadge from '../projects/RecruitStatusBadge';
import TeamTechStackTag from './TeamTechStackTag';
import MemberItem from './MemberItem';
import TeamMembersStatusBox from './TeamMembersStatus';
import JobChart from '../chart/JobChart';
import RecruitingStatusChart from '../chart/RecruitingStatusChart';
import SkeletonTeamInfoSection from './skeletonUI/SkeletonTeamInfoSection';
import ErrorSection from '../common/ErrorSection';

type Params = {
  teamId: string;
};

const TeamInfoSection: React.FC = () => {
  const [openApplicationDialog, setOpenApplicationDialog] = useState(false);
  const [applicationMessage, setApplicationMessage] = useState<string>('');

  const dispatch = useDispatch();

  const { teamId } = useParams<Params>();

  const token = useToken();

  const { isLoading, teamData, isError, errorMessage } = useTeamInfo(teamId);

  useEffect(() => {
    if (isError) {
      document.title = `${errorMessage} | 싸피 메이트`;
    } else {
      document.title = `${
        teamData?.teamName ? teamData.teamName : ''
      } 팀 상세 정보 | 싸피 메이트`;
    }
  }, [teamData, isError, errorMessage]);

  const sendApplication = useCallback(
    (application: ApplicationRequestType) => {
      dispatch(sendApplicationSagaStart(application));
    },
    [dispatch],
  );

  const handleOpenApplicationDialog = () => {
    setOpenApplicationDialog(true);
  };

  const handleCloseApplicationDialog = () => {
    setOpenApplicationDialog(false);
    setApplicationMessage('');
  };

  const handleChangeApplicationMessage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setApplicationMessage(event.target.value);
  };

  const handleSendApplication = () => {
    const application = {
      teamId: parseInt(teamId),
      message: applicationMessage,
    };

    sendApplication(application);
  };

  const isTotalSufficient = useMemo(
    () =>
      Number(teamData?.totalRecruitment) <= Number(teamData?.totalHeadcount)
        ? true
        : false,
    [teamData?.totalRecruitment, teamData?.totalHeadcount],
  );

  const isFrontendSufficient = useMemo(
    () =>
      Number(teamData?.frontendRecruitment) <=
      Number(teamData?.frontendHeadcount)
        ? true
        : false,
    [teamData?.frontendRecruitment, teamData?.frontendHeadcount],
  );

  const isBackendSufficient = useMemo(
    () =>
      Number(teamData?.backendRecruitment) <= Number(teamData?.backendHeadcount)
        ? true
        : false,
    [teamData?.backendRecruitment, teamData?.backendHeadcount],
  );

  if (token === null) {
    return <Redirect to="/users/sign_in" />;
  }

  if (isError) {
    return <ErrorSection errorMessage={errorMessage} />;
  }

  return (
    <>
      {isLoading || !teamData ? (
        <SkeletonTeamInfoSection />
      ) : (
        <Container>
          <HeadContainer>
            <TitleBox>
              <TeamImgWrapper>
                <TeamImg
                  src={teamData.teamImgUrl}
                  alt={`${teamData.teamName} 팀의 대표 이미지`}
                />
              </TeamImgWrapper>
              <TeamTitleWrapper>
                <Notice>{teamData.notice}</Notice>
                <Row>
                  <TeamName>{teamData.teamName}</TeamName>
                  <RecruitStatusBadge isRecruiting={!isTotalSufficient} />
                </Row>
              </TeamTitleWrapper>
            </TitleBox>
            <ButtonBox>
              <ApplicationButton onClick={handleOpenApplicationDialog}>
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
                    <InfoContent>{teamData.campus}</InfoContent>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>
                      <ComputerIcon />
                      프로젝트
                    </InfoLabel>
                    <InfoContent>{teamData.project}</InfoContent>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>
                      <StyleIcon />
                      프로젝트 트랙
                    </InfoLabel>
                    <InfoContent>{teamData.projectTrack}</InfoContent>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>
                      <FlagIcon />팀 생성자
                    </InfoLabel>
                    <InfoContent>
                      <UserLabel
                        userId={teamData.owner.userId}
                        userName={teamData.owner.userName}
                      />
                    </InfoContent>
                  </InfoItem>
                </InfoList>
              </Section>
              <Section>
                <SubHead>소개</SubHead>
                <Introduction>{teamData.introduction}</Introduction>
              </Section>
              <Section>
                <SubHead>계획 중인 기술 스택</SubHead>
                <TechStackList>
                  {teamData.techStacks.map((techStack, index) => (
                    <TeamTechStackTag
                      key={index}
                      techStackName={techStack.techStackName}
                    />
                  ))}
                </TechStackList>
              </Section>
            </Contents>
            <Aside>
              <SubHead>팀원 모집 현황</SubHead>
              <MemberList>
                {teamData.members.map((member, index) => (
                  <MemberItem
                    key={member.userId}
                    userId={member.userId}
                    userName={member.userName}
                    profileImgUrl={member.profileImgUrl}
                    ssafyTrack={member.ssafyTrack}
                    job1={member.job1}
                    isOwner={index === 0 ? true : false}
                  />
                ))}
              </MemberList>
              <TeamMembersStatusBox
                totalRecruitment={teamData.totalRecruitment}
                totalHeadcount={teamData.totalHeadcount}
                frontendRecruitment={teamData.frontendRecruitment}
                frontendHeadcount={teamData.frontendHeadcount}
                backendRecruitment={teamData.backendRecruitment}
                backendHeadcount={teamData.backendHeadcount}
                isTotalSufficient={isTotalSufficient}
                isFrontendSufficient={isFrontendSufficient}
                isBackendSufficient={isBackendSufficient}
              />
              <ChartsBox>
                <RecruitingStatusChart
                  totalRecruitment={teamData.totalRecruitment}
                  totalHeadcount={teamData.totalHeadcount}
                />
                <JobChart
                  frontendHeadcount={teamData.frontendHeadcount}
                  backendHeadcount={teamData.backendHeadcount}
                />
              </ChartsBox>
            </Aside>
          </BodyContainer>
          <Dialog
            open={openApplicationDialog}
            onClose={handleCloseApplicationDialog}
            fullWidth={true}
            maxWidth={'sm'}
          >
            <RequestDialogTitle>팀 합류 지원하기</RequestDialogTitle>
            <DialogContent>
              <MuiTextField
                autoFocus
                margin="dense"
                id="application-message"
                label="합류 지원 메시지를 입력해주세요."
                type="text"
                variant="standard"
                onChange={handleChangeApplicationMessage}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <DialogButton onClick={handleCloseApplicationDialog}>
                취소
              </DialogButton>
              <DialogButton onClick={handleSendApplication}>
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

  & .user-label {
    font-size: 15px;
    font-weight: 400;
    line-height: 1.5;
    color: #5f7f90;

    @media (max-width: 767px) {
      font-size: 14px;
    }
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

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const ChartsBox = styled.div`
  & div:not(:last-of-type) {
    margin-bottom: 12px;
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

export default TeamInfoSection;
