import React from 'react';

import { useForm } from 'react-hook-form';

import styled from '@emotion/styled';

interface StudentAuth {
  campus: string;
  ssafyTrack: string;
  studentNumber: string;
  studentName: string;
}

const AuthForm: React.FC = () => {
  //let StudentAuth: StudentAuth;

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentAuth>({ mode: 'onChange' });

  const onSubmit = (data: StudentAuth) => {
    // StudentAuth = data;
    // console.log(JSON.stringify(StudentAuth));
    alert(JSON.stringify(data));
  };

  const selectCampus = watch('campus', '');

  return (
    <>
      <Container onSubmit={handleSubmit(onSubmit)}>
        <SsafyInfo>
          <InputWrapper>
            <RequirementLabel htmlFor="campus">캠퍼스</RequirementLabel>
            <Select
              id="campus"
              {...register('campus')}
              defaultValue={'default'}
            >
              <option value="default" disabled>
                - 선택 -
              </option>
              <option value="서울">서울</option>
              <option value="대전">대전</option>
              <option value="광주">광주</option>
              <option value="구미">구미</option>
              <option value="부울경">부울경</option>
            </Select>
          </InputWrapper>

          <InputWrapper>
            <RequirementLabel htmlFor="ssafy-track">
              SSAFY 교육 트랙
            </RequirementLabel>
            {(() => {
              if (selectCampus === '서울') {
                return (
                  <Select
                    id="ssafy-track"
                    {...register('ssafyTrack')}
                    defaultValue={'default'}
                  >
                    <option value="default" disabled>
                      - 선택 -
                    </option>
                    <option value="Python Track">Python Track</option>
                    <option value="Java Track">Java Track</option>
                    <option value="Embedded Track">Embedded Track</option>
                  </Select>
                );
              } else if (
                selectCampus === '대전' ||
                selectCampus === '부울경' ||
                selectCampus === '광주'
              ) {
                return (
                  <Select {...register('ssafyTrack')} defaultValue={'default'}>
                    <option value="default" disabled>
                      - 선택 -
                    </option>
                    <option value="Python Track">Python Track</option>
                    <option value="Java Track">Java Track</option>
                  </Select>
                );
              } else if (selectCampus === '구미') {
                return (
                  <Select {...register('ssafyTrack')} defaultValue={'default'}>
                    <option value="default" disabled>
                      - 선택 -
                    </option>
                    <option value="Python Track">Python Track</option>
                    <option value="Java Track">Java Track</option>
                    <option value="Mobile Track">Mobile Track</option>
                  </Select>
                );
              } else {
                return (
                  <Select {...register('ssafyTrack')} defaultValue={'default'}>
                    <option value="default" disabled>
                      - 선택 -
                    </option>
                  </Select>
                );
              }
            })()}
          </InputWrapper>
        </SsafyInfo>

        <InputWrapper>
          <RequirementLabel htmlFor="student-number">학번</RequirementLabel>
          <InfoInput
            type="text"
            id="student-number"
            {...register('studentNumber', { required: true })}
            placeholder="학번을 입력해주세요"
          />
        </InputWrapper>

        <InputWrapper>
          <RequirementLabel htmlFor="student-name">이름</RequirementLabel>
          <InfoInput
            type="text"
            id="student-name"
            {...register('studentName', { required: true })}
            placeholder="이름을 입력해주세요"
          />
        </InputWrapper>

        <AuthButton type="submit">교육생 인증</AuthButton>
      </Container>
    </>
  );
};

const Container = styled.form`
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
