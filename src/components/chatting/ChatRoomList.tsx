import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import dayjs from 'dayjs';

import useSocket from '../../hooks/useSocket';
import { ChatRoomTypeProps } from '../../types/messageTypes';

import styled from '@emotion/styled';

const ChatRoomList: React.FC<ChatRoomTypeProps> = ({
  myId,
  roomId,
  userId,
  userName,
  profileImgUrl,
  content,
  sentTime,
  userEmail,
}) => {
  const [roomInfo, setRoomInfo] = useState<ChatRoomTypeProps>({
    myId: myId,
    roomId: roomId,
    userId: userId,
    userName: userName,
    profileImgUrl: profileImgUrl,
    content: content,
    sentTime: sentTime,
    userEmail: userEmail,
  });

  const email = userEmail.split('@');

  const [socket] = useSocket();
  const [onlineList, setOnlineList] = useState<number[]>([]);

  useEffect(() => {
    setOnlineList([]);
  }, [roomId]);

  // off 되는지 확인하기
  useEffect(() => {
    socket?.on('onlineList', (data: number[]) => {
      setOnlineList(data);
    });
    return () => {
      socket?.off('onlineList');
    };
  }, [socket]);

  return (
    <>
      <NavLink
        to={`/chatting/${myId}?roomId=${roomId}&userId=${userId}&userName=${userName}@${email[0]}`}
      >
        <ChatListItem>
          <ChatListItemWrapper>
            <ProfileWrapper>
              <img></img>
            </ProfileWrapper>
            <ContentWrapper>
              <TitleWrapper>
                <TitleSenderName>{userName}</TitleSenderName>
                <TitleSubText>
                  <span>{dayjs(sentTime).format('YYYY.MM.DD')}</span>
                </TitleSubText>
              </TitleWrapper>
              <DescriptionWrapper>
                <DescriptionContent>{content}</DescriptionContent>
              </DescriptionWrapper>
            </ContentWrapper>
          </ChatListItemWrapper>
        </ChatListItem>
      </NavLink>
    </>
  );
};

const ChatListItem = styled.li`
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 575px) {
    display: hidden;
  }
`;

const ChatListItemWrapper = styled.div`
  display: flex;
  overflow: hidden;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 0 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #dfdfdf;
  background-color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #ebebebce;
  }

  @media (max-width: 575px) {
    display: hidden;
  }
`;

const ProfileWrapper = styled.div`
  height: 40px;
  margin-right: 8px;

  img {
    width: 40px;
    height: 40px;
    border: 1px solid #b4b4b4;
    border-radius: 50%;
  }

  @media (max-width: 575px) {
    display: none;
    width: 100%;
  }
`;

const ContentWrapper = styled.div`
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
  font-weight: 600;
  color: #6d6d6d;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 575px) {
    display: flex;
    width: 100%;
    display: none;
  }
`;

const TitleSubText = styled.div`
  margin-left: 6px;
  font-size: 12px;
  color: #9b9ea3;
  white-space: nowrap;
`;

const DescriptionWrapper = styled.div`
  overflow: hidden;
  width: 100%;
`;

const DescriptionContent = styled.p`
  overflow: hidden;
  font-size: 14px;
  color: #3d3d3d;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default ChatRoomList;
