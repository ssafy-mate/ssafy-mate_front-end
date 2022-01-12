import React from 'react';

import styled from '@emotion/styled';

const AuthForm: React.FC = () => {
  return (
    <Container>
      <SsafyInfo>
        <InputWrapper>
          <Label>지역</Label>
          <CampusSelect name="campus" defaultValue={'default'}>
            <option value="default" disabled>
              지역
            </option>
            <option value="seoul">서울</option>
            <option value="daejeon">대전</option>
            <option value="gwangju">광주</option>
            <option value="gumi">구미</option>
            <option value="busan">부울경</option>
          </CampusSelect>
        </InputWrapper>
        <InputWrapper>
          <Label>학번</Label>
          <InfoInput />
        </InputWrapper>
      </SsafyInfo>
      <InputWrapper>
        <Label>이름</Label>
        <InfoInput />
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
`;

const Label = styled.label`
  margin-bottom: 4px;
  font-size: 14px;
  line-height: 1.5;
  color: #263747;
`;

export default AuthForm;
