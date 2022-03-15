import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import IconButton from '@mui/material/IconButton';

import { OtherUserInfoType } from '../../types/messageTypes';

interface ChatProfileProps {
  otherUser: OtherUserInfoType | undefined;
  handleDrawerOpen: MouseEventHandler<HTMLButtonElement>;
}

const ChatProfilebar: React.FC<ChatProfileProps> = ({
  otherUser,
  handleDrawerOpen,
}) => {
  return (
    <ChatRoomUserNameBar>
      <ChatRoomHeaderProfile className="user-name">
        <Avatar
          src={
            otherUser?.profileImgUrl !== null
              ? otherUser?.profileImgUrl
              : '/images/assets/basic-profile-img.png'
          }
          className="profile-avatar"
        />
        <ProfileLink to={`/users/${otherUser?.userId}`}>
          <div className="user-name">
            <span className="user-name__name">{otherUser?.userName}</span>
            <span className="user-name__email">
              @{otherUser?.userEmail.split('@')[0]}
            </span>
          </div>
        </ProfileLink>
      </ChatRoomHeaderProfile>
      <ButtonBox>
        <Tooltip title={`${otherUser?.userName}님의 프로필`} arrow>
          <ProfileIconLink to={`/users/${otherUser?.userId}`}>
            <AccountBoxIcon />
          </ProfileIconLink>
        </Tooltip>
        <Tooltip title="채팅 목록" arrow>
          <ChatRoomListButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            <ForumOutlinedIcon />
          </ChatRoomListButton>
        </Tooltip>
      </ButtonBox>
    </ChatRoomUserNameBar>
  );
};

const ChatRoomUserNameBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  min-height: 64px;
  padding: 0 20px;
  border-bottom: 1px solid #dfdfdf;
  box-sizing: border-box;

  @media (max-width: 767px) {
    height: 62px;
    min-height: 62px;
    padding: 0 16px;
  }
`;

const ProfileLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  cursor: pointer;

  &:hover {
    & .user-name__name {
      color: #3396f4;
      text-decoration: underline;
    }
  }

  & .user-name {
    & span {
      font-size: 16px;
      font-weight: 500;
      transition: color 0.08s ease-in-out;
    }
  }

  & .user-name {
    &.user-name__name {
      color: #263747;
    }

    & .user-name__email {
      color: #868b94;
    }
  }

  & .user-icon {
    color: #868b94;
  }

  @media (max-width: 767px) {
    & .user-name {
      & span {
        font-size: 15px;
        font-weight: 500;
        color: #263747;
      }
    }
  }
`;

const ProfileIconLink = styled(Link)`
  & svg {
    font-size: 28px;
    color: #263747;
    transition: color 0.08s ease-in-out;
  }

  &:hover {
    & svg {
      color: #3396f4;
    }
  }
`;

const ChatRoomHeaderProfile = styled.div`
  display: flex;
  align-items: center;

  & .profile-avatar {
    margin-right: 10px;
  }

  @media (max-width: 767px) {
    & .profile-avatar {
      width: 36px;
      height: 36px;
    }
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChatRoomListButton = styled(IconButton)`
  display: none;
  padding: 0;
  margin-left: 8px;

  & svg {
    font-size: 28px;
    color: #263747;
    transition: color 0.08s ease-in-out;

    &:hover {
      color: #3396f4;
    }
  }

  @media (max-width: 767px) {
    display: flex;
  }
`;

export default ChatProfilebar;
