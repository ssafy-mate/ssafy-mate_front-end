import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import styled from '@emotion/styled';

import Alert from '@mui/material/Alert';

import {
  exceptDefaultReg,
  onlyKoreanReg,
  onlyNumberReg,
  requiredFields,
} from '../../data/regularExpressionData';
import { campusListData } from '../../data/ssafyData';

import { SsafyAuth } from '../../types/commonType';

import getSsafyAuth from '../../services/UserService';
import Stack from '@mui/material/Stack';
import AlertTitle from '@mui/material/AlertTitle';
import UserService from '../../services/UserService';

interface SsafyTrack {
  id: string;
  name: string;
}

interface Props {
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

const AuthForm: React.FC<Props> = ({
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
  const [selectedTracks, setSelectedTracks] = useState<SsafyTrack[]>([]);
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SsafyAuth>({ mode: 'onChange' });
  const selectedCampus = watch('campus', '');

  useEffect(() => {
    const selectedCampusIndex = campusListData.findIndex(
      (campus) => campus.area === selectedCampus,
    );

    if (selectedCampusIndex > -1) {
      setSelectedTracks(campusListData[selectedCampusIndex].educationTrack);
    }
  }, [selectedCampus]);

  const updateSsafyAuthProps = (data: SsafyAuth) => {
    const { campus, ssafyTrack, studentNumber, studentName } = data;

    updateCampus(campus);
    updateSsafyTrack(ssafyTrack);
    updateStudentNumber(studentNumber);
    updateStudentName(studentName);
    updateSignUpStep(1);
  };

  const onSubmit = (data: SsafyAuth) => {
    AuthRequest(data);
  };

  const AuthRequest = async (data: SsafyAuth) => {
    const response = await UserService.getSsafyAuth(data);

    if (response.success) {
      updateSsafyAuthProps(data);
    }
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
                pattern: exceptDefaultReg,
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
            {errors.campus && <ErrorSpan>필수 선택 항목입니다.</ErrorSpan>}
          </InputWrapper>

          <InputWrapper>
            <RequirementLabel htmlFor="ssafy-track">
              SSAFY 교육 트랙
            </RequirementLabel>
            <Select
              id="ssafy-track"
              {...register('ssafyTrack', {
                pattern: exceptDefaultReg,
              })}
              defaultValue={'default'}
            >
              <option value="default" disabled>
                - 선택 -
              </option>
              {selectedTracks.map((track: SsafyTrack) => (
                <option key={track.id}>{track.name}</option>
              ))}
            </Select>
            {errors.ssafyTrack && <ErrorSpan>필수 선택 항목입니다.</ErrorSpan>}
          </InputWrapper>
        </SsafyInfo>

        <InputWrapper>
          <RequirementLabel htmlFor="student-number">학번</RequirementLabel>
          <InfoInput
            type="text"
            id="student-number"
            {...register('studentNumber', {
              required: true,
              pattern: onlyNumberReg,
              maxLength: 7,
              minLength: 7,
            })}
          />
          {errors.studentNumber && errors.studentNumber.type === 'required' && (
            <ErrorSpan>{requiredFields}</ErrorSpan>
          )}
          {errors.studentNumber && errors.studentNumber.type !== 'required' && (
            <ErrorSpan>올바른 학번이 아닙니다.</ErrorSpan>
          )}
        </InputWrapper>

        <InputWrapper>
          <RequirementLabel htmlFor="student-name">이름</RequirementLabel>
          <InfoInput
            type="text"
            id="student-name"
            {...register('studentName', {
              required: true,
              pattern: onlyKoreanReg,
            })}
          />
          {errors.studentName?.type === 'required' && (
            <ErrorSpan>{requiredFields}</ErrorSpan>
          )}
          {errors.studentName?.type === 'pattern' && (
            <ErrorSpan>
              교육생 인증을 위해 이름을 정확하게 입력해주세요.
            </ErrorSpan>
          )}
        </InputWrapper>

        <AuthButton type="submit" disabled={!isValid}>
          교육생 인증
        </AuthButton>
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

  &:disabled {
    background-color: #96a0ac;
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
