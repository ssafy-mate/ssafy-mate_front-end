import { useState } from 'react';

import { NavLink } from 'react-router-dom';

import dayjs from 'dayjs';

import { ChatRoomTypeProps } from '../../types/messageTypes';

/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { Avatar } from '@mui/material';

interface OnlineProps {
  isOnline: boolean;
}

const ChatRoomItem: React.FC<ChatRoomTypeProps> = ({
  myId,
  roomId,
  userId,
  userName,
  userEmail,
  profileImgUrl,
  content,
  sentTime,
  isOnline,
}) => {
  const [params, setParams] = useState<string>(
    `?roomId=${roomId}&userId=${userId}`,
  );

  const checkActive = (match: any, location: any) => {
    if (!location) return false;
    const { search } = location;
    return search === params ? true : false;
  };

  return (
    <Item>
      <ChatLink
        key={roomId}
        exact={true}
        to={`/chatting/${myId}?roomId=${roomId}&userId=${userId}`}
        activeClassName="selected"
        isActive={checkActive}
      >
        <Wrapper>
          <ProfileImg>
            <Avatar
              src={
                profileImgUrl
                  ? profileImgUrl
                  : '/images/assets/basic-profile-img.png'
              }
            />
            <OnlineWrraper>
              <OnlineOutCircle>
                <OnlineInCircle isOnline={isOnline} />
              </OnlineOutCircle>
            </OnlineWrraper>
          </ProfileImg>
          <Content>
            <TitleWrapper>
              <TitleSenderName>{userName}</TitleSenderName>
              <TitleSubText>
                {sentTime ? (
                  <span>{dayjs(sentTime).format('YY.MM.DD. a hh:mm')}</span>
                ) : null}
              </TitleSubText>
            </TitleWrapper>
            <DescriptionWrapper>
              <Description>{content}</Description>
            </DescriptionWrapper>
          </Content>
        </Wrapper>
      </ChatLink>
    </Item>
  );
};

const Item = styled.li`
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 575px) {
    display: hidden;
  }
`;

const ChatLink = styled(NavLink)`
  display: block;
  background-color: #fff;
  transition: background-color 0.08s ease-in-out;

  &:hover {
    background-color: #e1e3e7;
  }

  &.selected {
    background-color: #e1e3e7;
  }
`;

const Wrapper = styled.div`
  display: flex;
  overflow: hidden;
  align-items: center;
  width: 100%;
  height: 72px;
  padding: 16px;
  box-sizing: border-box;
  border-bottom: 1px solid #dfdfdf;

  @media (max-width: 575px) {
    display: hidden;
  }
`;

const ProfileImg = styled.div`
  height: 40px;
  margin-right: 10px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  @media (max-width: 575px) {
    display: none;
    width: 100%;
  }
`;

const OnlineWrraper = styled.div`
  position: relative;
  top: -14px;
  right: -24px;
`;

const OnlineOutCircle = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  z-index: 1;
  border-radius: 50%;
  background-color: #fff;
`;

const OnlineInCircle = styled.div<OnlineProps>`
  position: relative;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  z-index: 2;
  border-radius: 50%;
  background-color: ${(props) => (props.isOnline ? '#45c46d' : '#b6b6b6')};
`;

const Content = styled.div`
  overflow: hidden;
  width: 100%;

  @media (max-width: 575px) {
    display: none;
    width: 100%;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: 575px) {
    display: none;
    width: 100%;
  }
`;

const TitleSenderName = styled.span`
  overflow-x: hidden;
  max-width: 70px;
  height: 20px;
  font-size: 14px;
  font-weight: 500;
  color: #263747;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 575px) {
    display: none;
    width: 100%;
  }
`;

const TitleSubText = styled.div`
  margin-left: 4px;
  font-size: 12px;
  color: #868b94;
  white-space: nowrap;
`;

const DescriptionWrapper = styled.div`
  overflow: hidden;
  width: 100%;
`;

const Description = styled.p`
  overflow: hidden;
  font-size: 13px;
  color: #4d5159;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default ChatRoomItem;
