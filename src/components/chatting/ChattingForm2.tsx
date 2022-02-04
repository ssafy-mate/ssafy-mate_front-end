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
  MessageRequestType,
  ChatRoomResponseType,
  ChatLogResponseType,
  ChatRoomListRequestType,
} from '../../types/messageTypes';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Scrollbars } from 'react-custom-scrollbars-2';
import SendIcon from '@mui/icons-material/Send';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import useTextArea from '../../hooks/useTextArea';
import axios from 'axios';

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
  const [socket] = useSocket();

  const { roomId } = useParams<roomParams>();
  //   const { userId } = useParams<userParams>();
  //   console.log(`roomId : ${roomId} / userId : ${userId}`);

  // const [numberUserId, setNunberUserId] = useState(Number(userId));
  const [myId, setMyId] = useState(2); // 내 아이디
  const [userId, setUserId] = useState(1); // 상대방 아이디

  const [messageList, setMessageList] = useState<MessageRequestType[]>([]);
  const [chatRoomList, setChatRoomList] = useState<ChatRoomResponseType[]>();
  const [entryTime, setEntryTime] = useState(date.toLocaleString());
  const [nowPage, setNowPage] = useState<number>(1);
  const [chat, onChangeChat, setChat] = useTextArea('');

  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const chatRoomMessageRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<Scrollbars>(null);

  // 채팅 목록 불러오기 - 아직 작동 안함
  const { data: roomData, mutate: mutateRoom } =
    useSWR<ChatRoomListRequestType>(`/api/chat/room/${myId}`, fetcherGet);

  //   console.log(`chatList : ${roomData}`);

  // 대화 내용 불러오기
  const { data: chatData, mutate: mutateChat } = useSWR<ChatLogResponseType>(
    `/api/chat/log/${roomId}`,
    fetcherGet,
  );

  // 내가 메시지를 보내거나, 서버 챗 데이터 변경이 일어났을 때 발동하는 콜백
  // 서버로 메시지 정보 post 요청
  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const params: MessageRequestType = {
        roomId: roomId,
        content: chat,
        senderId: myId,
        sentTime: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
      };

      if (chat.trim() && chatData) {
        axiosInstance
          .post(`/api/chat`, params)
          .then((response) => {
            console.log(`onSumbit response : ${response}`);
            setChat('');
          })
          .catch((error) => {
            console.log(`onSumbit error : ${error}`);
          });
      }
    },
    [chat, roomId, myId, chatData, setChat],
  );

  // onMessage 메시지 받으면 작동하는 콜백
  const onMessage = useCallback((data: MessageRequestType) => {
    // roomId 중 하나가 상대것인지 검사 => 일단 임시로 내, 상대방 아이디 셋팅
    // 상대방이 보낸 데이터를 chatData.contetnList 에 넣으면
    // onSubmit에서 콜백이 변경된 데이터를 감지해 호출됨
    if (data.senderId === userId && myId !== userId) {
      mutateChat((chatData) => {
        const chatLog = {
          id: 1,
          content: data.content,
          userName: '손영배',
          sentTime: data.sentTime,
          senderId: data.senderId,
        };
        chatData?.contentList.unshift(chatLog);
        return chatData;
      }, false).then(() => {
        console.log(`onMessage callback 성공`);
      });
    }
  }, []);

  // 소켓 on 달아두는 곳
  useEffect(() => {
    socket?.on('message', onMessage);
    return () => {
      socket?.off('message', onMessage);
    };
  }, [socket, onMessage]);

  // 엔터 누르면 onSubmit 호출
  const handleMessageSendKeyPress = (event: React.KeyboardEvent) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      if (!event.shiftKey) {
        event.preventDefault();
        onSubmit(event);
      }
    }
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
                        if (message.senderId === myId) {
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
