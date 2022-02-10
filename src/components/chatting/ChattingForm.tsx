import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';

import dayjs from 'dayjs';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import axios from 'axios';

import { axiosInstance } from '../../utils/axios';
import { fetcherGet } from '../../utils/fetcher';
import useSocket from '../../hooks/useSocket';
import useToken from '../../hooks/useToken';
import useTextArea from '../../hooks/useTextArea';
import useUserIdName from '../../hooks/useUserIdName';
import ChatRoomList from './ChatRoomList';
import {
  MessageType,
  ChatRoomType,
  ChatLogResponseType,
} from '../../types/messageTypes';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Scrollbars } from 'react-custom-scrollbars-2';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import SendIcon from '@mui/icons-material/Send';
import CommentIcon from '@mui/icons-material/Comment';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const socketUrl = 'https://i6a402.p.ssafy.io:3100';
const PAGE_SIZE = 20;
const drawerWidth = 250;

const ChattingForm: React.FC = () => {
  const location = useLocation();
  const myToken = useToken();
  const myData = useUserIdName();

  const myId = myData[0];
  const myName = myData[1];

  const param = new URLSearchParams(location.search);
  const roomId: string | null = param.get('roomId');
  const userId: string | null = param.get('userId');
  const userName: string | null = param.get('userName');

  const [chatSections, setChatSections] = useState<MessageType[]>([]);
  const [open, setOpen] = useState(false);

  const [socket] = useSocket(myId as number);
  const [chat, onChangeChat, setChat] = useTextArea('');

  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const chatRoomMessageRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<Scrollbars>(null);

  // 채팅 목록 불러오기
  const {
    data: roomData,
    error: roomError,
    mutate: mutateRoom,
  } = useSWR<ChatRoomType[]>(`/api/chats/rooms/${myId}`, (url) =>
    fetcherGet(url, myToken),
  );

  useEffect(() => {
    setChatSections([]);
  }, [roomId]);

  const getKey = (pageIndex: number, previousPageData: ChatLogResponseType) => {
    // 끝에 도달
    if (previousPageData && !previousPageData.contentList) return null;

    // 첫 페이지, `previousPageData`가 없음
    if (pageIndex === 0) return `/api/chats/logs/${roomId}?nextCursor=0`;

    // API의 엔드포인트에 커서 추가
    return `api/chats/logs/${roomId}?nextCursor=${previousPageData.nextCursor}`;
  };

  // 대화 내역 불러오기
  const {
    data: chatData,
    mutate: mutateChat,
    setSize,
  } = useSWRInfinite<ChatLogResponseType>(
    getKey,
    (url) => fetcherGet(url, myToken),
    {
      onSuccess(data) {
        if (data?.length === 1) {
          setTimeout(() => {
            scrollbarRef.current?.scrollToBottom();
          }, 100);
        }
      },
    },
  );

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (chat?.trim()) {
        const params: MessageType = {
          userName: myName as string,
          roomId: roomId as string,
          content: chat,
          senderId: Number(myId),
          sentTime: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS'),
          id: 0,
        };

        mutateChat((prevChatData) => {
          prevChatData?.[0].contentList.unshift(params);
          return prevChatData;
        }, false).then(() => {
          setChat('');
          mutateChat();
          mutateRoom();
          if (scrollbarRef.current) scrollbarRef.current.scrollToBottom();
        });

        axios.post(`${socketUrl}/api/chats`, params);
      }
    },
    [chat, roomId, myId, userId, setChat],
  );

  const onMessage = useCallback(
    (data: MessageType) => {
      if (data.senderId === Number(userId) && Number(myId) !== Number(userId)) {
        mutateChat((chatData) => {
          chatData?.[0].contentList.unshift(data);
          return chatData;
        }, false).then(() => {
          mutateChat();
          mutateRoom();
          if (scrollbarRef.current) {
            if (
              scrollbarRef.current.getScrollHeight() <
              scrollbarRef.current.getClientHeight() +
                scrollbarRef.current.getScrollTop() +
                150
            ) {
              setTimeout(() => {
                scrollbarRef.current?.scrollToBottom();
              }, 100);
            }
          }
        });
      }
    },
    [chatData, scrollbarRef, userId, myId, mutateChat],
  );

  useEffect(() => {
    socket?.on('message', onMessage);
    return () => {
      socket?.off('message', onMessage);
    };
  }, [socket, onMessage]);

  const handleMessageSendKeyPress = (event: React.KeyboardEvent) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      if (!event.shiftKey) {
        event.preventDefault();
        onSubmit(event);
      }
    }
  };

  // infinity scroll checking
  const isEmpty = chatData?.[chatData.length - 1]?.contentList?.length === 0;
  const isReachingEnd =
    isEmpty ||
    (chatData &&
      chatData[chatData.length - 1]?.contentList?.length < PAGE_SIZE);

  const onScroll = useCallback(
    (values) => {
      if (values.scrollTop === 0 && !isReachingEnd && !isEmpty) {
        setSize((size) => size + 1).then(() => {
          // 스크롤 위치 유지 : 현재 스크롤 높이 - 스크롤바의 높이
          setTimeout(() => {
            scrollbarRef.current?.scrollTop(
              scrollbarRef.current?.getScrollHeight() - values.scrollHeight,
            );
          }, 50);
        });
      }
    },
    [scrollbarRef, isReachingEnd, isEmpty, setSize],
  );

  const clustByDate = <T extends MessageType>(chatList: T[]) => {
    const sections: { [key: string]: T[] } = {};
    chatList.forEach((chat) => {
      const monthDate = dayjs(chat.sentTime).format('YYYY-MM-DD');
      if (Array.isArray(sections[monthDate])) {
        sections[monthDate].push(chat);
      } else {
        sections[monthDate] = [chat];
      }
    });
    return sections;
  };

  const reverseChatList = () => {
    let list: any = [];
    if (chatData) {
      chatData.forEach((chat) => {
        list.push(chat.contentList);
      });
    }
    setChatSections(([] as MessageType[]).concat(...list).reverse());
  };

  useEffect(() => {
    reverseChatList();
  }, [chatData]);

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

  return (
    <ChatContianer>
      <ChatRoomListSidebar>
        <ChatRoomListWrapper>
          {roomData?.map((room: ChatRoomType, index: number) => (
            <ChatRoomList
              myId={Number(myId)}
              roomId={room.roomId}
              userId={room.userId}
              userName={room.userName}
              profileImgUrl={room.profileImgUrl}
              content={room.content}
              sentTime={room.sentTime}
              userEmail={room.userEmail}
            />
          ))}
          <SwipeableDrawer
            sx={{
              'width': drawerWidth,
              'flexShrink': 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
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
              {roomData?.map((room: ChatRoomType) => (
                <ListItem button key={room.roomId}>
                  <NavLink
                    to={`/chatting/${Number(myId)}?roomId=${
                      room.roomId
                    }&userId=${room.userId}&userName=${room.userName}@${
                      room.userEmail.split('@')[0]
                    }`}
                  >
                    <div css={listItemCss}>
                      <img src={room.profileImgUrl} />
                      <span>{`${room.userName}@${
                        room.userEmail.split('@')[0]
                      }`}</span>
                    </div>
                  </NavLink>
                </ListItem>
              ))}
            </List>
          </SwipeableDrawer>
        </ChatRoomListWrapper>
      </ChatRoomListSidebar>
      <ChatRoomSection>
        <SwipeableDrawer
          sx={{
            'width': drawerWidth,
            'flexShrink': 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
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
            {roomData?.map((room: ChatRoomType) => (
              <ListItem
                button
                key={room.roomId}
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <NavLink
                  to={`/chatting/${Number(myId)}?roomId=${room.roomId}&userId=${
                    room.userId
                  }&userName=${room.userName}@${room.userEmail.split('@')[0]}`}
                >
                  <div css={listItemCss}>
                    <img src={room.profileImgUrl} />
                    <span>{`${room.userName}@${
                      room.userEmail.split('@')[0]
                    }`}</span>
                  </div>
                </NavLink>
              </ListItem>
            ))}
          </List>
        </SwipeableDrawer>
        {!roomId ? (
          <ChatRoomEmpty>
            <ChatRoomEmptyContentWrapper>
              <span>대화할 상대를 선택해주세요.</span>
              <Button
                variant="contained"
                css={chatListButtonCss}
                onClick={handleDrawerOpen}
              >
                <MailOutlineIcon css={{ padding: '5px' }} />
                채팅 목록
              </Button>
            </ChatRoomEmptyContentWrapper>
          </ChatRoomEmpty>
        ) : (
          <ChatRoomWrapper>
            <ChatRoomMessageWrapper>
              <ChatRoomUserNameBar>
                <ChatRoomHeaderProfile className="userName">
                  <img></img>
                  <div className="userName">
                    <span>{userName}</span>
                  </div>
                </ChatRoomHeaderProfile>
                <IconButton
                  css={listIcon}
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                >
                  <CommentIcon fontSize="large" />
                </IconButton>
              </ChatRoomUserNameBar>
              <Scrollbars autoHide ref={scrollbarRef} onScrollFrame={onScroll}>
                <ChatRoomMessageList ref={chatRoomMessageRef}>
                  <MessageWrapper>
                    {chatSections && chatSections.length > 0
                      ? chatSections.map((message, index) => {
                          if (message.senderId === Number(myId)) {
                            return (
                              <MessageBoxWrapper key={index}>
                                <MessageBoxRightContent>
                                  <MessageTimeBox>
                                    <div className="message_date">
                                      {dayjs(message.sentTime).format(
                                        'YYYY.MM.DD HH:mm',
                                      )}
                                    </div>
                                  </MessageTimeBox>
                                  <p>{message.content}</p>
                                </MessageBoxRightContent>
                              </MessageBoxWrapper>
                            );
                          } else {
                            return (
                              <MessageBoxWrapper>
                                <MessageBoxLeftContent key={index}>
                                  <img></img>
                                  <p>{message.content}</p>
                                  <MessageTimeBox>
                                    <div className="message_date">
                                      {dayjs(message.sentTime).format(
                                        'YYYY.MM.DD HH:mm',
                                      )}
                                    </div>
                                  </MessageTimeBox>
                                </MessageBoxLeftContent>
                              </MessageBoxWrapper>
                            );
                          }
                        })
                      : null}
                  </MessageWrapper>
                </ChatRoomMessageList>
              </Scrollbars>
            </ChatRoomMessageWrapper>
            <ChatTypingWrapper>
              <TextareaAutosize
                css={ChatTypingTextarea}
                ref={messageInputRef}
                maxRows={3}
                minRows={1}
                value={chat}
                onKeyPress={handleMessageSendKeyPress}
                onChange={onChangeChat}
                placeholder="메시지를 입력해주세요"
              />
              <button onClick={onSubmit}>
                <SendIcon css={SendButton}></SendIcon>
              </button>
            </ChatTypingWrapper>
          </ChatRoomWrapper>
        )}
      </ChatRoomSection>
    </ChatContianer>
  );
};

const DrawerHeader = styled.div`
  display: flex,
  align-items: center,
  justify-content: flex-end,
`;

const ChatContianer = styled.div`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  height: calc(100vh - 46px);
  background-color: #ffffff;
`;

const ChatRoomListSidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 100%;
  border-left: 1px solid #dfdfdf;
  box-sizing: border-box;
  background-color: #fff;

  @media (max-width: 575px) {
    display: flex;
    width: 100%;
    display: none;
  }
`;

const ChatRoomListWrapper = styled.ul`
  overflow-x: hidden;
  box-sizing: border-box;

  @media (max-width: 575px) {
    display: flex;
    width: 100%;
    display: none;
  }
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

  @media (max-width: 575px) {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
`;

const ChatRoomEmpty = styled.div`
  align-items: center;
  flex-direction: column;
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
  font-size: 18px;

  & span {
    color: #383838;
    padding: 20px;
  }
`;

const chatListButtonCss = css`
  display: none;
  font-size: 15px;

  @media (max-width: 575px) {
    display: flex;
  }
`;

const listItemCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  & img {
    width: 40px;
    height: 40px;
    margin-right: 8px;
    border: 1px solid #b4b4b4;
    border-radius: 50%;
  }

  & span {
    overflow-x: hidden;
    font-size: 16px;
    font-weight: 500;
    color: #6d6d6d;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const ChatRoomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ChatRoomMessageWrapper = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;
  flex: 1 1 0px;
  flex-direction: column;
  overflow: hidden;
`;

const ChatRoomUserNameBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  min-height: 80px;
  padding: 0 16px;
  border-bottom: 1px solid #dfdfdf;
  box-sizing: border-box;
`;

const listIcon = css`
  display: none;
  color: inherit;

  @media (max-width: 575px) {
    display: flex;
  }
`;

const ChatRoomHeaderProfile = styled.div`
  display: flex;
  align-items: center;

  & img {
    width: 40px;
    height: 40px;
    min-height: 40px;
    min-width: 40px;
    margin-right: 12px;
    border: 1px solid #eaebef;
    border-radius: 50%;
    background-color: #eaebef;
  }

  & .userName {
    display: inline-flex;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    color: #6d6d6d;
  }
`;

const ChatRoomMessageList = styled.div`
  overflow: hidden auto;
  padding: 0px 20px;
`;

const MessageWrapper = styled.div`
  contain: content;
`;

const MessageBoxWrapper = styled.div`
  margin-top: 15px;
`;

const MessageBoxLeftContent = styled.div`
  display: flex;
  justify-content: start;
  padding: 4px;
  contain: content;

  & p {
    display: inline-flex;
    max-width: 364px;
    margin: 0px;
    padding: 10px 14px;
    border-radius: 2px 10px 10px 10px;
    background-color: #eaebef;
    line-height: 150%;
    color: #000;
    white-space: pre-wrap;
    word-break: break-all;
  }

  & img {
    width: 36px;
    height: 36px;
    min-height: 36px;
    min-width: 36px;
    margin-right: 8px;
    border: 1px solid #f9f9f9;
    border-radius: 50%;
    background-color: #eaebef;
  }
`;

const MessageBoxRightContent = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 4px;
  contain: content;

  & p {
    display: inline-flex;
    max-width: 364px;
    margin: 0px;
    padding: 10px 14px;
    border-radius: 10px 2px 10px 10px;
    background-color: #3396f4;
    line-height: 150%;
    color: #fff;
    white-space: pre-wrap;
    word-break: break-all;
  }
`;

const MessageTimeBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0px 4px;
  align-items: flex-end;

  .message_date {
    font-size: 12px;
    line-height: 150%;
    color: #868b94;
    letter-spacing: -0.02em;
  }
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

  button {
    outline: none;
    border: none;
    background-color: #eaebef;
  }
`;

const SendButton = css`
  color: #3396f4;
  cursor: pointer;
`;

const ChatTypingTextarea = css`
  overflow: auto;
  overflow-wrap: break-word;
  width: 100%;
  padding: 10px;
  resize: none;
  border: none;
  outline: none;
  line-height: 150%;
  background-color: #eaebef;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';

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

export default ChattingForm;
