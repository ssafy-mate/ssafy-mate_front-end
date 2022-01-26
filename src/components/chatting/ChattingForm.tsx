import { useEffect, useRef, useState } from 'react';

import SockJS from 'sockjs-client';
import { Stomp, CompatClient } from '@stomp/stompjs';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import SendIcon from '@mui/icons-material/Send';

import ChatItem from './ChatItem';
import { MessageType } from '../../types/messageTypes';

const ChattingForm: React.FC = () => {
  const date = new Date();
  const dummyData: MessageType = {
    userId: 100,
    userName: 'dummy',
    content: '상대방 더미 데이터',
    sentTime: date.toString(),
  };
  const [messageList, setMessageList] = useState<MessageType[]>([dummyData]);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const chatRoomMessageRef = useRef<HTMLDivElement>(null);

  // SockJS 로 웹소켓 연결, Stomp 프로토콜을 이용
  const [stompClient, setStompClient] = useState<CompatClient>(() =>
    Stomp.over(() => {
      return new SockJS('http://localhost:8000/ws');
    }),
  );

  // send,recive 메시지 숨기기
  // stompClient.debug = () => {};
  const userId: number = 111;

  useEffect(() => {
    stompClient.connect({}, onConnected);
    return () => {
      stompClient.disconnect();
    };
  }, []);

  useEffect(() => {
    chatLogScrollDown();
  }, [messageList]);

  const onConnected = () => {
    stompClient.subscribe('/queue/public', onMessageReceived);

    // Tell your username to the server
    stompClient.send(
      '/app/chat.addUser',
      {},
      JSON.stringify({
        sender: userId,
        type: 'JOIN',
      }),
    );
  };

  const onMessageReceived = (payload: any) => {
    const message = JSON.parse(payload.body);

    if (message.type === 'JOIN') {
      message.content = message.sender + ' joined!';
    } else if (message.type === 'LEAVE') {
      message.content = message.sender + ' left!';
    }

    addMessageToList(message);
  };

  const handleSendMessage = (
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent,
  ) => {
    const messageContent = messageInputRef.current?.value.trim();

    if (messageContent && stompClient) {
      const curMessage = makeMessageFormat(userId);

      stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(curMessage));
    }

    messageInputInitialize();
    event.preventDefault();
  };

  const handleMessageSendKeyPress = (event: React.KeyboardEvent) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      if (!event.shiftKey) {
        event.preventDefault();
        try {
          handleSendMessage(event);
        } catch {
          const curMessage = makeMessageFormat(userId);
          addMessageToList(curMessage);
          messageInputInitialize();
        }
      }
    }
  };

  const makeMessageFormat = (setUserId: number): MessageType => {
    const currentTime = currentTimeCalculate();
    const chatMessage: MessageType = {
      userId: setUserId,
      content: messageInputRef.current?.value as string,
      userName: 'test',
      sentTime: currentTime,
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

    const currentTime: string = `${am} ${hours}시 ${minutes}분`;
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
      {/* <ChatListWrapper> */}
      <ChatListSidebar>
        <ChatList>
          <ChatItem />
          <ChatItem />
          <ChatItem />
        </ChatList>
      </ChatListSidebar>
      {/* </ChatListWrapper> */}
      <ChatRoomSection>
        <ChatRoomWrapper>
          <ChatRoomMessageWrapper>
            <ChatRoomUserNameBar>
              <ChatRoomHeaderProfile className="userName">
                <img></img>
                <div className="userName">
                  <span>dummy userName</span>
                </div>
              </ChatRoomHeaderProfile>
            </ChatRoomUserNameBar>
            <ChatRoomMessageList>
              <MessageWrapper ref={chatRoomMessageRef}>
                {messageList.length > 0
                  ? messageList.map((message, index) => {
                      if (message.userId === userId) {
                        return (
                          <MessageBoxWrapper key={index}>
                            <MessageBoxRightContent>
                              <MessageTimeBox>
                                <div className="message_date">
                                  {message.sentTime}
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
            </ChatRoomMessageList>
          </ChatRoomMessageWrapper>
          <ChatTypingWrapper>
            <textarea
              ref={messageInputRef}
              onKeyPress={handleMessageSendKeyPress}
              placeholder="메시지를 입력해주세요"
            />
            <button onClick={handleSendMessage}>
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
  height: 100vh;
  background-color: #ffffff;
  padding-top: 46px;

  @media (max-width: 400px) {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
`;

// const ChatListWrapper = styled.div`
//   display: flex;
// `;

const ChatListSidebar = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 100%;
  border-left: 1px solid #dfdfdf;
  box-sizing: border-box;
  background-color: #fff;
`;

const ChatList = styled.ul`
  overflow: hidden;
`;

const ChatRoomSection = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 700px;
  border-left: solid 1px #dfdfdf;
  border-right: solid 1px #dfdfdf;
  background-color: #fff;
`;

const ChatRoomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ChatRoomMessageWrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1 1 0px;
  flex-direction: column;
  overflow: hidden;
`;

const ChatRoomUserNameBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 81px;
  border-bottom: 1px solid #dfdfdf;
  padding: 0px 20px;
  box-sizing: border-box;
`;

const ChatRoomHeaderProfile = styled.div`
  display: flex;
  align-items: center;

  & img {
    margin-right: 12px;
    width: 40px;
    height: 40px;
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
    background-color: rgba(51, 150, 244, 5);
    border-radius: 5px;
  }
`;

const MessageWrapper = styled.div`
  /* display: flex;
  flex-direction: column; */
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
    color: #000;
    white-space: pre-wrap;
    line-height: 150%;
    word-break: break-all;
  }

  & img {
    border: 1px solid #f9f9f9;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    background-color: #eaebef;
    margin-right: 8px;
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
    color: #fff;
    white-space: pre-wrap;
    line-height: 150%;
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
    letter-spacing: -0.02em;
    color: #868b94;
  }
`;

const ChatTypingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  margin: 20px;
  height: 40px;
  border-radius: 10px;
  padding: 0px 10px;
  background-color: #eaebef;

  textarea {
    overflow: auto;
    overflow-wrap: break-word;
    width: 100%;
    padding: 10px;
    resize: none;
    outline: none;
    border: none;
    background-color: #eaebef;
    line-height: 150%;
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';

    ::-webkit-scrollbar {
      opacity: 0;
      width: 6px;
      height: 7px;
      appearance: auto;
    }

    ::-webkit-scrollbar-thumb {
      background-color: rgba(51, 150, 244, 5);
      border-radius: 5px;
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

export default ChattingForm;
