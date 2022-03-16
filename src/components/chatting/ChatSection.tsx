import { useCallback, useEffect, useRef, useState } from 'react';

import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

import { useDispatch } from 'react-redux';

import { useMediaQuery } from 'react-responsive';

import { Scrollbars } from 'react-custom-scrollbars-2';

import dayjs from 'dayjs';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import SendIcon from '@mui/icons-material/Send';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import {
  MessageType,
  ChatRoomType,
  OtherUserInfoType,
} from '../../types/messageTypes';

import { showSsafyMateAlert as showSsafyMateAlertSagaStart } from '../../redux/modules/alert';

import ChatService from '../../services/ChatService';

import useSocket from '../../hooks/useSocket';
import useTextArea from '../../hooks/useTextArea';
import useToken from '../../hooks/reduxHooks/useToken';
import useUserIdName from '../../hooks/reduxHooks/useUserIdName';
import useChatRoomList from '../../hooks/reactQueryHooks/useChatRoomList';
import useChatLog from '../../hooks/reactQueryHooks/useChatLog';
import useSendChat from '../../hooks/reactQueryHooks/useSendChat';

import ChatRoomListSidebar from './ChatRoomListSidebar';
import ChatMessageSection from './ChatMessageSection';
import ChatProfileHeaderbar from './ChatProfileHeaderbar';

const DRAWER_WIDTH = 250;

interface OnlineProps {
  isOnline: boolean;
}

