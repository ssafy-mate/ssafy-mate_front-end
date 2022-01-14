import React from 'react';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';

const CreateTeamForm: React.FC = () => {
  return (
    <Container>
      <Head>팀 생성</Head>
      <Row>
        <FileInputWrapper>
          <FileInputLabel htmlFor="team-img">
            <AddPhotoAlternateIcon />
          </FileInputLabel>
          <FileInput type="file" id="team-img" />
          <FileInputDescription>
            팀 대표 이미지를 업로드해주세요.
          </FileInputDescription>
        </FileInputWrapper>
        <SsafyInfoWrapper>
          <InputWrapper>
            <RequirementLabel htmlFor="team-campus">캠퍼스</RequirementLabel>
            <Select
              id="team-campus"
              name="team-campus"
              defaultValue={'default'}
            >
              <option value="default" disabled>
                - 선택 -
              </option>
              <option value="서울">서울</option>
              <option value="대전">대전</option>
              <option value="광주">광주</option>
              <option value="구미">구미</option>
              <option value="부울경">부울경</option>
            </Select>
          </InputWrapper>
          <InputWrapper>
            <RequirementLabel htmlFor="team-project">프로젝트</RequirementLabel>
            <Select
              id="team-campus"
              name="team-campus"
              defaultValue={'default'}
            >
              <option value="default" disabled>
                - 선택 -
              </option>
              <option value="공통 프로젝트">공통 프로젝트</option>
              <option value="특화 프로젝트">특화 프로젝트</option>
              <option value="자율 프로젝트">자율 프로젝트</option>
            </Select>
          </InputWrapper>
          <InputWrapper>
            <RequirementLabel htmlFor="team-campus">
              프로젝트 트랙
            </RequirementLabel>
            <Select
              id="team-campus"
              name="team-campus"
              defaultValue={'default'}
            >
              <option value="default" disabled>
                - 선택 -
              </option>
              <option value="인공지능">인공지능</option>
              <option value="빅데이터">빅데이터</option>
              <option value="블록체인">블록체인</option>
              <option value="IoT 제어">IoT 제어</option>
            </Select>
          </InputWrapper>
        </SsafyInfoWrapper>
      </Row>
      <Hr />
      <Row>
        <InputWrapper>
          <RequirementLabel htmlFor="team-name">팀 이름</RequirementLabel>
          <InfoInput type="text" id="team-name" name="team-name" />
        </InputWrapper>
      </Row>
      <Row>
        <InputWrapper>
          <RequirementLabel htmlFor="team-name">
            팀원 공고 문구 <Em>(한 문장으로 작성해주세요.)</Em>
          </RequirementLabel>
          <InfoInput
            type="text"
            id="team-name"
            name="team-name"
            placeholder="ex) 최우수상에 도전할 팀원을 모집합니다."
          />
        </InputWrapper>
      </Row>
      <Row>
        <InputWrapper>
          <Label htmlFor="team-self-introduction">
            팀 소개 <Em>(선택)</Em>
          </Label>
          <Textarea id="team-self-introduction" name="team-self-introduction" />
        </InputWrapper>
      </Row>
      <Hr />
      <Row>
        <InputWrapper>
          <RequirementLabel htmlFor="team-tech-stack">
            계획 중인 기술 스택 <Em>(필수 2가지 이상 기입)</Em>
          </RequirementLabel>
          <InfoInput
            type="text"
            id="team-tech-stack"
            name="team-tech-stack"
            placeholder="ex) Vue.js, django, Spring Boot, MySQL"
          />
        </InputWrapper>
        <TechStackList>
          <TechStackItem>
            <InfoGroup>
              <TechStackImg
                src="/images/assets/tech-stack/TypeScript.png"
                alt="TypeScript"
              />
              <TechStackName>TypeScript</TechStackName>
            </InfoGroup>
            <OptionGroup>
              <TechStackDeleteButton>
                <CloseIcon />
              </TechStackDeleteButton>
            </OptionGroup>
          </TechStackItem>
          <TechStackItem>
            <InfoGroup>
              <TechStackImg
                src="/images/assets/tech-stack/React.png"
                alt="React"
              />
              <TechStackName>React</TechStackName>
            </InfoGroup>
            <OptionGroup>
              <TechStackDeleteButton>
                <CloseIcon />
              </TechStackDeleteButton>
            </OptionGroup>
          </TechStackItem>
          <TechStackItem>
            <InfoGroup>
              <TechStackImg
                src="/images/assets/tech-stack/Redux.png"
                alt="Redux"
              />
              <TechStackName>Redux</TechStackName>
            </InfoGroup>
            <OptionGroup>
              <TechStackDeleteButton>
                <CloseIcon />
              </TechStackDeleteButton>
            </OptionGroup>
          </TechStackItem>
          <TechStackItem>
            <InfoGroup>
              <TechStackImg
                src="/images/assets/tech-stack/Redux-Saga.png"
                alt="Redux-Saga"
              />
              <TechStackName>Redux-Saga</TechStackName>
            </InfoGroup>
            <OptionGroup>
              <TechStackDeleteButton>
                <CloseIcon />
              </TechStackDeleteButton>
            </OptionGroup>
          </TechStackItem>
          <TechStackItem>
            <InfoGroup>
              <TechStackImg
                src="/images/assets/tech-stack/Emotion.png"
                alt="Emotion"
              />
              <TechStackName>Emotion</TechStackName>
            </InfoGroup>
            <OptionGroup>
              <TechStackDeleteButton>
                <CloseIcon />
              </TechStackDeleteButton>
            </OptionGroup>
          </TechStackItem>
        </TechStackList>
      </Row>
      <Hr />
      <Row>
        <InputWrapper>
          <RequirementLabel htmlFor="team-total-headcount">
            전체 모집 인원
          </RequirementLabel>
          <Select
            id="team-total-headcount"
            name="team-total-headcount"
            defaultValue={'default'}
          >
            <option value="default" disabled>
              - 선택 -
            </option>
            <option value="3">3명</option>
            <option value="4">4명</option>
            <option value="5">5명</option>
            <option value="6">6명</option>
            <option value="7">7명</option>
          </Select>
        </InputWrapper>
      </Row>
      <Row>
        <InputWrapper css={rightGap}>
          <RequirementLabel htmlFor="team-frontend-headcount">
            프론트엔드 모집 인원
          </RequirementLabel>
          <Select
            id="team-frontend-headcount"
            name="team-frontend-headcount"
            defaultValue={'default'}
          >
            <option value="default" disabled>
              - 선택 -
            </option>
            <option value="1">1명</option>
            <option value="2">2명</option>
            <option value="3">3명</option>
            <option value="4">4명</option>
            <option value="5">5명</option>
            <option value="6">6명</option>
            <option value="7">7명</option>
          </Select>
        </InputWrapper>
        <InputWrapper>
          <RequirementLabel htmlFor="team-backend-headcount">
            백엔드 모집 인원
          </RequirementLabel>
          <Select
            id="team-backend-headcount"
            name="team-backend-headcount"
            defaultValue={'default'}
          >
            <option value="default" disabled>
              - 선택 -
            </option>
            <option value="1">1명</option>
            <option value="2">2명</option>
            <option value="3">3명</option>
            <option value="4">4명</option>
            <option value="5">5명</option>
            <option value="6">6명</option>
            <option value="7">7명</option>
          </Select>
        </InputWrapper>
      </Row>
      <Row>
        <CreateTeamButton>팀 생성</CreateTeamButton>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: 56px;
  border: 1px solid #d7e2eb;
  border-radius: 6px;
  box-sizing: border-box;

  @media (max-width: 580px) {
    padding: 40px 28px;
  }
  @media (max-width: 414px) {
    padding: 32px 16px;
  }
`;

const Head = styled.h1`
  margin-bottom: 48px;
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  color: #263747;

  @media (max-width: 580px) {
    margin-bottom: 32px;
    font-size: 28px;
  }
`;

const Hr = styled.hr`
  width: 100%;
  margin: 24px 0;
  border: 1px dashed #d7e2eb;
`;

const Row = styled.div`
  display: flex;

  &:nth-of-type(5) {
    flex-direction: column;
  }
  &:last-of-type {
    margin-top: 16px;
  }

  @media (max-width: 540px) {
    &:first-of-type {
      flex-direction: column;
    }
  }
  @media (max-width: 340px) {
    &:nth-of-type(7) {
      flex-direction: column;
    }
  }
`;

const SsafyInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 16px;
`;

const FileInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-right: 56px;

  @media (max-width: 580px) {
    margin-right: 24px;
  }

  @media (max-width: 540px) {
    margin-right: 0;
    margin-bottom: 12px;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  box-sizing: border-box;
  cursor: pointer;

  svg {
    width: 200px;
    height: 200px;
    padding: 30px;
    border: 1px solid #d7e2eb;
    border-radius: 0.25rem;
    box-sizing: border-box;
    background-color: #fbfbfd;
    color: #5f7f90;
  }

  @media (max-width: 540px) {
    margin: 0 auto;

    svg {
      width: 160px;
      height: 160px;
    }
  }
`;

const FileInputDescription = styled.span`
  margin-top: 12px;
  font-size: 13px;
  color: #5f7f90;
  text-align: center;

  @media (max-width: 540px) {
    font-size: 12px;
  }
`;

const Label = styled.label`
  margin-bottom: 4px;
  font-size: 14px;
  line-height: 1.5;
  color: #263747;

  @media (max-width: 540px) {
    font-size: 13px;
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

const Textarea = styled.textarea`
  width: 100%;
  height: 120px;
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

  @media (max-width: 540px) {
    font-size: 13px;
  }
`;

const TechStackList = styled.ul`
  margin-top: 16px;
`;

const TechStackItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding: 3px 6px;
  box-sizing: border-box;

  &:hover {
    border-radius: 0.25rem;
    background-color: #eaf4fd;
  }

  @media (max-width: 540px) {
    margin-bottom: 16px;
  }
`;

const InfoGroup = styled.div`
  display: flex;
  align-items: center;
`;

const OptionGroup = styled.div`
  display: flex;
  align-items: center;
`;

const TechStackImg = styled.img`
  margin-right: 6px;
  width: 24px;
  height: 24px;
  border-radius: 3px;
  object-fit: cover;

  @media (max-width: 540px) {
    width: 22px;
    height: 22px;
  }
`;

const TechStackName = styled.h6`
  font-size: 14px;
  color: #5f7f90;

  @media (max-width: 540px) {
    font-size: 13px;
  }
`;

const TechStackDeleteButton = styled.button`
  margin-left: 6px;
  border: none;
  background-color: transparent;
  color: #f44336;
  cursor: pointer;
  transition: all 0.12s ease-in-out;

  &:hover {
    transform: scale(1.15);
  }

  @media (max-width: 540px) {
    svg {
      width: 22px;
      height: 22px;
    }
  }
`;

const Em = styled.em`
  font-size: 13px;
  color: #3396f4;

  @media (max-width: 540px) {
    font-size: 12px;
  }
`;

const CreateTeamButton = styled.button`
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

  @media (max-width: 540px) {
    font-size: 15px;
  }
`;

const rightGap = css`
  margin-right: 12px;

  @media (max-width: 540px) {
    margin-right: 6px;
  }
  @media (max-width: 340px) {
    margin-right: 0;
  }
`;

export default CreateTeamForm;
