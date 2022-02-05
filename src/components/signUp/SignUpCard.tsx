import { useState } from 'react';

import { Redirect } from 'react-router-dom';

import styled from '@emotion/styled';

import SignUpStepper from './SignUpStepper';
import AuthForm from './AuthForm';
import SignUpForm from './SignUpForm';
import ProfileForm from './ProfileForm';

const SignUpCard: React.FC = () => {
  const [signUpStep, setSignUpStep] = useState<number>(0);
  const [campus, setCampus] = useState<string>('');
  const [ssafyTrack, setSsafyTrack] = useState<string>('');
  const [studentNumber, setStudentNumber] = useState<string>('');
  const [studentName, setStudentName] = useState<string>('');
  const [signUpEmail, setSignUpEmail] = useState<string>('');
  const [signUpPassword, setSignUpPassword] = useState<string>('');

  return (
    <Container>
      <Wrapper>
        <Head>회원가입</Head>
        <SignUpStepper signUpStep={signUpStep} />
        {(() => {
          switch (signUpStep) {
            case 0:
              return (
                <AuthForm
                  signUpStep={signUpStep}
                  campus={campus}
                  ssafyTrack={ssafyTrack}
                  studentNumber={studentNumber}
                  studentName={studentName}
                  setSignUpStep={setSignUpStep}
                  setCampus={setCampus}
                  setSsafyTrack={setSsafyTrack}
                  setStudentNumber={setStudentNumber}
                  setStudentName={setStudentName}
                />
              );
            case 1:
              return (
                <SignUpForm
                  signUpStep={signUpStep}
                  signUpEmail={signUpEmail}
                  signUpPassword={signUpPassword}
                  setSignUpStep={setSignUpStep}
                  setSignUpEmail={setSignUpEmail}
                  setSignUpPassword={setSignUpPassword}
                />
              );
            case 2:
              return (
                <ProfileForm
                  campus={campus}
                  ssafyTrack={ssafyTrack}
                  studentNumber={studentNumber}
                  studentName={studentName}
                  signUpEmail={signUpEmail}
                  signUpPassword={signUpPassword}
                />
              );
            default:
              return <Redirect to="/" />;
          }
        })()}
      </Wrapper>
    </Container>
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

const Head = styled.h1`
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

export default SignUpCard;
