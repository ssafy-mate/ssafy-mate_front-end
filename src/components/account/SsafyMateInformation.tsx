import styled from '@emotion/styled';

const SsafyMateInformation: React.FC = () => {
  return (
    <>
      <SsafyMateInformationWrapper>
        <InfomationWrapper>
          <SingleInformationWrapper>
            <InformationLabel htmlFor="self-introduction" className="necessary">
              자기소개
            </InformationLabel>
            <Textarea id="self-introduction" name="selfIntroduction" />
            <ModifyButton type="button">수정</ModifyButton>
          </SingleInformationWrapper>

          <SingleInformationWrapper>
            <InformationLabel htmlFor="job1" className="necessary">
              희망 직무1
            </InformationLabel>
            <Select id="job1" defaultValue={'default'} name="job1"></Select>

            <ModifyButton type="button">수정</ModifyButton>
          </SingleInformationWrapper>
        </InfomationWrapper>
      </SsafyMateInformationWrapper>
    </>
  );
};

const SsafyMateInformationWrapper = styled.div``;

const InfomationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SingleInformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InformationLabel = styled.label`
  margin-bottom: 4px;
  padding-left: 6px;
  font-size: 14px;
  line-height: 1.5;
  color: #263747;

  &.necessary {
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
  }

  @media (max-width: 575px) {
    font-size: 13px;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-bottom: 16px;
  padding: 8px 12px;
  outline: 0;
  border: 1px solid #d7e2eb;
  border-radius: 0.25rem;
  box-sizing: border-box;
  background-color: #fbfbfd;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-size: 16px;
  line-height: 24px;
  color: #263747;
  transition: all 0.08s ease-in-out;

  &.have-error {
    margin-bottom: 4px;
    border: 1px solid #f44336;
    box-shadow: inset 0 0 0 1px #ff77774d;
  }

  @media (max-width: 575px) {
    font-size: 13px;
  }
`;

const ModifyButton = styled.button`
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

  @media (max-width: 575px) {
    font-size: 15px;
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

  @media (max-width: 575px) {
    font-size: 13px;
  }
`;

export default SsafyMateInformation;
