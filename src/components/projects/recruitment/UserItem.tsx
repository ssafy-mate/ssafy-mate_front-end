import { useState, useEffect, useCallback } from 'react';

import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import WorkIcon from '@mui/icons-material/Work';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ConstructionIcon from '@mui/icons-material/Construction';
import GitHubIcon from '@mui/icons-material/GitHub';
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

import { TeamOfferRequestType } from '../../../types/teamTypes';
import { TechStack } from '../../../types/commonTypes';

import { sendTeamOffer as sendTeamOfferSagaStart } from '../../../redux/modules/auth';

import useUserId from '../../../hooks/reduxHooks/useUserId';

import UserLabel from '../../user/UserLabel';

interface UserItemProps {
  userId: number;
  userName: string;
  profileImgUrl: string | null;
  campus: string;
  projectTrack: string;
  ssafyTrack: string;
  techStacks: TechStack[];
  job1: string;
  job2: string | null;
  githubUrl: string | null;
  belongToTeam: boolean;
}

interface MessageTextFieldProps {
  warning: string;
}

interface OfferProjectLabelProps {
  warning: string;
}

const UserItem: React.FC<UserItemProps> = ({
  userId,
  userName,
  profileImgUrl,
  campus,
  projectTrack,
  ssafyTrack,
  techStacks,
  job1,
  job2,
  githubUrl,
  belongToTeam,
}) => {
  const [offerMessage, setOfferMessage] = useState<string>('');
  const [offerProject, setOfferProject] = useState<string>('');
  const [openOfferDialog, setOpenOfferDialog] = useState<boolean>(false);
  const [onMessageWarning, setOnMessageWarning] = useState<boolean>(false);
  const [onProjectWarning, setOnProjectWarning] = useState<boolean>(false);

  const dispatch = useDispatch();
  const myUserId = useUserId();

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

  const handleOpenOfferDialog = () => {
    setOpenOfferDialog(true);
  };

  const handleCloseOfferDialog = () => {
    setOnProjectWarning(false);
    setOnMessageWarning(false);
    setOpenOfferDialog(false);
    setOfferMessage('');
    setOfferProject('');
  };

  const handleChangeOfferProject = (event: SelectChangeEvent) => {
    setOfferProject(event.target.value as string);
  };

  const handleChangeOfferMessage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setOfferMessage(event.target.value);
  };

  const handleSendTeamOffer = () => {
    if (offerProject === '' && offerMessage === '') {
      alert('프로젝트 선택과 합류 요청 메시지를 입력해주세요');
      setOnProjectWarning(true);
      setOnMessageWarning(true);
      return;
    } else if (offerProject === '') {
      alert('프로젝트를 선택해주세요.');
      setOnProjectWarning(true);
      return;
    } else if (offerMessage === '') {
      alert('합류 요청 메시지를 입력해주세요.');
      setOnMessageWarning(true);
      return;
    }

    const teamOffer = {
      project: offerProject,
      userId,
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

  return (
    <Item className={belongToTeam ? 'belong' : ''}>
      <ItemHeader>
        <ProfileImgWrapper>
          <ProfileImg
            src={
              profileImgUrl !== null
                ? profileImgUrl
                : '/images/common/default-profile-img.png'
            }
            alt={`${profileImgUrl} 교육생 프로필 사진`}
          />
        </ProfileImgWrapper>
        <MainInfoList className={belongToTeam ? 'belong' : ''}>
          <UserName>
            <UserLabel userId={userId} userName={userName} />
          </UserName>
          <MainInfoItem>{campus}</MainInfoItem>
          <MainInfoItem>{ssafyTrack}</MainInfoItem>
        </MainInfoList>
      </ItemHeader>
      <ItemBody className={belongToTeam ? 'belong' : ''}>
        <SubInfoList>
          <SubInfoItem>
            <Label>
              <AssignmentTurnedInIcon />
              선택 트랙
            </Label>
            <Content>{projectTrack}</Content>
          </SubInfoItem>
          <SubInfoItem>
            <Label>
              <WorkIcon />
              희망 직무1
            </Label>
            <Content>{job1}</Content>
          </SubInfoItem>
          <SubInfoItem>
            <Label>
              <WorkOutlineIcon />
              희망 직무2
            </Label>
            <Content>{job2 !== null ? job2 : '-'}</Content>
          </SubInfoItem>
          <SubInfoItem>
            <Label>
              <ConstructionIcon />
              주요 기술
            </Label>
            <Content>
              {techStacks
                .map((techStack) => techStack.techStackName)
                .join(', ')}
            </Content>
          </SubInfoItem>
          <SubInfoItem>
            <Label>
              <GitHubIcon />
              GitHub
            </Label>
            <Content>
              {githubUrl !== null ? (
                <GitHubLink
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {githubUrl}
                </GitHubLink>
              ) : (
                '-'
              )}
            </Content>
          </SubInfoItem>
        </SubInfoList>
      </ItemBody>
      <ItemFooter className={belongToTeam ? 'belong' : ''}>
        {!belongToTeam && userId !== myUserId && (
          <RequestButton onClick={handleOpenOfferDialog}>
            팀 합류 요청
          </RequestButton>
        )}
        <ProfileLink to={`/users/${userId}`}>프로필 보기</ProfileLink>
      </ItemFooter>
      <Dialog
        open={openOfferDialog}
        onClose={handleCloseOfferDialog}
        fullWidth={true}
        maxWidth={'sm'}
      >
        <RequestDialogTitle>팀 합류 요청하기</RequestDialogTitle>
        <OfferPorjectInputWrapper fullWidth>
          <OfferProjectLabel
            id="offer-project-select-label"
            warning={onProjectWarning.toString()}
          >
            프로젝트 선택
          </OfferProjectLabel>
          <Select
            labelId="offer-project-select-label"
            id="offer-project-select"
            label="offer-project"
            value={offerProject}
            onChange={handleChangeOfferProject}
          >
            <OfferProjectItem value="공통 프로젝트">
              공통 프로젝트
            </OfferProjectItem>
            <OfferProjectItem value="특화 프로젝트">
              특화 프로젝트
            </OfferProjectItem>
            <OfferProjectItem value="자율 프로젝트">
              자율 프로젝트
            </OfferProjectItem>
          </Select>
        </OfferPorjectInputWrapper>
        <DialogContent>
          <MessageTextField
            autoFocus
            margin="dense"
            id="offer-message"
            label="합류 요청 메시지를 입력해주세요."
            type="text"
            variant="standard"
            onChange={handleChangeOfferMessage}
            warning={onMessageWarning.toString()}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <DialogButton onClick={handleCloseOfferDialog}>취소</DialogButton>
          <DialogButton onClick={handleSendTeamOffer}>보내기</DialogButton>
        </DialogActions>
      </Dialog>
    </Item>
  );
};

const Item = styled.li`
  display: flex;
  flex-direction: column;
  width: 373px;
  margin: 8px;
  padding: 16px;
  border: 1px solid #d7e2eb;
  border-radius: 4px;
  box-sizing: border-box;

  &.belong {
    background-color: #f3f3f3;
  }

  &:nth-of-type(1),
  &:nth-of-type(2),
  &:nth-of-type(3) {
    margin-top: 0;
  }

  @media (max-width: 1199px) {
    width: 49%;
    margin: 0 0 2% 0;

    &:nth-of-type(even) {
      margin-left: 2%;
    }
  }
  @media (max-width: 767px) {
    max-width: 100%;
    width: 100%;
    margin: 0 0 16px 0;

    &:nth-of-type(even) {
      margin-left: 0;
    }
  }
`;

const ItemHeader = styled.div`
  display: flex;
  padding-bottom: 16px;
  border-bottom: 1px solid #d7e2eb;
`;

const ProfileImgWrapper = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 24px;
  border-radius: 4px;

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

  @media (max-width: 575px) {
    width: 46px;
    height: 46px;
  }
`;

const MainInfoList = styled.div`
  margin: auto 0;

  &.belong {
    filter: grayscale(80%);
  }
`;

const UserName = styled.h3`
  & .user-label {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.6;
  }

  @media (max-width: 575px) {
    & .user-label {
      font-size: 15px;
    }
  }
`;

const MainInfoItem = styled.span`
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

  @media (max-width: 575px) {
    font-size: 13px;
  }
`;

const ItemBody = styled.div`
  width: 100%;
  margin-bottom: 16px;

  &.belong {
    filter: grayscale(80%);
  }
`;

const SubInfoList = styled.ul`
  width: 100%;
`;

const SubInfoItem = styled.li`
  overflow: hidden;
  display: flex;
  width: 100%;
  border-bottom: 1px solid #d7e2eb;
  box-sizing: border-box;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Label = styled.label`
  overflow: hidden;
  display: flex;
  align-items: center;
  min-width: 84px;
  padding: 6px 0;
  font-size: 14px;
  color: #5f7f90;
  line-height: 1.5;
  text-overflow: ellipsis;
  white-space: nowrap;

  svg {
    margin-right: 4px;
    font-size: 18px;
    line-height: 1.5;
  }

  @media (max-width: 575px) {
    font-size: 13px;

    svg {
      font-size: 16px;
    }
  }
`;

const Content = styled.p`
  overflow: hidden;
  width: 100%;
  padding: 6px 16px;
  font-size: 14px;
  color: #263747;
  line-height: 1.5;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 575px) {
    font-size: 13px;
  }
`;

const GitHubLink = styled.a`
  text-decoration: underline;
  transition: color 0.08s ease-in-out;

  &:hover {
    color: #3396f4;
  }
`;

const ItemFooter = styled.div`
  display: flex;
  justify-content: space-between;

  &.belong {
    filter: grayscale(80%);
  }
`;

const RequestButton = styled.button`
  width: 100%;
  margin-right: 12px;
  padding: 7px 0;
  border: none;
  border-radius: 4px;
  background-color: #3396f4;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.08s ease-in-out;

  &:hover {
    background-color: #2878c3;
  }

  @media (max-width: 575px) {
    font-size: 13px;
  }
`;

const ProfileLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 7px 0;
  border-radius: 4px;
  background-color: #e9ecf3;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  color: #263747;
  transition: background-color 0.08s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #d1d4da;
  }

  @media (max-width: 575px) {
    font-size: 13px;
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

export default UserItem;
