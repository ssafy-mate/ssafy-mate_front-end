import { css } from '@emotion/react';
import styled from '@emotion/styled';

const ChatList: React.FC = () => {
  return (
    <>
      <ChatListItem>
        <ChatListItemWrapper>
          <ProfileWrapper>
            <img></img>
          </ProfileWrapper>
          <ContentWrapper>
            <TitleWrapper>
              <TitleSenderName>호호123145</TitleSenderName>
              <TitleSubText>
                <span>22.01.25</span>
              </TitleSubText>
            </TitleWrapper>
            <DescriptionWrapper>
              <DescriptionContent>
                11시에 만나요aaaaaaasdfasdfasdaaaaaaaaaaaaaaaaaaaaaa!
              </DescriptionContent>
            </DescriptionWrapper>
          </ContentWrapper>
        </ChatListItemWrapper>
      </ChatListItem>
    </>
  );
};

const ChatListItem = styled.li`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 300px;
  background-color: #fff;
  border-bottom: 1px solid #dfdfdf;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background-color: #ebebebce;
  }
`;

const ChatListItemWrapper = styled.a`
  overflow: hidden;
  display: flex;
  position: relative;
  height: 80px;
  padding: 0 20px;
  box-sizing: border-box;
  align-items: center;
`;

const ProfileWrapper = styled.div`
  height: 40px;
  margin-right: 8px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #b4b4b4;
  }
`;

const ContentWrapper = styled.div`
  flex: 1 0 0%;
  width: 0x;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TitleSenderName = styled.span`
  display: flex;
  align-items: center;
  height: 20px;
  font-weight: bold;
  font-size: 14px;
  letter-spacing: -0.02em;
  color: #6d6d6d;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TitleSubText = styled.div`
  margin-left: 6px;
  font-size: 12px;
  color: #9b9ea3;
  white-space: nowrap;
`;

const DescriptionWrapper = styled.div``;

const DescriptionContent = styled.span`
  overflow: hidden;
  width: 100%;
  font-size: 14px;
  color: #3d3d3d;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default ChatList;
