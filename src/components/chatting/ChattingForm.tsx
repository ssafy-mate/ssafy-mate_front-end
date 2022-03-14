import { useCallback, useEffect, useRef, useState } from 'react';

import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

import { useMediaQuery } from 'react-responsive';

import { Scrollbars } from 'react-custom-scrollbars-2';

import dayjs from 'dayjs';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import SendIcon from '@mui/icons-material/Send';
import CommentIcon from '@mui/icons-material/Comment';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Avatar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Tooltip from '@mui/material/Tooltip';

import {
  MessageType,
  ChatRoomType,
  OtherUserInfoType,
  ChatLogResponseType,
} from '../../types/messageTypes';

import ChatService from '../../services/ChatService';
import useSocket from '../../hooks/useSocket';
import useToken from '../../hooks/useToken';
import useTextArea from '../../hooks/useTextArea';
import useUserIdName from '../../hooks/useUserIdName';
import ChatRoomListSidebar from './ChatRoomListSidebar';
import useChatRoomList from '../../hooks/useChatRoomList';
import useChatLog from '../../hooks/useChatLog';
import { useMutation, useQueryClient, InfiniteData } from 'react-query';
import { AxiosResponse } from 'axios';

const DRAWER_WIDTH = 250;

interface OnlineProps {
  isOnline: boolean;
}

interface MessageBoxProps {
  isLeft: boolean;
}

const ChattingForm: React.FC = () => {
  const location = useLocation();
  const myToken = useToken();
  const myData = useUserIdName();
  const smallMedia = useMediaQuery({
    query: '(max-width: 575px)',
  });

  const myUserId: number | null = myData[0] as number;
  const myUserName: string | null = myData[1] as string;

  const param = new URLSearchParams(location.search);
  const roomId: string | null = param.get('roomId');
  const userId: string | null = param.get('userId');

  const [chatSections, setChatSections] = useState<MessageType[]>([]);
  const [otherUser, setOtherUser] = useState<OtherUserInfoType>();
  const [onlineList, setOnlineList] = useState<number[]>([]);
  const [open, setOpen] = useState(false);

  const [socket] = useSocket(myUserId as number);
  const [chat, onChangeChat, setChat] = useTextArea('');

  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const chatRoomMessageRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<Scrollbars>(null);

  const queryClient = useQueryClient();
  const queryFn = (params: MessageType) => ChatService.sendChatData(params);

  const { roomData: roomListData, refetch: roomRefetch } = useChatRoomList(
    myToken,
    myUserId,
  );

  const {
    data: chatLogData,
    refetch: chatLogRefetch,
    fetchNextPage,
  } = useChatLog(myToken, roomId);

  const mutation = useMutation(['roomId', roomId], queryFn, {
    onMutate(mutateData) {
      queryClient.setQueryData<
        InfiniteData<AxiosResponse<ChatLogResponseType>>
      >(['roomId', roomId], (data) => {
        const newPages = data?.pages.slice() || [];
        const newIndex = newPages[0].data.contentList[0].id;
        newPages[0].data.contentList.unshift({
          id: newIndex + 1,
          userName: myUserName as string,
          roomId: roomId as string,
          content: mutateData.content,
          senderId: Number(myUserId),
          sentTime: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS'),
        });

        return {
          pageParams: data?.pageParams || [],
          pages: newPages,
        };
      });

      setChat('');

      if (scrollbarRef.current !== null) {
        setTimeout(() => {
          scrollbarRef?.current?.scrollToBottom();
        }, 100);
      }
    },

    onError(error) {
      console.error(error);
    },

    onSuccess() {
      queryClient.refetchQueries(['roomId', roomId]);
      queryClient.refetchQueries(['userId', myUserId]);
    },
  });

  const userInfoGet = () => {
    ChatService.getChatUserInfo(userId as string).then((response) => {
      setOtherUser(response.data);
    });
  };

  useEffect(() => {
    setChatSections([]);
    setChat('');
    scrollbarRef.current?.scrollToBottom();
  }, [roomId]);

  useEffect(() => {
    if (userId) {
      userInfoGet();
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
                            room.profileImgUrl
                              ? room.profileImgUrl
                              : '/images/assets/basic-profile-img.png'
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
            <ChatRoomMessageWrapper>
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
                      <span className="user-name__name">
                        {otherUser?.userName}
                      </span>
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
                      <CommentIcon />
                    </ChatRoomListButton>
                  </Tooltip>
                </ButtonBox>
              </ChatRoomUserNameBar>
              <Scrollbars autoHide ref={scrollbarRef} onScrollFrame={onScroll}>
                <ChatRoomMessageList ref={chatRoomMessageRef}>
                  {chatSections !== [] && chatSections.length > 0
                    ? chatSections.map((message, index) => {
                        return (
                          <MessageBoxWrapper key={index}>
                            {message.senderId === Number(myUserId) ? (
                              <MessageBoxContent isLeft={false}>
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
                              </MessageBoxContent>
                            ) : (
                              <MessageBoxContent isLeft={true}>
                                <ProfileImg
                                  src={
                                    otherUser?.profileImgUrl !== null
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
                              </MessageBoxContent>
                            )}
                          </MessageBoxWrapper>
                        );
                      })
                    : null}
                </ChatRoomMessageList>
              </Scrollbars>
            </ChatRoomMessageWrapper>
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

const ChatRoomMessageList = styled.div`
  overflow: hidden auto;
  padding: 0px 20px;

  @media (max-width: 767px) {
    padding: 0 16px;
  }
`;

const MessageBoxWrapper = styled.div`
  margin-top: 15px;
`;

const MessageBoxContent = styled.div<MessageBoxProps>`
  display: flex;
  justify-content: ${(props) => (props.isLeft ? 'start' : 'flex-end')};
  padding: 4px;
  contain: content;

  & p {
    display: inline-flex;
    max-width: 364px;
    margin: 0px;
    padding: 10px 14px;
    border-radius: ${(props) =>
      props.isLeft ? '2px 20px 20px' : '20px 2px 20px 20px'};
    background-color: ${(props) => (props.isLeft ? '#e9ebef' : '#3396f4')};
    font-size: 14px;
    line-height: 1.5;
    color: ${(props) => (props.isLeft ? '#263747' : '#fff')};
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

const ProfileImg = styled(Avatar)`
  margin-right: 8px;

  @media (max-width: 767px) {
    width: 34px;
    height: 34px;
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
  width: 100%;
  padding: 10px;
  resize: none;
  border: none;
  background-color: #eaebef;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-size: 14px;
  line-height: 1.5;
  color: #263747;
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

export default ChattingForm;
