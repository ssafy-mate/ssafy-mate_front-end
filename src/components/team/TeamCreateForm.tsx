import { useState, useEffect, useCallback } from 'react';

import { push } from 'connected-react-router';

import { useDispatch } from 'react-redux';
import { createTeam as createTeamSagaStart } from '../../redux/modules/myTeam';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';

import Swal from 'sweetalert2';

import { TechStackWithImg } from '../../types/commonTypes';

import { CAMPUS_LIST, PROJECT_LIST } from '../../data/ssafyData';

import useTechStackList from '../../hooks/useTechStackList';
import useUserProjectInfo from '../../hooks/reduxHooks/useUserProjectInfo';
import useMyTeamId from '../../hooks/useMyTeamId';

import TechStackTag from '../common/TechStackTag';
import WarningMessage from '../common/WarningMessage';

const CURRENT_PROJECT_ID: number = 2;
const CURRENT_PROJECT: string = '특화 프로젝트';

const TeamCreateForm: React.FC = () => {
  const [teamImg, setTeamImg] = useState(null);
  const [previewTeamImg, setPreviewTeamImg] = useState(null);
  const [teamName, setTeamName] = useState<string>('');
  const [notice, setNotice] = useState<string>('');
  const [introduction, setIntroduction] = useState<string>('');
  const [techStacks, setTechStacks] = useState<number[]>([]);
  const [totalRecruitment, setTotalRecruitment] = useState<number>(0);
  const [frontendRecruitment, setFrontendRecruitment] = useState<number>(0);
  const [backendRecruitment, setBackendRecruitment] = useState<number>(0);
  const [isDisplayedWarningText, setIsDisplayedWarningText] =
    useState<boolean>(false);

  const dispatch = useDispatch();
  const [campus, project, projectTrack] =
    useUserProjectInfo(CURRENT_PROJECT_ID);
  const myTeamId = useMyTeamId(CURRENT_PROJECT);
  const techStackList: TechStackWithImg[] = useTechStackList();
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

  useEffect(() => {
    if (myTeamId !== null) {
      Swal.fire({
        title: '팀 생성 불가',
        text: '해당 프로젝트 팀에 이미 합류되어 있어 팀 생성이 불가능합니다.',
        icon: 'warning',
        confirmButtonColor: '#3396f4',
        confirmButtonText: '확인',
      });

      dispatch(push('/projects/specialization/teams'));
    }
  }, [dispatch, myTeamId]);

  useEffect(() => {
    const selectedTechStacks = value.map((techStack) => techStack.techStackId);

    setTechStacks(selectedTechStacks);
  }, [value]);

  const createTeam = useCallback(
    (teamFormData: FormData) => {
      dispatch(createTeamSagaStart(teamFormData));
    },
    [dispatch],
  );

  const handleTeamImgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    }: any = event;
    const theImgFile = files[0];
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      }: any = finishedEvent;

      setPreviewTeamImg(result);
    };

    reader.readAsDataURL(theImgFile);
    setTeamImg(theImgFile);
  };

  const handleTeamImgClearButtonClick = () => {
    setPreviewTeamImg(null);
    setTeamImg(null);
  };

  const handleTeamNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(event.target.value);
  };

  const handleNoticeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotice(event.target.value);
  };

  const handleIntroductionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setIntroduction(event.target.value);
  };

  const handleTextAreaEnterKeyPressed = (event: React.KeyboardEvent) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      if (!event.shiftKey) {
        event.preventDefault();
      }
    }
  };

  const handleTotalRecruitmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const recruitment = parseInt(event.target.value);

    if (recruitment < frontendRecruitment) {
      setFrontendRecruitment(0);
    }

    setBackendRecruitment(0);
    setTotalRecruitment(recruitment);
  };

  const handleFrontendRecruitmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setBackendRecruitment(0);
    setFrontendRecruitment(parseInt(event.target.value));
  };

  const handleBackendRecruitmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setBackendRecruitment(parseInt(event.target.value));
  };

  const getTeamFormData = (
    campus: string,
    project: string,
    projectTrack: string,
    teamName: string,
    teamImg: File | null,
    notice: string,
    introduction: string,
    techStacks: number[],
    totalRecruitment: number,
    frontendRecruitment: number,
    backendRecruitment: number,
  ): FormData => {
    const teamFormData = new FormData();

    if (teamImg !== null) {
      teamFormData.append('teamImg', teamImg);
    }

    teamFormData.append('campus', campus);
    teamFormData.append('project', project);
    teamFormData.append('projectTrack', projectTrack);
    teamFormData.append('teamName', teamName);
    teamFormData.append('notice', notice);
    teamFormData.append('introduction', introduction);
    teamFormData.append(
      'techStacks',
      '[' + techStacks.map((code) => code.toString()).join(',') + ']',
    );
    teamFormData.append('totalRecruitment', totalRecruitment.toString());
    teamFormData.append('frontendRecruitment', frontendRecruitment.toString());
    teamFormData.append('backendRecruitment', backendRecruitment.toString());

    return teamFormData;
  };

  const handleSubmitButtonClick = () => {
    if (
      campus !== null &&
      project !== null &&
      projectTrack !== null &&
      teamName !== '' &&
      notice !== '' &&
      techStacks.length >= 2 &&
      totalRecruitment > 0 &&
      frontendRecruitment > 0 &&
      backendRecruitment > 0
    ) {
      const teamFormData: FormData = getTeamFormData(
        campus,
        project,
        projectTrack,
        teamName,
        teamImg,
        notice,
        introduction,
        techStacks,
        totalRecruitment,
        frontendRecruitment,
        backendRecruitment,
      );

      createTeam(teamFormData);
    } else {
      setIsDisplayedWarningText(true);
    }
  };

  const renderingRecruitmentOptions = (
    startHeadCount: number,
    endHeadCount: number,
  ) => {
    const result = [];

    result.push(
      <option key="default" value={0}>
        - 선택 -
      </option>,
    );

    for (let i = startHeadCount; i <= endHeadCount; i++) {
      result.push(
        <option key={i} value={i}>
          {i}명
        </option>,
      );
    }

    return result;
  };

  return (
    <Container>
      <Head>팀 생성</Head>
      <Row>
        <FileInputWrapper>
          <Label>팀 대표 이미지</Label>
          {previewTeamImg ? (
            <>
              <FilePreviewImgWrapper>
                <FilePreviewImg src={previewTeamImg} alt="팀 대표 이미지" />
                <ClearButton onClick={handleTeamImgClearButtonClick}>
                  <ClearIcon fontSize="large" />
                </ClearButton>
              </FilePreviewImgWrapper>
            </>
          ) : (
            <>
              <FileInputLabel htmlFor="team-img">
                <AddPhotoAlternateIcon />
              </FileInputLabel>
              <FileInput
                type="file"
                id="team-img"
                accept="image/*"
                onChange={handleTeamImgChange}
              />
            </>
          )}
        </FileInputWrapper>
        <SsafyInfoWrapper>
          <InputWrapper>
            <RequirementLabel htmlFor="campus">캠퍼스</RequirementLabel>
            <Select
              id="campus"
              name="campus"
              defaultValue={campus !== null ? campus : ''}
              required
              disabled
            >
              <option value="">- 선택 -</option>
              {CAMPUS_LIST.map((campus) => (
                <option key={campus.id} value={campus.area}>
                  {campus.area}
                </option>
              ))}
            </Select>
          </InputWrapper>
          <InputWrapper>
            <RequirementLabel htmlFor="project">프로젝트</RequirementLabel>
            <Select
              id="project"
              name="project"
              defaultValue={project !== null ? project : ''}
              required
              disabled
            >
              <option value="">- 선택 -</option>
              {PROJECT_LIST.map((projectItem) => (
                <option key={projectItem.projectId} value={projectItem.project}>
                  {projectItem.project}
                </option>
              ))}
            </Select>
          </InputWrapper>
          <InputWrapper>
            <RequirementLabel htmlFor="project-track">
              프로젝트 트랙
            </RequirementLabel>
            <Select
              id="project-track"
              name="project-track"
              defaultValue={projectTrack !== null ? projectTrack : ''}
              required
              disabled
            >
              <option value="" disabled>
                - 선택 -
              </option>
              {PROJECT_LIST.find(
                (project) => project.projectId === CURRENT_PROJECT_ID,
              )?.projectTracks?.map((projectTrack) => (
                <option key={projectTrack.id} value={projectTrack.name}>
                  {projectTrack.name}
                </option>
              ))}
            </Select>
          </InputWrapper>
        </SsafyInfoWrapper>
      </Row>
      <Hr />
      <Row>
        <InputWrapper>
          <RequirementLabel htmlFor="team-name">팀 이름</RequirementLabel>
          <InfoInput
            type="text"
            id="team-name"
            name="team-name"
            className={
              isDisplayedWarningText && teamName === '' ? 'active-warning' : ''
            }
            onChange={handleTeamNameChange}
            required
            maxLength={20}
          />
          {isDisplayedWarningText && teamName === '' && (
            <WarningMessage text="필수 입력 항목입니다." />
          )}
        </InputWrapper>
      </Row>
      <Row>
        <InputWrapper>
          <RequirementLabel htmlFor="notice">
            팀원 공고 문구 <Em>(한 문장으로 작성해주세요.)</Em>
          </RequirementLabel>
          <InfoInput
            type="text"
            id="notice"
            name="notice"
            className={
              isDisplayedWarningText && notice === '' ? 'active-warning' : ''
            }
            onChange={handleNoticeChange}
            required
            maxLength={50}
            placeholder="ex) 최우수상에 도전할 팀원을 모집합니다."
          />
          {isDisplayedWarningText && notice === '' && (
            <WarningMessage text="필수 입력 항목입니다." />
          )}
        </InputWrapper>
      </Row>
      <Row>
        <InputWrapper>
          <Label htmlFor="introduction">팀 소개</Label>
          <Textarea
            id="introduction"
            name="introduction"
            onKeyPress={handleTextAreaEnterKeyPressed}
            onChange={handleIntroductionChange}
            maxLength={1000}
            placeholder="ex) 팀의 목표, 개발 방향성, 어떤 팀원들을 원하는지 등을 자유롭게 작성해 주세요."
          />
        </InputWrapper>
      </Row>
      <Hr />
      <Row css={techStackRow}>
        <InputWrapper {...getRootProps()} css={techStackInputWrapper}>
          <RequirementLabel htmlFor="tech-stacks" {...getInputLabelProps()}>
            계획 중인 기술 스택 <Em>(필수 2가지 이상 기입)</Em>
          </RequirementLabel>
          <InfoInputWrapper
            ref={setAnchorEl}
            className={focused ? 'focused' : ''}
          >
            <InfoInput
              type="text"
              id="tech-stacks"
              name="tech-stacks"
              className={
                isDisplayedWarningText && techStacks.length < 2
                  ? 'active-warning'
                  : ''
              }
              onKeyDown={(event: React.KeyboardEvent) => {
                if (
                  event.key === 'Backspace' ||
                  event.key === 'Enter' ||
                  event.code === 'NumpadEnter'
                ) {
                  event.stopPropagation();
                }
              }}
              placeholder="ex) Vue.js, django, Spring Boot, MySQL"
              {...getInputProps()}
            />
            {isDisplayedWarningText && techStacks.length < 2 && (
              <WarningMessage text="필수 2가지 이상 기입이 필요한 항목입니다." />
            )}
          </InfoInputWrapper>
          {groupedOptions.length > 0 ? (
            <SearchList {...getListboxProps()}>
              {(groupedOptions as typeof techStackList).map((option, index) => (
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
              ))}
            </SearchList>
          ) : null}
        </InputWrapper>
        <TechStackList>
          {value.map((option: TechStackWithImg, index: number) => (
            <TechStackTag
              techStackId={option.techStackId}
              techStackName={option.techStackName}
              techStackImgUrl={option.techStackImgUrl}
              {...getTagProps({ index })}
            />
          ))}
        </TechStackList>
      </Row>
      <Hr />
      <Row>
        <InputWrapper>
          <RequirementLabel htmlFor="total-recruitment">
            전체 모집 인원
          </RequirementLabel>
          <Select
            id="total-recruitment"
            name="total-recruitment"
            className={
              isDisplayedWarningText && totalRecruitment === 0
                ? 'active-warning'
                : ''
            }
            value={totalRecruitment}
            onChange={handleTotalRecruitmentChange}
            required
          >
            {renderingRecruitmentOptions(4, 6)}
          </Select>
          {isDisplayedWarningText && totalRecruitment === 0 && (
            <WarningMessage text="필수 선택 항목입니다." />
          )}
        </InputWrapper>
      </Row>
      <Row>
        <InputWrapper css={rightGap}>
          <RequirementLabel htmlFor="frontend-recruitment">
            프론트엔드 모집 인원
          </RequirementLabel>
          <Select
            id="frontend-recruitment"
            name="frontend-recruitment"
            className={
              isDisplayedWarningText && frontendRecruitment === 0
                ? 'active-warning'
                : ''
            }
            value={frontendRecruitment}
            onChange={handleFrontendRecruitmentChange}
            disabled={totalRecruitment === 0}
            required
          >
            {renderingRecruitmentOptions(1, totalRecruitment - 1)}
          </Select>
          {isDisplayedWarningText && frontendRecruitment === 0 && (
            <WarningMessage text="필수 선택 항목입니다." />
          )}
        </InputWrapper>
        <InputWrapper>
          <RequirementLabel htmlFor="backend-recruitment">
            백엔드 모집 인원
          </RequirementLabel>
          <Select
            id="backend-recruitment"
            name="backend-recruitment"
            className={
              isDisplayedWarningText && backendRecruitment === 0
                ? 'active-warning'
                : ''
            }
            value={backendRecruitment}
            onChange={handleBackendRecruitmentChange}
            disabled={totalRecruitment === 0 || frontendRecruitment === 0}
            required
          >
            {renderingRecruitmentOptions(
              totalRecruitment - frontendRecruitment,
              totalRecruitment - frontendRecruitment,
            )}
          </Select>
          {isDisplayedWarningText && backendRecruitment === 0 && (
            <WarningMessage text="필수 선택 항목입니다." />
          )}
        </InputWrapper>
      </Row>
      <Row>
        <SubmitButton onClick={handleSubmitButtonClick}>팀 생성</SubmitButton>
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

  @media (max-width: 767px) {
    padding: 40px 28px;
  }
  @media (max-width: 575px) {
    padding: 32px 16px;
  }
`;

const Head = styled.h1`
  margin-bottom: 48px;
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  color: #263747;

  @media (max-width: 767px) {
    margin-bottom: 40px;
    font-size: 28px;
  }
  @media (max-width: 575px) {
    margin-bottom: 32px;
    font-size: 24px;
  }
`;

const Row = styled.div`
  display: flex;

  &:last-of-type {
    margin-top: 16px;
  }

  @media (max-width: 575px) {
    &:first-of-type {
      flex-direction: column;
    }
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
`;

const FileInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-right: 48px;

  @media (max-width: 767px) {
    margin-right: 24px;
  }

  @media (max-width: 575px) {
    width: 100%;
    margin: 0 auto 16px;
  }
`;

const FilePreviewImgWrapper = styled.div`
  position: relative;

  @media (max-width: 575px) {
    width: 100%;
    margin: 0 auto;
  }
`;

const InfoInputWrapper = styled.div``;

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
    box-shadow: inset 0 0 0 1px #3396f4;
  }
  &:focus {
    border: 1px solid #3396f4;
    box-shadow: inset 0 0 0 1px #3396f4;
    background-color: #fff;
    color: #495057;
  }

  &.active-warning {
    margin-bottom: 4px;
    border: 1px solid #f44336;
    box-shadow: inset 0 0 0 1px #ff77774d;
  }

  @media (max-width: 575px) {
    font-size: 13px;
  }
`;

const FileInput = styled.input`
  display: none;
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
  resize: none;

  &:hover {
    border: 1px solid #3396f4;
    box-shadow: inset 0 0 0 1px #3396f4;
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
  background-image: url(/images/common/toggle-black.png);
  background-repeat: no-repeat;
  font-size: 16px;
  line-height: 24px;
  color: #263747;
  transition: all 0.08s ease-in-out;
  appearance: none;

  &:focus {
    border: 1px solid #3396f4;
    box-shadow: inset 0 0 0 1px #3396f4;
    background-color: #fff;
    color: #495057;
  }
  &:disabled {
    cursor: not-allowed;
  }

  &.active-warning {
    margin-bottom: 4px;
    border: 1px solid #f44336;
    box-shadow: inset 0 0 0 1px #ff77774d;
  }

  @media (max-width: 575px) {
    font-size: 13px;
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

const FileInputLabel = styled.label`
  box-sizing: border-box;
  cursor: pointer;

  & svg {
    width: 200px;
    height: 200px;
    padding: 30px;
    border: 1px solid #d7e2eb;
    border-radius: 0.25rem;
    box-sizing: border-box;
    background-color: #fbfbfd;
    color: #5f7f90;
  }

  @media (max-width: 575px) {
    width: 100%;
    margin: 0 auto;

    & svg {
      width: 100%;
      height: 160px;
    }
  }
`;

const Hr = styled.hr`
  width: 100%;
  margin: 24px 0;
  border: 1px dashed #d7e2eb;
`;

const Em = styled.em`
  font-size: 13px;
  color: #3396f4;

  @media (max-width: 575px) {
    font-size: 12px;
  }
`;

const FilePreviewImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 0.25rem;
  box-sizing: border-box;
  object-fit: fill;

  @media (max-width: 575px) {
    width: 100%;
    height: 160px;
  }
`;

const TechStackList = styled.ul``;

const TechStackImg = styled.img`
  margin-right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 2px;
  object-fit: fill;

  @media (max-width: 575px) {
    width: 22px;
    height: 22px;
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

const TechStackInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ClearButton = styled.button`
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

  @media (max-width: 575px) {
    font-size: 15px;
  }
`;

const techStackRow = css`
  flex-direction: column;
`;

const techStackInputWrapper = css`
  position: relative;
`;

const rightGap = css`
  margin-right: 12px;

  @media (max-width: 575px) {
    margin-right: 0;
  }
`;

export default TeamCreateForm;
