import { useEffect } from 'react';

import { Link } from 'react-router-dom';

/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import GroupsIcon from '@mui/icons-material/Groups';
import CheckIcon from '@mui/icons-material/Check';

import { TechStackWithImg } from '../../../types/commonTypes';

import { CAMPUS_LIST, PROJECT_LIST } from '../../../data/ssafyData';
import { JOB_LIST } from '../../../data/jobListData';

import useTechStackList from '../../../hooks/useTechStackList';

interface SearchFormWithTeamsProps {
  campus: string;
  projectTrack: string;
  setCampus: (campus: string) => void;
  setProjectTrack: (projectTrack: string) => void;
  setJob1: (job1: string) => void;
  setTechStackId: (techStackId: number | null) => void;
  setTeamName: (teamName: string) => void;
  setPage: (page: number) => void;
}

const CURRENT_PROJECT_CODE: number = 2;

const SearchFormWithTeams: React.FC<SearchFormWithTeamsProps> = ({
  campus,
  projectTrack,
  setCampus,
  setProjectTrack,
  setJob1,
  setTechStackId,
  setTeamName,
  setPage,
}) => {
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
    setPage(1);
  }, [campus, projectTrack, setPage]);

  useEffect(() => {
    value !== null ? setTechStackId(value.techStackId) : setTechStackId(null);
  }, [setTechStackId, value]);

  const handleChangeCampus = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setCampus(event.target.value);
  };

  const handleChangeProjectTrack = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setProjectTrack(event.target.value);
  };

  const handleChangeJob1 = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setJob1(event.target.value);
  };

  const handleChangeTeamName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(event.target.value);
  };

  return (
    <Container>
      <Wrapper>
        <FilterList>
          <FilterSelect
            name="campus"
            defaultValue={campus}
            onChange={handleChangeCampus}
          >
            <option value="all">?????? ?????????</option>
            {CAMPUS_LIST.map((campus) => (
              <option key={campus.id} value={campus.area}>
                {campus.area}
              </option>
            ))}
          </FilterSelect>
          <FilterSelect
            name="specializaion-project-track"
            defaultValue={projectTrack}
            onChange={handleChangeProjectTrack}
            css={{ margin: '0 12px' }}
          >
            <option value="all">?????? ?????? ???????????? ??????</option>
            {PROJECT_LIST[CURRENT_PROJECT_CODE - 1].projectTracks?.map(
              (projectTrack) => (
                <option key={projectTrack.id} value={projectTrack.name}>
                  {projectTrack.name}
                </option>
              ),
            )}
          </FilterSelect>
          <FilterSelect name="job1" onChange={handleChangeJob1}>
            <option value="all">?????? ?????? ??????</option>
            {JOB_LIST.map((job) => (
              <option key={job.id} value={job.name}>
                {job.name}
              </option>
            ))}
          </FilterSelect>
        </FilterList>
        <FilterList css={{ position: 'relative' }}>
          <FilterInput
            type="text"
            name="team-tech-stack-search"
            placeholder="?????? ?????? ??????"
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
            name="team-name-search"
            onChange={handleChangeTeamName}
            placeholder="??? ?????? ??????"
            css={{ margin: '0 12px' }}
          />
          <CreateTeamLink to="/projects/teams/new">
            <GroupsIcon />
            <span>??? ??????</span>
          </CreateTeamLink>
        </FilterList>
      </Wrapper>
    </Container>
  );
};

const Container = styled.section`
  margin-bottom: 24px;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  box-sizing: border-box;
`;

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
  background-image: url(/images/common/toggle-black.png);
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

const CreateTeamLink = styled(Link)`
  display: flex;
  width: 100%;
  max-width: 378px;
  height: 42px;
  padding: 0 14px;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #3396f4;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  color: #fff;
  transition: color 0.08s ease-in-out, background-color 0.08s ease-in-out,
    border-color 0.08s ease-in-out, box-shadow 0.08s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #2878c3;
  }

  svg {
    margin: auto 8px auto 0;
    font-size: 24px;
  }
  span {
    margin: auto 0;
  }

  @media (max-width: 767px) {
    max-width: 100%;
    height: 38px;
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

export default SearchFormWithTeams;
