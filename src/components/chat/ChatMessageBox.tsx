import dayjs from 'dayjs';

/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

import Avatar from '@mui/material/Avatar';

import { MessageType, OtherUserInfoType } from '../../types/messageTypes';

interface ChatMessageBoxProps {
  isMyMessage: boolean;
  message: MessageType;
  smallMedia: boolean;
  otherUser: OtherUserInfoType | undefined;
}

interface MessageBoxContentProps {
  isMine: boolean;
}

const ChatMessageBox: React.FC<ChatMessageBoxProps> = ({
  isMyMessage,
  message,
  smallMedia,
  otherUser,
}) => {
  return (
    <MessageBoxWrapper>
      {isMyMessage ? (
        <MessageBoxContent isMine={false}>
          <MessageTimeBox>
            <div className="message_date">
              {smallMedia
                ? dayjs(message.sentTime).format('a hh:mm')
                : dayjs(message.sentTime).format('YY.MM.DD. a hh:mm')}
            </div>
          </MessageTimeBox>
          <p>{message.content}</p>
        </MessageBoxContent>
      ) : (
        <MessageBoxContent isMine={true}>
          <ProfileImg
            src={
              otherUser?.profileImgUrl !== null
                ? otherUser?.profileImgUrl
                : '/images/common/default-profile-img.png'
            }
          />
          <p>{message.content}</p>
          <MessageTimeBox>
            <div className="message_date">
              {smallMedia
                ? dayjs(message.sentTime).format('a hh:mm')
                : dayjs(message.sentTime).format('YY.MM.DD. a hh:mm')}
            </div>
          </MessageTimeBox>
        </MessageBoxContent>
      )}
    </MessageBoxWrapper>
  );
};

const MessageBoxWrapper = styled.div`
  margin-top: 15px;
`;

const ProfileImg = styled(Avatar)`
  margin-right: 8px;

  @media (max-width: 767px) {
    width: 34px;
    height: 34px;
  }
`;

const MessageBoxContent = styled.div<MessageBoxContentProps>`
  display: flex;
  justify-content: ${(props) => (props.isMine ? 'start' : 'flex-end')};
  padding: 4px;
  contain: content;

  & p {
    display: inline-flex;
    max-width: 364px;
    margin: 0px;
    padding: 10px 14px;
    border-radius: ${(props) =>
      props.isMine ? '2px 20px 20px' : '20px 2px 20px 20px'};
    background-color: ${(props) => (props.isMine ? '#e9ebef' : '#3396f4')};
    font-size: 14px;
    line-height: 1.5;
    color: ${(props) => (props.isMine ? '#263747' : '#fff')};
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
  align-items: flex-end;
  padding: 0px 4px;

  .message_date {
    min-width: 58px;
    font-size: 12px;
    line-height: 150%;
    color: #868b94;
    letter-spacing: -0.02em;
  }
`;

export default ChatMessageBox;
