import React from 'react';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import CloseIcon from '@mui/icons-material/Close';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const ProfileForm: React.FC = () => {
  return (
    <Container>
      <Row>
        <AvatarWrapper>
          <Avatar src="/broken-image.jpg" css={avatar} />
          <FileInputWrapper>
            <FileInputLabel htmlFor="profile-img">
              <AddAPhotoIcon />
            </FileInputLabel>
            <FileInput type="file" id="profile-img" />
          </FileInputWrapper>
        </AvatarWrapper>
        <InputWrapper>
          <RequirementLabel htmlFor="self-introduction">
            자기소개
          </RequirementLabel>
          <Textarea id="self-introduction" name="self-introduction" />
        </InputWrapper>
      </Row>
      <Row>
        <InputWrapper css={rightGap}>
          <RequirementLabel htmlFor="ssafy-track">
            SSAFY 교육 트랙
          </RequirementLabel>
          <Select id="ssafy-track" name="ssafy-track" defaultValue={'default'}>
            <option value="default" disabled>
              - 선택 -
            </option>
            <option value="전공자 (Java Track)">전공자 (Java Track)</option>
            <option value="비전공자 (Python Track)">
              비전공자 (Python Track)
            </option>
          </Select>
        </InputWrapper>
        <InputWrapper>
          <RequirementLabel htmlFor="specializaion-project-track">
            특화 프로젝트 트랙
          </RequirementLabel>
          <Select
            id="specializaion-project-track"
            name="specializaion-project-track"
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
      </Row>
      <Row>
        <InputWrapper css={rightGap}>
          <RequirementLabel htmlFor="job1">희망 직무1</RequirementLabel>
          <Select id="job1" name="job1" defaultValue={'default'}>
            <option value="default" disabled>
              - 선택 -
            </option>
            <option value="프론트엔드 (Front-end)">
              프론트엔드 (Front-end)
            </option>
            <option value="백엔드 (Back-end)">백엔드 (Back-end)</option>
          </Select>
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="job2">
            희망 직무2 <Em>(선택)</Em>
          </Label>
          <Select id="job2" name="job2" defaultValue={'default'}>
            <option value="default" disabled>
              - 선택 -
            </option>
            <option value="프론트엔드 (Front-end)">
              프론트엔드 (Front-end)
            </option>
            <option value="백엔드 (Back-end)">백엔드(Back-end)</option>
          </Select>
        </InputWrapper>
      </Row>
      <Row>
        <InputWrapper>
          <RequirementLabel htmlFor="tech-stack">
            기술 스택 <Em>(필수 2가지 이상 기입)</Em>
          </RequirementLabel>
          <InfoInput
            type="text"
            id="tech-stack"
            name="tech-stack"
            placeholder="ex) Vue.js, django, Spring Boot, MySQL"
          />
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
                <Box
                  sx={{
                    'display': 'flex',
                    'flexDirection': 'column',
                    'alignItems': 'center',
                    '& > *': {
                      m: 1,
                    },
                  }}
                >
                  <ButtonGroup
                    size="small"
                    aria-label="small button group"
                    css={buttonGroup}
                  >
                    <Button
                      key="low"
                      className="selected"
                      css={skillLevelButton}
                    >
                      하
                    </Button>
                    <Button key="middle" css={skillLevelButton}>
                      중
                    </Button>
                    <Button key="high" css={skillLevelButton}>
                      상
                    </Button>
                  </ButtonGroup>
                </Box>
                <CancelButton>
                  <CloseIcon />
                </CancelButton>
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
                <Box
                  sx={{
                    'display': 'flex',
                    'flexDirection': 'column',
                    'alignItems': 'center',
                    '& > *': {
                      m: 1,
                    },
                  }}
                >
                  <ButtonGroup
                    size="small"
                    aria-label="small button group"
                    css={buttonGroup}
                  >
                    <Button key="low" css={skillLevelButton}>
                      하
                    </Button>
                    <Button
                      key="middle"
                      className="selected"
                      css={skillLevelButton}
                    >
                      중
                    </Button>
                    <Button key="high" css={skillLevelButton}>
                      상
                    </Button>
                  </ButtonGroup>
                </Box>
                <CancelButton>
                  <CloseIcon />
                </CancelButton>
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
                <Box
                  sx={{
                    'display': 'flex',
                    'flexDirection': 'column',
                    'alignItems': 'center',
                    '& > *': {
                      m: 1,
                    },
                  }}
                >
                  <ButtonGroup
                    size="small"
                    aria-label="small button group"
                    css={buttonGroup}
                  >
                    <Button key="low" css={skillLevelButton}>
                      하
                    </Button>
                    <Button
                      key="middle"
                      className="selected"
                      css={skillLevelButton}
                    >
                      중
                    </Button>
                    <Button key="high" css={skillLevelButton}>
                      상
                    </Button>
                  </ButtonGroup>
                </Box>
                <CancelButton>
                  <CloseIcon />
                </CancelButton>
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
                <Box
                  sx={{
                    'display': 'flex',
                    'flexDirection': 'column',
                    'alignItems': 'center',
                    '& > *': {
                      m: 1,
                    },
                  }}
                >
                  <ButtonGroup
                    size="small"
                    aria-label="small button group"
                    css={buttonGroup}
                  >
                    <Button
                      key="low"
                      className="selected"
                      css={skillLevelButton}
                    >
                      하
                    </Button>
                    <Button key="middle" css={skillLevelButton}>
                      중
                    </Button>
                    <Button key="high" css={skillLevelButton}>
                      상
                    </Button>
                  </ButtonGroup>
                </Box>
                <CancelButton>
                  <CloseIcon />
                </CancelButton>
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
                <Box
                  sx={{
                    'display': 'flex',
                    'flexDirection': 'column',
                    'alignItems': 'center',
                    '& > *': {
                      m: 1,
                    },
                  }}
                >
                  <ButtonGroup
                    size="small"
                    aria-label="small button group"
                    css={buttonGroup}
                  >
                    <Button key="low" css={skillLevelButton}>
                      하
                    </Button>
                    <Button key="middle" css={skillLevelButton}>
                      중
                    </Button>
                    <Button
                      key="high"
                      className="selected"
                      css={skillLevelButton}
                    >
                      상
                    </Button>
                  </ButtonGroup>
                </Box>
                <CancelButton>
                  <CloseIcon />
                </CancelButton>
              </OptionGroup>
            </TechStackItem>
          </TechStackList>
        </InputWrapper>
      </Row>
      <Row>
        <InputWrapper>
          <Label htmlFor="github-url">
            GitHub URL <Em>(선택)</Em>
          </Label>
          <InfoInput
            type="url"
            id="github-url"
            name="github-url"
            placeholder="https://github.com/ssafy-mate"
            pattern="https://.*"
          />
        </InputWrapper>
      </Row>
      <Row>
        <InputWrapper>
          <Label htmlFor="etc-url">
            기술 블로그 URL 또는 기타 URL <Em>(선택)</Em>
          </Label>
          <InfoInput
            type="url"
            id="etc-url"
            name="etc-url"
            placeholder="https://velog.io/@ssafy-mate"
            pattern="https://.*"
          />
        </InputWrapper>
      </Row>
      <Row>
        <CheckBoxWrapper>
          <AgreementCheckBox
            type="checkbox"
            id="sign-up-agreement"
            name="sign-up-agreement"
          />
          <CheckBoxLabel htmlFor="sign-up-agreement">
            <AgreementLink href="#" target="_blank" rel="noopener noreferrer">
              이용약관
            </AgreementLink>
            &nbsp;및&nbsp;
            <AgreementLink href="#" target="_blank" rel="noopener noreferrer">
              개인정보 처리방침
            </AgreementLink>
            에 동의합니다.
          </CheckBoxLabel>
        </CheckBoxWrapper>
      </Row>
      <Row>
        <SignUpButton>계정 만들기</SignUpButton>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const Row = styled.div`
  display: flex;

  &:first-of-type {
    margin-bottom: 12px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 16px;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 16px;
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

const Em = styled.em`
  font-size: 13px;
  color: #3396f4;

  @media (max-width: 540px) {
    font-size: 12px;
  }
`;

const AvatarWrapper = styled.div`
  margin: auto 32px;

  @media (max-width: 540px) {
    margin: auto 24px auto 0;
  }
  @media (max-width: 414px) {
    margin: auto 16px auto 0;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
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

const AgreementCheckBox = styled.input`
  margin-right: 6px;
  cursor: pointer;
`;

const CheckBoxLabel = styled.label`
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: #98a8b9;

  @media (max-width: 540px) {
    font-size: 13px;
  }
`;

const AgreementLink = styled.a`
  font-weight: 500;
  color: #5f7f90;
`;

const SignUpButton = styled.button`
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

const CancelButton = styled.button`
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

const FileInputWrapper = styled.div`
  text-align: right;
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  position: relative;
  top: -22px;
  right: 6px;
  z-index: 10;
  color: #3396f4;
  cursor: pointer;
`;

const avatar = css`
  width: 100px;
  height: 100px;
  background-color: #abb7c6;

  @media (max-width: 540px) {
    width: 90px;
    height: 90px;
  }
`;

const skillLevelButton = css`
  width: 24px;
  height: 24px;
  border-color: #5babf6;
  background-color: #fbfbfd;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 400;
  color: #3396f4;

  &:hover {
    color: #fff;
    background-color: #5babf6;
  }

  &.selected {
    color: #fff;
    background-color: #5babf6;
  }

  @media (max-width: 540px) {
    width: 22px;
    height: 22px;
    font-size: 13px;
  }
`;

const buttonGroup = css`
  margin: 0;
`;

export default ProfileForm;
