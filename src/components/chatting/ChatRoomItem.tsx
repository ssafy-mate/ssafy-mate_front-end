import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import dayjs from 'dayjs';

import useSocket from '../../hooks/useSocket';
import { ChatRoomTypeProps } from '../../types/messageTypes';

import styled from '@emotion/styled';
import { Avatar } from '@mui/material';

const ChatRoomItem: React.FC<ChatRoomTypeProps> = ({
  myId,
  roomId,
  userId,
  userName,
  profileImgUrl,
  content,
  sentTime,
  userEmail,
}) => {
  const [onlineList, setOnlineList] = useState<number[]>([]);
  const [socket] = useSocket();

  useEffect(() => {
    setOnlineList([]);
  }, [roomId]);

  useEffect(() => {
    socket?.on('onlineList', (data: number[]) => {
      setOnlineList(data);
    });
    return () => {
      socket?.off('onlineList');
    };
  }, [socket]);

  return (
    <Link to={`/chatting/${myId}?roomId=${roomId}&userId=${userId}`}>
      <Item>
        <Wrapper>
          <ProfileImg>
            <Avatar src={profileImgUrl} />
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
      </Item>
    </Link>
  );
};

const Item = styled.li`
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 575px) {
    display: hidden;
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
  background-color: #fff;
  transition: background-color 0.08s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #e1e3e7;
  }

  @media (max-width: 575px) {
    display: hidden;
  }
`;

const ProfileImg = styled.div`
  height: 40px;
  margin-right: 8px;

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
  font-size: 13px;
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
