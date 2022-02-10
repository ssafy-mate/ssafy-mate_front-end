import { useState, useEffect, useCallback } from 'react';

import { useParams, Link } from 'react-router-dom';

import { push } from 'connected-react-router';

import { useDispatch } from 'react-redux';
import {
  editTeam as editTeamSagaStart,
  deleteTeam as deleteTeamSagaStart,
} from '../../redux/modules/myTeam';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';

import Swal from 'sweetalert2';

import { TechStackWithImg } from '../../types/commonTypes';
import { TeamEditInfoResponse } from '../../types/teamTypes';

import { CAMPUS_LIST, PROJECT_LIST } from '../../data/ssafyData';

import useToken from '../../hooks/useToken';
import useMyTeamTechStacks from '../../hooks/useMyTeamTechStacks';
import useTechStackList from '../../hooks/useTechStackList';

import TeamService from '../../services/TeamService';

import TechStackTag from '../common/TechStackTag';
import WarningMessage from '../common/WarningMessage';

type Params = {
  teamId: string;
};

const CURRENT_PROJECT = '특화 프로젝트';

const TeamEditForm: React.FC = () => {
  const [teamImg, setTeamImg] = useState(null);
  const [previewTeamImg, setPreviewTeamImg] = useState(null);
  const [teamImgUrl, setTeamImgUrl] = useState<string>('');
  const [campus, setCampus] = useState<string>('');
  const [project, setProject] = useState<string>('');
  const [projectTrack, setProjectTrack] = useState<string>('');
  const [teamName, setTeamName] = useState<string>('');
  const [notice, setNotice] = useState<string>('');
  const [introduction, setIntroduction] = useState<string | null>('');
  const [techStacks, setTechStacks] = useState<TechStackWithImg[]>([]);
  const [totalRecruitment, setTotalRecruitment] = useState<number>(0);
  const [totalHeadcount, setTotalHeadcount] = useState<number>(0);
  const [frontendRecruitment, setFrontendRecruitment] = useState<number>(0);
  const [frontendHeadcount, setFrontendHeadcount] = useState<number>(0);
  const [backendRecruitment, setBackendRecruitment] = useState<number>(0);
  const [backendHeadcount, setBackendHeadcount] = useState<number>(0);
  const [isDisplayedWarningText, setIsDisplayedWarningText] =
    useState<boolean>(false);

  const { teamId } = useParams<Params>();
  const dispatch = useDispatch();
  const token = useToken();
  const initialTechStacks = useMyTeamTechStacks();
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
    id: 'customized-hook-demo',
    multiple: true,
    defaultValue: initialTechStacks,
    options: techStackList,
    getOptionLabel: (option) => option.techStackName,
  });

  useEffect(() => {
    async function fetchTeamEditInfo(token: string, teamId: number) {
      try {
        const teamEditInfo: TeamEditInfoResponse =
          await TeamService.getTeamEditInfo(token, teamId);

        initialEditForm(teamEditInfo);
      } catch (error: any) {
        Swal.fire({
          title: '팀 생성 불가',
          text: error.response.data.message,
          icon: 'warning',
          confirmButtonColor: '#3396f4',
          confirmButtonText: '확인',
        });

        dispatch(push(`/teams/${teamId}`));
      }
    }

    if (token !== null && teamId !== null) {
      fetchTeamEditInfo(token, parseInt(teamId));
    }
  }, [dispatch, token, teamId]);

  useEffect(() => {
    setTechStacks(value);
  }, [value]);

  const editTeam = useCallback(
    (teamId: number, formData: FormData) => {
      dispatch(editTeamSagaStart({ teamId, formData }));
    },
    [dispatch],
  );

  const deleteTeam = useCallback(
    (teamId: number) => {
      dispatch(deleteTeamSagaStart(teamId));
    },
    [dispatch],
  );

  const initialEditForm = (teamEditInfo: TeamEditInfoResponse) => {
    setTeamName(teamEditInfo.teamName);
    setTeamImg(teamEditInfo.teamImgUrl);
    setPreviewTeamImg(teamEditInfo.teamImgUrl);
    setTeamImgUrl(teamEditInfo.teamImgUrl);
    setCampus(teamEditInfo.campus);
    setProject(teamEditInfo.project);
    setProjectTrack(teamEditInfo.projectTrack);
    setNotice(teamEditInfo.notice);
    setIntroduction(teamEditInfo.introduction);
    setTechStacks(teamEditInfo.techStacks);
    setTotalRecruitment(teamEditInfo.totalRecruitment);
    setTotalHeadcount(teamEditInfo.totalHeadcount);
    setFrontendRecruitment(teamEditInfo.frontendRecruitment);
    setFrontendHeadcount(teamEditInfo.frontendHeadcount);
    setBackendRecruitment(teamEditInfo.backendRecruitment);
    setBackendHeadcount(teamEditInfo.backendHeadcount);
  };

  const handleOpenDeleteTeamDialog = () => {
    Swal.fire({
      title: '정말 팀을 삭제하시겠습니까?',
      text: '삭제 후 취소는 불가능합니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f5554a',
      cancelButtonColor: '#919aa1',
      confirmButtonText: '삭제하기',
      cancelButtonText: '취소하기',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTeam(parseInt(teamId));
      }
    });
  };

  const handleChangeTeamImg = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleClearTeamImg = () => {
    setPreviewTeamImg(null);
    setTeamImg(null);
  };

  const handleChangeTeamName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(event.target.value);
  };

  const handleChangeNotice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotice(event.target.value);
  };

  const handleChangeIntroduction = (
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

  const handleChangeTotalRecruitment = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const recruitment = parseInt(event.target.value);

    if (recruitment < frontendRecruitment) {
      setFrontendRecruitment(0);
    }

    setBackendRecruitment(0);
    setTotalRecruitment(recruitment);
  };

  const handleChangeFrontendRecruitment = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setBackendRecruitment(0);
    setFrontendRecruitment(parseInt(event.target.value));
  };

  const handleChangeBackendRecruitment = (
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
    introduction: string | null,
    deduplicatedTechStacks: number[],
    totalRecruitment: number,
    frontendRecruitment: number,
    backendRecruitment: number,
  ): FormData => {
    const teamFormData = new FormData();

    if (teamImg !== null) {
      teamImg.toString() === teamImgUrl
        ? teamFormData.append('teamImgUrl', teamImgUrl)
        : teamFormData.append('teamImg', teamImg);
    }

    if (introduction !== null) {
      teamFormData.append('introduction', introduction);
    }

    teamFormData.append('campus', campus);
    teamFormData.append('project', project);
    teamFormData.append('projectTrack', projectTrack);
    teamFormData.append('teamName', teamName);
    teamFormData.append('notice', notice);
    teamFormData.append(
      'techStacks',
      '[' + deduplicatedTechStacks.map((id) => id.toString()).join(',') + ']',
    );
    teamFormData.append('totalRecruitment', totalRecruitment.toString());
    teamFormData.append('frontendRecruitment', frontendRecruitment.toString());
    teamFormData.append('backendRecruitment', backendRecruitment.toString());

    return teamFormData;
  };

  const handleSubmitFormData = () => {
    const deduplicatedTechStacks = Array.from(
      new Set(techStacks.map((techStack) => techStack.techStackId)),
    );

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
        deduplicatedTechStacks,
        totalRecruitment,
        frontendRecruitment,
        backendRecruitment,
      );

      editTeam(parseInt(teamId), teamFormData);
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
      <Head>팀 정보 수정</Head>
      <DeleteButtonWrapper>
        <DeleteButton onClick={handleOpenDeleteTeamDialog}>
          <DeleteIcon />팀 삭제하기
        </DeleteButton>
      </DeleteButtonWrapper>
      <Row>
        <FileInputWrapper>
          <Label>팀 대표 이미지</Label>
          {previewTeamImg ? (
            <>
              <FilePreviewImgWrapper>
                <FilePreviewImg src={previewTeamImg} alt="팀 대표 이미지" />
                <ClearButton onClick={handleClearTeamImg}>
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
                onChange={handleChangeTeamImg}
              />
            </>
          )}
        </FileInputWrapper>
        <SsafyInfoWrapper>
          <InputWrapper>
            <RequirementLabel htmlFor="campus">캠퍼스</RequirementLabel>
            <Select id="campus" name="campus" value={campus} required disabled>
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
              value={project}
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
              value={projectTrack}
              required
              disabled
            >
              <option value="" disabled>
                - 선택 -
              </option>
              {PROJECT_LIST.find(
                (projectItem) => projectItem.project === CURRENT_PROJECT,
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
            value={teamName}
            onChange={handleChangeTeamName}
            required
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
            value={notice}
            onChange={handleChangeNotice}
            required
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
            value={introduction !== null ? introduction : ''}
            onKeyPress={handleTextAreaEnterKeyPressed}
            onChange={handleChangeIntroduction}
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
            onChange={handleChangeTotalRecruitment}
            required
          >
            {renderingRecruitmentOptions(totalHeadcount <= 5 ? 5 : 6, 6)}
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
            onChange={handleChangeFrontendRecruitment}
            disabled={totalRecruitment === 0}
            required
          >
            {renderingRecruitmentOptions(
              frontendHeadcount >= 1 ? frontendHeadcount : 1,
              totalRecruitment - 1,
            )}
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
            onChange={handleChangeBackendRecruitment}
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
        <CancelButton to="/projects/specialization/teams">
          취소하기
        </CancelButton>
        <EditButton onClick={handleSubmitFormData}>수정하기</EditButton>
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

const DeleteButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.5;
  color: #5f7f90;
  transition: color 0.08s ease-in-out, transform 0.08s ease-in-out;
  cursor: pointer;

  &:hover {
    color: #f44336;
    transform: scale(1.05);
  }

  & svg {
    margin-right: 4px;
    font-size: 24px;
  }

  @media (max-width: 575px) {
    font-size: 14px;

    & svg {
      margin-right: 4px;
      font-size: 22px;
    }
  }
`;

const Head = styled.h1`
  margin-bottom: 18px;
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
    &:nth-of-type(2) {
      flex-direction: column;
    }
    &:nth-of-type(8) {
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
    box-shadow: inset 0 0 0 1px#3396f4;
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

const EditButton = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 0.25rem;
  box-sizing: border-box;
  background-color: #ffc00a;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  transition: background-color 0.08s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #e5ac09;
  }

  @media (max-width: 575px) {
    margin-right: 6px;
    font-size: 15px;
  }
`;

const CancelButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  margin-right: 12px;
  border: none;
  border-radius: 0.25rem;
  box-sizing: border-box;
  background-color: #e9ecf3;
  font-size: 16px;
  font-weight: 500;
  color: #263747;
  transition: background-color 0.08s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #d1d4da;
  }

  @media (max-width: 575px) {
    margin-right: 6px;
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

export default TeamEditForm;
