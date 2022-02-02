import { useEffect } from 'react';

import styled from '@emotion/styled';

import { styled as MuiStyled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { TeamListResponse } from '../../types/teamTypes';

import useQueryString from '../../hooks/useQueryString';

import TeamItem from './TeamItem';
import EmptyBox from './EmptyBox';
import SkeletonTeamRecruitmentSection from './skeletonUI/SkeletonTeamRecruitmentSection';
import ErrorSection from '../common/ErrorSection';

interface TeamRecruitmentSectionProps {
  isLoading: boolean;
  data?: TeamListResponse;
  isError: boolean;
  errorMessage?: string;
  setExclusion: (exclustion: boolean) => void;
  setSort: (sort: string) => void;
}

const TeamRecruitmentSection: React.FC<TeamRecruitmentSectionProps> = ({
  isLoading,
  data,
  isError,
  errorMessage,
  setExclusion,
  setSort,
}) => {
  const [exclusion, onSetExclusion] = useQueryString('exclusion');
  const [sort, onSetSort] = useQueryString('sort');

  useEffect(() => {
    if (isError) {
      document.title = `${errorMessage} | 싸피 메이트`;
    }
  }, [isError, errorMessage]);

  useEffect(() => {
    onSetExclusion(false);
    onSetSort('recent');
  }, [onSetExclusion, onSetSort]);

  const handleChangeExclusion = (
    event: React.SyntheticEvent<Element, Event>,
    value: boolean,
  ) => {
    setExclusion(value);
    onSetExclusion(value);
  };

  const handleChangeSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value);
    onSetSort(event.target.value);
  };

  if (isError) {
    return <ErrorSection errorMessage={errorMessage} />;
  }

  return (
    <>
      {isLoading || !data ? (
        <SkeletonTeamRecruitmentSection />
      ) : (
        <Container>
          <RecruitmentHeader>
            <HeaderLeft>
              <TotalCount>검색된 팀 총 {data.totalElement}팀</TotalCount>
              <MuiFormControlLabel
                control={<Android12Switch />}
                onChange={handleChangeExclusion}
                label="모집 마감 제외"
              />
            </HeaderLeft>
            <HeaderRight>
              <SortSelect onChange={handleChangeSort}>
                <option value="recent">최신순</option>
                <option value="headcount">인원순</option>
              </SortSelect>
            </HeaderRight>
          </RecruitmentHeader>
          {data.totalElement === 0 ? (
            <EmptyBox message={'위의 조건으로 모집 중인 팀이 아직 없습니다.'} />
          ) : (
            <TeamList>
              {data?.teams.map((team) => (
                <TeamItem
                  key={team.teamId}
                  teamId={team.teamId}
                  teamName={team.teamName}
                  teamImgUrl={team.teamImgUrl}
                  campus={team.campus}
                  project={team.project}
                  projectTrack={team.projectTrack}
                  notice={team.notice}
                  techStacks={team.techStacks}
                  totalRecruitment={team.totalRecruitment}
                  totalHeadcount={team.totalHeadcount}
                  frontendRecruitment={team.frontendRecruitment}
                  frontendHeadcount={team.frontendHeadcount}
                  backendRecruitment={team.backendRecruitment}
                  backendHeadcount={team.backendHeadcount}
                  createDateTime={team.createDateTime}
                  isRecruiting={team.isRecruiting}
                />
              ))}
            </TeamList>
          )}
        </Container>
      )}
    </>
  );
};

const Container = styled.section`
  max-width: 1200px;
  margin: 0 auto 24px;
  padding: 0 16px;
  box-sizing: border-box;
`;

const RecruitmentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const HeaderLeft = styled.div``;

const HeaderRight = styled.div``;

const TotalCount = styled.h1`
  margin: auto 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  color: #263747;
`;

const SortSelect = styled.select`
  height: 32px;
  padding: 0.3125rem 2rem 0.3125rem 1rem;
  border-color: #e9ecf3;
  border-radius: 4px;
  background-position: calc(100% - 0.6rem) 49%;
  background-size: 0.625rem 0.3125rem;
  background-color: #e9ecf3;
  background-image: url(/images/assets/toggle-black.png);
  background-repeat: no-repeat;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
  color: #263747;
  appearance: none;
  transition: all 0.08s ease-in-out;
  cursor: pointer;
`;

const TeamList = styled.ul`
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 1199px) {
    flex-direction: column;
  }
`;

const MuiFormControlLabel = styled(FormControlLabel)`
  padding-left: 4px;

  & span {
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    font-size: 14px;
  }
`;

const Android12Switch = MuiStyled(Switch)(({ theme }) => ({
  'padding': 8,
  '& .MuiSwitch-track': {
    'borderRadius': 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&:after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));

export default TeamRecruitmentSection;
