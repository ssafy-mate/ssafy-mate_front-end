import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  Suspense,
  lazy,
} from 'react';

import { useParams, Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { leaveTeam as leaveTeamSagaStart } from '../../redux/modules/myTeam';

import styled from '@emotion/styled';

import BorderColorIcon from '@mui/icons-material/BorderColor';
import ShareIcon from '@mui/icons-material/Share';
import FlagIcon from '@mui/icons-material/Flag';
import SchoolIcon from '@mui/icons-material/School';
import ComputerIcon from '@mui/icons-material/Computer';
import StyleIcon from '@mui/icons-material/Style';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';

import Swal from 'sweetalert2';

import { RoleType } from '../../types/teamTypes';
import { UserApplicationRequestType } from '../../types/authTypes';

import { sendUserApplication as sendUserApplicationSagaStart } from '../../redux/modules/auth';

import useTeamInfo from '../../hooks/reactQueryHooks/useTeamInfo';

import UserLabel from '../user/UserLabel';
import RecruitStatusBadge from '../projects/recruitment/RecruitStatusBadge';
import TeamTechStackTag from './TeamTechStackTag';
import TeamMemberItem from './TeamMemberItem';
import TeamMembersStatusBox from './TeamMembersStatus';
import JobChart from '../chart/JobChart';
import RecruitingStatusChart from '../chart/RecruitingStatusChart';
import SkeletonTeamInfoSection from './skeletonUI/SkeletonTeamInfoSection';
import ErrorSection from '../common/ErrorSection';

type Params = {
  teamId: string;
};

interface MessageTextFieldProps {
  warning: string;
}

interface OptionButtonProps {
  role: RoleType;
}

const Dialog = lazy(() => import('@mui/material/Dialog'));
const DialogActions = lazy(() => import('@mui/material/DialogActions'));
const DialogContent = lazy(() => import('@mui/material/DialogContent'));
const DialogTitle = lazy(() => import('@mui/material/DialogTitle'));
const Button = lazy(() => import('@mui/material/Button'));
const TextField = lazy(() => import('@mui/material/TextField'));

const TeamInfoSection: React.FC = () => {
  const [applicationMessage, setApplicationMessage] = useState<string>('');
  const [onMessageWarning, setOnMessageWarning] = useState<boolean>(false);
  const [openApplicationDialog, setOpenApplicationDialog] =
    useState<boolean>(false);

  const dispatch = useDispatch();
  const { teamId } = useParams<Params>();
  const { isLoading, teamData, role, isError, errorMessage } = useTeamInfo(
    parseInt(teamId),
  );

  useEffect(() => {
    if (isError) {
      document.title = `${errorMessage} | 싸피 메이트`;
    } else {
      document.title = `${
        teamData?.teamName ? teamData.teamName : ''
      } 팀 상세 정보 | 싸피 메이트`;
    }
  }, [teamData, isError, errorMessage]);

  useEffect(() => {
    if (applicationMessage !== '') {
      setOnMessageWarning(false);
    }
  }, [applicationMessage]);

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

  const sendUserApplication = useCallback(
    (userApplication: UserApplicationRequestType) => {
      dispatch(sendUserApplicationSagaStart(userApplication));
    },
    [dispatch],
  );

  const leaveTeam = useCallback(
    (teamId: number) => {
      dispatch(leaveTeamSagaStart(teamId));
    },
    [dispatch],
  );

  const sendKakaoSharingMessage = () => {
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '싸피 메이트(SSAFY MATE)',
        description: `${
          teamData !== undefined ? teamData.teamName : ''
        } 팀 상세 정보`,
        imageUrl: `${
          teamData !== undefined
            ? teamData.teamImgUrl
            : 'https://avatars.githubusercontent.com/u/97279195?s=200&v=4'
        }`,
        link: {
          webUrl: `${process.env.REACT_APP_CLIENT_URL}${
            teamData !== undefined ? `/teams/${teamData.teamId}` : ''
          }`,
          mobileWebUrl: `${process.env.REACT_APP_CLIENT_URL}${
            teamData !== undefined ? `/teams/${teamData.teamId}` : ''
          }`,
        },
      },
      buttons: [
        {
          title: `${
            teamData !== undefined ? teamData.teamName : ''
          } 팀 정보 보러가기`,
          link: {
            webUrl: `${process.env.REACT_APP_CLIENT_URL}${
              teamData !== undefined ? `/teams/${teamData.teamId}` : ''
            }`,
            mobileWebUrl: `${process.env.REACT_APP_CLIENT_URL}${
              teamData !== undefined ? `/teams/${teamData.teamId}` : ''
            }`,
          },
        },
      ],
    });
  };

  const handleOpenApplicationDialog = () => {
    setOpenApplicationDialog(true);
  };

  const handleCloseApplicationDialog = () => {
    setOnMessageWarning(false);
    setOpenApplicationDialog(false);
    setApplicationMessage('');
  };

  const handleMouseEnterOfferDialog = () => {
    import('@mui/material/Dialog');
    import('@mui/material/DialogActions');
    import('@mui/material/DialogContent');
    import('@mui/material/DialogTitle');
    import('@mui/material/Button');
    import('@mui/material/TextField');
  };

  const handleChangeApplicationMessage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setApplicationMessage(event.target.value);
  };

  const handleSendUserApplication = () => {
    if (applicationMessage === '') {
      alert('합류 지원 메시지를 입력해주세요.');
      setOnMessageWarning(true);
      return;
    }

    const userApplication = {
      teamId: parseInt(teamId),
      message: applicationMessage,
    };

    if (onMessageWarning) {
      setOnMessageWarning(false);
    }

    sendUserApplication(userApplication);
    setApplicationMessage('');
    setOpenApplicationDialog(false);
  };

  const handleClickLeaveButton = () => {
    Swal.fire({
      title: '정말 팀을 탈퇴하시겠습니까?',
      text: '탈퇴 처리 후 취소는 불가능합니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f5554a',
      cancelButtonColor: '#919aa1',
      confirmButtonText: '탈퇴하기',
      cancelButtonText: '취소하기',
    }).then((result) => {
      if (result.isConfirmed) {
        leaveTeam(parseInt(teamId));
      }
    });
  };

  const renderingOptionButton = (role: RoleType = 'outsider') => {
    switch (role) {
      case 'owner':
        return (
          <OptionLink to={`/teams/${teamId}/edit`}>
            <EditIcon />
            <span>팀 정보 수정하기</span>
          </OptionLink>
        );
      case 'member':
        return (
          <OptionButton onClick={handleClickLeaveButton} role={role}>
            <LogoutIcon />
            <span>팀 탈퇴하기</span>
          </OptionButton>
        );
      default:
        return (
          <OptionButton
            onClick={handleOpenApplicationDialog}
            onMouseEnter={handleMouseEnterOfferDialog}
            role={role}
          >
            <BorderColorIcon />
            <span>지원하기</span>
          </OptionButton>
        );
    }
  };

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
                  src={
                    teamData.teamImgUrl !== null
                      ? teamData.teamImgUrl
                      : '/images/common/default-team-logo.png'
                  }
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
              {isTotalSufficient && role === 'outsider'
                ? null
                : renderingOptionButton(role)}
              <SharingButton onClick={sendKakaoSharingMessage}>
                <ShareIcon />
                <span>공유하기</span>
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
                <Introduction>
                  {teamData.introduction
                    ?.split('\n')
                    .map((introduction, index) => (
                      <span key={index}>
                        {introduction}
                        <br />
                      </span>
                    ))}
                </Introduction>
              </Section>
              <Section>
                <SubHead>계획 중인 기술 스택</SubHead>
                <TechStackList>
                  {teamData.techStacks.map((techStack, index) => (
                    <TeamTechStackTag
                      key={index}
                      techStackName={techStack.techStackName}
                      techStackImgUrl={techStack.techStackImgUrl}
                    />
                  ))}
                </TechStackList>
              </Section>
            </Contents>
            <Aside>
              <SubHead>팀원 모집 현황</SubHead>
              <MemberList>
                {teamData.members.map((member, index) => (
                  <TeamMemberItem
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
          <Suspense fallback={null}>
            <Dialog
              open={openApplicationDialog}
              onClose={handleCloseApplicationDialog}
              fullWidth={true}
              maxWidth={'sm'}
            >
              <RequestDialogTitle>팀 합류 지원하기</RequestDialogTitle>
              <DialogContent>
                <MessageTextField
                  autoFocus
                  margin="dense"
                  id="application-message"
                  label="합류 지원 메시지를 입력해주세요."
                  type="text"
                  variant="standard"
                  onChange={handleChangeApplicationMessage}
                  warning={onMessageWarning.toString()}
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <DialogButton onClick={handleCloseApplicationDialog}>
                  취소
                </DialogButton>
                <DialogButton onClick={handleSendUserApplication}>
                  보내기
                </DialogButton>
              </DialogActions>
            </Dialog>
          </Suspense>
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
    margin-bottom: 90px;
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

const OptionLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto 0;
  padding: 10px 24px;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #ffc00a;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  color: #fff;
  transition: all 0.08s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #e5ac09;
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

const OptionButton = styled.button<OptionButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto 0;
  padding: 10px 24px;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: ${(props) =>
    props.role === 'member' ? '#f5554a' : '#3396f4'};
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  color: #fff;
  transition: all 0.08s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.role === 'member' ? '#dc4c42' : '#3396f4'};
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
  line-height: 1.6;
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

const DialogButton = styled(Button)`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  color: #3396f4;
  font-size: 13px;
`;

const MessageTextField = styled(TextField)<MessageTextFieldProps>`
  & label,
  & input {
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    font-size: 16px;
  }

  & label {
    color: ${(props) => (props.warning === 'true' ? '#f44336' : '#3396f4')};
  }

  @media (max-width: 575px) {
    & label,
    & input {
      font-size: 14px;
    }
  }
`;

export default TeamInfoSection;
