import { css } from '@emotion/react';
import styled from '@emotion/styled';

const ChatList: React.FC = () => {
  return (
    <>
      <ChatListItem>
        <a href="#">
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
              <DescriptionContent>11시에 만나요!</DescriptionContent>
            </DescriptionWrapper>
          </ContentWrapper>
        </a>
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
  cursor: pointer;

  & a {
    display: flex;
    padding: 16px;
    height: 52px;
    align-items: center;
    position: relative;
    overflow: hidden;
    background-position: center center;
    contain: content;
  }

  &:hover {
    background-color: #ebebebce;
  }
`;

const ProfileWrapper = styled.div`
  margin-right: 8px;
  height: 40px;

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
  color: #868b94;
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

const DescriptionWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
  color: #3d3d3d;
`;

const DescriptionContent = styled.span`
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default ChatList;
