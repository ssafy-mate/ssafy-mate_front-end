import React from 'react';

import { useForm } from 'react-hook-form';

import styled from '@emotion/styled';

import {
  exceptDefaultReg,
  onlyKoreanReg,
  onlyNumberReg,
} from '../../data/regularExpressionData';
import { campusListData } from '../../data/ssafyData';

interface SsafyTrack {
  id: string;
  name: string;
}

interface SsafyAuth {
  campus: string;
  ssafyTrack: string;
  studentNumber: string;
  studentName: string;
}

interface SsafyAuthProps {
  campus: string;
  ssafyTrack: string;
  studentNumber: string;
  studentName: string;
  signUpStep: number;
  updateCampus: (campus: string) => void;
  updateSsafyTrack: (ssafyTrack: string) => void;
  updateStudentNumber: (studentNumber: string) => void;
  updateStudentName: (studentName: string) => void;
  updateSignUpStep: (signUpStep: number) => void;
}

const AuthForm: React.FC<SsafyAuthProps> = ({
  campus,
  updateCampus,
  ssafyTrack,
  updateSsafyTrack,
  studentNumber,
  updateStudentNumber,
  studentName,
  updateStudentName,
  signUpStep,
  updateSignUpStep,
}) => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SsafyAuth>({ mode: 'onChange' });

  const selectedCampus = watch('campus', '');

  let selectedTracks: Array<SsafyTrack>;

  const updateSsafyAuthProps = (data: SsafyAuth) => {
    const { campus, ssafyTrack, studentNumber, studentName } = data;
    updateCampus(campus);
    updateSsafyTrack(ssafyTrack);
    updateStudentNumber(studentNumber);
    updateStudentName(studentName);
    updateSignUpStep(1);
  };

  const onSubmit = (data: SsafyAuth) => {
    //post 요청 보내기->인증 통과한 경우
    //alert(JSON.stringify(data));
    updateSsafyAuthProps(data);

    //통과하지 못한 경우 modal 창 띄우기->리다이렉트?
  };

  return (
    <>
      <Container onSubmit={handleSubmit(onSubmit)}>
        <SsafyInfo>
          <InputWrapper>
            <RequirementLabel htmlFor="campus">캠퍼스</RequirementLabel>
            <Select
              id="campus"
              {...register('campus', {
                pattern: {
                  value: exceptDefaultReg,
                  message: '지역을 선택해주세요.',
                },
              })}
              defaultValue={'default'}
            >
              <option value="default" disabled>
                - 선택 -
              </option>
              {campusListData.map((campus) => (
                <option key={campus.id} value={campus.area}>
                  {campus.area}
                </option>
              ))}
            </Select>

            {errors.campus?.type === 'pattern' && (
              <ErrorSpan>{errors.campus.message}</ErrorSpan>
            )}
          </InputWrapper>

          <InputWrapper>
            <RequirementLabel htmlFor="ssafy-track">
              SSAFY 교육 트랙
            </RequirementLabel>
            <Select
              id="ssafy-track"
              {...register('ssafyTrack', {
                pattern: {
                  value: exceptDefaultReg,
                  message: '트랙을 선택해주세요.',
                },
              })}
              defaultValue={'default'}
            >
              <option value="default" disabled>
                - 선택 -
              </option>
              {campusListData.map((campus) => {
                if (selectedCampus === campus.area) {
                  selectedTracks = campus.educationTrack;
                  return (
                    <>
                      {selectedTracks.map((track: SsafyTrack) => (
                        <option key={track.id} value={track.name}>
                          {track.name}
                        </option>
                      ))}
                    </>
                  );
                }
              })}
            </Select>

            {errors.ssafyTrack?.type === 'pattern' && (
              <ErrorSpan>{errors.ssafyTrack.message}</ErrorSpan>
            )}
          </InputWrapper>
        </SsafyInfo>

        <InputWrapper>
          <RequirementLabel htmlFor="student-number">학번</RequirementLabel>
          <InfoInput
            type="text"
            id="student-number"
            {...register('studentNumber', {
              required: {
                value: true,
                message: '학번을 입력해주세요.',
              },
              pattern: {
                value: onlyNumberReg,
                message: '교육생 인증을 위해 학번을 정확하게 입력해주세요.',
              },
              maxLength: {
                value: 7,
                message: '교육생 인증을 위해 학번을 정확하게 입력해주세요.',
              },
              minLength: {
                value: 7,
                message: '교육생 인증을 위해 학번을 정확하게 입력해주세요.',
              },
            })}
          />

          {(() => {
            if (
              errors.studentNumber?.type === 'required' ||
              errors.studentNumber?.type === 'pattern' ||
              errors.studentNumber?.type === 'maxLength' ||
              errors.studentNumber?.type === 'minLength'
            ) {
              return <ErrorSpan>{errors.studentNumber.message}</ErrorSpan>;
            }
          })()}
        </InputWrapper>

        <InputWrapper>
          <RequirementLabel htmlFor="student-name">이름</RequirementLabel>
          <InfoInput
            type="text"
            id="student-name"
            {...register('studentName', {
              required: {
                value: true,
                message: '이름 입력해주세요.',
              },
              pattern: {
                value: onlyKoreanReg,
                message: '교육생 인증을 위해 이름을 정확하게 입력해주세요.',
              },
            })}
          />

          {(() => {
            if (
              errors.studentName?.type === 'required' ||
              errors.studentName?.type === 'pattern'
            ) {
              return <ErrorSpan>{errors.studentName.message}</ErrorSpan>;
            }
          })()}
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

const ErrorSpan = styled.span`
  padding: 8px 12px;
  font-weight: 400;
  font-size: 13px;
  color: #f44336;
`;

export default AuthForm;
