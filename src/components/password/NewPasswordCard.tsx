import styled from '@emotion/styled';

const NewPasswordCard: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <CardHeader>
          <Head>패스워드 재설정</Head>
          <SubHead>
            비밀번호를 재설정 할 이메일을 입력하세요. 자세한 안내가 담긴 메일을
            보내드리겠습니다.
          </SubHead>
        </CardHeader>
        <CardForm>
          <InputWrapper>
            <RequirementLabel htmlFor="email">
              비밀번호를 재설정 할 이메일
            </RequirementLabel>
            <Input type="email" id="email" />
          </InputWrapper>
          <InputWrapper>
            <RequirementLabel htmlFor="verification-code">
              인증코드 입력
            </RequirementLabel>
            <VerificationCodeInputWrapper>
              <Input type="text" id="verification-code" />
              <AuthButton>확인</AuthButton>
            </VerificationCodeInputWrapper>
          </InputWrapper>
        </CardForm>
        <CardFooter>
          <SubmitButton>비밀번호 재설정 메일 보내기</SubmitButton>
        </CardFooter>
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
  margin-bottom: 32px;
  font-size: 26px;
  font-weight: 600;
  text-align: center;
  color: #263747;

  @media (max-width: 575px) {
    margin-bottom: 40px;
  }
`;

const SubHead = styled.h2`
  font-size: 16px;
  line-height: 1.6;
  color: #98a8b9;
`;

const CardHeader = styled.div`
  margin-bottom: 40px;
`;

const CardForm = styled.form``;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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

const VerificationCodeInputWrapper = styled.div`
  display: flex;
`;

const AuthButton = styled.button`
  width: 120px;
  height: 40px;
  margin-left: 8px;
  border: none;
  border-radius: 0.25rem;
  box-sizing: border-box;
  background-color: #3396f4;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  transition: background-color 0.08s ease-in-out;
  cursor: pointer;

  &:disabled {
    background-color: #ededed;
    color: #8e888e;
    cursor: not-allowed;
  }

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
    background-color: #96a0ac;
  }

  @media (max-width: 575px) {
    font-size: 15px;
  }
`;

export default NewPasswordCard;
