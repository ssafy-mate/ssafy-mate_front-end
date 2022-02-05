import { useEffect } from 'react';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import CheckIcon from '@mui/icons-material/Check';

import useQueryString from '../../hooks/useQueryString';
import useTechStackList from '../../hooks/useTechStackList';

import { TechStackWithImg } from '../../types/commonTypes';

import {
  ssafyTrackListData,
  campusListData,
  projectListData,
} from '../../data/ssafyData';
import { jobListData } from '../../data/jobListData';

interface UserListSearchFormProps {
  setCampus: (campus: string) => void;
  setProjectTrack: (projectTrack: string) => void;
  setJob1: (job1: string) => void;
  setTechStackCode: (techStackCode: number | null) => void;
  setUserName: (userName: string) => void;
  setSsafyTrack: (ssafyTrack: string) => void;
}

const UserListSearchForm: React.FC<UserListSearchFormProps> = ({
  setCampus,
  setProjectTrack,
  setJob1,
  setTechStackCode,
  setUserName,
  setSsafyTrack,
}) => {
  const [project, onSetProject] = useQueryString('project');
  const [projectTrack, onSetProjectTrack] = useQueryString('project_track');
  const [campus, onSetCampus] = useQueryString('campus');
  const [job1, onSetJob1] = useQueryString('job1');
  const [page, onSetPage] = useQueryString('page');
  const [techStackCode, onSetTechStackCode] = useQueryString('techstack_code');
  const [userName, onSetUserName] = useQueryString('user_name');
  const [ssafyTrack, onSetSsafyTrack] = useQueryString('ssafy_track');

  const techStackList: TechStackWithImg[] = useTechStackList();

  const {
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
  } = useAutocomplete({
    id: 'tech-stack-list',
    options: techStackList,
    getOptionLabel: (option) => option.techStackName,
  });

  useEffect(() => {
    onSetCampus('all');
    onSetProject('특화 프로젝트');
    onSetProjectTrack('all');
    onSetJob1('all');
    onSetUserName('');
    onSetSsafyTrack('all');
    onSetPage(1);
  }, [
    onSetProject,
    onSetProjectTrack,
    onSetCampus,
    onSetJob1,
    onSetUserName,
    onSetSsafyTrack,
    onSetPage,
  ]);

  useEffect(() => {
    if (value !== null) {
      setTechStackCode(value.id);
      onSetTechStackCode(value.id);
    } else {
      setTechStackCode(null);
      onSetTechStackCode(null);
    }
  }, [setTechStackCode, onSetTechStackCode, value]);

  const handleChangeCampus = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setCampus(event.target.value);
    onSetCampus(event.target.value);
  };

  const handleChangeProjectTrack = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setProjectTrack(event.target.value);
    onSetProjectTrack(event.target.value);
  };

  const handleChangeJob1 = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setJob1(event.target.value);
    onSetJob1(event.target.value);
  };

  const handleChangeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
    onSetUserName(event.target.value);
  };

  const handleChangeSsafyTrack = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setSsafyTrack(event.target.value);
    onSetSsafyTrack(event.target.value);
  };

  return (
    <Container>
      <Wrapper>
        <FilterList>
          <FilterSelect name="campus" onChange={handleChangeCampus}>
            <option value="all">전체 캠퍼스</option>
            {campusListData.map((campus) => (
              <option key={campus.id} value={campus.area}>
                {campus.area}
              </option>
            ))}
          </FilterSelect>
          <FilterSelect
            name="specializaion-project-track"
            onChange={handleChangeProjectTrack}
            css={{ margin: '0 12px' }}
          >
            <option value="all">전체 특화 프로젝트 트랙</option>
            {projectListData[1].projectTracks?.map((projectTrack) => (
              <option key={projectTrack.id} value={projectTrack.name}>
                {projectTrack.name}
              </option>
            ))}
          </FilterSelect>
          <FilterSelect name="job1" onChange={handleChangeJob1}>
            <option value="all">전체 희망 직무</option>
            {jobListData.map((job) => (
              <option key={job.id} value={job.name}>
                {job.name}
              </option>
            ))}
          </FilterSelect>
        </FilterList>
        <FilterList css={{ position: 'relative' }}>
          <FilterInput
            type="text"
            name="user-tech-stack-search"
            placeholder="기술 스택 검색"
            {...getInputProps()}
          />
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
          <FilterInput
            type="text"
            name="user-name-search"
            onChange={handleChangeUserName}
            placeholder="교육생 이름 검색"
            css={{ margin: '0 12px' }}
          />
          <FilterSelect name="ssafy-track" onChange={handleChangeSsafyTrack}>
            <option value="all">전체 교육 트랙</option>
            {ssafyTrackListData.map((ssafyTrack) => (
              <option key={ssafyTrack.id} value={ssafyTrack.name}>
                {ssafyTrack.name}
              </option>
            ))}
          </FilterSelect>
        </FilterList>
      </Wrapper>
    </Container>
  );
};

const Container = styled.section`
  max-width: 1200px;
  margin: 0 auto 24px;
  padding: 0 16px;
  box-sizing: border-box;
`;

const Wrapper = styled.div``;

const FilterList = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;

  @media (max-width: 767px) {
    margin-bottom: 0px;
    flex-direction: column;
    align-items: center;
  }
`;

const FilterSelect = styled.select`
  width: 100%;
  max-width: 378px;
  height: 42px;
  padding: 0 14px;
  border: 1px solid #d7e2eb;
  border-radius: 4px;
  box-sizing: border-box;
  background-position: calc(100% - 0.8rem) 49%;
  background-size: 0.625rem 0.3125rem;
  background-color: #fbfbfd;
  background-image: url(/images/assets/toggle-black.png);
  background-repeat: no-repeat;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.6;
  color: #263747;
  appearance: none;
  transition: color 0.08s ease-in-out, background-color 0.08s ease-in-out,
    border-color 0.08s ease-in-out, box-shadow 0.08s ease-in-out;
  cursor: pointer;

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

  @media (max-width: 767px) {
    max-width: 100%;
    height: 38px;
    margin-bottom: 8px;
    font-size: 14px;
  }
`;

const FilterInput = styled.input`
  width: 100%;
  max-width: 378px;
  height: 42px;
  padding: 0 14px;
  border: 1px solid #d7e2eb;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #fbfbfd;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.6;
  color: #263747;
  transition: color 0.08s ease-in-out, background-color 0.08s ease-in-out,
    border-color 0.08s ease-in-out, box-shadow 0.08s ease-in-out;

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

  @media (max-width: 767px) {
    max-width: 100%;
    height: 38px;
    margin-bottom: 8px;
    font-size: 14px;
  }
`;

const SearchList = styled.ul`
  overflow-y: scroll;
  position: absolute;
  top: 40px;
  z-index: 10;
  width: calc(100% / 3 - 12px);
  max-width: 378px;
  max-height: 200px;
  border: 1px solid #d7e2eb;
  border-radius: 0.25rem;
  background-color: #fff;

  @media (max-width: 767px) {
    width: 100%;
    max-width: 100%;
    top: 36px;
  }
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

export default UserListSearchForm;
