import { useCallback, useEffect, useRef, useState } from 'react';

import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

import { useMediaQuery } from 'react-responsive';

import { Scrollbars } from 'react-custom-scrollbars-2';

import axios from 'axios';

import dayjs from 'dayjs';

import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Avatar } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import IconButton from '@mui/material/IconButton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import SendIcon from '@mui/icons-material/Send';
import CommentIcon from '@mui/icons-material/Comment';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChatIcon from '@mui/icons-material/Chat';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import PersonIcon from '@mui/icons-material/Person';

import {
  MessageType,
  ChatRoomType,
  ChatLogResponseType,
  OtherUserInfoType,
} from '../../types/messageTypes';

import { axiosInstance } from '../../utils/axios';
import { fetcherGet } from '../../utils/fetcher';
import useSocket from '../../hooks/useSocket';
import useToken from '../../hooks/useToken';
import useTextArea from '../../hooks/useTextArea';
import useUserIdName from '../../hooks/useUserIdName';
import ChatRoomItem from './ChatRoomItem';

const PAGE_SIZE = 20;
const DRAWER_WIDTH = 250;

const ChattingForm: React.FC = () => {
  const location = useLocation();
  const myToken = useToken();
  const myData = useUserIdName();
  const smallMedia = useMediaQuery({
    query: '(max-width: 575px)',
  });

  const myUserId = myData[0];
  const myUserName = myData[1];

  const param = new URLSearchParams(location.search);
  const roomId: string | null = param.get('roomId');
  const userId: string | null = param.get('userId');

  const [chatSections, setChatSections] = useState<MessageType[]>([]);
  const [otherUser, setOtherUser] = useState<OtherUserInfoType>();
  const [open, setOpen] = useState(false);

  const [socket] = useSocket(myUserId as number);
  const [chat, onChangeChat, setChat] = useTextArea('');

  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const chatRoomMessageRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<Scrollbars>(null);

  const {
    data: roomData,
    error: roomError,
    mutate: mutateRoom,
  } = useSWR<ChatRoomType[]>(`/api/chats/rooms/${myUserId}`, (url) =>
    fetcherGet(url, myToken),
  );

  useEffect(() => {
    setChatSections([]);
  }, [roomId]);

  useEffect(() => {
    if (userId) userInfoGet();
  }, [userId]);

  const userInfoGet = () => {
    axiosInstance.get(`/api/chats/infos/${userId}`).then((response) => {
      setOtherUser(response.data);
    });
  };

  const getKey = (pageIndex: number, previousPageData: ChatLogResponseType) => {
    if (previousPageData && !previousPageData.contentList) {
      return null;
    }

    if (pageIndex === 0) {
      return `/api/chats/logs/${roomId}?nextCursor=0`;
    }

    return `api/chats/logs/${roomId}?nextCursor=${previousPageData.nextCursor}`;
  };

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
          userName: myUserName as string,
          roomId: roomId as string,
          content: chat,
          senderId: Number(myUserId),
          sentTime: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS'),
          id: 0,
        };

        mutateChat((prevChatData) => {
          prevChatData?.[0].contentList.unshift(params);
          return prevChatData;
        }, false).then(() => {
          setChat('');
          if (scrollbarRef.current) {
            setTimeout(() => {
              scrollbarRef?.current?.scrollToBottom();
            }, 100);
          }
        });

        axios
          .post(`${process.env.REACT_APP_SOCKET_URL}/api/chats`, params)
          .then(() => {
            mutateRoom();
            mutateChat().then(() => {
              if (scrollbarRef.current) {
                setTimeout(() => {
                  scrollbarRef?.current?.scrollToBottom();
                }, 50);
              }
            });
          });
      }
    },
    [chat, roomId, myUserId, userId, setChat],
  );

  const onMessage = useCallback(
    (data: MessageType) => {
      if (
        data.senderId === Number(userId) &&
        Number(myUserId) !== Number(userId)
      ) {
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
    [chatData, scrollbarRef, userId, myUserId, mutateChat],
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

  const isEmpty = chatData?.[chatData.length - 1]?.contentList?.length === 0;
  const isReachingEnd =
    isEmpty ||
    (chatData &&
      chatData[chatData.length - 1]?.contentList?.length < PAGE_SIZE);

  const onScroll = useCallback(
    (values) => {
      if (values.scrollTop === 0 && !isReachingEnd && !isEmpty) {
        setSize((size) => size + 1).then(() => {
          setTimeout(() => {
            scrollbarRef.current?.scrollTop(
              scrollbarRef.current?.getScrollHeight() - values.scrollHeight,
            );
          }, 100);
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
    <Contianer>
      <ChatRoomListSidebar>
        <ChatRoomListWrapper>
          <ChatRoomListHeader>
            <ChatIcon />
            <ChatRoomListHead>채팅 목록</ChatRoomListHead>
          </ChatRoomListHeader>
          {roomData?.map((room: ChatRoomType) => (
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
            />
          ))}
        </ChatRoomListWrapper>
      </ChatRoomListSidebar>
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
            {roomData?.map((room: ChatRoomType) => (
              <ListItem
                button
                key={room.roomId}
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <Link
                  to={`/chatting/${Number(myUserId)}?roomId=${
                    room.roomId
                  }&userId=${room.userId}`}
                >
                  <div css={listItemCss}>
                    <Avatar
                      src={
                        room?.profileImgUrl
                          ? room?.profileImgUrl
                          : '/images/assets/basic-profile-img.png'
                      }
                      sx={{ marginRight: '10px' }}
                    />
                    <div className="user-name">
                      <span className="user-name__name">{room?.userName}</span>
                      <span className="user-name__email">
                        @{room?.userEmail.split('@')[0]}
                      </span>
                    </div>
                  </div>
                </Link>
              </ListItem>
            ))}
          </List>
        </SwipeableDrawer>
        {!roomId ? (
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
            <ChatRoomMessageWrapper>
              <ChatRoomUserNameBar>
                <ChatRoomHeaderProfile className="user-name">
                  <Avatar
                    src={
                      otherUser?.profileImgUrl
                        ? otherUser?.profileImgUrl
                        : '/images/assets/basic-profile-img.png'
                    }
                    className="profile-avatar"
                  />
                  <ProfileLink to={`/users/${otherUser?.userId}`}>
                    <div className="user-name">
                      <span className="user-name__name">
                        {otherUser?.userName}
                      </span>
                      <span className="user-name__email">
                        @{otherUser?.userEmail.split('@')[0]}
                      </span>
                    </div>
                    <PersonIcon className="user-icon" />
                  </ProfileLink>
                </ChatRoomHeaderProfile>
                <IconButton
                  css={listIcon}
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                >
                  <CommentIcon />
                </IconButton>
              </ChatRoomUserNameBar>
              <Scrollbars autoHide ref={scrollbarRef} onScrollFrame={onScroll}>
                <ChatRoomMessageList ref={chatRoomMessageRef}>
                  <MessageWrapper>
                    {chatSections && chatSections.length > 0
                      ? chatSections.map((message, index) => {
                          if (message.senderId === Number(myUserId)) {
                            return (
                              <MessageBoxWrapper key={index}>
                                <MessageBoxRightContent>
                                  <MessageTimeBox>
                                    <div className="message_date">
                                      {smallMedia
                                        ? dayjs(message.sentTime).format(
                                            'a hh:mm',
                                          )
                                        : dayjs(message.sentTime).format(
                                            'YY.MM.DD. a hh:mm',
                                          )}
                                    </div>
                                  </MessageTimeBox>
                                  <p>{message.content}</p>
                                </MessageBoxRightContent>
                              </MessageBoxWrapper>
                            );
                          } else {
                            return (
                              <MessageBoxWrapper key={index}>
                                <MessageBoxLeftContent>
                                  <ProfileImg
                                    src={
                                      otherUser?.profileImgUrl
                                        ? otherUser?.profileImgUrl
                                        : '/images/assets/basic-profile-img.png'
                                    }
                                  />
                                  <p>{message.content}</p>
                                  <MessageTimeBox>
                                    <div className="message_date">
                                      {smallMedia
                                        ? dayjs(message.sentTime).format(
                                            'a hh:mm',
                                          )
                                        : dayjs(message.sentTime).format(
                                            'YY.MM.DD. a hh:mm',
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
              <TextArea
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

const ChatRoomListSidebar = styled.div`
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

const ChatRoomListWrapper = styled.ul`
  overflow-x: hidden;
  box-sizing: border-box;

  @media (max-width: 767px) {
    display: none;
    width: 100%;
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

const ChatRoomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ChatRoomMessageWrapper = styled.div`
  overflow: hidden;
  display: flex;
  flex: 1 1 0px;
  flex-direction: column;
  position: relative;
`;

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

const TextArea = styled(TextareaAutosize)`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-size: 14px;
  line-height: 1.5;
  color: #263747;
`;

const listIcon = css`
  display: none;
  padding: 0;
  color: inherit;

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

const ProfileLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  cursor: pointer;

  & .user-name {
    & span {
      font-size: 16px;
      font-weight: 500;
      color: #263747;
      transition: color 0.08s ease-in-out;
    }

    & .user-name__name {
      :hover {
        color: #3396f4;
        text-decoration: underline;
      }
    }
  }

  & .user-name {
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

const ChatRoomMessageList = styled.div`
  overflow: hidden auto;
  padding: 0px 20px;

  @media (max-width: 767px) {
    padding: 0 16px;
  }
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
    border-radius: 2px 20px 20px;
    background-color: #e9ebef;
    font-size: 14px;
    line-height: 1.5;
    color: #263747;
    white-space: pre-wrap;
    word-break: break-all;
  }

  @media (max-width: 767px) {
    & p {
      font-size: 13px;
      line-height: 1.4;
    }
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
    border-radius: 20px 2px 20px 20px;
    background-color: #3396f4;
    font-size: 14px;
    line-height: 1.5;
    color: #fff;
    white-space: pre-wrap;
    word-break: break-all;
  }

  @media (max-width: 767px) {
    & p {
      font-size: 13px;
      line-height: 1.4;
    }
  }
`;

const MessageTimeBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0px 4px;
  align-items: flex-end;

  .message_date {
    min-width: 58px;
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

  & button {
    outline: none;
    border: none;
    background-color: #eaebef;
  }

  @media (max-width: 767px) {
    margin: 12px 16px 8px 16px;
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
  background-color: #eaebef;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  line-height: 150%;
  outline: none;

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

const ProfileImg = styled(Avatar)`
  margin-right: 8px;

  @media (max-width: 767px) {
    width: 34px;
    height: 34px;
  }
`;

const ChatRoomListHeader = styled.div`
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
`;

const ChatRoomListHead = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: #263747;
`;

export default ChattingForm;
