import { useState, useEffect, useCallback } from 'react';

import { Link, Redirect, useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { sendTeamOffer as sendTeamOfferSagaStart } from '../../redux/modules/auth';

import styled from '@emotion/styled';

import ShareIcon from '@mui/icons-material/Share';
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
import SendIcon from '@mui/icons-material/Send';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';

import { TeamOfferRequestType } from '../../types/teamTypes';

import useUserId from '../../hooks/reduxHooks/useUserId';
import useUserInfo from '../../hooks/reactQueryHooks/useUserInfo';

import UserLabel from './UserLabel';
import UserTechStackTag from './UserTechStackTag';
import SkeletonUserInfoSection from './skeletonUI/SkeletonUserInfoSection';
import ErrorSection from '../common/ErrorSection';

type Params = {
  userId: string;
};

interface MessageTextFieldProps {
  warning: string;
}

interface OfferProjectLabelProps {
  warning: string;
}

const UserInfoSection: React.FC = () => {
  const [offerMessage, setOfferMessage] = useState<string>('');
  const [offerProject, setOfferProject] = useState<string>('');
  const [openOfferDialog, setOpenOfferDialog] = useState<boolean>(false);
  const [onMessageWarning, setOnMessageWarning] = useState<boolean>(false);
  const [onProjectWarning, setOnProjectWarning] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { userId } = useParams<Params>();
  const myUserId = useUserId();
  const { isLoading, userData, isError, errorMessage } = useUserInfo(userId);

  useEffect(() => {
    if (isError) {
      document.title = `${errorMessage} | ?????? ?????????`;
    } else {
      document.title = `${
        userData?.userName ? userData.userName : ''
      } ????????? ????????? | ?????? ?????????`;
    }
  }, [userData, isError, errorMessage]);

  useEffect(() => {
    if (offerProject !== '') {
      setOnProjectWarning(false);
    }
  }, [offerProject]);

  useEffect(() => {
    if (offerMessage !== '') {
      setOnMessageWarning(false);
    }
  }, [offerMessage]);

  const sendTeamOffer = useCallback(
    (teamOffer: TeamOfferRequestType) => {
      dispatch(sendTeamOfferSagaStart(teamOffer));
    },
    [dispatch],
  );

  const handleSharingButtonClick = () => {
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '?????? ?????????(SSAFY MATE)',
        description: `${
          userData !== undefined ? userData.userName : ''
        } ????????? ?????? ??????`,
        imageUrl: `${
          userData !== undefined
            ? userData.profileImgUrl
            : 'https://avatars.githubusercontent.com/u/97279195?s=200&v=4'
        }`,
        link: {
          webUrl: `${process.env.REACT_APP_CLIENT_URL}${
            userData !== undefined ? `/users/${userData.userId}` : ''
          }`,
          mobileWebUrl: `${process.env.REACT_APP_CLIENT_URL}${
            userData !== undefined ? `/users/${userData.userId}` : ''
          }`,
        },
      },
      buttons: [
        {
          title: `${
            userData !== undefined ? userData.userName : ''
          } ????????? ?????? ????????????`,
          link: {
            webUrl: `${process.env.REACT_APP_CLIENT_URL}${
              userData !== undefined ? `/users/${userData.userId}` : ''
            }`,
            mobileWebUrl: `${process.env.REACT_APP_CLIENT_URL}${
              userData !== undefined ? `/users/${userData.userId}` : ''
            }`,
          },
        },
      ],
    });
  };

  const handleRequestButtonClick = () => {
    setOpenOfferDialog(true);
  };

  const handleCancelButtonClick = () => {
    setOnProjectWarning(false);
    setOnMessageWarning(false);
    setOpenOfferDialog(false);
    setOfferMessage('');
    setOfferProject('');
  };

  const handleOfferProjectChange = (event: SelectChangeEvent) => {
    setOfferProject(event.target.value as string);
  };

  const handleOfferMessageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setOfferMessage(event.target.value);
  };

  const handleSendButtonClick = () => {
    if (offerProject === '' && offerMessage === '') {
      alert('???????????? ????????? ?????? ?????? ???????????? ??????????????????');
      setOnProjectWarning(true);
      setOnMessageWarning(true);
      return;
    } else if (offerProject === '') {
      alert('??????????????? ??????????????????.');
      setOnProjectWarning(true);
      return;
    } else if (offerMessage === '') {
      alert('?????? ?????? ???????????? ??????????????????.');
      setOnMessageWarning(true);
      return;
    }

    const teamOffer = {
      project: offerProject,
      userId: parseInt(userId),
      message: offerMessage,
    };

    if (onProjectWarning) {
      setOnProjectWarning(false);
    }

    if (onMessageWarning) {
      setOnMessageWarning(false);
    }

    setOpenOfferDialog(false);
    sendTeamOffer(teamOffer);
    setOfferMessage('');
  };

  if (isError) {
    return <ErrorSection errorMessage={errorMessage} />;
  }

  if (myUserId === null) {
    return <Redirect to="/users/sign_in" />;
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
                <ProfileImg
                  src={
                    userData.profileImgUrl !== null
                      ? userData.profileImgUrl
                      : '/images/common/default-profile-img.png'
                  }
                  alt={`${userData.userName}?????? ????????? ?????????`}
                />
              </ProfileImgWrapper>
              <NameWrapper>
                <Row>
                  <UserName>
                    <UserLabel
                      userId={userData.userId}
                      userName={userData.userName}
                      offProfileMenu={true}
                    />
                  </UserName>
                  <Tooltip title="???????????? ????????????" arrow>
                    <SharingButton onClick={handleSharingButtonClick}>
                      <ShareIcon />
                    </SharingButton>
                  </Tooltip>
                </Row>
                <Row>
                  <SsafyInfo>
                    <span>{userData.campus}</span>
                    <span>{userData.ssafyTrack}</span>
                  </SsafyInfo>
                </Row>
              </NameWrapper>
            </TitleBox>
            <ButtonBox>
              {parseInt(userId) !== myUserId && (
                <RequestButton onClick={handleRequestButtonClick}>
                  <VolunteerActivismIcon />
                  <span>??? ?????? ????????????</span>
                </RequestButton>
              )}
              <DirectMessageLink
                to={`/chatting/${myUserId}?roomId=${
                  myUserId < parseInt(userId) ? myUserId : userId
                }-${
                  myUserId > parseInt(userId) ? myUserId : userId
                }&userId=${userId}`}
              >
                <SendIcon />
                <span>????????? ?????????</span>
              </DirectMessageLink>
            </ButtonBox>
          </HeadContainer>
          <BodyContainer>
            <Section>
              <SubHead>?????? ??????</SubHead>
              <InfoList>
                <InfoRow>
                  <InfoItem>
                    <InfoLabel>
                      <SchoolIcon />
                      ?????????
                    </InfoLabel>
                    <InfoContent>{userData.campus}</InfoContent>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>
                      <IntegrationInstructionsIcon />
                      ?????? ??????
                    </InfoLabel>
                    <InfoContent>{userData.ssafyTrack}</InfoContent>
                  </InfoItem>
                </InfoRow>
                <InfoRow>
                  <InfoItem>
                    <InfoLabel>
                      <WorkIcon />
                      ?????? ?????? 1
                    </InfoLabel>
                    <InfoContent>{userData.job1}</InfoContent>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>
                      <WorkOutlineIcon />
                      ?????? ?????? 2
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
                      {userData.projects[0].project} ??????
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
                      {userData.projects[0].project} ???
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
                      {userData.projects[1].project} ??????
                    </InfoLabel>
                    <InfoContent>
                      {userData.projects[1].projectTrack}
                    </InfoContent>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>
                      <GroupsIcon />
                      {userData.projects[1].project} ???
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
                      {userData.projects[2].project} ??????
                    </InfoLabel>
                    <InfoContent>-</InfoContent>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>
                      <GroupsIcon />
                      {userData.projects[2].project} ???
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
                      ?????? ????????? ??? ??????
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
              <SubHead>??????</SubHead>
              <Introduction>
                {userData.selfIntroduction
                  .split('\n')
                  .map((selfIntroduction, index) => (
                    <span key={index}>
                      {selfIntroduction}
                      <br />
                    </span>
                  ))}
              </Introduction>
            </Section>
            <Section>
              <SubHead>?????? ??????</SubHead>
              <TechStackList>
                {userData.techStacks.map((techStack) => (
                  <UserTechStackTag
                    key={techStack.techStackId}
                    techStackImgUrl={techStack.techStackImgUrl}
                    techStackName={techStack.techStackName}
                    techStackLevel={techStack.techStackLevel}
                  />
                ))}
              </TechStackList>
            </Section>
          </BodyContainer>
          <Dialog
            open={openOfferDialog}
            onClose={handleCancelButtonClick}
            fullWidth={true}
            maxWidth={'sm'}
          >
            <RequestDialogTitle>??? ?????? ????????????</RequestDialogTitle>
            <OfferPorjectInputWrapper fullWidth>
              <OfferProjectLabel
                id="offer-project-select-label"
                warning={onProjectWarning.toString()}
              >
                ???????????? ??????
              </OfferProjectLabel>
              <Select
                labelId="offer-project-select-label"
                id="offer-project-select"
                label="offer-project"
                value={offerProject}
                onChange={handleOfferProjectChange}
              >
                <OfferProjectItem value="?????? ????????????">
                  ?????? ????????????
                </OfferProjectItem>
                <OfferProjectItem value="?????? ????????????">
                  ?????? ????????????
                </OfferProjectItem>
                <OfferProjectItem value="?????? ????????????">
                  ?????? ????????????
                </OfferProjectItem>
              </Select>
            </OfferPorjectInputWrapper>
            <DialogContent>
              <MessageTextField
                autoFocus
                margin="dense"
                id="offer-message"
                label="?????? ?????? ???????????? ??????????????????."
                type="text"
                variant="standard"
                onChange={handleOfferMessageChange}
                warning={onMessageWarning.toString()}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <DialogButton onClick={handleCancelButtonClick}>
                ??????
              </DialogButton>
              <DialogButton onClick={handleSendButtonClick}>
                ?????????
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
    margin-bottom: 90px;
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
    transition: color 0.08s ease-in-out;

    &:hover {
      color: #3396f4;
    }

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

const SharingButton = styled.button`
  display: block;
  margin-left: 12px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  & svg {
    font-size: 22px;
    color: #98a8b9;
    transition: color 0.08s ease-in-out;
  }

  &:hover {
    & svg {
      color: #3396f4;
    }
  }

  @media (max-width: 991px) {
    & svg {
      font-size: 20px;
    }
  }
  @media (max-width: 767px) {
    margin-left: 10px;

    & svg {
      font-size: 18px;
    }
  }
  @media (max-width: 575px) {
    margin-left: 8px;
  }
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
  margin: auto 12px auto 0;
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

const DirectMessageLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto 0;
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

const UserName = styled.h1``;

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
  line-height: 1.6;
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

const DialogButton = styled(Button)`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  color: #3396f4;
  font-size: 13px;
`;

const OfferPorjectInputWrapper = styled(FormControl)`
  padding: 20px 24px 0 20px;
  box-sizing: border-box;

  & select {
    padding: 20px 24px;
  }
`;

const OfferProjectLabel = styled(InputLabel)<OfferProjectLabelProps>`
  padding: 21px 26px;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-size: 16px;

  color: ${(props) => (props.warning === 'true' ? '#f44336' : '#3396f4')};
`;

const OfferProjectItem = styled(MenuItem)`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-size: 16px;
  color: #263647;

  @media (max-width: 575px) {
    font-size: 14px;
  }
`;

export default UserInfoSection;
