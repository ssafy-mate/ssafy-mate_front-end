import React from 'react';

import styled from '@emotion/styled';

const AuthForm: React.FC = () => {
  return (
    <Container>
      <SsafyInfo>
        <InputWrapper>
          <RequirementLabel htmlFor="campus">캠퍼스</RequirementLabel>
          <Select id="campus" name="campus" defaultValue={'default'}>
            <option value="default" disabled>
              - 선택 -
            </option>
            <option value="서울">서울</option>
            <option value="대전">대전</option>c
            <option value="광주">광주</option>
            <option value="구미">구미</option>
            <option value="부울경">부울경</option>
          </Select>
        </InputWrapper>
        <InputWrapper>
          <RequirementLabel htmlFor="ssafy-track">
            SSAFY 교육 트랙
          </RequirementLabel>
          <Select id="ssafy-track" name="ssafy-track" defaultValue={'default'}>
            <option value="default" disabled>
              - 선택 -
            </option>
            <option value="Java Track">Java Track</option>
            <option value="Python Track">Python Track</option>
            <option value="Embeded Track">Embeded Track</option>
            <option value="Mobile Track">Mobile Track</option>
          </Select>
        </InputWrapper>
      </SsafyInfo>
      <InputWrapper>
        <RequirementLabel htmlFor="student-number">학번</RequirementLabel>
        <InfoInput type="text" id="student-number" name="student-number" />
      </InputWrapper>
      <InputWrapper>
        <RequirementLabel htmlFor="student-name">이름</RequirementLabel>
        <InfoInput type="text" id="student-name" name="student-name" />
      </InputWrapper>
      <AuthButton>교육생 인증</AuthButton>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const SsafyInfo = styled.div`
  display: flex;

  @media (max-width: 414px) {
    flex-direction: column;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 16px;

  &:first-of-type {
    width: 60%;
    margin-right: 12px;
  }
  &:last-of-type {
    margin-bottom: 0;
  }

  @media (max-width: 414px) {
    &:first-of-type {
      width: 100%;
      margin-right: 0;
    }
  }
`;

const Select = styled.select`
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  outline: 0;
  border: 1px solid #d7e2eb;
  border-radius: 0.25rem;
  box-sizing: border-box;
  background-position: calc(100% - 0.8rem) 49%;
  background-size: 0.625rem 0.3125rem;
  background-color: #fbfbfd;
  background-image: url(/images/assets/toggle-black.png);
  background-repeat: no-repeat;
  font-size: 16px;
  line-height: 24px;
  color: #263747;
  transition: all 0.08s ease-in-out;
  appearance: none;

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

  @media (max-width: 540px) {
    font-size: 13px;
  }
`;

const InfoInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  outline: 0;
  border: 1px solid #d7e2eb;
  border-radius: 0.25rem;
  box-sizing: border-box;
  background-color: #fbfbfd;
  font-size: 16px;
  line-height: 24px;
  color: #263747;
  transition: all 0.08s ease-in-out;

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

  @media (max-width: 540px) {
    font-size: 13px;
  }
`;

const AuthButton = styled.button`
  width: 100%;
  height: 40px;
  margin-top: 24px;
  border: none;
  border-radius: 0.25rem;
  box-sizing: border-box;
  background-color: #3396f4;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  transition: background-color 0.08s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #2878c3;
  }

  @media (max-width: 540px) {
    font-size: 15px;
  }
`;

const RequirementLabel = styled.label`
  margin-bottom: 4px;
  font-size: 14px;
  line-height: 1.5;
  color: #263747;

  &::before {
    content: '*';
    display: inline-block;
    vertical-align: top;
    margin: 0 0.125rem 0 0;
    -webkit-font-smoothing: antialiased;
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.25rem;
    color: #f44336;
  }

  @media (max-width: 540px) {
    font-size: 13px;
  }
`;

export default AuthForm;
