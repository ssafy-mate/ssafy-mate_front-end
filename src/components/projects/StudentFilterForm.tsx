import React from 'react';

import styled from '@emotion/styled';

const StudentFilterForm: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <FilterList>
          <FilterSelect name="campus" defaultValue={'default'}>
            <option value="default" disabled>
              캠퍼스
            </option>
            <option value="서울">서울</option>
            <option value="대전">대전</option>
            <option value="광주">광주</option>
            <option value="구미">구미</option>
            <option value="부울경">부울경</option>
          </FilterSelect>
          <FilterSelect
            name="specializaion-project-track"
            defaultValue={'default'}
          >
            <option value="default" disabled>
              트랙
            </option>
            <option value="인공지능">인공지능</option>
            <option value="빅데이터">빅데이터</option>
            <option value="블록체인">블록체인</option>
            <option value="IoT 제어">IoT 제어</option>
          </FilterSelect>
          <FilterSelect name="job1" defaultValue={'default'}>
            <option value="default" disabled>
              희망 직무
            </option>
            <option value="프론트엔드 (Front-end)">
              프론트엔드 (Front-end)
            </option>
            <option value="백엔드 (Back-end)">백엔드 (Back-end)</option>
          </FilterSelect>
        </FilterList>
        <FilterList>
          <FilterSelect name="ssafy-track" defaultValue={'default'}>
            <option value="default" disabled>
              교육 트랙
            </option>
            <option value="전공자 (Java Track)">전공자 (Java Track)</option>
            <option value="비전공자 (Python Track)">
              비전공자 (Python Track)
            </option>
          </FilterSelect>
          <FilterInput
            type="text"
            name="student-name-search"
            placeholder="교육생 이름 검색"
          />
          <FilterInput
            type="text"
            name="team-tech-stack-search"
            placeholder="기술 스택 검색"
          />
        </FilterList>
      </Wrapper>
    </Container>
  );
};

const Container = styled.section`
  max-width: 1200px;
  margin: 0 auto 24px;
  padding: 0 16px;
  box-sizing: border-box;
`;

const Wrapper = styled.div``;

const FilterList = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;

  @media (max-width: 540px) {
    margin-bottom: 0px;
    flex-direction: column;
    align-items: center;
  }
`;

const FilterSelect = styled.select`
  width: 100%;
  max-width: 378px;
  height: 42px;
  padding: 0 14px;
  border: 1px solid #d7e2eb;
  border-radius: 4px;
  box-sizing: border-box;
  background-position: calc(100% - 0.8rem) 49%;
  background-size: 0.625rem 0.3125rem;
  background-color: #fbfbfd;
  background-image: url(/images/assets/toggle-black.png);
  background-repeat: no-repeat;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.6;
  color: #263747;
  appearance: none;
  transition: color 0.08s ease-in-out, background-color 0.08s ease-in-out,
    border-color 0.08s ease-in-out, box-shadow 0.08s ease-in-out;
  cursor: pointer;

  &:hover {
    border: 1px solid #3396f4;
    box-shadow: inset 0 0 0 1px#3396f4;
  }
  &:focus {
    border: 1px solid #3396f4;
    box-shadow: inset 0 0 0 1px #3396f4;
    background-color: #fff;
    color: #495057;
  }
  &:nth-of-type(2) {
    margin: 0 12px;
  }

  @media (max-width: 540px) {
    max-width: 540px;
    height: 38px;
    margin-bottom: 8px;
    font-size: 14px;

    &:nth-of-type(2) {
      margin-bottom: 8px;
    }
  }
`;

const FilterInput = styled.input`
  width: 100%;
  max-width: 378px;
  height: 42px;
  padding: 0 14px;
  border: 1px solid #d7e2eb;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #fbfbfd;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.6;
  color: #263747;
  transition: color 0.08s ease-in-out, background-color 0.08s ease-in-out,
    border-color 0.08s ease-in-out, box-shadow 0.08s ease-in-out;
  cursor: pointer;

  &:hover {
    border: 1px solid #3396f4;
    box-shadow: inset 0 0 0 1px#3396f4;
  }
  &:focus {
    border: 1px solid #3396f4;
    box-shadow: inset 0 0 0 1px #3396f4;
    background-color: #fff;
    color: #495057;
  }
  &:nth-of-type(1) {
    margin: 0 12px;
  }

  @media (max-width: 540px) {
    max-width: 540px;
    height: 38px;
    margin-bottom: 8px;
    font-size: 14px;

    &:nth-of-type(1) {
      margin-bottom: 8px;
    }
  }
`;

export default StudentFilterForm;
