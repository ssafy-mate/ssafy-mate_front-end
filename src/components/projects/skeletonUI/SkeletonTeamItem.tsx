import { useMediaQuery } from 'react-responsive';

import styled from '@emotion/styled';

import Skeleton from '@mui/material/Skeleton';

const SkeletonTeamItem: React.FC = () => {
  const extraLargeMedia = useMediaQuery({
    query: '(max-width: 1199px)',
  });

  return (
    <Item>
      <TeamInfoPageLink>
        <ItemHeader>
          <Skeleton
            variant="rectangular"
            width={extraLargeMedia ? 40 : 72}
            height={extraLargeMedia ? 40 : 72}
          />
        </ItemHeader>
        <ItemBody>
          <Notice>
            <Skeleton
              variant="text"
              width={extraLargeMedia ? '80%' : 400}
              height={extraLargeMedia ? 24 : 40}
            />
          </Notice>
          <TeamName>
            <Skeleton
              variant="text"
              width={extraLargeMedia ? 100 : 120}
              height={extraLargeMedia ? 18 : 28}
            />
          </TeamName>
          <TeamStatusList>
            <TeamStatusItem>
              <Skeleton
                variant="text"
                width={extraLargeMedia ? 110 : 120}
                height={extraLargeMedia ? 18 : 28}
              />
            </TeamStatusItem>
            <TeamStatusItem>
              <Skeleton
                variant="text"
                width={extraLargeMedia ? 110 : 120}
                height={extraLargeMedia ? 18 : 28}
              />
            </TeamStatusItem>
            <TeamStatusItem>
              <Skeleton
                variant="text"
                width={extraLargeMedia ? 110 : 120}
                height={extraLargeMedia ? 18 : 28}
              />
            </TeamStatusItem>
          </TeamStatusList>
          <TechStackList>
            <TechStackItem>
              <Skeleton
                variant="text"
                width={extraLargeMedia ? 46 : 50}
                height={extraLargeMedia ? 30 : 36}
              />
            </TechStackItem>
            <TechStackItem>
              <Skeleton
                variant="text"
                width={extraLargeMedia ? 46 : 50}
                height={extraLargeMedia ? 30 : 36}
              />
            </TechStackItem>
            <TechStackItem>
              <Skeleton
                variant="text"
                width={extraLargeMedia ? 46 : 50}
                height={extraLargeMedia ? 30 : 36}
              />
            </TechStackItem>
          </TechStackList>
        </ItemBody>
      </TeamInfoPageLink>
    </Item>
  );
};

const Item = styled.li`
  display: flex;
  width: calc(50% - 0.5rem);
  max-width: 576px;
  margin-bottom: 16px;
  padding: 24px;
  border: 1px solid #d7e2eb;
  border-radius: 4px;
  box-sizing: border-box;
  transition: all 0.08s ease-in-out;
  cursor: pointer;

  &:hover {
    border: 1px solid #84c0f8;
    background-color: #f8fbfe;
  }
  &:nth-of-type(even) {
    margin-left: 16px;
  }

  @media (max-width: 1199px) {
    width: 100%;
    max-width: 100%;

    &:nth-of-type(even) {
      margin-left: 0;
    }
  }
  @media (max-width: 575px) {
    padding: 16px;
  }
`;

const TeamInfoPageLink = styled.div`
  display: flex;
  width: 100%;
`;

const ItemHeader = styled.div`
  width: 72px;
  height: 72px;
  margin-right: 24px;
  border-radius: 4px;

  @media (max-width: 575px) {
    width: 40px;
    height: 40px;
  }
`;

const ItemBody = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

const Notice = styled.h1`
  width: 100%;
`;

const TeamName = styled.h2`
  display: flex;
  margin-bottom: 6px;
`;

const TeamStatusList = styled.ul`
  display: flex;
  margin-bottom: 6px;

  @media (max-width: 575px) {
    flex-direction: column;
  }
`;

const TeamStatusItem = styled.li`
  margin-right: 8px;

  &:last-of-type {
    margin-right: 0;
  }

  @media (max-width: 575px) {
    margin-right: 0;
  } ;
`;

const TechStackList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const TechStackItem = styled.li`
  margin-right: 4px;
  margin-bottom: 4px;

  &:last-of-type {
    margin-right: 0;
  }
`;

export default SkeletonTeamItem;
