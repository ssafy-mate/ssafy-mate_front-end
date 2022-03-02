import { useEffect, useState } from 'react';

import useSWR from 'swr';

import ChatRoomItem from './ChatRoomItem';

/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';

import { ChatRoomType } from '../../types/messageTypes';
import { fetcherGet } from '../../utils/fetcher';
import useUserIdName from '../../hooks/useUserIdName';
import useToken from '../../hooks/useToken';
import useSocket from '../../hooks/useSocket';

const ChatRoomListSidebar = () => {
  const myToken = useToken();
  const myData = useUserIdName();
  const myUserId = myData[0];

  const [socket] = useSocket(myUserId as number);
  const [onlineList, setOnlineList] = useState<number[]>([]);

  useEffect(() => {
    socket?.on('onlineList', (data: number[]) => {
      setOnlineList(data);
    });
  }, [socket, onlineList]);

  const {
    data: roomData,
    error: roomError,
    mutate: mutateRoom,
  } = useSWR<ChatRoomType[]>(`/api/chats/rooms/${myUserId}`, (url) =>
    fetcherGet(url, myToken),
  );

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
