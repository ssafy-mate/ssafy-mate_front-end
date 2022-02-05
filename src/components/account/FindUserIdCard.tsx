import { useState } from 'react';

import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { showSsafyMateAlert } from '../../redux/modules/alert';

import styled from '@emotion/styled';

import {
  onlyKoreanReg,
  onlyNumberReg,
} from '../../utils/regularExpressionData';

import FindIdService from '../../services/FindIdService';

const FindUserIdCard: React.FC = () => {
  const [showError, setShowError] = useState<boolean>(false);
  const [studentNumberInput, setStudentNumberInput] = useState<string>('');
  const [studentNumberError, setStudentNumberError] = useState<string>('');
  const [studentNameInput, setStudentNameInput] = useState<string>('');
  const [studentNameError, setStudentNameError] = useState<string>('');
  const [findId, setFindId] = useState<string | null>('');
  const [findIdSuccessText, setFindIdSuccessText] = useState<string | null>('');

  const dispatch = useDispatch();

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
          setFindIdSuccessText(message);
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

  return (
    <>
      <Container>
        <Wrapper>
          <CardHeader>
            <Head>아이디 찾기</Head>
            {findId === '' ? (
              <SubHead>회원가입 시 등록한 학번과 이름을 입력해주세요.</SubHead>
            ) : (
              <>
                <SubHead>{findIdSuccessText}</SubHead>
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
                <FindIdImgWrapper>
                  <FindIdImg src="/images/common/ssafy-mate_logo.png" />
                </FindIdImgWrapper>
                <FindIdText className="user-id">{findId}</FindIdText>
              </FindIdWrapper>
            </>
          )}
          <CardFooter>
            {findId === '' ? (
              <SubmitButton type="submit" onClick={handleFindIdButton}>
                아이디 찾기
              </SubmitButton>
            ) : (
              <SignInLinkButton to="/users/sign_in">
                로그인 하러가기
              </SignInLinkButton>
            )}
          </CardFooter>
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
  margin-bottom: 16px;
  font-size: 26px;
  font-weight: 600;
  text-align: left;
  color: #263747;

  @media (max-width: 575px) {
    font-size: 22px;
  }
`;

const SubHead = styled.h2`
  font-size: 16px;
  line-height: 1.6;
  color: #98a8b9;

  @media (max-width: 575px) {
    font-size: 15px;
  }
`;

const SubInfo = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #98a8b9;

  @media (max-width: 575px) {
    font-size: 13px;
  }
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
  overflow: hidden;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 40px;
  margin-bottom: 16px;
  padding: 8px 12px;
  outline: 0;
  border: 1px solid #d7e2eb;
  border-radius: 0.25rem;
  box-sizing: border-box;
  background-color: #e8f0fe;
  font-size: 16px;
  line-height: 24px;
  color: #263747;

  transition: all 0.08s ease-in-out;

  @media (max-width: 575px) {
    font-size: 13px;
  }
`;

const FindIdImgWrapper = styled.div`
  display: flex;
  width: 24px;
  height: 100%;
  border: 1px solid #fff;
  border-radius: 5px;
  background-color: #fff;
`;

const FindIdImg = styled.img`
  width: 24px;
  height: 100%;
`;

const FindIdText = styled.div`
  overflow: hidden;
  margin-left: 8px;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 575px) {
    font-size: 13px;
  }
`;
const CardFooter = styled.div``;

const SubmitButton = styled.button`
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
    background-color: #ebf0fe;
    color: #8e888e;
    cursor: not-allowed;
  }

  @media (max-width: 575px) {
    font-size: 15px;
  }
`;

const SignInLinkButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
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
    background-color: #ebf0fe;
    color: #8e888e;
    cursor: not-allowed;
  }

  @media (max-width: 575px) {
    font-size: 15px;
  }
`;

export default FindUserIdCard;
