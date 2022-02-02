import React, { useState } from 'react';

import styled from '@emotion/styled';

import SignUpStepper from './SignUpStepper';
import AuthForm from './AuthForm';
import SignUpForm from './SignUpForm';
import ProfileForm from './ProfileForm';
import ErrorPage from '../../pages/ErrorPage';

const SignUpCard: React.FC = () => {
  const [signUpStep, setSignUpStep] = useState<number>(0);
  const [campus, setCampus] = useState<string>('');
  const [ssafyTrack, setSsafyTrack] = useState<string>('');
  const [studentNumber, setStudentNumber] = useState<string>('');
  const [studentName, setStudentName] = useState<string>('');
  const [signUpEmail, setSignUpEmail] = useState<string>('');
  const [signUpPassword, setSignUpPassword] = useState<string>('');

  const updateCampus = (campus: string): void => {
    setCampus(campus);
  };

  const updateSsafyTrack = (ssafyTrack: string): void => {
    setSsafyTrack(ssafyTrack);
  };

  const updateStudentNumber = (studentNumber: string): void => {
    setStudentNumber(studentNumber);
  };

  const updateStudentName = (studentName: string): void => {
    setStudentName(studentName);
  };

  const updateSignUpEmail = (signUpEmail: string): void => {
    setSignUpEmail(signUpEmail);
  };

  const updateSignUpPassword = (signUpPassword: string): void => {
    setSignUpPassword(signUpPassword);
  };

  const updateSignUpStep = (signUpStep: number): void => {
    setSignUpStep(signUpStep);
  };

  return (
    <>
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
                    setStudentName={setStudentName}
                    setStudentNumber={setStudentNumber}
                  />
                );
              case 1:
                return (
                  <SignUpForm
                    signUpEmail={signUpEmail}
                    updateSignUpEmail={updateSignUpEmail}
                    signUpPassword={signUpPassword}
                    updateSignUpPassword={updateSignUpPassword}
                    signUpStep={signUpStep}
                    updateSignUpStep={updateSignUpStep}
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
                return <ErrorPage />;
            }
          })()}
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

const Head = styled.h3`
  margin-bottom: 56px;
  font-size: 26px;
  font-weight: 600;
  text-align: center;
  color: #263747;

  @media (max-width: 575px) {
    margin-bottom: 40px;
  }
`;

export default SignUpCard;
