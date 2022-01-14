import React from 'react';

import styled from '@emotion/styled';

const AuthForm: React.FC = () => {
  return (
    <Container>
      <SsafyInfo>
        <InputWrapper>
          <Label htmlFor="campus">캠퍼스</Label>
          <CampusSelect id="campus" name="campus" defaultValue={'default'}>
            <option value="default" disabled>
              - 선택 -
            </option>
            <option value="서울">서울</option>
            <option value="대전">대전</option>
            <option value="광주">광주</option>
            <option value="구미">구미</option>
            <option value="부울경">부울경</option>
          </CampusSelect>
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="student-number">학번</Label>
          <InfoInput type="text" id="student-number" name="student-number" />
        </InputWrapper>
      </SsafyInfo>
      <InputWrapper>
        <Label htmlFor="student-name">이름</Label>
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
  margin-bottom: 16px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  &:first-of-type {
    margin-right: 12px;
    width: 50%;
  }
`;

const CampusSelect = styled.select`
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

const Label = styled.label`
  margin-bottom: 4px;
  font-size: 14px;
  line-height: 1.5;
  color: #263747;

  @media (max-width: 540px) {
    font-size: 13px;
  }
`;

export default AuthForm;
