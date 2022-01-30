import { useEffect } from 'react';

import styled from '@emotion/styled';

import useTeamList from '../../hooks/useTeamList';

import SkeletonTeamRecruitmentSection from './skeletonUI/SkeletonTeamRecruitmentSection';
import Pagenation from './Pagenation';
import TeamItem from './TeamItem';

const TeamRecruitmentSection: React.FC = () => {
  const { isLoading, data, isError, errorMessage } = useTeamList();

  useEffect(() => {
    if (isError) {
      document.title = `${errorMessage} | 싸피 메이트`;
    }
  }, [isError, errorMessage]);

  return (
    <Container>
      {isLoading || !data ? (
        <SkeletonTeamRecruitmentSection />
      ) : (
        <>
          <RecruitmentHeader>
            <TotalCount>검색된 팀 총 6팀</TotalCount>
            <FilterSelect defaultValue={'recent'}>
              <option value="recent">최신순</option>
              <option value="headcount">인원순</option>
            </FilterSelect>
          </RecruitmentHeader>
          <TeamList>
            {data?.teams.map((team) => (
              <TeamItem
                key={team.teamId}
                teamId={team.teamId}
                teamName={team.teamName}
                teamImgUrl={team.teamImgUrl}
                campus={team.campus}
                notice={team.notice}
                techStacks={team.techStacks}
                totalRecruitment={team.totalRecruitment}
                totalHeadcount={team.totalHeadcount}
                frontendRecruitment={team.frontendRecruitment}
                frontendHeadcount={team.frontendHeadcount}
                backendRecruitment={team.backendRecruitment}
                backendHeadcount={team.backendHeadcount}
                createDateTime={team.createDateTime}
              />
            ))}
          </TeamList>
        </>
      )}
      <Pagenation />
    </Container>
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
  margin-bottom: 16px;
`;

const TotalCount = styled.span`
  margin: auto 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  color: #263747;
`;

const FilterSelect = styled.select`
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

export default TeamRecruitmentSection;
