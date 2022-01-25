import React, { useState } from 'react';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Avatar from '@mui/material/Avatar';
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import CloseIcon from '@mui/icons-material/Close';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CheckIcon from '@mui/icons-material/Check';

import { jobListData } from '../../data/jobListData';
import { techStackListData } from '../../data/techStackListData';

import { TechStack } from '../../types/commonTypes';

import TechStackTagWithLevel from '../common/TechStackTagWithLevel';

import {
  ProfileProps,
  SignUpProfile,
  TechStacksWithLevel,
} from '../../types/UserInfomationType';
import UserService from '../../services/UserService';
import { validUrl } from '../../data/regularExpressionData';

const ProfileForm: React.FC<ProfileProps> = ({
  campus,
  ssafyTrack,
  studentNumber,
  studentName,
  signUpStep,
  signUpEmail,
  signUpPassword,
  updateSignUpStep,
}) => {
  const [techStacks, setTechStacks] = useState<TechStacksWithLevel[]>([]);

  const updateTeckStacks = (techStacks: Array<TechStacksWithLevel>): void => {
    setTechStacks(techStacks);
  };

  const [techStacksError, setTechStacksError] = useState<boolean>(false);

  const updateTechStacksError = (techStacksError: boolean): void => {
    setTechStacksError(techStacksError);
  };

  const [profileImg, setProfileImg] = useState(null);

  const [previewProgileImg, setPreviewProfileImg] = useState(null);

  const [job1, setJob1] = useState<string>('default');

  const [job2, setJob2] = useState<string>('');

  const [selfIntroduction, setSelfIntroduction] = useState<string>('');

  const [githubUrl, setGithubUrl] = useState<string>('');

  const [etcUrl, setEtcUrl] = useState<string>('');

  const [agreement, setAgreement] = useState<boolean>(false);

  const [job1Error, setJob1Error] = useState<boolean>(false);

  const [selfIntroductionError, setSelfIntroductionError] =
    useState<boolean>(false);

  const [agreementError, setAgreementError] = useState<boolean>(false);

  const [etcUrlPatternError, setEtcUrlPatternError] = useState<boolean>(false);

  const [gitHubUrlPatternError, setGitHubUrlPatternError] =
    useState<boolean>(false);

  let profileImgformData: any;

  //사진 업로드
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'search-tech-stack',
    multiple: true,
    options: techStackListData,
    getOptionLabel: (option) => option.name,
  });

  const handleChangeProfileImg = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const {
      target: { files },
    }: any = event;
    const theImgFile = files[0];
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      }: any = finishedEvent;

      setPreviewProfileImg(result);
    };

    //전송해야할 이미지
    reader.readAsDataURL(theImgFile);
    setProfileImg(theImgFile);

    //formData로 만들기
    if (theImgFile !== null) {
      profileImgformData = new FormData();
      profileImgformData.append('image', theImgFile);
    }
  };

  const handleClearProfileImg = () => {
    setProfileImg(null);
    setPreviewProfileImg(null);
  };

  //자기 소개

  const handleTextAreaEnterKeyPressed = (event: React.KeyboardEvent) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      if (!event.shiftKey) {
        event.preventDefault();
      }
    }
  };

  const handleTextAreaInput = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setSelfIntroduction(event.target.value);

    if (event.target.value === '') {
      setSelfIntroductionError(true);
    } else {
      setSelfIntroductionError(false);
    }
  };

  //희망직무
  const handleJobSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.target.name === 'job1'
      ? setJob1(event.target.value)
      : setJob2(event.target.value);

    if (event.target.name === 'job1' && event.target.value === 'default') {
      setJob1Error(true);
    } else {
      setJob1Error(false);
    }
  };

  //url
  const handleUrlInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.target.name === 'githubUrl'
      ? setGithubUrl(event.target.value)
      : setEtcUrl(event.target.value);
  };

  //약관 동의
  const handleCheckAgreement = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => {
    if (agreement === false) {
      setAgreement(true);
      setAgreementError(false);
    } else {
      setAgreement(false);
      setAgreementError(true);
    }
  };

  // 계정 만들기

  //최종 유효성 검사
  const validation = () => {
    if (!selfIntroduction) setSelfIntroductionError(true);
    if (job1 === 'default') setJob1Error(true);
    if (techStacks.length < 2) setTechStacksError(true);
    if (!agreement) setAgreementError(true);
    if (!validUrl.test(githubUrl)) setGitHubUrlPatternError(true);
    if (!validUrl.test(etcUrl)) setEtcUrlPatternError(true);

    if (
      selfIntroduction &&
      job1 !== 'default' &&
      techStacks.length >= 2 &&
      agreement
    ) {
      return true;
    } else {
      return false;
    }
  };

  //전송 데이터 모으기
  const getSignUpInfomation = () => {
    const SignUpInfomation: SignUpProfile = {
      campus: campus,
      ssafyTrack: ssafyTrack,
      studentNumber: studentNumber,
      studentName: studentName,
      email: signUpEmail,
      password: signUpPassword,
      profileImg: profileImgformData,
      selfIntroduction: selfIntroduction,
      job1: job1,
      job2: job2,
      techStacks: techStacks,
      githubUrl: githubUrl,
      etcUrl: etcUrl,
      agreement: agreement,
    };
    return SignUpInfomation;
  };

  //계정 만들기 버튼 클릭시
  const signUpClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    if (validation()) {
      const data: SignUpProfile = getSignUpInfomation();

      UserService.signUp(data)
        .then((res) => {
          //성공한 경우
        })
        .catch((errors) => {
          //실패한 경우
        });
    }
  };

  return (
    <Container>
      <Row>
        <AvatarWrapper>
          {previewProgileImg ? (
            <>
              <Avatar src={previewProgileImg} css={avatar} />
              <FileInputWrapper>
                <FileInputLabel htmlFor="profile-img">
                  <CloseIcon fontSize="large" onClick={handleClearProfileImg} />
                </FileInputLabel>
              </FileInputWrapper>
            </>
          ) : (
            <>
              <Avatar src="/broken-image.jpg" css={avatar} />
              <FileInputWrapper>
                <FileInputLabel htmlFor="profile-img">
                  <AddAPhotoIcon />
                </FileInputLabel>
                <FileInput
                  type="file"
                  id="profile-img"
                  accept="image/*"
                  onChange={handleChangeProfileImg}
                />
              </FileInputWrapper>
            </>
          )}
        </AvatarWrapper>
        <InputWrapper>
          <RequirementLabel htmlFor="self-introduction">
            자기소개
          </RequirementLabel>
          <Textarea
            id="self-introduction"
            name="selfIntroduction"
            onKeyPress={handleTextAreaEnterKeyPressed}
            onChange={handleTextAreaInput}
            required
          />
          {selfIntroductionError && (
            <ErrorSpan>필수 입력 항목입니다.</ErrorSpan>
          )}
        </InputWrapper>
      </Row>
      <Row>
        <InputWrapper css={rightGap}>
          <RequirementLabel htmlFor="job1">희망 직무1</RequirementLabel>
          <Select
            id="job1"
            defaultValue={'default'}
            name="job1"
            onChange={handleJobSelect}
            required
          >
            <option value="default" disabled>
              - 선택 -
            </option>
            {jobListData.map((job) => (
              <option key={job.id} value={job.name}>
                {job.name}
              </option>
            ))}
          </Select>
          {job1Error && <ErrorSpan>필수 선택 사항입니다.</ErrorSpan>}
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="job2">
            희망 직무2 <Em>(선택)</Em>
          </Label>
          <Select id="job2" defaultValue={'default'} onChange={handleJobSelect}>
            <option value="default">- 선택 -</option>
            {jobListData.map(
              (job) =>
                job1 !== job.name && (
                  <option key={job.id} value={job.name}>
                    {job.name}
                  </option>
                ),
            )}
          </Select>
        </InputWrapper>
      </Row>
      <Row css={techStackRow}>
        <InputWrapper {...getRootProps()} css={techStackInputWrapper}>
          <RequirementLabel
            htmlFor="tech-stack-options"
            {...getInputLabelProps()}
          >
            기술 스택 <Em>(필수 2가지 이상 기입)</Em>
          </RequirementLabel>

          <InfoInputWrapper
            ref={setAnchorEl}
            className={focused ? 'focused' : ''}
          >
            <InfoInput
              type="text"
              id="tech-stack-options"
              name="tech-stack-options"
              placeholder="ex) Vue.js, django, Spring Boot, MySQL"
              {...getInputProps()}
            />
          </InfoInputWrapper>
          {groupedOptions.length > 0 ? (
            <SearchList {...getListboxProps()}>
              {(groupedOptions as typeof techStackListData).map(
                (option, index) => (
                  <SearchItem {...getOptionProps({ option, index })}>
                    <TechStackInfo>
                      <TechStackImg src={option.imgUrl} alt={option.name} />
                      {option.name}
                    </TechStackInfo>
                    <CheckIcon fontSize="small" />
                  </SearchItem>
                ),
              )}
            </SearchList>
          ) : null}
          {techStacksError && (
            <ErrorSpan>
              필수 2가지 이상 선택 사항입니다.(상/중/하 선택도 필수입니다.)
            </ErrorSpan>
          )}
        </InputWrapper>
        <TechStackList>
          {value.map((option: TechStack, index: number) => (
            <TechStackTagWithLevel
              id={option.id}
              name={option.name}
              imgUrl={option.imgUrl}
              techStacks={techStacks}
              updateTechStacks={updateTeckStacks}
              techStacksError={techStacksError}
              updateTechStacksError={updateTechStacksError}
              {...getTagProps({ index })}
            />
          ))}
        </TechStackList>
      </Row>
      <Row>
        <InputWrapper>
          <Label htmlFor="github-url">
            GitHub URL <Em>(선택)</Em>
            {gitHubUrlPatternError && (
              <ErrorSpan className="url">유효한 URL이 아닙니다.</ErrorSpan>
            )}
          </Label>
          <InfoInput
            type="url"
            id="github-url"
            name="githubUrl"
            placeholder="https://github.com/ssafy-mate"
            onChange={handleUrlInput}
            pattern="https://.*"
          />
        </InputWrapper>
      </Row>
      <Row>
        <InputWrapper>
          <Label htmlFor="etc-url">
            기술 블로그 URL 또는 기타 URL <Em>(선택)</Em>
            {etcUrlPatternError && (
              <ErrorSpan className="url">유효한 URL이 아닙니다.</ErrorSpan>
            )}
          </Label>
          <InfoInput
            type="url"
            id="etc-url"
            name="etcUrl"
            placeholder="https://velog.io/@ssafy-mate"
            onChange={handleUrlInput}
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
            onClick={handleCheckAgreement}
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
      {agreementError && (
        <ErrorSpan className="agreement">필수 선택 사항입니다.</ErrorSpan>
      )}
      <Row>
        <SignUpButton onClick={signUpClick} type="button">
          계정 만들기
        </SignUpButton>
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

  @media (max-width: 441px) {
    &:nth-of-type(2) {
      flex-direction: column;
    }
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

const FileInputWrapper = styled.div`
  text-align: right;
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
`;
const IconButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  border: none;
  background-color: transparent;
  color: #f44336;
  transition: all 0.12s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.15);
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

const Em = styled.em`
  font-size: 13px;
  color: #3396f4;

  @media (max-width: 540px) {
    font-size: 12px;
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

const InfoInputWrapper = styled.div``;

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

const SearchList = styled.ul`
  overflow-y: scroll;
  position: absolute;
  top: 62px;
  z-index: 10;
  width: 100%;
  max-height: 200px;
  border: 1px solid #d7e2eb;
  border-radius: 0.25rem;
  background-color: #fff;
`;

const SearchItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  outline: 0;
  border-bottom: 1px solid #d7e2eb;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 16px;
  line-height: 24px;
  color: #5f7f90;
  transition: all 0.08s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #eaf4fd;
  }

  & svg {
    color: transparent;
  }

  &[aria-selected='true'] {
    background-color: #eaf4fd;

    & svg {
      color: #3396f4;
    }
  }

  @media (max-width: 540px) {
    font-size: 13px;
  }
`;

const TechStackInfo = styled.div`
  display: flex;
  align-items: center;
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
  margin-top: 24px;
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

const TechStackList = styled.ul``;

const TechStackImg = styled.img`
  margin-right: 6px;
  width: 24px;
  height: 24px;
  border-radius: 2px;
  object-fit: cover;

  @media (max-width: 540px) {
    width: 22px;
    height: 22px;
  }

  @media (max-width: 348px) {
    width: 18px;
    height: 18px;
  }
`;

const FileInputLabel = styled.label`
  position: relative;
  top: -22px;
  right: 6px;
  z-index: 10;
  color: #3396f4;
  cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
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

const rightGap = css`
  margin-right: 12px;

  @media (max-width: 540px) {
    margin-right: 6px;
  }

  @media (max-width: 441px) {
    margin-right: 0px;
  }
`;

const techStackRow = css`
  flex-direction: column;
`;

const techStackInputWrapper = css`
  position: relative;
`;

const ErrorSpan = styled.span`
  padding: 8px 12px;
  font-weight: 400;
  font-size: 13px;
  color: #f44336;

  &.agreement {
    //padding-left: 20px;
    margin-left: 10px;
  }

  &.url {
    color: #3396f4;
  }
`;

export default ProfileForm;
