import styled from '@emotion/styled';

import Skeleton from '@mui/material/Skeleton';

import SkeletonTeamItem from './SkeletonTeamItem';

const SkeletonTeamRecruitmentSection: React.FC = () => {
  return (
    <Container>
      <RecruitmentHeader>
        <TotalCount>
          <Skeleton variant="text" width={100} height={35} />
        </TotalCount>
        <FilterSelect>
          <option value="recent">최신순</option>
          <option value="headcount">인원순</option>
        </FilterSelect>
      </RecruitmentHeader>
      <TeamList>
        <SkeletonTeamItem />
        <SkeletonTeamItem />
        <SkeletonTeamItem />
        <SkeletonTeamItem />
        <SkeletonTeamItem />
        <SkeletonTeamItem />
        <SkeletonTeamItem />
        <SkeletonTeamItem />
      </TeamList>
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
`;

const FilterSelect = styled.select`
  padding: 0.3125rem 2rem 0.3125rem 1rem;
  border-color: #e9ecf3;
  border-radius: 4px;
  background-position: calc(100% - 0.6rem) 49%;
  background-size: 0.625rem 0.3125rem;
  background-color: #e9ecf3;
  background-image: url(/images/common/toggle-black.png);
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

export default SkeletonTeamRecruitmentSection;
