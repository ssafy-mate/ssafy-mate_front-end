import styled from '@emotion/styled';
import React, { useState } from 'react';
import { ChatRoomTypeProps } from '../../types/messageTypes';

const ChatRoomList: React.FC<ChatRoomTypeProps> = ({
  roomId,
  userId,
  userName,
  profileImgUrl,
  content,
  sentTime,
}) => {
  const [roomInfo, setRoomInfo] = useState<ChatRoomTypeProps>({
    roomId: roomId,
    userId: userId,
    userName: userName,
    profileImgUrl: profileImgUrl,
    content: content,
    sentTime: sentTime,
  });

  return (
    <>
      <ChatListItem>
        <ChatListItemWrapper>
          <ProfileWrapper>
            <img></img>
          </ProfileWrapper>
          <ContentWrapper>
            <TitleWrapper>
              <TitleSenderName>{userName}</TitleSenderName>
              <TitleSubText>
                <span>22.01.25</span>
              </TitleSubText>
            </TitleWrapper>
            <DescriptionWrapper>
              <DescriptionContent>{content}</DescriptionContent>
            </DescriptionWrapper>
          </ContentWrapper>
        </ChatListItemWrapper>
      </ChatListItem>
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

const ChatListItemWrapper = styled.a`
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
    display: flex;
    width: 100%;
    display: none;
  }
`;

const ContentWrapper = styled.div`
  overflow: hidden;
  width: 100%;

  @media (max-width: 575px) {
    display: flex;
    width: 100%;
    display: none;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: 575px) {
    display: flex;
    width: 100%;
    display: none;
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
