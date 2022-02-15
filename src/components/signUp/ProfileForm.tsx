import { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { showSsafyMateAlert as showSsafyMateAlertSagaStart } from '../../redux/modules/alert';

import { push } from 'connected-react-router';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Avatar from '@mui/material/Avatar';
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import CloseIcon from '@mui/icons-material/Close';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CheckIcon from '@mui/icons-material/Check';

import { JOB_LIST } from '../../data/jobListData';

import { TechStackWithImg } from '../../types/commonTypes';
import {
  ProfileProps,
  Severity,
  TechStacksWithLevel,
} from '../../types/signUpTypes';

import UserService from '../../services/UserService';

import useTechStackList from '../../hooks/useTechStackList';

import TechStackTagWithLevel from '../common/TechStackTagWithLevel';

const ProfileForm: React.FC<ProfileProps> = ({
  campus,
  ssafyTrack,
  studentNumber,
  studentName,
  signUpEmail,
  signUpPassword,
}) => {
  const [showError, setShowError] = useState<number>(0);
  const [techStacks, setTechStacks] = useState<TechStacksWithLevel[]>([]);
  const [techStacksError, setTechStacksError] = useState<boolean>(false);
  const [profileImg, setProfileImg] = useState<Blob | null>(null);
  const [previewProgileImg, setPreviewProfileImg] = useState<string | null>(
    null,
  );
  const [job1, setJob1] = useState<string>('default');
  const [job2, setJob2] = useState<string | null>(null);
  const [selfIntroduction, setSelfIntroduction] = useState<string>('');
  const [githubUrl, setGithubUrl] = useState<string | null>(null);
  const [etcUrl, setEtcUrl] = useState<string | null>(null);
  const [agreement, setAgreement] = useState<boolean>(false);
  const [job1Error, setJob1Error] = useState<boolean>(false);
  const [selfIntroductionError, setSelfIntroductionError] =
    useState<boolean>(false);
  const [agreementError, setAgreementError] = useState<boolean>(false);
  useState<boolean>(false);

  const techStackList: TechStackWithImg[] = useTechStackList();

  const signUpFormData = new FormData();

  const dispatch = useDispatch();

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
    options: techStackList,
    getOptionLabel: (option) => option.techStackName,
  });

  const showAlert = (
    alertShow: boolean,
    alertText: string,
    alertType: Severity,
  ) => {
    dispatch(
      showSsafyMateAlertSagaStart({
        show: alertShow,
        text: alertText,
        type: alertType,
      }),
    );
  };

  useEffect(() => {
    if (job2 === 'default') {
      setJob2(null);
    }
  }, [job2]);

  useEffect(() => {
    techStacks.length >= 2
      ? setTechStacksError(false)
      : setTechStacksError(true);
  }, [techStacks]);

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

    reader.readAsDataURL(theImgFile);
    setProfileImg(theImgFile);
  };

  const handleClearProfileImg = () => {
    setProfileImg(null);
    setPreviewProfileImg(null);
    signUpFormData.delete('profileImg');
  };

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

    event.target.value === ''
      ? setSelfIntroductionError(true)
      : setSelfIntroductionError(false);
  };

  const handleJobSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.name === 'job1') {
      setJob1(event.target.value);
      setJob2('default');
    } else {
      setJob2(event.target.value);
    }

    event.target.name === 'job1' && event.target.value === 'default'
      ? setJob1Error(true)
      : setJob1Error(false);
  };

  const updateTechStacks = (selectedTechStack: TechStacksWithLevel): void => {
    const updateTechStackIndex = techStacks.findIndex(
      (techStack) => techStack.techStackId === selectedTechStack.techStackId,
    );

    const tempTechStacks = [...techStacks];

    tempTechStacks[updateTechStackIndex] = {
      techStackId: selectedTechStack.techStackId,
      techStackLevel: selectedTechStack.techStackLevel,
    };

    setTechStacks(tempTechStacks);
  };

  const deleteTechStacks = (seletedTechStackId: number): void => {
    const findStackIndex = techStacks.findIndex(
      (techStack) => techStack.techStackId === seletedTechStackId,
    );

    const tempTechStacks = [...techStacks];

    if (findStackIndex >= 0) {
      tempTechStacks.splice(findStackIndex, 1);
    }

    setTechStacks(tempTechStacks);
  };

  const controlTechStacks = (selectedTechStackId: number) => {
    const findTeckStackId = techStacks.findIndex(
      (techStack) => techStack.techStackId === selectedTechStackId,
    );

    if (findTeckStackId === -1) {
      setTechStacks([
        ...techStacks,
        {
          techStackId: selectedTechStackId,
          techStackLevel: '중',
        },
      ]);
    } else {
      deleteTechStacks(selectedTechStackId);
    }
  };

  const handleUrlInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    event.target.name === 'githubUrl'
      ? setGithubUrl(event.target.value)
      : setEtcUrl(event.target.value);
  };

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

  const validation = (): boolean => {
    if (!selfIntroduction) {
      setSelfIntroductionError(true);
    }

    if (job1 === 'default') {
      setJob1Error(true);
    }

    techStacks.length < 2
      ? setTechStacksError(true)
      : setTechStacksError(false);

    if (!agreement) {
      setAgreementError(true);
    }

    if (
      selfIntroduction !== '' &&
      job1 !== 'default' &&
      techStacks.length >= 2 &&
      agreement
    ) {
      return true;
    } else {
      setShowError(1);
      return false;
    }
  };

  const getSignUpInformation = () => {
    signUpFormData.append('campus', campus);
    signUpFormData.append('ssafyTrack', ssafyTrack);
    signUpFormData.append('studentNumber', studentNumber);
    signUpFormData.append('userName', studentName);
    signUpFormData.append('userEmail', signUpEmail);
    signUpFormData.append('password', signUpPassword);
    signUpFormData.append('selfIntroduction', selfIntroduction);
    signUpFormData.append('job1', job1);
    signUpFormData.append('techStacks', JSON.stringify(techStacks));
    signUpFormData.append('agreement', String(agreement));

    if (profileImg !== null) {
      signUpFormData.append('profileImg', profileImg);
    }

    if (job2 !== null) {
      signUpFormData.append('job2', job2);
    }

    if (githubUrl !== null) {
      signUpFormData.append('githubUrl', githubUrl);
    }

    if (etcUrl !== null) {
      signUpFormData.append('etcUrl', etcUrl);
    }

    return signUpFormData;
  };

  const signUpClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const data: FormData = getSignUpInformation();

    if (validation()) {
      UserService.signUp(data)
        .then(({ message }) => {
          showAlert(true, message, 'success');

          dispatch(push('/users/sign_in'));
        })
        .catch((error) => {
          if (error.response) {
            const { status, message } = error.response.data;

            switch (status) {
              case 400:
                showAlert(true, message, 'warning');
                break;
              case 500:
                showAlert(true, message, 'error');
                break;
            }
          }
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
            className={selfIntroductionError ? 'have-error' : ''}
            maxLength={800}
          />
          {showError === 1 && selfIntroductionError && (
            <ErrorMessageWrapper>
              <ErrorMessage>필수 입력 항목입니다.</ErrorMessage>
            </ErrorMessageWrapper>
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
            className={job1Error ? 'have-error' : ''}
          >
            <option value="default" disabled>
              - 선택 -
            </option>
            {JOB_LIST.map((job) => (
              <option key={job.id} value={job.name}>
                {job.name}
              </option>
            ))}
          </Select>
          {showError === 1 && job1Error && (
            <ErrorMessageWrapper>
              <ErrorMessage>필수 선택 사항입니다.</ErrorMessage>
            </ErrorMessageWrapper>
          )}
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="job2">
            희망 직무2 <Em>(선택)</Em>
          </Label>
          <Select
            id="job2"
            defaultValue={'default'}
            onChange={handleJobSelect}
            disabled={job1 === 'default' ? true : false}
          >
            <option value="default">- 선택 -</option>
            {JOB_LIST.filter((job) => job.name !== job1).map((job) => (
              <option key={job.id} value={job.name}>
                {job.name}
              </option>
            ))}
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
            className={
              (focused ? 'focused' : '') ||
              (showError === 1 && techStacksError === true ? 'have-error' : '')
            }
          >
            <InfoInput
              type="text"
              id="tech-stack-options"
              name="tech-stack-options"
              onKeyDown={(event: any) => {
                if (event.key === 'Backspace') {
                  event.stopPropagation();
                }
              }}
              placeholder="ex) Vue.js, django, Spring Boot, MySQL"
              {...getInputProps()}
            />
          </InfoInputWrapper>
          {groupedOptions.length > 0 ? (
            <SearchList {...getListboxProps()}>
              {(groupedOptions as typeof techStackList).map((option, index) => (
                <SearchItemWrapper
                  key={option.techStackId}
                  onClick={() => {
                    controlTechStacks(option.techStackId);
                  }}
                >
                  <SearchItem {...getOptionProps({ option, index })}>
                    <TechStackInfo>
                      <TechStackImg
                        src={option.techStackImgUrl}
                        alt={option.techStackName}
                      />
                      {option.techStackName}
                    </TechStackInfo>
                    <CheckIcon fontSize="small" />
                  </SearchItem>
                </SearchItemWrapper>
              ))}
            </SearchList>
          ) : null}
          {showError === 1 && techStacksError && (
            <ErrorMessageWrapper>
              <ErrorMessage>필수 2가지 이상 선택 사항입니다.</ErrorMessage>
            </ErrorMessageWrapper>
          )}
        </InputWrapper>
        <TechStackList>
          {value.map((option: TechStackWithImg, index: number) => (
            <TechStackTagWithLevel
              techStackId={option.techStackId}
              techStackName={option.techStackName}
              techStackImgUrl={option.techStackImgUrl}
              techStacks={techStacks}
              updateTechStacks={updateTechStacks}
              deleteTechStacks={deleteTechStacks}
              {...getTagProps({ index })}
            />
          ))}
        </TechStackList>
      </Row>
      <Row>
        <InputWrapper>
          <Label htmlFor="github-url">
            GitHub URL <Em>(선택)</Em>
          </Label>
          <InfoInput
            type="url"
            id="github-url"
            name="githubUrl"
            placeholder="ex) https://github.com/ssafy-mate"
            onChange={handleUrlInput}
            pattern="https://.*"
            maxLength={250}
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
            name="etcUrl"
            placeholder="ex) https://velog.io/@ssafy-mate"
            onChange={handleUrlInput}
            pattern="https://.*"
            maxLength={250}
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
            className={agreementError ? 'have-error' : ''}
          />
          <CheckBoxLabel htmlFor="sign-up-agreement">
            <AgreementLink
              href="/terms_of_service"
              target="_blank"
              rel="noopener noreferrer"
            >
              이용약관
            </AgreementLink>
            &nbsp;및&nbsp;
            <AgreementLink
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              개인정보 처리방침
            </AgreementLink>
            에 동의합니다.
          </CheckBoxLabel>
        </CheckBoxWrapper>
      </Row>
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

  @media (max-width: 575px) {
    &:nth-of-type(2) {
      flex-direction: column;
    }
  }
`;

const AvatarWrapper = styled.div`
  margin: auto 32px;

  @media (max-width: 575px) {
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
const CheckBoxWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 4px;
  font-size: 14px;
  line-height: 1.5;
  color: #263747;

  @media (max-width: 575px) {
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

  @media (max-width: 575px) {
    font-size: 13px;
  }
`;

const Em = styled.em`
  font-size: 13px;
  color: #3396f4;
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
  resize: none;

  &.have-error {
    margin-bottom: 4px;
    border: 1px solid #f44336;
    box-shadow: inset 0 0 0 1px #ff77774d;
  }

  @media (max-width: 575px) {
    font-size: 13px;
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

const InfoInputWrapper = styled.div`
  width: 100%;
  height: 40px;
  margin-bottom: 16px;
  outline: 0;
  border-radius: 0.25rem;
  background-color: #fbfbfd;
  font-size: 16px;
  line-height: 24px;
  color: #263747;
  transition: all 0.08s ease-in-out;

  &.have-error {
    margin-bottom: 4px;
    border-radius: 0.25rem;
    border: 1px solid #f44336;
    box-shadow: inset 0 0 0 1px #ff77774d;
  }
`;

const InfoInput = styled.input`
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

  @media (max-width: 575px) {
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

  @media (max-width: 575px) {
    font-size: 13px;
  }
`;

const SearchItemWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const TechStackInfo = styled.div`
  display: flex;
  align-items: center;
`;

const AgreementCheckBox = styled.input`
  margin-right: 6px;
  cursor: pointer;

  &.have-error {
    box-shadow: inset 0 0 0 1px #f44336;
  }
`;

const CheckBoxLabel = styled.label`
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: #98a8b9;

  @media (max-width: 575px) {
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
  margin-top: 16px;
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

const TechStackList = styled.ul``;

const TechStackImg = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 6px;
  border-radius: 2px;
  object-fit: fill;

  @media (max-width: 575px) {
    width: 18px;
    height: 18px;
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

const avatar = css`
  width: 100px;
  height: 100px;
  background-color: #abb7c6;

  @media (max-width: 575px) {
    width: 90px;
    height: 90px;
  }
`;

const rightGap = css`
  margin-right: 12px;

  @media (max-width: 767px) {
    margin-right: 6px;
  }
  @media (max-width: 575px) {
    margin-right: 0px;
  }
`;

const techStackRow = css`
  flex-direction: column;
`;

const techStackInputWrapper = css`
  position: relative;
`;

export default ProfileForm;
