import React from 'react';

import styled from '@emotion/styled';

import WebIcon from '@mui/icons-material/Web';
import StorageIcon from '@mui/icons-material/Storage';
import GroupsIcon from '@mui/icons-material/Groups';

const Announcement: React.FC = () => {
  return (
    <Container>
      <AnnouncementHeader>
        <TotalCount>총 28개의 팀</TotalCount>
        <FilterSelect>
          <option value="recent" selected>
            최신순
          </option>
          <option value="headcount">인원순</option>
        </FilterSelect>
      </AnnouncementHeader>
      <TeamList>
        <TeamItem>
          <ItemHeader>
            <ItemImg
              src="/images/projects/sample-team_logo1.png"
              alt="샘플 팀 로고"
            />
          </ItemHeader>
          <ItemBody>
            <TeamTitle>
              실제 운영할 서비스 개발을 도전할 분들을 모집합니다.
            </TeamTitle>
            <TeamName>
              데스파시토 <TeamCampus>(서울)</TeamCampus>
            </TeamName>
            <TeamStatusList>
              <TeamStatusItem>
                <WebIcon />
                <Job>Front-end</Job> 1 / 3
              </TeamStatusItem>
              <TeamStatusItem>
                <StorageIcon />
                <Job>Back-end</Job> 2 / 3
              </TeamStatusItem>
              <TeamStatusItem>
                <GroupsIcon />
                <Job>Total</Job> 3 / 6
              </TeamStatusItem>
            </TeamStatusList>
            <TechStackList>
              <TeckStackItem>React</TeckStackItem>
              <TeckStackItem>Redux</TeckStackItem>
              <TeckStackItem>Spring Boot</TeckStackItem>
              <TeckStackItem>MySQL</TeckStackItem>
            </TechStackList>
          </ItemBody>
        </TeamItem>
        <TeamItem className="full">
          <ItemHeader>
            <ItemImg
              src="/images/projects/sample-team_logo2.png"
              alt="샘플 팀 로고"
            />
          </ItemHeader>
          <ItemBody>
            <TeamTitle>워라벨을 지향하는 팀원들을 모집합니다.</TeamTitle>
            <TeamName>
              워라벨 <TeamCampus>(서울)</TeamCampus>
            </TeamName>
            <TeamStatusList>
              <TeamStatusItem>
                <WebIcon />
                <Job>Front-end</Job> 3 / 3
              </TeamStatusItem>
              <TeamStatusItem>
                <StorageIcon />
                <Job>Back-end</Job> 3 / 3
              </TeamStatusItem>
              <TeamStatusItem>
                <GroupsIcon />
                <Job>Total</Job> 6 / 6
              </TeamStatusItem>
            </TeamStatusList>
            <TechStackList>
              <TeckStackItem>Vue.js</TeckStackItem>
              <TeckStackItem>Vuex</TeckStackItem>
              <TeckStackItem>django</TeckStackItem>
              <TeckStackItem>MySQL</TeckStackItem>
            </TechStackList>
          </ItemBody>
        </TeamItem>
        <TeamItem>
          <ItemHeader>
            <ItemImg
              src="/images/projects/sample-team_logo3.png"
              alt="샘플 팀 로고"
            />
          </ItemHeader>
          <ItemBody>
            <TeamTitle>재밌게 팀 프로젝트 진행하실 분 모집합니다.</TeamTitle>
            <TeamName>
              문어와 친구들 <TeamCampus>(서울)</TeamCampus>
            </TeamName>
            <TeamStatusList>
              <TeamStatusItem>
                <WebIcon />
                <Job>Front-end</Job> 2 / 3
              </TeamStatusItem>
              <TeamStatusItem>
                <StorageIcon />
                <Job>Back-end</Job> 2 / 3
              </TeamStatusItem>
              <TeamStatusItem>
                <GroupsIcon />
                <Job>Total</Job> 4 / 6
              </TeamStatusItem>
            </TeamStatusList>
            <TechStackList>
              <TeckStackItem>React</TeckStackItem>
              <TeckStackItem>Recoil</TeckStackItem>
              <TeckStackItem>Spring Boot</TeckStackItem>
              <TeckStackItem>MongoDB</TeckStackItem>
              <TeckStackItem>Docker</TeckStackItem>
            </TechStackList>
          </ItemBody>
        </TeamItem>
        <TeamItem>
          <ItemHeader>
            <ItemImg
              src="/images/projects/sample-team_logo4.png"
              alt="샘플 팀 로고"
            />
          </ItemHeader>
          <ItemBody>
            <TeamTitle>최우수상에 도전하실 분들을 모집합니다.</TeamTitle>
            <TeamName>
              크로켓 <TeamCampus>(서울)</TeamCampus>
            </TeamName>
            <TeamStatusList>
              <TeamStatusItem>
                <WebIcon />
                <Job>Front-end</Job> 3 / 3
              </TeamStatusItem>
              <TeamStatusItem>
                <StorageIcon />
                <Job>Back-end</Job> 2 / 3
              </TeamStatusItem>
              <TeamStatusItem>
                <GroupsIcon />
                <Job>Total</Job> 5 / 6
              </TeamStatusItem>
            </TeamStatusList>
            <TechStackList>
              <TeckStackItem>React</TeckStackItem>
              <TeckStackItem>Redux</TeckStackItem>
              <TeckStackItem>Emotion</TeckStackItem>
              <TeckStackItem>Spring Boot</TeckStackItem>
              <TeckStackItem>MySQL</TeckStackItem>
              <TeckStackItem>Docker</TeckStackItem>
            </TechStackList>
          </ItemBody>
        </TeamItem>
      </TeamList>
    </Container>
  );
};

