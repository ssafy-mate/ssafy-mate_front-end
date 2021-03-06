import { useEffect, useState, useCallback } from 'react';

import { useDispatch } from 'react-redux';
import { login as loginSagaStart } from '../../redux/modules/auth';

import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

import { validEmailReg } from '../../utils/regularExpressionData';

const SignInCard: React.FC = () => {
  const dispatch = useDispatch();

  const login = useCallback(
    (requestData) => {
      dispatch(loginSagaStart(requestData));
    },
    [dispatch],
  );

  const [inputEmail, setInputEmail] = useState<string>('');
  const [inputPassword, setInputPassword] = useState<string>('');
  const [inputEmailError, setInputEmailError] = useState<boolean>(false);
  const [inputPasswordError, setInputPasswordError] = useState<boolean>(false);
  const [emailVerificaion, setEmailVerificaion] = useState<boolean>(true);
  const [idSaveCheckBox, setIdSaveCheckBox] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const savedId = localStorage.getItem('ssafy-mate-id');

  useEffect(() => {
    if (savedId !== null) {
      setInputEmail(savedId);
      setIdSaveCheckBox(true);
    }
  }, [savedId]);

  const handleChangeIdSaveCheckBox = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIdSaveCheckBox(event.target.checked);
  };

  const handleInputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmailOnChange = event.target.value;

    setInputEmail(inputEmailOnChange);

    if (showError) {
      if (inputEmailOnChange === '') {
        setInputEmailError(true);
        setEmailVerificaion(true);
      } else if (validEmailReg.test(inputEmailOnChange)) {
        setEmailVerificaion(true);
        setInputEmailError(false);
      } else {
        setInputEmailError(false);
        setEmailVerificaion(false);
      }
    } else {
      inputEmailOnChange === ''
        ? setInputEmailError(true)
        : setInputEmailError(false);
    }
  };

  const handleInputPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputPasswordOnChange = event.target.value;

    setInputPassword(inputPasswordOnChange);

    inputPasswordOnChange === ''
      ? setInputPasswordError(true)
      : setInputPasswordError(false);
  };

  const loginButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    if (validation(inputEmail, inputPassword)) {
      login({
        userEmail: inputEmail,
        password: inputPassword,
        IdSave: idSaveCheckBox,
      });
    }
  };

  const SignInWithEnterKey = (event: React.KeyboardEvent) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      if (validation(inputEmail, inputPassword)) {
        login({
          userEmail: inputEmail,
          password: inputPassword,
          IdSave: idSaveCheckBox,
        });
      }
    }
  };

  const validation = (emailInput: string, passwordInput: string): boolean => {
    setShowError(true);
    passwordInput === ''
      ? setInputPasswordError(true)
      : setInputPasswordError(false);

    if (emailInput === '') {
      setInputEmailError(true);
    } else if (validEmailReg.test(emailInput)) {
      setInputEmailError(false);
      setEmailVerificaion(true);
    } else {
      setInputEmailError(true);
      setEmailVerificaion(false);
    }

    if (
      emailInput !== '' &&
      passwordInput !== '' &&
      validEmailReg.test(emailInput)
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Container>
      <CardHead>?????????</CardHead>
      <SignInForm onKeyPress={SignInWithEnterKey}>
        <SignInLabel htmlFor="email">?????????</SignInLabel>
        <SignInInput
          type="email"
          id="email"
          className={
            (emailVerificaion ? '' : 'email-verification-error') ||
            (inputEmailError ? 'input-error' : '')
          }
          value={inputEmail}
          onChange={handleInputEmail}
          placeholder="?????????"
          required
        />
        {!emailVerificaion && (
          <ErrorMessageWrapper>
            <ErrorMessage>????????? ????????? ???????????? ????????????.</ErrorMessage>
          </ErrorMessageWrapper>
        )}
        <SignInLabel htmlFor="password">????????????</SignInLabel>
        <SignInInput
          type="password"
          id="password"
          className={inputPasswordError ? 'input-error' : ''}
          onChange={handleInputPassword}
          placeholder="????????????"
          required
        />
        <Options>
          <IdSaveCheckBox>
            <IdSaveCheckInput
              type="checkbox"
              id="id-save-check-box"
              name="id-save-check-box"
              onChange={handleChangeIdSaveCheckBox}
              checked={idSaveCheckBox}
            />
            <IdSaveCheckLabel htmlFor="id-save-check-box">
              ????????? ??????
            </IdSaveCheckLabel>
          </IdSaveCheckBox>
          <AccountManagementMenu>
            <AccountLink to="/users/find/id">????????? ??????</AccountLink>
            <AccountLink to="/users/password/new">???????????? ?????????</AccountLink>
          </AccountManagementMenu>
        </Options>
        <SignInButton onClick={loginButtonClick} type="button">
          ?????????
        </SignInButton>
        <SignUpLinkBox>
          ?????? ????????? ????????????????
          <Link to="/users/sign_up" className="sign-up-link">
            ?????? ?????????
          </Link>
        </SignUpLinkBox>
      </SignInForm>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
  padding: 56px;
  border: 1px solid #d7e2eb;
  border-radius: 6px;
  box-sizing: border-box;

  @media (max-width: 767px) {
    padding: 40px 28px;
  }
  @media (max-width: 575px) {
    padding: 32px 16px;
  }
`;

const CardHead = styled.h1`
  margin-bottom: 56px;
  font-size: 26px;
  font-weight: 600;
  text-align: center;
  color: #263747;

  @media (max-width: 575px) {
    margin-bottom: 40px;
    font-size: 22px;
  }
`;

const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const SignInLabel = styled.label`
  margin-bottom: 4px;
  font-size: 14px;
  line-height: 1.5;
  color: #263747;

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
`;

const SignInInput = styled.input`
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
    box-shadow: inset 0 0 0 1px #3396f4;
  }
  &:focus {
    border: 1px solid #3396f4;
    box-shadow: inset 0 0 0 1px #3396f4;
    background-color: #fff;
    color: #495057;
  }

  &.input-error {
    border: 1px solid #f44336;
    box-shadow: inset 0 0 0 1px #ff77774d;
  }

  &.email-verification-error {
    margin-bottom: 4px;
    border: 1px solid #f44336;
    box-shadow: inset 0 0 0 1px #ff77774d;
  }

  @media (max-width: 575px) {
    font-size: 13px;
  }
`;

const Options = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  @media (max-width: 349px) {
    flex-direction: column;
  }
`;

const IdSaveCheckBox = styled.div`
  display: flex;
  align-items: center;
  margin: auto 0;

  @media (max-width: 349px) {
    margin-bottom: 8px;
  }
`;

const IdSaveCheckInput = styled.input`
  @media (max-width: 575px) {
    font-size: 13px;
  }
`;

const IdSaveCheckLabel = styled.label`
  font-size: 14px;
  line-height: 1.5;
  color: #98a8b9;
  transition: color 0.08s ease-in-out;
  cursor: pointer;

  &:hover {
    color: #3396f4;
  }

  @media (max-width: 575px) {
    font-size: 13px;
  }
`;

const AccountManagementMenu = styled.div``;

const SignInButton = styled.button`
  height: 40px;
  margin-bottom: 24px;
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

  @media (max-width: 575px) {
    font-size: 15px;
  }
`;

const SignUpLinkBox = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: #98a8b9;
  text-align: center;

  .sign-up-link {
    padding-left: 4px;
    font-weight: 500;
    color: #263747;

    &::after {
      content: '???';
      display: inline-block;
      margin-left: 0.25rem;
      vertical-align: top;
      transition: all 0.08s ease-in-out;
    }
    &:hover {
      color: #2878c3;

      &::after {
        content: '???';
        transform: translateX(3px);
      }
    }
  }

  @media (max-width: 575px) {
    font-size: 13px;
  }
`;

const AccountLink = styled(Link)`
  font-size: 14px;
  line-height: 1.5;
  color: #98a8b9;
  transition: color 0.08s ease-in-out;
  cursor: pointer;

  &:hover {
    color: #3396f4;
  }

  &:first-of-type {
    &:after {
      content: '';
      display: inline-block;
      width: 1px;
      height: 10px;
      margin: 0 8px;
      background-color: #98a8b9;
    }
  }

  @media (max-width: 575px) {
    font-size: 13px;
  }
`;

export default SignInCard;
