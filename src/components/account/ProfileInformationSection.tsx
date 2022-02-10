import { useCallback, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { showSsafyMateAlert as showSsafyMateAlertSagaStart } from '../../redux/modules/alert';
import {
  editProfileInfo as editProfileInfoSagaStart,
  editProfileProjectsInfo as editProfileProjectsInfoStart,
} from '../../redux/modules/profile';

import { push } from 'connected-react-router';

import styled from '@emotion/styled';
import CheckIcon from '@mui/icons-material/Check';
import { useAutocomplete } from '@mui/material';

import { TechStackWithImg } from '../../types/commonTypes';
import { Severity, TechStacksWithLevel } from '../../types/signUpTypes';
import { JOB_LIST } from '../../data/jobListData';
import { PROJECT_LIST } from '../../data/ssafyData';

import useUserId from '../../hooks/useUserId';
import useToken from '../../hooks/useToken';
import { EditProfileInfoRequest } from '../../types/authTypes';
import useProfileInfo from '../../hooks/useProfileInfo';
import useTechStackList from '../../hooks/useTechStackList';
import useProfileTechStacks, {
  convertTechStackWithImg,
} from '../../hooks/useProfileTeckStacks';

import {
  EditProfileProjectsRequest,
  ProfileProject,
} from '../../types/userTypes';

import ProfileTechStackTagWithLevel from '../common/ProfileTechStackTagWithLevel';

const ProfileInformationSection: React.FC = () => {
  const dispatch = useDispatch();
  const profileInfo = useProfileInfo();
  const token: string | null = useToken();
  const userId: number | null = useUserId();
  const [showError, setShowError] = useState<boolean>(false);
  const [techStacks, setTechStacks] = useState<TechStacksWithLevel[]>([]);
  const techStackList: TechStackWithImg[] = useTechStackList();
  const oldTechStacksListData: convertTechStackWithImg = useProfileTechStacks();
  const oldTechStacksList = oldTechStacksListData.teckStackList;
  const oldTechStacksWithLevel = oldTechStacksListData.teckStackListWithLevel;
  const [selfIntroductionDisabled, setSelfIntroductionDisabled] =
    useState<boolean>(true);
  const [selfIntroductionValue, setSelfIntroductionValue] =
    useState<string>('');
  const [
    selfIntroductionModifyButtonText,
    setSelfIntroductionModifyButtonText,
  ] = useState<string>('수정');
  const [selfIntroductionError, setSelfIntroductionError] =
    useState<boolean>(false);
  const [newJob1, setNewJob1] = useState<string>('');
  const [newJob2, setNewJob2] = useState<string | null>(null);
  const [newJobsDisabled, setNewJobsDisabled] = useState<boolean>(true);
  const [newJobsModifyButtonText, setNewJobsModifyButtonText] =
    useState<string>('수정');
  const [oldcommonProject, setOldCommonProject] = useState<string | null>(null);
  const [commonProject, setCommonProject] = useState<string | null>(null);
  const [oldspecialProject, setOldSpecialProject] = useState<string | null>(
    null,
  );
  const [specialProject, setSpecialProject] = useState<string | null>(null);
  const [newCommonProjectsDisabled, setNewCommonProjectsDisabled] =
    useState<boolean>(true);
  const [
    newCommonProjectsModifyButtonText,
    setNewCommonProjectsModifyButtonText,
  ] = useState<string>('수정');
  const [newSpecialProjectsDisabled, setNewSpecialProjectsDisabled] =
    useState<boolean>(true);
  const [
    newSpecialprojectsModifyButtonText,
    setNewSpecialProjectsModifyButtonText,
  ] = useState<string>('수정');
  const [newGitHubUrl, setNewGitHubUrl] = useState<string | null>(null);
  const [newEtcUrl, setNewEtcUrl] = useState<string | null>(null);
  const [urlsModifyButtonText, setUrlsModifyButtonText] =
    useState<string>('수정');
  const [newUrlsDisabled, setUrlsDisabled] = useState<boolean>(true);
  const [newTechStackDisabled, setNewTechStackDisabled] =
    useState<boolean>(true);
  const [newTechStackModifyButtonText, setNewTechStackModifyButtonText] =
    useState<string>('수정');
  const [techStacksError, setTechStacksError] = useState<boolean>(false);

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
    isOptionEqualToValue: (option, value) =>
      option.techStackId === value.techStackId,
    defaultValue: oldTechStacksList,
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
    if (profileInfo === null) {
      dispatch(push('/'));
    } else {
      setSelfIntroductionValue(profileInfo.selfIntroduction);
      setNewJob1(profileInfo.job1);
      setNewJob2(profileInfo.job2);
      setNewGitHubUrl(profileInfo.githubUrl);
      setNewEtcUrl(profileInfo.etcUrl);
    }
  }, []);

  useEffect(() => {
    setTechStacks(oldTechStacksWithLevel);
  }, []);

  useEffect(() => {
    if (profileInfo?.projects[0].projectTrack !== undefined) {
      setCommonProject(profileInfo?.projects[0].projectTrack);
      setOldCommonProject(profileInfo?.projects[0].projectTrack);
    }

    if (profileInfo?.projects[1].projectTrack !== undefined) {
      setSpecialProject(profileInfo?.projects[1].projectTrack);
      setOldSpecialProject(profileInfo?.projects[1].projectTrack);
    }
  }, []);

  useEffect(() => {
    techStacks.length >= 2
      ? setTechStacksError(false)
      : setTechStacksError(true);
  }, [techStacks]);

  useEffect(() => {
    if (commonProject === 'default') {
      setCommonProject(null);
    }

    if (specialProject === 'default') {
      setSpecialProject(null);
    }

    if (newJob2 === 'default') {
      setNewJob2(null);
    }
  }, [commonProject, newJob2, specialProject]);

  const updateProfileAndAuth = useCallback(
    (requestData: EditProfileInfoRequest) => {
      dispatch(editProfileInfoSagaStart(requestData));
    },
    [dispatch],
  );

  const handleTextAreaEnterKeyPressed = (event: React.KeyboardEvent) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      if (!event.shiftKey) {
        event.preventDefault();
      }
    }
  };

  const handleNewSelfIntroduction = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setSelfIntroductionValue(event.target.value);
    event.target.value === ''
      ? setSelfIntroductionError(true)
      : setSelfIntroductionError(false);
  };

  const handleSelfIntroductionModifyButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (selfIntroductionModifyButtonText === '수정') {
      setSelfIntroductionModifyButtonText('확인');
      setSelfIntroductionDisabled(false);
    } else {
      if (selfIntroductionValue === '') {
        setShowError(true);
      } else {
        setShowError(false);
        setSelfIntroductionModifyButtonText('수정');
        setSelfIntroductionDisabled(true);
        requestEditProfile('self-introduction');
      }
    }
  };

  const handlJobsModifyButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (newJobsModifyButtonText === '수정') {
      setNewJobsModifyButtonText('확인');
      setNewJobsDisabled(false);
    } else {
      requestEditProfile('jobs');
      setNewJobsDisabled(true);
      setNewJobsModifyButtonText('수정');
    }
  };

  const handleJobsSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.name === 'job1') {
      setNewJob1(event.target.value);
      setNewJob2('default');
    } else {
      setNewJob2(event.target.value);
    }
  };

  const getEditJobsFormDate = () => {
    const editJobsFormDate = new FormData();
    editJobsFormDate.append('job1', newJob1);

    if (newJob2 !== null) {
      editJobsFormDate.append('job2', newJob2);
    }

    return editJobsFormDate;
  };

  const getEditSelfIntroduction = () => {
    const editSelfIntroductionFormDate = new FormData();

    editSelfIntroductionFormDate.append(
      'selfIntroduction',
      selfIntroductionValue,
    );

    return editSelfIntroductionFormDate;
  };

  const getEditTechStacks = () => {
    const editTechStacksFormDate = new FormData();

    editTechStacksFormDate.append('techStacks', JSON.stringify(techStacks));

    return editTechStacksFormDate;
  };

  const getEditUrls = () => {
    const editUrlsFormDate = new FormData();

    if (newGitHubUrl !== null) {
      editUrlsFormDate.append('githubUrl', newGitHubUrl);
    }
    if (newEtcUrl !== null) {
      editUrlsFormDate.append('etcUrl', newEtcUrl);
    }

    return editUrlsFormDate;
  };

  const updateProfileProjectAndAuth = useCallback(
    (requestData: EditProfileProjectsRequest) => {
      dispatch(editProfileProjectsInfoStart(requestData));
    },
    [dispatch],
  );

  const handleProjectSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.name === 'common-project') {
      setCommonProject(event.target.value);
    } else {
      setSpecialProject(event.target.value);
    }
  };

  const handleCommonProjectssModifyButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (newCommonProjectsModifyButtonText === '수정') {
      setNewCommonProjectsModifyButtonText('확인');
      setNewCommonProjectsDisabled(false);
    } else {
      requestEditProfile('common-projects');
      setNewCommonProjectsDisabled(true);
      setNewCommonProjectsModifyButtonText('수정');
    }
  };

  const handleSpecialProjectssModifyButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (newSpecialprojectsModifyButtonText === '수정') {
      setNewSpecialProjectsModifyButtonText('확인');
      setNewSpecialProjectsDisabled(false);
    } else {
      requestEditProfile('special-projects');
      setNewSpecialProjectsDisabled(true);
      setNewSpecialProjectsModifyButtonText('수정');
    }
  };

  const handleUrlsModifyButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (urlsModifyButtonText === '수정') {
      setUrlsModifyButtonText('확인');
      setUrlsDisabled(false);
    } else {
      requestEditProfile('urls');
      setUrlsDisabled(true);
      setUrlsModifyButtonText('수정');
    }
  };
  const handleUrlsInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.name === 'githubUrl'
      ? setNewGitHubUrl(event.target.value)
      : setNewEtcUrl(event.target.value);
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

  const handleTechStackModifyButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (newTechStackModifyButtonText === '수정') {
      setNewTechStackModifyButtonText('확인');
      setNewTechStackDisabled(false);
    } else {
      if (techStacks.length < 2) {
        setShowError(true);
      } else {
        requestEditProfile('techStacks');
        setNewTechStackDisabled(true);
        setNewTechStackModifyButtonText('수정');
      }
    }
  };

  const requestEditProfile = (selectedProfileInfo: string) => {
    switch (selectedProfileInfo) {
      case 'self-introduction':
        if (profileInfo?.selfIntroduction !== selfIntroductionValue) {
          if (selfIntroductionValue === '') {
            showAlert(true, '자기소개는 필수 입력 항목입니다.', 'warning');
          } else {
            const RequestFormData: FormData = getEditSelfIntroduction();

            if (token !== null && userId !== undefined && userId !== null) {
              updateProfileAndAuth({
                data: RequestFormData,
                token: token,
                userId: userId,
                profileInfo: 'self-introduction',
              });
            }
          }
        }
        break;
      case 'jobs':
        if (profileInfo?.job1 !== newJob1 || profileInfo?.job2 !== newJob2) {
          const RequestFormData: FormData = getEditJobsFormDate();

          if (token !== null && userId !== undefined && userId !== null) {
            updateProfileAndAuth({
              data: RequestFormData,
              token: token,
              userId: userId,
              profileInfo: 'jobs',
            });
          }
        }
        break;

      case 'common-projects':
        if (oldcommonProject !== commonProject) {
          const RequestProjectData: ProfileProject = {
            project: '공통 프로젝트',
            projectTrack: commonProject,
          };
          if (token !== null && userId !== undefined && userId !== null) {
            updateProfileProjectAndAuth({
              data: RequestProjectData,
              token: token,
              userId: userId,
            });
          }
        }

        break;
      case 'special-projects':
        if (oldspecialProject !== specialProject) {
          const RequestProjectData: ProfileProject = {
            project: '특화 프로젝트',
            projectTrack: specialProject,
          };

          if (token !== null && userId !== undefined && userId !== null) {
            updateProfileProjectAndAuth({
              data: RequestProjectData,
              token: token,
              userId: userId,
            });
          }
        }
        break;
      case 'techStacks':
        if (oldTechStacksWithLevel !== techStacks) {
          const RequestFormData: FormData = getEditTechStacks();

          if (token !== null && userId !== undefined && userId !== null) {
            updateProfileAndAuth({
              data: RequestFormData,
              token: token,
              userId: userId,
              profileInfo: 'tech-stacks',
            });
          }
        }
        break;
      case 'urls':
        if (
          profileInfo?.githubUrl !== newGitHubUrl ||
          profileInfo?.etcUrl !== newEtcUrl
        ) {
          const RequestFormData: FormData = getEditUrls();

          if (token !== null && userId !== undefined && userId !== null) {
            updateProfileAndAuth({
              data: RequestFormData,
              token: token,
              userId: userId,
              profileInfo: 'urls',
            });
          }
        }
        break;
    }
  };

  return (
    <>
      <SsafyMateInformationWrapper>
        <InfomationWrapper>
          <SingleInformationWrapper>
            <RequirementLabel htmlFor="self-introduction">
              자기소개
            </RequirementLabel>
            <Textarea
              id="self-introduction"
              name="selfIntroduction"
              value={selfIntroductionValue}
              onKeyPress={handleTextAreaEnterKeyPressed}
              onChange={handleNewSelfIntroduction}
              disabled={selfIntroductionDisabled}
              required
              className={selfIntroductionError ? 'have-error' : ''}
            />
            {showError && selfIntroductionError && (
              <ErrorMessageWrapper>
                <ErrorMessage>필수 입력 항목입니다.</ErrorMessage>
              </ErrorMessageWrapper>
            )}
            <ModifyButton
              type="button"
              onClick={handleSelfIntroductionModifyButton}
            >
              {selfIntroductionModifyButtonText}
            </ModifyButton>
          </SingleInformationWrapper>
          <Hr />
          <Row>
            <JobSelectWrapper className="right-gap">
              <RequirementLabel htmlFor="job1">희망 직무1</RequirementLabel>
              <Select
                id="job1"
                name="job1"
                value={newJob1}
                onChange={handleJobsSelect}
                disabled={newJobsDisabled}
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
            </JobSelectWrapper>
            <JobSelectWrapper className="right-gap">
              <Label htmlFor="job2">희망 직무2</Label>
              <Select
                id="job2"
                value={newJob2 !== null ? newJob2 : 'default'}
                name="job2"
                onChange={handleJobsSelect}
                disabled={newJobsDisabled}
              >
                <option value="default">- 선택 -</option>
                {JOB_LIST.filter((job) => job.name !== newJob1).map((job) => (
                  <option key={job.id} value={job.name}>
                    {job.name}
                  </option>
                ))}
              </Select>
            </JobSelectWrapper>
            <JobSelectWrapper className="top-gap">
              <ModifyButton
                type="button"
                className="job-select__edit-button"
                onClick={handlJobsModifyButton}
              >
                {newJobsModifyButtonText}
              </ModifyButton>
            </JobSelectWrapper>
          </Row>
          <Hr />
          <Row>
            <SingleInformationWrapper className="right-gap">
              <Label htmlFor="common-project">공통 프로젝트 트랙</Label>
              <Select
                id="common-project"
                name="common-project"
                value={commonProject !== null ? commonProject : 'default'}
                onChange={handleProjectSelect}
                disabled={newCommonProjectsDisabled}
              >
                <option value="default">- 선택 -</option>
                {PROJECT_LIST[0].projectTracks !== undefined &&
                  PROJECT_LIST[0].projectTracks.map((projectTrack) => (
                    <option key={projectTrack.id} value={projectTrack.name}>
                      {projectTrack.name}
                    </option>
                  ))}
              </Select>
            </SingleInformationWrapper>
            <SingleInformationWrapper className="top-right-gap-button">
              <ModifyButton
                type="button"
                className="project-track-select__edit-button"
                onClick={handleCommonProjectssModifyButton}
              >
                {newCommonProjectsModifyButtonText}
              </ModifyButton>
            </SingleInformationWrapper>
            <SingleInformationWrapper className="right-gap">
              <Label htmlFor="special-project">특화 프로젝트 트랙</Label>
              <Select
                id="special-project"
                name="special-project"
                value={specialProject !== null ? specialProject : 'default'}
                onChange={handleProjectSelect}
                disabled={newSpecialProjectsDisabled}
              >
                <option value="default">- 선택 -</option>
                {PROJECT_LIST[1].projectTracks !== undefined &&
                  PROJECT_LIST[1].projectTracks.map((projectTrack) => (
                    <option key={projectTrack.id} value={projectTrack.name}>
                      {projectTrack.name}
                    </option>
                  ))}
              </Select>
            </SingleInformationWrapper>
            <SingleInformationWrapper className="top-gap-button">
              <ModifyButton
                type="button"
                className="project-track-select__edit-button"
                onClick={handleSpecialProjectssModifyButton}
              >
                {newSpecialprojectsModifyButtonText}
              </ModifyButton>
            </SingleInformationWrapper>
          </Row>
          <Hr />
          <Row className="tech-stack-row">
            <SingleInformationWrapper
              {...getRootProps()}
              className="tech-stack-input"
            >
              <RequirementLabel
                htmlFor="tech-stack-options"
                {...getInputLabelProps()}
              >
                기술 스택 <Em>(필수 2가지 이상 기입)</Em>
              </RequirementLabel>
              <InfoInputWrapper
                ref={setAnchorEl}
                className={
                  focused
                    ? 'focused'
                    : '' || (showError && techStacksError ? 'have-error' : '')
                }
              >
                <InfoInput
                  type="text"
                  id="tech-stack-options"
                  name="tech-stack-options"
                  placeholder="ex) Vue.js, django, Spring Boot, MySQL"
                  disabled={newTechStackDisabled}
                  {...getInputProps()}
                />
              </InfoInputWrapper>
              {groupedOptions.length > 0 ? (
                <SearchList {...getListboxProps()}>
                  {(groupedOptions as typeof techStackList).map(
                    (option, index) => (
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
                    ),
                  )}
                </SearchList>
              ) : null}
              {showError && techStacksError && (
                <ErrorMessageWrapper>
                  <ErrorMessage>필수 2가지 이상 선택 사항입니다.</ErrorMessage>
                </ErrorMessageWrapper>
              )}
            </SingleInformationWrapper>
            <TechStackList>
              {value.map((option: TechStackWithImg, index: number) => (
                <ProfileTechStackTagWithLevel
                  techStackId={option.techStackId}
                  techStackName={option.techStackName}
                  techStackImgUrl={option.techStackImgUrl}
                  techStacks={techStacks}
                  newTechStackDisabled={newTechStackDisabled}
                  updateTechStacks={updateTechStacks}
                  deleteTechStacks={deleteTechStacks}
                  oldTechStacksWithLevel={oldTechStacksWithLevel}
                  {...getTagProps({ index })}
                />
              ))}
            </TechStackList>
            <ModifyButton type="button" onClick={handleTechStackModifyButton}>
              {newTechStackModifyButtonText}
            </ModifyButton>
          </Row>
          <Hr />
          <Row>
            <SingleInformationWrapper>
              <Label htmlFor="github-url">GitHub URL</Label>
              <InfoInput
                type="url"
                id="github-url"
                name="githubUrl"
                placeholder="ex) https://github.com/ssafy-mate"
                pattern="https://.*"
                disabled={newUrlsDisabled}
                onChange={handleUrlsInput}
                value={newGitHubUrl !== null ? newGitHubUrl : ''}
              />
            </SingleInformationWrapper>
          </Row>
          <Row>
            <SingleInformationWrapper>
              <Label htmlFor="etc-url">기술 블로그 URL 또는 기타 URL</Label>
              <InfoInput
                type="url"
                id="etc-url"
                name="etcUrl"
                placeholder="ex) https://velog.io/@ssafy-mate"
                pattern="https://.*"
                value={newEtcUrl !== null ? newEtcUrl : ''}
                onChange={handleUrlsInput}
                disabled={newUrlsDisabled}
              />
            </SingleInformationWrapper>
          </Row>
          <SingleInformationWrapper>
            <ModifyButton type="button" onClick={handleUrlsModifyButton}>
              {urlsModifyButtonText}
            </ModifyButton>
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

  &.right-gap {
    width: 43%;
    margin-right: 8px;
  }
  &.top-gap-button {
    width: 13%;
    margin-top: 25px;
  }
  &.top-right-gap-button {
    width: 13%;
    margin-top: 25px;
    margin-right: 8px;
  }
  &.tech-stack-input {
    position: relative;
  }

  @media (max-width: 575px) {
    &.right-gap {
      margin-right: 0px;
      width: 100%;
    }

    &.top-gap-button {
      width: 100%;
      margin-top: 8px;
    }
    &.top-right-gap-button {
      width: 100%;
      margin-top: 8px;
      margin-bottom: 8px;
    }
  }
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

  &:not(:disabled) {
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
  }

  &:disabled {
    background-color: #fcfcfe;
    color: #a6adb4;
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
const ErrorMessageWrapper = styled.div`
  margin-bottom: 8px;
`;

const ErrorMessage = styled.span`
  padding-left: 6px;
  font-size: 13px;
  line-height: 1.5;
  color: #f44336;
`;

const ModifyButton = styled.button`
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

  &.job-select__edit-button,
  &.project-track-select__edit-button {
    margin-top: 0;
    width: 60px;
    font-size: 15px;
  }

  @media (max-width: 575px) {
    font-size: 15px;

    &.job-select__edit-button,
    &.project-track-select__edit-button {
      width: 100%;
    }
  }
`;

const JobSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  &.right-gap {
    width: 43%;
    margin-right: 8px;
  }

  &.top-gap {
    width: 13%;
    margin-top: 25px;
  }

  @media (max-width: 575px) {
    &.right-gap {
      width: 100%;
      margin-right: 0;
    }

    &.top-gap {
      margin-top: 8px;
      width: 100%;
    }
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

  &:not(:disabled) {
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
  }

  &:disabled {
    cursor: not-allowed;
  }

  @media (max-width: 575px) {
    margin-bottom: 16px;
    font-size: 13px;
  }
`;

const Row = styled.div`
  display: flex;

  &:first-of-type {
    margin-bottom: 12px;
  }

  &.tech-stack-row {
    flex-direction: column;
  }

  @media (max-width: 575px) {
    flex-direction: column;

    &:nth-of-type(2) {
      flex-direction: column;
    }
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

  &:not(:disabled) {
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
  }

  &:disabled {
    background-color: #fcfcfe;
    color: #a6adb4;
    cursor: not-allowed;
  }

  @media (max-width: 575px) {
    font-size: 13px;
  }
`;

const TechStackList = styled.ul``;

const SearchItemWrapper = styled.div`
  height: 100%;
  width: 100%;
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

const Em = styled.em`
  font-size: 13px;
  color: #3396f4;
`;

const TechStackInfo = styled.div`
  display: flex;
  align-items: center;
`;

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

const Hr = styled.hr`
  width: 100%;
  border: 1px dashed #d7e2eb;
  margin: 24px 0;
`;

export default ProfileInformationSection;
