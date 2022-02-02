import { useMediaQuery } from 'react-responsive';

import styled from '@emotion/styled';

import Skeleton from '@mui/material/Skeleton';

const SkeletonUserItem: React.FC = () => {
  const extraLargeMedia = useMediaQuery({
    query: '(max-width: 1199px)',
  });
  const smallMedia = useMediaQuery({
    query: '(max-width: 575px)',
  });

  return (
    <Item>
      <ItemHeader>
        <ProfileImgWrapper>
          <Skeleton
            variant="rectangular"
            width={smallMedia ? 40 : 50}
            height={smallMedia ? 40 : 50}
          />
        </ProfileImgWrapper>
        <MainInfoList>
          <UserName>
            <Skeleton
              variant="text"
              width={extraLargeMedia ? 44 : 50}
              height={extraLargeMedia ? 24 : 30}
            />
          </UserName>
          <Skeleton
            variant="text"
            width={extraLargeMedia ? 110 : 120}
            height={extraLargeMedia ? 18 : 22}
          />
        </MainInfoList>
      </ItemHeader>
      <ItemBody>
        <SubInfoList>
          <SubInfoItem>
            <Label>
              <Skeleton
                variant="text"
                width={extraLargeMedia ? 84 : 84}
                height={extraLargeMedia ? 18 : 21}
              />
            </Label>
            <Content>
              <Skeleton
                variant="text"
                width={extraLargeMedia ? 90 : 100}
                height={extraLargeMedia ? 18 : 21}
              />
            </Content>
          </SubInfoItem>
          <SubInfoItem>
            <Label>
              <Skeleton
                variant="text"
                width={extraLargeMedia ? 84 : 84}
                height={extraLargeMedia ? 18 : 21}
              />
            </Label>
            <Content>
              <Skeleton
                variant="text"
                width={extraLargeMedia ? 100 : 110}
                height={extraLargeMedia ? 18 : 21}
              />
            </Content>
          </SubInfoItem>
          <SubInfoItem>
            <Label>
              <Skeleton
                variant="text"
                width={extraLargeMedia ? 84 : 84}
                height={extraLargeMedia ? 18 : 21}
              />
            </Label>
            <Content>
              <Skeleton
                variant="text"
                width={extraLargeMedia ? 100 : 110}
                height={extraLargeMedia ? 18 : 21}
              />
            </Content>
          </SubInfoItem>
          <SubInfoItem>
            <Label>
              <Skeleton
                variant="text"
                width={extraLargeMedia ? 84 : 84}
                height={extraLargeMedia ? 18 : 21}
              />
            </Label>
            <Content>
              <Skeleton
                variant="text"
                width={extraLargeMedia ? '90%' : '100%'}
                height={extraLargeMedia ? 18 : 21}
              />
            </Content>
          </SubInfoItem>
          <SubInfoItem>
            <Label>
              <Skeleton
                variant="text"
                width={extraLargeMedia ? 84 : 84}
                height={extraLargeMedia ? 18 : 21}
              />
            </Label>
            <Content>
              <Skeleton
                variant="text"
                width={extraLargeMedia ? '85%' : '100%'}
                height={extraLargeMedia ? 18 : 21}
              />
            </Content>
          </SubInfoItem>
        </SubInfoList>
      </ItemBody>
      <ItemFooter>
        <RequestButton />
        <ProfileLink />
      </ItemFooter>
    </Item>
  );
};

const Item = styled.li`
  display: flex;
  flex-direction: column;
  width: 373px;
  margin: 8px;
  padding: 16px;
  border: 1px solid #d7e2eb;
  border-radius: 4px;
  box-sizing: border-box;

  &.belong {
    background-color: #f3f3f3;
  }

  &:nth-of-type(1),
  &:nth-of-type(2),
  &:nth-of-type(3) {
    margin-top: 0;
  }

  @media (max-width: 1199px) {
    width: 49%;
    margin: 0 0 2% 0;

    &:nth-of-type(even) {
      margin-left: 2%;
    }
  }
  @media (max-width: 767px) {
    width: 100%;
    max-width: 100%;
    margin: 0 0 16px 0;

    &:nth-of-type(even) {
      margin-left: 0;
    }
  }
`;

const ItemHeader = styled.div`
  display: flex;
  padding-bottom: 16px;
  border-bottom: 1px solid #d7e2eb;
`;

const ProfileImgWrapper = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 24px;
  border-radius: 4px;

  @media (max-width: 575px) {
    width: 46px;
    height: 46px;
  }
`;

const MainInfoList = styled.div`
  margin: auto 0;
`;

const UserName = styled.h2`
  & .user-label {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.6;
  }

  @media (max-width: 575px) {
    & .user-label {
      font-size: 15px;
    }
  }
`;

const ItemBody = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;

const SubInfoList = styled.ul`
  width: 100%;
`;

const SubInfoItem = styled.li`
  overflow: hidden;
  display: flex;
  width: 100%;
  border-bottom: 1px solid #d7e2eb;
  box-sizing: border-box;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Label = styled.label`
  overflow: hidden;
  display: flex;
  align-items: center;
  min-width: 84px;
  padding: 6px 0;
`;

const Content = styled.p`
  overflow: hidden;
  width: 100%;
  padding: 6px 16px;
`;

const ItemFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RequestButton = styled.button`
  width: 100%;
  height: 35px;
  margin-right: 12px;
  padding: 7px 0;
  border: none;
  border-radius: 4px;
  background-color: #3396f4;

  @media (max-width: 575px) {
    height: 33px;
  }
`;

const ProfileLink = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 35px;
  padding: 7px 0;
  border: none;
  border-radius: 4px;
  background-color: #e9ecf3;

  @media (max-width: 575px) {
    height: 33px;
  }
`;

export default SkeletonUserItem;
