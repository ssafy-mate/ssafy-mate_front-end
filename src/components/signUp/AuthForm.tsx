import { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { useDispatch } from 'react-redux';
import { showSsafyMateAlert as showSsafyMateAlertSagaStart } from '../../redux/modules/alert';

import styled from '@emotion/styled';

import {
  exceptDefaultReg,
  onlyKoreanReg,
  onlyNumberReg,
} from '../../utils/regularExpressionData';

import { CAMPUS_LIST } from '../../data/ssafyData';

import {
  Severity,
  SsafyAuth,
  SsafyTrack,
  SsafyAuthProps,
} from '../../types/signUpTypes';

import UserService from '../../services/UserService';

const AuthForm: React.FC<SsafyAuthProps> = ({
  setSignUpStep,
  setCampus,
  setSsafyTrack,
  setStudentNumber,
  setStudentName,
}) => {
  const [selectedTracks, setSelectedTracks] = useState<SsafyTrack[]>([]);

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SsafyAuth>({ mode: 'onChange' });

  const requiredFields: string = '필수 입력 항목입니다.';

  const selectedCampus = watch('campus', '');

  const dispatch = useDispatch();

  const showAlert = (
    alertShow: boolean,
    alertText: string,
    alertType: Severity,
  ) => {
    dispatch(
      showSsafyMateAlertSagaStart({
        show: alertShow,
        text: alertText,
        type: alertType,
      }),
    );
  };

  useEffect(() => {
    const selectedCampusIndex = CAMPUS_LIST.findIndex(
      (campus) => campus.area === selectedCampus,
    );

    if (selectedCampusIndex > -1) {
      setSelectedTracks(CAMPUS_LIST[selectedCampusIndex].ssafyTracks);
    }
  }, [selectedCampus]);

  const updateSsafyAuthProps = (data: SsafyAuth) => {
    const { campus, ssafyTrack, studentNumber, userName } = data;

    setSignUpStep(1);
    setCampus(campus);
    setSsafyTrack(ssafyTrack);
    setStudentNumber(studentNumber);
    setStudentName(userName);
  };

  const onSubmit = (data: SsafyAuth) => {
    AuthRequest(data);
  };

  const AuthRequest = (data: SsafyAuth) => {
    UserService.getSsafyAuth(data)
      .then(({ message }) => {
        showAlert(true, message, 'success');
        updateSsafyAuthProps(data);
      })
      .catch((error) => {
        if (error.response) {
          const { status, message } = error.response.data;

          if (status === 401 || status === 409) {
            showAlert(true, message, 'warning');
          } else if (status === 500) {
            showAlert(true, message, 'error');
          }
        }
      });
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <SsafyInfo>
        <InputWrapper>
          <RequirementLabel htmlFor="campus">캠퍼스</RequirementLabel>
          <Select
            id="campus"
            {...register('campus', {
              required: true,
              pattern: exceptDefaultReg,
            })}
            defaultValue="default"
            className={errors.campus ? 'have-error' : ''}
          >
            <option value="default" disabled>
              - 선택 -
            </option>
            {CAMPUS_LIST.map((campus) => (
              <option key={campus.id} value={campus.area}>
                {campus.area}
              </option>
            ))}
          </Select>
          {errors.campus !== undefined && (
            <ErrorMessageWrapper>
              <ErrorMessage>필수 선택 항목입니다.</ErrorMessage>
            </ErrorMessageWrapper>
          )}
        </InputWrapper>
        <InputWrapper>
          <RequirementLabel htmlFor="ssafy-track">교육 트랙</RequirementLabel>
          <Select
            id="ssafy-track"
            {...register('ssafyTrack', {
              required: true,
              pattern: exceptDefaultReg,
            })}
            defaultValue={'default'}
            className={errors.ssafyTrack ? 'have-error' : ''}
            disabled={
              selectedCampus === 'default' || selectedCampus === ''
                ? true
                : false
            }
          >
            <option value="default" disabled>
              - 선택 -
            </option>
            {selectedTracks.map((track: SsafyTrack) => (
              <option key={track.id}>{track.name}</option>
            ))}
          </Select>
          {errors.ssafyTrack !== undefined && (
            <ErrorMessageWrapper>
              <ErrorMessage>필수 선택 항목입니다.</ErrorMessage>
            </ErrorMessageWrapper>
          )}
        </InputWrapper>
      </SsafyInfo>
      <InputWrapper>
        <RequirementLabel htmlFor="student-number">학번</RequirementLabel>
        <InfoInput
          type="text"
          id="student-number"
          maxLength={7}
          {...register('studentNumber', {
            required: true,
            pattern: onlyNumberReg,
            maxLength: 7,
            minLength: 7,
          })}
          className={errors.studentNumber ? 'have-error' : ''}
        />
        {errors.studentNumber !== undefined &&
          errors.studentNumber.type === 'required' && (
            <ErrorMessageWrapper>
              <ErrorMessage>{requiredFields}</ErrorMessage>
            </ErrorMessageWrapper>
          )}
        {errors.studentNumber !== undefined &&
          errors.studentNumber.type !== 'required' && (
            <ErrorMessageWrapper>
              <ErrorMessage>학번 7자리를 정확하게 입력해 주세요.</ErrorMessage>
            </ErrorMessageWrapper>
          )}
      </InputWrapper>
      <InputWrapper>
        <RequirementLabel htmlFor="student-name">이름</RequirementLabel>
        <InfoInput
          type="text"
          id="student-name"
          {...register('userName', {
            required: true,
            pattern: onlyKoreanReg,
          })}
          className={errors.userName ? 'have-error' : ''}
        />
        {errors.userName?.type === 'required' && (
          <ErrorMessageWrapper>
            <ErrorMessage>{requiredFields}</ErrorMessage>
          </ErrorMessageWrapper>
        )}
        {errors.userName?.type === 'pattern' && (
          <ErrorMessageWrapper>
            <ErrorMessage>이름을 정확하게 입력해주세요.</ErrorMessage>
          </ErrorMessageWrapper>
        )}
      </InputWrapper>
      <AuthButton type="submit">교육생 인증</AuthButton>
    </Container>
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

  &:first-of-type {
    width: 60%;
    margin-right: 12px;
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
  margin-bottom: 16px;
  padding: 8px 12px;
  outline: 0;
  border: 1px solid #d7e2eb;
  border-radius: 0.25rem;
  box-sizing: border-box;
  background-position: calc(100% - 0.8rem) 49%;
  background-size: 0.625rem 0.3125rem;
  background-color: #fbfbfd;
  background-image: url(/images/common/toggle-black.png);
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

  &:disabled {
    border: 1px solid #d7e2eb;
    box-shadow: none;
    background-color: #f7f8fa;
    color: #d8d4d1;
    cursor: not-allowed;
  }

  &.have-error {
    margin-bottom: 4px;
    border: 1px solid #f44336;
    box-shadow: inset 0 0 0 1px #ff77774d;
  }

  @media (max-width: 540px) {
    font-size: 13px;
  }
`;

const InfoInput = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 16px;
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

  &.have-error {
    margin-bottom: 4px;
    border: 1px solid #f77;
    box-shadow: inset 0 0 0 1px #ff77774d;
  }

  @media (max-width: 540px) {
    font-size: 13px;
  }
`;

const AuthButton = styled.button`
  width: 100%;
  height: 40px;
  margin-top: 8px;
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

const ErrorMessageWrapper = styled.div`
  margin-bottom: 8px;
`;

const ErrorMessage = styled.span`
  padding-left: 6px;
  font-size: 13px;
  line-height: 1.5;
  color: #f44336;
`;

export default AuthForm;