const Container = styled.section`
  max-width: 1200px;
  margin: 0 auto 24px;
  padding: 0 16px;
  box-sizing: border-box;
`;

const AnnouncementHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const TotalCount = styled.h6`
  margin: auto 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  color: #263747;
`;

const FilterSelect = styled.select`
  padding: 0.3125rem 2rem 0.3125rem 1rem;
  border-color: #e9ecf3;
  border-radius: 4px;
  background-position: calc(100% - 0.6rem) 49%;
  background-size: 0.625rem 0.3125rem;
  background-color: #e9ecf3;
  background-image: url(/images/assets/toggle-black.png);
  background-repeat: no-repeat;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
  color: #263747;
  appearance: none;
  transition: all 0.08s ease-in-out;
  cursor: pointer;
`;

const TeamList = styled.ul`
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 1015px) {
    flex-direction: column;
  }
`;

const TeamItem = styled.li`
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
    border: 1px solid #3396f4;
  }
  &:nth-child(even) {
    margin-left: 16px;
  }

  @media (max-width: 1015px) {
    width: 100%;
    max-width: 100%;

    &:nth-child(even) {
      margin-left: 0;
    }
  }

  &.full {
    background-color: #f3f3f3;
    filter: grayscale(80%);
  }
`;

const ItemHeader = styled.div`
  width: 72px;
  height: 72px;
  margin-right: 24px;
  border-radius: 4px;
`;

const ItemImg = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 4px;
  object-fit: contain;
`;

const ItemBody = styled.div``;

const TeamTitle = styled.h5`
  margin-bottom: 8px;
  font-size: 18px;
  line-height: 1.5;
  color: #263747;
  text-overflow: ellipsis;
`;

const TeamCampus = styled.span``;

const TeamName = styled.h6`
  margin-bottom: 4px;
  font-size: 14px;
  color: #98a8b9;
`;

const TeamStatusList = styled.ul`
  display: flex;
  margin-bottom: 6px;
`;

const TeamStatusItem = styled.li`
  font-size: 14px;
  color: #98a8b9;
  line-height: 1.5;

  svg {
    margin-right: 2px;
    padding-bottom: 2px;
    font-size: 18px;
    line-height: 1.5;
    vertical-align: middle;
  }

  &:not(:last-of-type) {
    &:after {
      content: '';
      display: inline-block;
      width: 1px;
      height: 10px;
      margin: 0 8px;
      background-color: #98a8b9;
    }
  }
`;

const Job = styled.span`
  @media (max-width: 526px) {
    display: none;
  }
`;

const TechStackList = styled.ul`
  display: flex;
`;

const TeckStackItem = styled.li`
  display: inline-block;
  margin-right: 0.25rem;
  padding: 0.1875rem 0.5rem;
  border-radius: 0.25rem;
  background-color: #e9ecf3;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
  color: #44576c;
  vertical-align: top;

  &:last-of-type {
    margin-right: 0;
  }
`;

export default Announcement;
