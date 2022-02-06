import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';

import dayjs from 'dayjs';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

import { axiosInstance } from '../../utils/axios';
import { fetcherGet, fetcherPost } from '../../utils/fetcher';
import useSocket from '../../hooks/useSocket';
import useToken from '../../hooks/useToken';
import ChatItem from './ChatItem';
import {
  MessageType,
  ChatRoomResponseType,
  ChatLogResponseType,
  ChatRoomListResponseType,
} from '../../types/messageTypes';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Scrollbars } from 'react-custom-scrollbars-2';
import SendIcon from '@mui/icons-material/Send';
import TextareaAutosize from '@mui/base/TextareaAutosize';

const localUrl = 'http://localhost:3000';

type roomParams = {
  roomId: string;
};

type userParams = {
  userId: string;
};

const ChattingForm: React.FC = () => {
  const date = new Date();
  const userToken = useToken(); // 유저 토큰
  // const [socket] = useSocket();
  const { roomId } = useParams<roomParams>();

  console.log(roomId);

  const [senderId, setSenderId] = useState<number>(2);
  const [messageList, setMessageList] = useState<MessageType[]>([]);
  const [chatRoomList, setChatRoomList] = useState<ChatRoomResponseType[]>();
  const [entryTime, setEntryTime] = useState(date.toLocaleString());
  const [nowPage, setNowPage] = useState<number>(1);

  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const chatRoomMessageRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<Scrollbars>(null);

  useEffect(() => {
    // 채팅방 목록 불러오기
    axiosInstance
      .get(`http://localhost:3000/api/chat/room/${senderId}`)
      .then((response) => {
        console.log(response);
        setChatRoomList(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    getChatLog();
  }, []);

  const getChatLog = async () => {
    const chatLog = await axiosInstance.get<ChatLogResponseType>(
      `http://localhost:3000/api/chat/log`,
      {
        params: {
          userId1: 1,
          userId2: 2,
          nowPage: 1,
          entryTime: entryTime,
        },
      },
    );

    chatLog.data.contentList.map((log, index) => {
      const sentTime = dayjs(log.sentTime).toString();
      const message = {
        senderId: log.senderId,
        roomId: roomId,
        content: log.content,
        sentTime: sentTime,
        userName: '조원빈',
      };
      addMessageToList(message);
    });
  };

  useEffect(() => {
    chatLogScrollDown();
  }, [messageList]);

  const onMessageReceived = (payload: any) => {
    const message = JSON.parse(payload.body);
    if (message.type !== 'JOIN') addMessageToList(message);
  };

  const handleSendMessage = (
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent,
  ) => {
    event.preventDefault();

    const messageContent = messageInputRef.current?.value.trim();

    if (messageContent) {
      const curMessage = makeMessageFormat(senderId);
    }

    messageInputInitialize();
  };

  const handleMessageSendKeyPress = (event: React.KeyboardEvent) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      if (!event.shiftKey) {
        event.preventDefault();
        try {
          handleSendMessage(event);
        } catch {
          const curMessage = makeMessageFormat(senderId);
          addMessageToList(curMessage);
          messageInputInitialize();
        }
      }
    }
  };

  const makeMessageFormat = (id: number): MessageType => {
    const chatMessage: MessageType = {
      senderId: id,
      content: messageInputRef.current?.value as string,
      sentTime: date.toLocaleString(),
      roomId: roomId,
      userName: '조원빈',
    };

    return chatMessage;
  };

  const addMessageToList = (message: MessageType) => {
    setMessageList((preMessageList) => {
      return [...preMessageList, message];
    });
  };

  const messageInputInitialize = () => {
    if (messageInputRef.current) {
      messageInputRef.current.value = '';
      messageInputRef.current?.focus();
    }
  };

  const currentTimeCalculate = (): string => {
    let am = '오전';
    let hours = date.getHours();
    const minutes = date.getMinutes();

    if (hours >= 12) {
      am = '오후';
      if (hours !== 12) hours -= 12;
    }

    const currentTime: string = `${am} ${hours}:${minutes}`;
    return currentTime;
  };

  const chatLogScrollDown = () => {
    if (chatRoomMessageRef.current) {
      chatRoomMessageRef.current?.scrollIntoView({
        behavior: 'auto',
        block: 'end',
        inline: 'nearest',
      });
    }
  };

  return (
    <ChatContianer>
      <ChatListSidebar>
        <ChatList>
          {chatRoomList?.map((room: ChatRoomResponseType, index: number) => (
            <ChatItem
              roomId={room.roomId}
              userId={room.userId}
              userName={room.userName}
              profileImgUrl={room.profileImgUrl}
              content={room.content}
              sentTime={room.sentTime}
            />
          ))}
        </ChatList>
      </ChatListSidebar>
      <ChatRoomSection>
        {messageList.length == 0 ? (
          <ChatRoomEmpty>
            <ChatRoomEmptyContentWrapper>
              채팅할 상대를 선택해주세요
            </ChatRoomEmptyContentWrapper>
          </ChatRoomEmpty>
        ) : (
          <ChatRoomWrapper>
            <ChatRoomMessageWrapper>
              <ChatRoomUserNameBar>
                <ChatRoomHeaderProfile className="userName">
                  <img></img>
                  <div className="userName">
                    <span>손영배</span>
                  </div>
                </ChatRoomHeaderProfile>
              </ChatRoomUserNameBar>
              <ChatRoomMessageList>
                <Scrollbars autoHide ref={scrollbarRef}>
                  <MessageWrapper ref={chatRoomMessageRef}>
                    {messageList.length > 0
                      ? messageList.map((message, index) => {
                          if (message.senderId === senderId) {
                            return (
                              <MessageBoxWrapper key={index}>
                                <MessageBoxRightContent>
                                  <MessageTimeBox>
                                    <div className="message_date">
                                      {currentTimeCalculate()}
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
                                      {message.sentTime}
                                    </div>
                                  </MessageTimeBox>
                                </MessageBoxLeftContent>
                              </MessageBoxWrapper>
                            );
                          }
                        })
                      : null}
                  </MessageWrapper>
                </Scrollbars>
              </ChatRoomMessageList>
            </ChatRoomMessageWrapper>
            <ChatTypingWrapper>
              <TextareaAutosize
                css={ChatTypingTextarea}
                ref={messageInputRef}
                maxRows={3}
                minRows={1}
                onKeyPress={handleMessageSendKeyPress}
                placeholder="메시지를 입력해주세요"
              />
              <button onClick={handleSendMessage}>
                <SendIcon css={SendButton}></SendIcon>
              </button>
            </ChatTypingWrapper>
          </ChatRoomWrapper>
        )}
      </ChatRoomSection>
    </ChatContianer>
  );
};

const ChatContianer = styled.div`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  height: calc(100vh - 46px);
  background-color: #ffffff;
`;

const ChatListSidebar = styled.div`
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

const ChatList = styled.ul`
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
  color: #383838;
  font-size: 18px;
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
  padding: 0 20px;
  border-bottom: 1px solid #dfdfdf;
  box-sizing: border-box;
`;

const ChatRoomHeaderProfile = styled.div`
  display: flex;
  align-items: center;

  & img {
    width: 40px;
    height: 40px;
    margin-right: 12px;
    border: 1px solid #eaebef;
    border-radius: 50%;
    background-color: #eaebef;
  }

  & .userName {
    display: inline-flex;
    align-items: center;
  }
`;

const ChatRoomMessageList = styled.div`
  overflow: hidden auto;
  padding: 0px 20px;

  ::-webkit-scrollbar {
    opacity: 0;
    width: 6px;
    height: 7px;
    appearance: auto;
  }

  ::-webkit-scrollbar-button {
    background-color: transparent;
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(51, 150, 244, 0.5);
    border-radius: 5px;
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
    border-radius: 10px 10px 10px 2px;
    background-color: #eaebef;
    line-height: 150%;
    color: #000;
    white-space: pre-wrap;
    word-break: break-all;
  }

  & img {
    width: 36px;
    height: 36px;
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
    border-radius: 10px 10px 2px 10px;
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
  /* height: 40px; */
  height: 85px;
  margin: 20px;
  padding: 0px 10px;
  border-radius: 10px;
  background-color: #eaebef;

  textarea {
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
  }

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
