import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { showSsafyMateAlert } from '../../redux/modules/alert';

import history from '../../history';

import styled from '@emotion/styled';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import {
  onlyKoreanReg,
  onlyNumberReg,
} from '../../utils/regularExpressionData';

import FindIdService from '../../services/FindIdService';

const FindUserIdCard: React.FC = () => {
  const dispatch = useDispatch();
  const [showError, setShowError] = useState<boolean>(false);
  const [studentNumberInput, setStudentNumberInput] = useState<string>('');
  const [studentNumberError, setStudentNumberError] = useState<string>('');
  const [studentNameInput, setStudentNameInput] = useState<string>('');
  const [studentNameError, setStudentNameError] = useState<string>('');
  const [findId, setFindId] = useState<string | null>('');

  const onCheckEnter = (event: React.KeyboardEvent) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      event.preventDefault();
    }
  };

  const handleStudentNumberInput = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const StudentNumberOnChange = event.target.value;

    setStudentNumberInput(StudentNumberOnChange);

    if (showError) {
      verification(studentNameInput, StudentNumberOnChange);
    }
  };

  const handleStudentNameInput = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const StudentNameOnChange = event.target.value;

    setStudentNameInput(StudentNameOnChange);

    if (showError) {
      verification(StudentNameOnChange, studentNumberInput);
    }
  };

  const verification = (
    studentName: string,
    studentNumber: string,
  ): boolean => {
    if (
      studentName !== '' &&
      studentNumber !== '' &&
      onlyNumberReg.test(studentNumber) &&
      studentNumber.length === 7 &&
      onlyKoreanReg.test(studentName)
    ) {
      setStudentNumberError('');
      setStudentNameError('');
      return true;
    } else {
      if (
        studentNumber === '' ||
        !onlyNumberReg.test(studentNumber) ||
        studentNumber.length !== 7
      ) {
        if (studentNumber === '') {
          setStudentNumberError('필수 입력 항목입니다.');
        } else {
          setStudentNumberError('학번 7자리를 정확하게 입력해 주세요.');
        }
      } else {
        setStudentNumberError('');
      }

      if (studentName === '' || !onlyKoreanReg.test(studentName)) {
        if (studentName === '') {
          setStudentNameError('필수 입력 항목입니다.');
        } else {
          setStudentNameError('이름을 정확하게 입력해주세요.');
        }
      } else {
        setStudentNameError('');
      }
      return false;
    }
  };

  const handleFindIdButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setShowError(true);

    if (verification(studentNameInput, studentNumberInput)) {
      FindIdService.getUserId({
        studentNumber: studentNumberInput,
        userName: studentNameInput,
      })
        .then(({ userEmail, message }) => {
          setFindId(userEmail);
        })
        .catch((error) => {
          setFindId('');
          if (error.response) {
            const { status, message } = error.response.data;

            switch (status) {
              case 401:
                dispatch(showSsafyMateAlert(true, message, 'warning'));
                break;
              case 500:
                dispatch(showSsafyMateAlert(true, message, 'warning'));
                break;
            }
          }
        });
    }
  };

  const moveToSignIn = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    history.push('/users/sign_in');
  };

  return (
    <>
      <Container>
        <Wrapper>
          <CardHeader>
            {findId === '' ? (
              <Head>아이디 찾기</Head>
            ) : (
              <FindIconWrapper>
                <FindIdIcon color="primary" fontSize="large" />
              </FindIconWrapper>
            )}
            {findId === '' ? (
              <SubHead>가입 시 등록한 학번과 이름을 입력해주세요.</SubHead>
            ) : (
              <>
                <SubHead>
                  {studentNameInput}님의 싸피메이트 계정을 찾았습니다.
                </SubHead>
                <SubInfo>계정 확인 후 로그인 해주세요.</SubInfo>
              </>
            )}
          </CardHeader>
          {findId === '' ? (
            <CardForm onKeyPress={onCheckEnter}>
              <InputWrapper>
                <RequirementLabel htmlFor="studuntNumber">
                  학번
                </RequirementLabel>
                <Input
                  id="studuntNumber"
                  required
                  maxLength={7}
                  onChange={handleStudentNumberInput}
                  className={studentNumberError !== '' ? 'have-error' : ''}
                />
                {studentNumberError !== '' ? (
                  <ErrorMessageWrapper>
                    <ErrorMessage>{studentNumberError}</ErrorMessage>
                  </ErrorMessageWrapper>
                ) : null}
              </InputWrapper>
              <InputWrapper>
                <RequirementLabel htmlFor="studuntName">이름</RequirementLabel>
                <Input
                  id="studuntName"
                  required
                  onChange={handleStudentNameInput}
                  className={studentNameError !== '' ? 'have-error' : ''}
                />
                {studentNameError !== '' ? (
                  <ErrorMessageWrapper>
                    <ErrorMessage>{studentNameError}</ErrorMessage>
                  </ErrorMessageWrapper>
                ) : null}
              </InputWrapper>
            </CardForm>
          ) : (
            <>
              <FindIdWrapper>
                <FindIdLabel htmlFor="find-id">이메일</FindIdLabel>

                <FindId>{findId}</FindId>
              </FindIdWrapper>
            </>
          )}

          {findId === '' ? (
            <CardFooter>
              <SubmitButton type="submit" onClick={handleFindIdButton}>
                아이디 찾기
              </SubmitButton>
            </CardFooter>
          ) : (
            <CardFooter>
              <SubmitButton type="button" onClick={moveToSignIn}>
                로그인
              </SubmitButton>
            </CardFooter>
          )}
        </Wrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  max-width: 576px;
  margin: 0 auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 56px;
  border: 1px solid #d7e2eb;
  border-radius: 6px;

  @media (max-width: 767px) {
    padding: 40px 28px;
  }
  @media (max-width: 575px) {
    padding: 32px 16px;
  }
`;

const CardHeader = styled.div`
  margin-bottom: 40px;
`;

const Head = styled.h1`
  margin-bottom: 32px;
  font-size: 26px;
  font-weight: 600;
  text-align: center;
  color: #263747;

  @media (max-width: 575px) {
    margin-bottom: 40px;
  }
`;

const FindIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  margin-bottom: 16px;
`;

const FindIdIcon = styled(CheckCircleOutlineIcon)`
  width: 100%;
  transform: scale(1.8);
`;

const SubHead = styled.h2`
  font-size: 16px;
  line-height: 1.6;
  color: #98a8b9;
`;

const SubInfo = styled.h3`
  font-size: 13px;
  line-height: 1.6;
  color: #98a8b9;
`;

const CardForm = styled.form``;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  &.find-id {
    align-items: center;
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

  @media (max-width: 575px) {
    font-size: 13px;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 24px;
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
    border: 1px solid #f44336;
    box-shadow: inset 0 0 0 1px #ff77774d;
  }

  @media (max-width: 575px) {
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

  &.verification-code {
    padding: 2px;
  }
`;

const FindIdWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FindIdLabel = styled.label`
  margin-bottom: 4px;
  font-size: 14px;
  line-height: 1.5;
  color: #263747;

  @media (max-width: 575px) {
    font-size: 13px;
  }
`;

const FindId = styled.div`
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

  @media (max-width: 575px) {
    font-size: 13px;
  }
`;

const CardFooter = styled.div``;

const SubmitButton = styled.button`
  width: 100%;
  height: 40px;
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
    background-color: #e8f0fd;
    color: #8e888e;
    cursor: not-allowed;
  }

  @media (max-width: 575px) {
    font-size: 15px;
  }
`;

export default FindUserIdCard;
