import { css } from '@emotion/react';
import styled from '@emotion/styled';

const ChatItem: React.FC = () => {
  return (
    <>
      <ChatListItem>
        <ChatListItemWrapper>
          <ProfileWrapper>
            <img></img>
          </ProfileWrapper>
          <ContentWrapper>
            <TitleWrapper>
              <TitleSenderName>호호</TitleSenderName>
              <TitleSubText>
                <span>22.01.25</span>
              </TitleSubText>
            </TitleWrapper>
            <DescriptionWrapper>
              <DescriptionContent>
                내일 역삼역 앞에서 11시에 만나요
              </DescriptionContent>
            </DescriptionWrapper>
          </ContentWrapper>
        </ChatListItemWrapper>
      </ChatListItem>
    </>
  );
};

const ChatListItem = styled.li`
  width: 100%;
  /* border-bottom: 1px solid #dfdfdf; */
  box-sizing: border-box;
`;

const ChatListItemWrapper = styled.a`
  display: flex;
  overflow: hidden;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 0 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #dfdfdf;
  background-color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #ebebebce;
  }
`;

const ProfileWrapper = styled.div`
  height: 40px;
  margin-right: 8px;

  img {
    width: 40px;
    height: 40px;
    border: 1px solid #b4b4b4;
    border-radius: 50%;
  }
`;

const ContentWrapper = styled.div`
  overflow: hidden;
  width: 100%;
`;

const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const TitleSenderName = styled.span`
  overflow-x: hidden;
  max-width: 70px;
  height: 20px;
  font-size: 14px;
  font-weight: 600;
  color: #6d6d6d;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TitleSubText = styled.div`
  margin-left: 6px;
  font-size: 12px;
  color: #9b9ea3;
  white-space: nowrap;
`;

const DescriptionWrapper = styled.div`
  overflow: hidden;
  width: 100%;
`;

const DescriptionContent = styled.p`
  overflow: hidden;
  font-size: 14px;
  color: #3d3d3d;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default ChatItem;
