import React, { useEffect, useRef, useState } from 'react';

import SockJS from 'sockjs-client';
import { Stomp, CompatClient } from '@stomp/stompjs';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const ChattingForm: React.FC = () => {
  const [messageList, setMessageList] = useState<string[]>([]);
  const messageInput = useRef<HTMLTextAreaElement>(null);

  // SockJS 로 웹소켓 연결, Stomp 프로토콜을 이용
  const [stompClient, setStompClient] = useState<CompatClient>(() =>
    Stomp.over(() => {
      return new SockJS('http://localhost:8000/ws');
    }),
  );

  // send,recive 메시지 숨기기
  // stompClient.debug = () => {};
  const username = 'test';

  useEffect(() => {
    stompClient.connect({}, onConnected);
    return () => {
      stompClient.disconnect();
    };
  }, []);

  const onConnected = () => {
    stompClient.subscribe('/topic/public', onMessageReceived);

    // Tell your username to the server
    stompClient.send(
      '/app/chat.addUser',
      {},
      JSON.stringify({
        sender: username,
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

    addMessageInList(message.content);
  };

  const handleSendMessage = (
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent,
  ) => {
    const messageContent = messageInput.current?.value.trim();

    if (messageContent && stompClient) {
      const chatMessage = {
        content: messageInput.current?.value,
        sender: username,
        type: 'CHAT',
      };

      stompClient.send(
        '/app/chat.sendMessage',
        {},
        JSON.stringify(chatMessage),
      );
    }

    if (messageInput.current) {
      messageInput.current.value = '';
      messageInput.current?.focus();
    }

    event.preventDefault();
  };

  const handleMessageSendKeyPress = (event: React.KeyboardEvent) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      if (!event.shiftKey) {
        event.preventDefault();
        handleSendMessage(event);
      }
    }
  };

  const addMessageInList = (message: string) => {
    setMessageList((preMessageList) => {
      return [...preMessageList, message];
    });
  };

  return (
    <ChattingContianer>
      <ChattingList></ChattingList>
      <ChattingArea>
        <ChattingFlow>
          <MessageWrapper>
            {messageList.length > 0
              ? messageList.map((message, index) => (
                  <MessageItem key={index}>
                    <p>{message}</p>
                  </MessageItem>
                ))
              : null}
          </MessageWrapper>
        </ChattingFlow>
        <ChattingTypingWrapper>
          <textarea
            ref={messageInput}
            onKeyPress={handleMessageSendKeyPress}
            placeholder="메시지를 입력해주세요"
          />
          <button onClick={handleSendMessage}>Send</button>
        </ChattingTypingWrapper>
      </ChattingArea>
    </ChattingContianer>
  );
};

const ChattingContianer = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  height: 600px;

  background-color: #ffffff;

  margin-block-start: 4em;
  margin-block-end: 4em;
  box-shadow: 1px;

  @media (max-width: 400px) {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
`;

const ChattingList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 300px;
  margin-left: 1em;
  margin-block-start: 1em;
  margin-block-end: 1em;
  border: solid 1px #b4b4b4;
`;

const ChattingListItem = styled.li`
  display: flex;
  flex-wrap: wrap;
  width: 200px;
  background-color: #f1ff;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-left: 1em;
  margin-right: 1em;
`;

const ChattingArea = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 600px;
  margin-block-start: 1em;
  margin-block-end: 1em;
  border: solid 1px #b4b4b4;
`;

const ChattingFlow = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 600px;
  height: 480px;
  margin-block-start: 1em;
  margin-left: 1em;
  margin-right: 1em;
  /* border: solid 1px #b4b4b4; */
  overflow-y: auto;
`;

const MessageWrapper = styled.div`
  display: flex;
`;

const MessageItem = styled.div`
  display: block;
  border-width: 1px;
  border-radius: 15px;
  border-color: #4726ffe4;

  p {
    display: flex;
    margin: 0px;
    padding: 10px 14px;
    max-width: 484px;
    white-space: pre-wrap;
    font-size: 14px;
    line-height: 150%;
    letter-spacing: -0.02em;
  }
`;

const ChattingTypingWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 24px;
  margin-left: 1em;
  margin-right: 1em;
  gap: 0.5em;
  border-radius: 0.5rem;
  padding: 0.8em;
  --tw-bg-opacity: 1;
  background-color: rgba(243, 244, 246, var(--tw-bg-opacity));

  textarea {
    /* margin: 12px 12px 12px; */
    width: 100%;
    line-height: 100%;
    flex-grow: 1;
    resize: none;
    outline: none;
    border: none;
    overflow: auto;
    overflow-wrap: break-word;

    --tw-bg-opacity: 1;
    background-color: rgba(243, 244, 246, var(--tw-bg-opacity));
  }
`;

export default ChattingForm;
