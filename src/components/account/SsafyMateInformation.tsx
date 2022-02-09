import { useCallback, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { showSsafyMateAlert as showSsafyMateAlertSagaStart } from '../../redux/modules/alert';
import {
  editProfileInfo as editProfileInfoSagaStart,
  editProfileProjectsInfo as editProfileProjectsInfoStart,
} from '../../redux/modules/profile';

import history from '../../history';

import styled from '@emotion/styled';
import CheckIcon from '@mui/icons-material/Check';
import { useAutocomplete } from '@mui/material';

import { TechStackWithImg } from '../../types/commonTypes';
import { Severity, TechStacksWithLevel } from '../../types/signUpTypes';
import { jobListData } from '../../data/jobListData';
import { projectListData, ProjectTrack } from '../../data/ssafyData';

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
  project,
} from '../../services/ProfileService';

import ProfileTechStackTagWithLevel from '../common/ProfileTechStackTagWithLevel';

const SsafyMateInformation: React.FC = () => {
  const profileInfo = useProfileInfo();
  const token: string | null = useToken();
  const userId: number | null = useUserId();
  const [techStacks, setTechStacks] = useState<TechStacksWithLevel[]>([]);
  const techStackList: TechStackWithImg[] = useTechStackList();
  const oldTechStacksListData: convertTechStackWithImg = useProfileTechStacks();
  const oldTechStacksList = oldTechStacksListData.teckStackList;
  const oldTechStacksWithLevel = oldTechStacksListData.teckStackListWithLevel;

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
    defaultValue: oldTechStacksList,
    getOptionLabel: (option) => option.techStackName,
  });

  const dispatch = useDispatch();

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
      history.push('/');
    } else {
      setSelfIntroductionValue(profileInfo.selfIntroduction);
      setNewJob1(profileInfo.job1);
      setNewJob2(profileInfo.job2);
      setNewGitHubUrl(profileInfo.githubUrl);
      setNewEtcUrl(profileInfo.etcUrl);
    }
  }, []);
  const [selfIntroductionDisabled, setSelfIntroductionDisabled] =
    useState<boolean>(true);
  const [selfIntroductionValue, setSelfIntroductionValue] =
    useState<string>('');
  const [
    selfIntroductionModifyButtonText,
    setSelfIntroductionModifyButtonText,
  ] = useState<string>('수정');
  const [newJob1, setNewJob1] = useState<string>('');
  const [newJob2, setNewJob2] = useState<string | null>('');
  const [newJobsDisabled, setNewJobsDisabled] = useState<boolean>(true);
  const [newJobsModifyButtonText, setNewJobsModifyButtonText] =
    useState<string>('수정');
  const [oldcommonProject, setOldCommonProject] = useState<string | null>('');
  const [commonProject, setCommonProject] = useState<string | null>('');
  const [oldspecialProject, setOldSpecialProject] = useState<string | null>('');
  const [specialProject, setSpecialProject] = useState<string | null>('');
  const [newProjectsDisabled, setNewProjectsDisabled] = useState<boolean>(true);
  const [projectsModifyButtonText, newProjectsModifyButtonText] =
    useState<string>('수정');
  const [commonProjectListData, setCommonProjectListData] = useState<
    ProjectTrack[]
  >([]);
  const [specialProjectListData, setSpecialProjectListData] = useState<
    ProjectTrack[]
  >([]);
  const [newGitHubUrl, setNewGitHubUrl] = useState<string | null>('');
  const [newEtcUrl, setNewEtcUrl] = useState<string | null>('');
  const [urlsModifyButtonText, setUrlsModifyButtonText] =
    useState<string>('수정');
  const [newUrlsDisabled, setUrlsDisabled] = useState<boolean>(true);
  const [newTechStackDisabled, setNewTechStackDisabled] =
    useState<boolean>(true);
  const [newTechStackModifyButtonText, setNewTechStackModifyButtonText] =
    useState<string>('수정');

  useEffect(() => {
    setTechStacks(oldTechStacksWithLevel);
  }, []);

  useEffect(() => {
    if (projectListData[0].projectTracks !== undefined) {
      setCommonProjectListData(projectListData[0].projectTracks);
    }

    if (projectListData[1].projectTracks !== undefined) {
      setSpecialProjectListData(projectListData[1].projectTracks);
    }

    if (profileInfo?.projects[0].projectTrack !== undefined) {
      setCommonProject(profileInfo?.projects[0].projectTrack);
      setOldCommonProject(profileInfo?.projects[0].projectTrack);
    }

    if (profileInfo?.projects[1].projectTrack !== undefined) {
      setSpecialProject(profileInfo?.projects[1].projectTrack);
      setOldSpecialProject(profileInfo?.projects[1].projectTrack);
    }
  }, []);

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
  };

  const handleSelfIntroductionModifyButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (selfIntroductionModifyButtonText === '수정') {
      setSelfIntroductionModifyButtonText('확인');
      setSelfIntroductionDisabled(false);
    } else {
      setSelfIntroductionModifyButtonText('수정');
      setSelfIntroductionDisabled(true);
      newProfileInfo('self-introduction');
    }
  };

  const handlJobsModifyButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (newJobsModifyButtonText === '수정') {
      setNewJobsModifyButtonText('확인');
      setNewJobsDisabled(false);
    } else {
      newProfileInfo('jobs');
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

  const EditJobs = () => {
    const EditJobsFormDate = new FormData();
    EditJobsFormDate.append('job1', newJob1);
    if (newJob2 !== null) {
      EditJobsFormDate.append('job2', newJob2);
    }

    return EditJobsFormDate;
  };

  const EditSelfIntroduction = () => {
    const EditSelfIntroductionFormDate = new FormData();
    EditSelfIntroductionFormDate.append(
      'selfIntroduction',
      selfIntroductionValue,
    );

    return EditSelfIntroductionFormDate;
  };

  const EditProjects = () => {
    const EditProjectsData: project[] = [
      {
        project: '공통 프로젝트',
        projectTrack: commonProject,
      },
      {
        project: '특화 프로젝트',
        projectTrack: specialProject,
      },
    ];

    return EditProjectsData;
  };

  const EditTechStacks = () => {
    const EditTechStacksFormDate = new FormData();
    EditTechStacksFormDate.append('techStacks', JSON.stringify(techStacks));

    return EditTechStacksFormDate;
  };

  const EditUrls = () => {
    const EditUrlsFormDate = new FormData();

    if (newGitHubUrl !== null) {
      EditUrlsFormDate.append('githubUrl', newGitHubUrl);
    }
    if (newEtcUrl !== null) {
      EditUrlsFormDate.append('etcUrl', newEtcUrl);
    }

    return EditUrlsFormDate;
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

  const handleProjectssModifyButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (projectsModifyButtonText === '수정') {
      newProjectsModifyButtonText('확인');
      setNewProjectsDisabled(false);
    } else {
      newProfileInfo('projects');
      setNewProjectsDisabled(true);
      newProjectsModifyButtonText('수정');
    }
  };

  const handleUrlsModifyButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (urlsModifyButtonText === '수정') {
      setUrlsModifyButtonText('확인');
      setUrlsDisabled(false);
    } else {
      newProfileInfo('urls');
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
      (techStack) =>
        techStack.techStackCode === selectedTechStack.techStackCode,
    );

    const tempTechStacks = [...techStacks];

    tempTechStacks[updateTechStackIndex] = {
      techStackCode: selectedTechStack.techStackCode,
      techStackLevel: selectedTechStack.techStackLevel,
    };

    setTechStacks(tempTechStacks);
  };

  const deleteTechStacks = (seletedTechStackId: number): void => {
    const findStackIndex = techStacks.findIndex(
      (techStack) => techStack.techStackCode === seletedTechStackId,
    );

    const tempTechStacks = [...techStacks];

    if (findStackIndex >= 0) {
      tempTechStacks.splice(findStackIndex, 1);
    }

    setTechStacks(tempTechStacks);
  };

  const controlTechStacks = (selectedTechStackId: number) => {
    const findTeckStackId = techStacks.findIndex(
      (techStack) => techStack.techStackCode === selectedTechStackId,
    );

    if (findTeckStackId === -1) {
      setTechStacks([
        ...techStacks,
        {
          techStackCode: selectedTechStackId,
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
      newProfileInfo('techStacks');
      setNewTechStackDisabled(true);
      setNewTechStackModifyButtonText('수정');
    }
  };

  const newProfileInfo = (profileInfoSelected: string) => {
    switch (profileInfoSelected) {
      case 'self-introduction':
        if (profileInfo?.selfIntroduction !== selfIntroductionValue) {
          if (selfIntroductionValue === '') {
            showAlert(true, '자기소개는 필수 입력 항목입니다.', 'warning');
          } else {
            const RequestFormData: FormData = EditSelfIntroduction();
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
          const RequestFormData: FormData = EditJobs();

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
      case 'projects':
        if (
          oldcommonProject !== commonProject ||
          oldspecialProject !== specialProject
        ) {
          const RequestProjectData: project[] = EditProjects();
          if (token !== null && userId !== undefined && userId !== null) {
            updateProfileProjectAndAuth({
              data: RequestProjectData[0],
              token: token,
              userId: userId,
            });
            updateProfileProjectAndAuth({
              data: RequestProjectData[1],
              token: token,
              userId: userId,
            });
          }
        }
        break;
      case 'techStacks':
        if (oldTechStacksWithLevel !== techStacks) {
          const RequestFormData: FormData = EditTechStacks();

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
          const RequestFormData: FormData = EditUrls();

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
          <SingleInformationWrapper className="self-introduction">
            <InformationLabel htmlFor="self-introduction" className="necessary">
              자기소개
            </InformationLabel>
            <Textarea
              id="self-introduction"
              name="selfIntroduction"
              value={selfIntroductionValue}
              onKeyPress={handleTextAreaEnterKeyPressed}
              onChange={handleNewSelfIntroduction}
              disabled={selfIntroductionDisabled}
            />
            <ModifyButton
              type="button"
              onClick={handleSelfIntroductionModifyButton}
            >
              {selfIntroductionModifyButtonText}
            </ModifyButton>
          </SingleInformationWrapper>

          <Row>
            <JobSelectWrapper className="right-gap">
              <InformationLabel htmlFor="job1" className="necessary">
                희망 직무1
              </InformationLabel>
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
                {jobListData.map((job) => (
                  <option key={job.id} value={job.name}>
                    {job.name}
                  </option>
                ))}
              </Select>
            </JobSelectWrapper>

            <JobSelectWrapper className="right-gap">
              <InformationLabel htmlFor="job2">희망 직무2</InformationLabel>
              <Select
                id="job2"
                value={newJob2 !== null ? newJob2 : 'default'}
                name="job2"
                onChange={handleJobsSelect}
                disabled={newJobsDisabled}
              >
                <option value="default">- 선택 -</option>
                {jobListData
                  .filter((job) => job.name !== newJob1)
                  .map((job) => (
                    <option key={job.id} value={job.name}>
                      {job.name}
                    </option>
                  ))}
              </Select>
            </JobSelectWrapper>

            <JobSelectWrapper className="top-gap">
              <ModifyButton type="button" onClick={handlJobsModifyButton}>
                {newJobsModifyButtonText}
              </ModifyButton>
            </JobSelectWrapper>
          </Row>

          <Row>
            <SingleInformationWrapper className="right-gap">
              <InformationLabel htmlFor="common-project">
                공통 프로젝트
              </InformationLabel>
              <Select
                id="common-project"
                name="common-project"
                value={commonProject !== null ? commonProject : 'default'}
                onChange={handleProjectSelect}
                disabled={newProjectsDisabled}
              >
                <option value="default">- 선택 -</option>
                {commonProjectListData.map((project) => (
                  <option key={project.id} value={project.name}>
                    {project.name}
                  </option>
                ))}
              </Select>
            </SingleInformationWrapper>

            <SingleInformationWrapper className="right-gap">
              <InformationLabel htmlFor="special-project">
                특화 프로젝트
              </InformationLabel>
              <Select
                id="special-project"
                name="special-project"
                value={specialProject !== null ? specialProject : 'default'}
                onChange={handleProjectSelect}
                disabled={newProjectsDisabled}
              >
                <option value="default">- 선택 -</option>
                {specialProjectListData.map((project) => (
                  <option key={project.id} value={project.name}>
                    {project.name}
                  </option>
                ))}
              </Select>
            </SingleInformationWrapper>

            <SingleInformationWrapper className="top-gap-button">
              <ModifyButton type="button" onClick={handleProjectssModifyButton}>
                {projectsModifyButtonText}
              </ModifyButton>
            </SingleInformationWrapper>
          </Row>

          <Row className="tech-stack-row">
            <SingleInformationWrapper
              {...getRootProps()}
              className="tech-stack-input"
            >
              <InformationLabel
                className="necessary"
                htmlFor="tech-stack-options"
                {...getInputLabelProps()}
              >
                기술 스택 <Em>(필수 2가지 이상 기입)</Em>
              </InformationLabel>
              <InfoInputWrapper
                ref={setAnchorEl}
                className={focused ? 'focused' : ''}
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
                        key={option.id}
                        onClick={() => {
                          controlTechStacks(option.id);
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
            </SingleInformationWrapper>
            <TechStackList>
              {value.map((option: TechStackWithImg, index: number) => (
                <ProfileTechStackTagWithLevel
                  id={option.id}
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

          <Row>
            <SingleInformationWrapper className="top-gap">
              <InformationLabel htmlFor="github-url">
                GitHub URL <Em>(선택)</Em>
              </InformationLabel>
              <InfoInput
                type="url"
                id="github-url"
                name="githubUrl"
                placeholder="https://github.com/ssafy-mate"
                pattern="https://.*"
                disabled={newUrlsDisabled}
                onChange={handleUrlsInput}
                value={newGitHubUrl !== null ? newGitHubUrl : ''}
              />
            </SingleInformationWrapper>
          </Row>
          <Row>
            <SingleInformationWrapper>
              <InformationLabel htmlFor="etc-url">
                기술 블로그 URL 또는 기타 URL <Em>(선택)</Em>
              </InformationLabel>
              <InfoInput
                type="url"
                id="etc-url"
                name="etcUrl"
                placeholder="https://velog.io/@ssafy-mate"
                pattern="https://.*"
                disabled={newUrlsDisabled}
                onChange={handleUrlsInput}
                value={newEtcUrl !== null ? newEtcUrl : ''}
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
const TechStackList = styled.ul``;
const SearchItemWrapper = styled.div`
  height: 100%;
  width: 100%;
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
  &:disabled {
    cursor: not-allowed;
  }
  @media (max-width: 575px) {
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

    &.tech-stack-row {
      margin-top: 16px;
    }
  }
`;
const Em = styled.em`
  font-size: 13px;
  color: #3396f4;
`;
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
    margin-right: 12px;
  }

  &.top-gap-button {
    width: 13%;
    margin-top: 25px;
  }

  &.top-gap {
    margin-top: 16px;
  }

  &.tech-stack-input {
    position: relative;
  }

  &.self-introduction {
    margin-top: 32px;
  }

  @media (max-width: 575px) {
    &.right-gap {
      margin-top: 16px;
      margin-right: 0px;
      width: 100%;
    }

    &.top-gap-button {
      margin-top: 16px;
      width: 100%;
    }
  }
`;

const JobSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 16px;

  &.right-gap {
    width: 43%;
    margin-right: 12px;
  }

  &.top-gap {
    width: 13%;
    margin-top: 41px;
  }

  @media (max-width: 575px) {
    &.right-gap {
      width: 100%;
    }

    &.top-gap {
      margin-top: 16px;
      width: 100%;
    }
  }
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

  &:disabled {
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
    cursor: not-allowed;
  }

  &.have-error {
    margin-bottom: 4px;
    border: 1px solid #f44336;
    box-shadow: inset 0 0 0 1px #ff77774d;
  }

  @media (max-width: 575px) {
    font-size: 13px;
    margin-bottom: 0px;
  }
`;

export default SsafyMateInformation;
