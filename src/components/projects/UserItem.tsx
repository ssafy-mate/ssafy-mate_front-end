import { useState } from 'react';

import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import WorkIcon from '@mui/icons-material/Work';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ConstructionIcon from '@mui/icons-material/Construction';
import GitHubIcon from '@mui/icons-material/GitHub';

import { TechStack } from '../../types/commonTypes';

import UserLabel from '../user/UserLabel';

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
  const [openRequestDialog, setOpenRequestDialog] = useState(false);

  const handleOpenRequestDialog = () => {
    setOpenRequestDialog(true);
  };

  const handleCloseRequestDialog = () => {
    setOpenRequestDialog(false);
  };

  return (
    <Item className={belongToTeam ? 'belong' : ''}>
      <ItemHeader>
        <ProfileImgWrapper>
          <ProfileImg
            src={
              profileImgUrl !== null
                ? profileImgUrl
                : '/images/assets/basic-profile-img.png'
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
        {!belongToTeam && (
          <RequestButton onClick={handleOpenRequestDialog}>
            팀 합류 요청
          </RequestButton>
        )}
        <ProfileLink to={`/users/${userId}`}>프로필 보기</ProfileLink>
      </ItemFooter>
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
          <DialogButton onClick={handleCloseRequestDialog}>취소</DialogButton>
          <DialogButton onClick={handleCloseRequestDialog}>보내기</DialogButton>
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

const UserName = styled.h2`
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

export default UserItem;
