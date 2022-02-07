import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useLocation } from 'react-router';

import dayjs from 'dayjs';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import axios from 'axios';

import { axiosInstance } from '../../utils/axios';
import { fetcherGet, fetcherGetWithParams } from '../../utils/fetcher';
import useSocket from '../../hooks/useSocket';
import useToken from '../../hooks/useToken';
import useTextArea from '../../hooks/useTextArea';
import ChatRoomList from './ChatRoomList';
import { MessageType, ChatRoomType } from '../../types/messageTypes';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Scrollbars } from 'react-custom-scrollbars-2';
import SendIcon from '@mui/icons-material/Send';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Drawer } from '@mui/material';

const localUrl = 'http://localhost:3000';
const socketUrl = 'http://localhost:3095';

const PAGE_SIZE = 10;

type userParams = {
  myId: string;
};

const ChattingForm: React.FC = () => {
  const userToken = useToken(); // 유저 토큰
  const [socket] = useSocket();

  const location = useLocation();
  const param = new URLSearchParams(location.search);
  const roomId = param.get('roomId');
  const userId = param.get('userId');
  const userName = param.get('userName');

  // const { roomId } = useParams<roomParams>();
  const { myId } = useParams<userParams>();

  // const [numberUserId, setNunberUserId] = useState(Number(userId));
  // const [userId, setUserId] = useState(2); // 내 아이디
  // const [userId, setUserId] = useState(1); // 상대방 아이디

  const [entryTime, setEntryTime] = useState(
    dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS'),
  );

  const [chat, onChangeChat, setChat] = useTextArea('');
  const [messageList, setMessageList] = useState<MessageType[]>([]);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const chatRoomMessageRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<Scrollbars>(null);

  // 채팅 목록 불러오기
  const {
    data: roomData,
    error: roomError,
    mutate: mutateRoom,
  } = useSWR<ChatRoomType[]>(`/api/chat/room/${myId}`, fetcherGet);

  // #######
  // 토큰이 없는 상태에서 접근하면 error 페이지로, teamInfoPage 확인
  // #######

  // 대화 내역 불러오기 - 인피니티 스크롤용
  const {
    data: chatData,
    mutate: mutateChat,
    setSize,
  } = useSWRInfinite<MessageType[]>(
    (index) => {
      console.log(`인피니티 스크롤 index:${index}`);
      const nextPage: number = index + 1;
      return [`/api/chat/log/${roomId}`, nextPage, entryTime];
    },
    fetcherGetWithParams,
    {
      onSuccess(data) {
        if (data?.length === 1) {
          scrollbarRef.current?.scrollToBottom();
        }
      },
    },
  );

  // 내가 메시지를 보내거나, 서버 챗 데이터 변경이 일어났을 때 발동하는 콜백
  // 서버로 메시지 정보 post 요청
  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (chat?.trim()) {
        const params: MessageType = {
          userName: '조원빈',
          roomId: roomId as string,
          content: chat,
          senderId: Number(myId),
          sentTime: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS'),
        };

        /*
        mutateChat((prevChatData) => {
          prevChatData?.[0].unshift(params);
          console.log(prevChatData?.[0].toString());
          return prevChatData;
        }, true).then(() => {
          setChat('');
          if (scrollbarRef.current) {
            if (
              scrollbarRef.current.getScrollHeight() <
              scrollbarRef.current.getClientHeight() +
                scrollbarRef.current.getScrollTop() +
                150
            ) {
              scrollbarRef.current.scrollToBottom();
            }
          }
        });
        */

        axios
          .post(`${socketUrl}/api/chat`, params)
          .then((response) => {
            console.log(`onSumbit response : ${response}`);
            if (scrollbarRef.current) {
              if (
                scrollbarRef.current.getScrollHeight() <
                scrollbarRef.current.getClientHeight() +
                  scrollbarRef.current.getScrollTop() +
                  150
              ) {
                scrollbarRef.current.scrollToBottom();
              }
            }
          })
          .catch((error) => {
            console.log(`onSumbit error : ${error}`);
          })
          .finally(() => {
            setChat('');
          });

        setMessageList((data) => data.concat(params));
      }
    },
    [chat, roomId, myId, userId, chatData, mutateChat, setChat],
  );

  // onMessage 메시지 받으면 작동하는 콜백
  const onMessage = useCallback(
    (data: MessageType) => {
      // roomId 중 하나가 상대것인지 검사 => 일단 임시로 내, 상대방 아이디 셋팅

      // onSubmit에서 콜백이 변경된 데이터를 감지해 호출됨
      if (data.senderId === Number(userId) && Number(myId) !== Number(userId)) {
        mutateChat((chatData) => {
          chatData?.[0].unshift(data);
          return chatData;
        }, false).then(() => {
          console.log(`onMessage callback 성공`);

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
    [userId, myId, mutateChat],
  );

  // 소켓 on 달아두는 곳
  useEffect(() => {
    socket?.on('message', onMessage);
    return () => {
      socket?.off('message', onMessage);
    };
  }, [socket, onMessage]);

  // 로딩 시 스크롤바 제일 아래로
  useEffect(() => {
    if (chatData?.length === 1) {
      setTimeout(() => {
        scrollbarRef.current?.scrollToBottom();
      }, 100);
    }
  }, [chatData]);

  // 엔터 누르면 onSubmit 호출
  const handleMessageSendKeyPress = (event: React.KeyboardEvent) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      if (!event.shiftKey) {
        event.preventDefault();
        onSubmit(event);
      }
    }
  };

  // 인피니티 스크롤을 위한, ReachingEnd : 페이지 사이즈 만큼 못가져왔을때 남는거
  const isEmpty = chatData?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (chatData && chatData[chatData.length - 1]?.length < PAGE_SIZE);

  const onScroll = useCallback(
    (values) => {
      // 가장 위로 올라갔을 때, 다음 페이지 불러오도록 페이지 셋팅
      if (values.scrollTop === 0 && !isReachingEnd && !isEmpty) {
        setSize((size) => size + 1).then(() => {
          // 스크롤 위치 유지 : 현재 스크롤 높이 - 스크롤바의 높이
          scrollbarRef.current?.scrollTop(
            scrollbarRef.current?.getScrollHeight() - values.scrollHeight,
          );
        });
      }
    },
    [setSize, scrollbarRef, isReachingEnd, isEmpty],
  );

  // 채팅 메시지 reverse
  const chatSections = chatData
    ? ([] as MessageType[]).concat(...chatData).reverse()
    : [];

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
            />
          ))}
        </ChatRoomListWrapper>
      </ChatRoomListSidebar>
      <ChatRoomSection>
        {!roomId ? (
          <ChatRoomEmpty>
            <ChatRoomEmptyContentWrapper>
              <span>대화할 상대를 선택해주세요.</span>
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
              </ChatRoomUserNameBar>
              <Scrollbars autoHide ref={scrollbarRef} onScrollFrame={onScroll}>
                <ChatRoomMessageList>
                  <MessageWrapper ref={chatRoomMessageRef}>
                    {chatSections && chatSections.length > 0
                      ? chatSections?.map((message, index) => {
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
                    <hr></hr>
                    {messageList.length > 0
                      ? messageList.map((message, index) => {
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