const ChatSection: React.FC = () => {
  const [chatSections, setChatSections] = useState<MessageType[]>([]);
  const [otherUser, setOtherUser] = useState<OtherUserInfoType>();
  const [onlineList, setOnlineList] = useState<number[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const scrollbarRef = useRef<Scrollbars>(null);

  const dispatch = useDispatch();

  const location = useLocation();
  const myToken = useToken();

  const [myUserId, myUserName] = useUserIdName();
  const smallMedia = useMediaQuery({
    query: '(max-width: 575px)',
  });

  const [socket] = useSocket(myUserId as number);
  const [chat, onChangeChat, setChat] = useTextArea('');

  const param = new URLSearchParams(location.search);
  const roomId: string | null = param.get('roomId');
  const userId: string | null = param.get('userId');

  const { roomData: roomListData, refetch: roomRefetch } = useChatRoomList(
    myToken,
    Number(myUserId),
  );

  const {
    data: chatLogData,
    refetch: chatLogRefetch,
    fetchNextPage,
  } = useChatLog(myToken, roomId);

  const mutation = useSendChat(roomId, Number(myUserId), setChat, scrollbarRef);

  useEffect(() => {
    setChatSections([]);
    setChat('');
    handleScrollToBottom();
  }, [roomId]);

  useEffect(() => {
    if (userId !== null) {
      getChatUserInfo();
    }
  }, [userId]);

  useEffect(() => {
    reverseChatList();
  }, [chatLogData]);

  useEffect(() => {
    socket?.on('message', onMessage);
    return () => {
      socket?.off('message', onMessage);
    };
  }, [socket]);

  useEffect(() => {
    socket?.on('onlineList', (data: number[]) => {
      setOnlineList(data);
    });
  }, [socket, onlineList]);

  const showAlert = (alertShow: boolean, alertText: string) => {
    dispatch(
      showSsafyMateAlertSagaStart({
        show: alertShow,
        text: alertText,
      }),
    );
  };

  const getChatUserInfo = () => {
    ChatService.getChatUserInfo(userId as string)
      .then((response) => {
        setOtherUser(response.data);
      })
      .catch(() => {
        showAlert(true, '상대방 정보를 불러오지 못했습니다.');
      });
  };

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (chat !== '' && chat.trim() !== '') {
        const params: MessageType = {
          userName: myUserName as string,
          roomId: roomId as string,
          content: chat,
          senderId: Number(myUserId),
          sentTime: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS'),
          id: 0,
        };

        mutation.mutate(params);
      }
    },
    [chat, myUserName, roomId, myUserId, mutation],
  );

  const onMessage = useCallback(
    (data: MessageType) => {
      if (
        data.senderId === Number(userId) &&
        Number(myUserId) !== Number(userId)
      ) {
        roomRefetch();
        chatLogRefetch().then(() => {
          if (
            scrollbarRef.current !== null &&
            scrollbarRef.current.getScrollHeight() <
              scrollbarRef.current.getClientHeight() +
                scrollbarRef.current.getScrollTop() +
                150
          ) {
            setTimeout(() => {
              scrollbarRef.current?.scrollToBottom();
            }, 100);
          }
        });
      }
    },
    [userId, myUserId, roomRefetch, chatLogRefetch],
  );

  const handleMessageSendKeyPress = (event: React.KeyboardEvent) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      if (!event.shiftKey) {
        event.preventDefault();
        onSubmit(event);
      }
    }
  };

  const onScroll = useCallback(
    (values) => {
      if (values.scrollTop === 0) {
        fetchNextPage().then(() => {
          setTimeout(() => {
            if (scrollbarRef.current !== null) {
              scrollbarRef.current.scrollTop(
                scrollbarRef.current.getScrollHeight() - values.scrollHeight,
              );
            }
          }, 100);
        });
      }
    },
    [scrollbarRef, fetchNextPage],
  );

  const reverseChatList = () => {
    const list: any = [];

    if (chatLogData !== undefined) {
      chatLogData.forEach((chat) => {
        list.push(chat.data.contentList);
      });
    }
    setChatSections(([] as MessageType[]).concat(...list).reverse());
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleDrawer = (open: boolean) => (event: any) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpen(open);
  };

  const handleScrollToBottom = () => {
    if (scrollbarRef.current !== null) {
      setTimeout(() => {
        scrollbarRef.current?.scrollToBottom();
      }, 100);
    }
  };

  return (
    <Contianer>
      <ChatRoomListSidebar roomData={roomListData as ChatRoomType[]} />
      <ChatRoomSection>
        <SwipeableDrawer
          sx={{
            'width': DRAWER_WIDTH,
            'flexShrink': 0,
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="right"
          open={open}
          onOpen={toggleDrawer(true)}
          onClose={toggleDrawer(false)}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>
          <List>
            {roomListData !== undefined &&
              roomListData.map((room: ChatRoomType) => {
                const isOnline = onlineList.includes(room.userId);
                return (
                  <ListItem
                    button
                    key={room.roomId}
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                    sx={{ padding: '12px 16px 12px 16px' }}
                  >
                    <Link
                      to={`/chatting/${Number(myUserId)}?roomId=${
                        room.roomId
                      }&userId=${room.userId}`}
                    >
                      <div css={listItemCss}>
                        <Avatar
                          src={
                            room.profileImgUrl !== null
                              ? room.profileImgUrl
                              : '/images/common/default-profile-img.png'
                          }
                          sx={{ marginRight: '8px' }}
                        />
                        <OnlineWrraper>
                          <OnlineOutCircle>
                            <OnlineInCircle isOnline={isOnline} />
                          </OnlineOutCircle>
                        </OnlineWrraper>
                        <div className="user-name">
                          <span className="user-name__name">
                            {room.userName}
                          </span>
                          <span className="user-name__email">
                            @{room.userEmail.split('@')[0]}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </ListItem>
                );
              })}
          </List>
        </SwipeableDrawer>
        {roomId === null ? (
          <ChatRoomEmpty>
            <ChatRoomEmptyContentWrapper>
              <ForumOutlinedIcon className="chat-icon" />
              <span>채팅할 상대를 선택해주세요.</span>
              <ChatListOpenButton onClick={handleDrawerOpen}>
                채팅 목록 열기
              </ChatListOpenButton>
            </ChatRoomEmptyContentWrapper>
          </ChatRoomEmpty>
        ) : (
          <ChatRoomWrapper>
            <ChatProfileHeaderbar
              otherUser={otherUser}
              handleDrawerOpen={handleDrawerOpen}
            />
            <Scrollbars autoHide ref={scrollbarRef} onScrollFrame={onScroll}>
              <ChatMessageSection
                chatSections={chatSections}
                myUserId={Number(myUserId)}
                otherUser={otherUser !== null ? otherUser : undefined}
                smallMedia={smallMedia}
              />
            </Scrollbars>
            <ChatTypingWrapper>
              <TextArea
                ref={messageInputRef}
                maxLength={300}
                value={chat}
                onKeyPress={handleMessageSendKeyPress}
                onChange={onChangeChat}
                placeholder="메시지를 입력해주세요"
              />
              <SendMessageButton onClick={onSubmit}>
                <SendIcon />
              </SendMessageButton>
            </ChatTypingWrapper>
          </ChatRoomWrapper>
        )}
      </ChatRoomSection>
    </Contianer>
  );
};

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  & svg {
    font-size: 32px;
    transition: color 0.08s ease-in-out;

    &:hover {
      color: #3396f4;
    }
  }
`;

const Contianer = styled.div`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  height: calc(100vh - 46px);
  background-color: #ffffff;
`;

const ChatRoomSection = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 700px;
  box-sizing: border-box;
  border-left: solid 1px #dfdfdf;
  border-right: solid 1px #dfdfdf;
  background-color: #fff;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const ChatRoomEmpty = styled.div`
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ChatRoomEmptyContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  & .chat-icon {
    font-size: 100px;
    color: #dcdee2;
  }
  & span {
    padding: 20px;
    font-size: 18px;
    color: #4d5159;
  }

  @media (max-width: 767px) {
    & .chat-icon {
      font-size: 90px;
    }
    & span {
      font-size: 16px;
    }
  }
`;

const ChatListOpenButton = styled.button`
  display: none;
  margin-top: 12px;
  padding: 10px 20px;
  outline: 0;
  border: none;
  border-radius: 4px;
  background-color: #3396f4;
  box-shadow: none;
  font-size: 15px;
  color: #fff;

  &:hover {
    background-color: #2878c3;
  }

  @media (max-width: 767px) {
    display: flex;
  }
`;

const OnlineWrraper = styled.div`
  position: relative;
  width: 1px;
  top: 16px;
  right: 24px;
`;

const OnlineOutCircle = styled.div`
  position: relative;
  width: 18px;
  height: 18px;
  z-index: 1;
  border-radius: 50%;
  background-color: #fff;
`;

const OnlineInCircle = styled.div<OnlineProps>`
  position: relative;
  top: 2px;
  left: 2px;
  width: 14px;
  height: 14px;
  z-index: 2;
  border-radius: 50%;
  background-color: ${(props) => (props.isOnline ? '#45c46d' : '#b6b6b6')};
`;

const ChatRoomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ChatTypingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  height: 85px;
  margin: 20px;
  padding: 0px 10px;
  border-radius: 10px;
  background-color: #eaebef;

  & button {
    outline: none;
    border: none;
    background-color: #eaebef;
  }

  @media (max-width: 767px) {
    margin: 12px 16px 8px 16px;
  }
`;

const listItemCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  & span {
    overflow: hidden;
    height: 18px;
    font-size: 14px;
    font-weight: 500;
    color: #263747;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & .user-name {
    & .user-name__email {
      color: #868b94;
    }
  }
`;

const SendMessageButton = styled.button`
  color: #3396f4;
  cursor: pointer;
`;

const TextArea = styled.textarea`
  overflow: auto;
  overflow-wrap: break-word;
  outline: none;
  width: 100%;
  padding: 10px;
  resize: none;
  border: none;
  background-color: #eaebef;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-size: 14px;
  line-height: 1.5;
  color: #263747;

  ::-webkit-scrollbar {
    opacity: 0;
    width: 6px;
    height: 7px;
    appearance: auto;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(51, 150, 244, 0.5);
  }
`;

export default ChatSection;
