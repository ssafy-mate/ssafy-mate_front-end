import React from 'react';

import styled from '@emotion/styled';

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
              src="/images/projects/sample-team_logo.png"
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
          </ItemBody>
        </TeamItem>
        <TeamItem>
          <ItemHeader>
            <ItemImg
              src="/images/projects/sample-team_logo.png"
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
          </ItemBody>
        </TeamItem>
        <TeamItem>
          <ItemHeader>
            <ItemImg
              src="/images/projects/sample-team_logo.png"
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
          </ItemBody>
        </TeamItem>
        <TeamItem>
          <ItemHeader>
            <ItemImg
              src="/images/projects/sample-team_logo.png"
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
`;

const TeamItem = styled.li`
  display: flex;
  width: 100%;
  max-width: 576px;
  margin-bottom: 16px;
  padding: 24px;

  border: 1px solid #d7e2eb;
  border-radius: 4px;
  box-sizing: border-box;

  &:nth-child(even) {
    margin-left: 16px;
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
  font-size: 14px;
  color: #98a8b9;
`;

const TeamTackStackList = styled.ul``;

const TackStackItem = styled.li``;

const TeamStatus = styled.div``;

export default Announcement;
