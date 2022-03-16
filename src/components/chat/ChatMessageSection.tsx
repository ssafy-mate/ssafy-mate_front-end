/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

import { MessageType, OtherUserInfoType } from '../../types/messageTypes';

import ChatMessageBox from './ChatMessageBox';

interface ChatMessageProps {
  chatSections: MessageType[];
  myUserId: number;
  smallMedia: boolean;
  otherUser: OtherUserInfoType | undefined;
}

const ChatMessageSection: React.FC<ChatMessageProps> = ({
  chatSections,
  myUserId,
  otherUser,
  smallMedia,
}) => {
  return (
    <Section>
      {chatSections !== [] && chatSections.length > 0
        ? chatSections.map((message, index) => {
            return (
              <MessageBoxWrapper key={index}>
                {message.senderId === Number(myUserId) ? (
                  <ChatMessageBox
                    isMyMessage={true}
                    message={message}
                    smallMedia={smallMedia}
                    otherUser={otherUser}
                  />
                ) : (
                  <ChatMessageBox
                    isMyMessage={false}
                    message={message}
                    smallMedia={smallMedia}
                    otherUser={otherUser}
                  />
                )}
              </MessageBoxWrapper>
            );
          })
        : null}
    </Section>
  );
};

const Section = styled.div`
  overflow: hidden auto;
  padding: 0px 20px;

  @media (max-width: 767px) {
    padding: 0 16px;
  }
`;

const MessageBoxWrapper = styled.div`
  margin-top: 15px;
`;

export default ChatMessageSection;
