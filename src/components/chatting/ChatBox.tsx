import React, { useCallback, useRef } from 'react';

import autosize from 'autosize';

/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import SendIcon from '@mui/icons-material/Send';
import { axiosInstance } from '../../utils/axios';

interface ChatProps {
  chat?: string;
}

const ChatBox: React.FC<ChatProps> = ({ chat }) => {
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onSubmitForm = useCallback((event) => {
    event.preventDefault();

    if (chat?.trim()) {
      const savedChat = chat;

      axiosInstance
        .post(`chats`, {
          content: chat,
        })
        .catch(console.error);
    }
  }, []);

  const handleSendMessage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent) => {
      event.preventDefault();
      onSubmitForm(event);
    },
    [onSubmitForm],
  );

  const handleMessageSendKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        if (!event.shiftKey) {
          event.preventDefault();
          onSubmitForm(event);
        }
      }
    },
    [onSubmitForm],
  );

  return (
    <ChatTypingWrapper>
      <form>
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
      </form>
    </ChatTypingWrapper>
  );
};

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

export default ChatBox;
