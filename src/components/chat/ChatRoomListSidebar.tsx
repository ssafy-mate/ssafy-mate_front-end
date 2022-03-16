import { useEffect, useState } from 'react';

/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';

import { ChatRoomType } from '../../types/messageTypes';

import useUserId from '../../hooks/reduxHooks/useUserId';
import useSocket from '../../hooks/useSocket';

import ChatRoomItem from './ChatRoomItem';

interface RoomDataProps {
  roomData: ChatRoomType[];
}

const ChatRoomListSidebar: React.FC<RoomDataProps> = ({ roomData }) => {
  const [onlineList, setOnlineList] = useState<number[]>([]);

  const myUserId = useUserId();
  const [socket] = useSocket(Number(myUserId));

  useEffect(() => {
    socket?.on('onlineList', (data: number[]) => {
      setOnlineList(data);
    });
  }, [socket, onlineList]);

  return (
    <Sidebar>
      <ListWrapper>
        <ListHeader>
          <ForumOutlinedIcon />
          <h1>채팅 목록</h1>
        </ListHeader>
        {roomData?.map((room: ChatRoomType) => {
          const isOnline = onlineList.includes(room.userId);
          return (
            <ChatRoomItem
              key={room.roomId}
              myId={Number(myUserId)}
              roomId={room.roomId}
              userId={room.userId}
              userName={room.userName}
              profileImgUrl={room.profileImgUrl}
              content={room.content}
              sentTime={room.sentTime}
              userEmail={room.userEmail}
              isOnline={isOnline}
            />
          );
        })}
      </ListWrapper>
    </Sidebar>
  );
};

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 100%;
  border-left: 1px solid #dfdfdf;
  box-sizing: border-box;
  background-color: #fff;

  @media (max-width: 767px) {
    display: none;
    width: 100%;
  }
`;

const ListWrapper = styled.ul`
  overflow-x: hidden;
  box-sizing: border-box;

  @media (max-width: 767px) {
    display: none;
    width: 100%;
  }
`;

const ListHeader = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #dfdfdf;

  & svg {
    color: #263747;
    margin-right: 8px;
  }

  & h1 {
    font-size: 16px;
    font-weight: 500;
    color: #263747;
  }
`;

export default ChatRoomListSidebar;
