import styled from '@emotion/styled';

import { styled as MuiStyled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { UserListResponse } from '../../types/userTypes';

import UserItem from '../projects/UserItem';
import EmptyBox from './EmptyBox';
import ErrorSection from '../common/ErrorSection';
import SkeletonUserRecruitmentSection from './skeletonUI/SkeletonUserRecruitmentSection';

interface UserRecruitmentSectionProps {
  isLoading: boolean;
  data?: UserListResponse;
  isError: boolean;
  errorMessage?: string;
  setExclusion: (exclustion: boolean) => void;
  setSort: (sort: string) => void;
}

const UserRecruitmentSection: React.FC<UserRecruitmentSectionProps> = ({
  isLoading,
  data,
  isError,
  errorMessage,
  setExclusion,
  setSort,
}) => {
  const handleChangeExclusion = (
    event: React.SyntheticEvent<Element, Event>,
    value: boolean,
  ) => {
    setExclusion(value);
  };

  const handleChangeSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value);
  };

  if (isError) {
    return <ErrorSection errorMessage={errorMessage} />;
  }

  return (
    <>
      {isLoading || !data ? (
        <SkeletonUserRecruitmentSection />
      ) : (
        <Container>
          <RecruitmentHeader>
            <HeaderLeft>
              <TotalCount>검색된 교육생 총 {data.totalElement}명</TotalCount>
              <MuiFormControlLabel
                control={<Android12Switch />}
                onChange={handleChangeExclusion}
                label="팀에 합류된 교육생 제외"
              />
            </HeaderLeft>
            <HeaderRight>
              <SortSelect onChange={handleChangeSort}>
                <option value="recent">최신순</option>
                <option value="name">이름순</option>
              </SortSelect>
            </HeaderRight>
          </RecruitmentHeader>
          {data.totalElement === 0 ? (
            <EmptyBox message="위의 조건으로 팀을 구하고 있는 교육생이 아직 없습니다." />
          ) : (
            <UserList>
              {data?.users.map((user) => (
                <UserItem
                  key={user.userId}
                  userId={user.userId}
                  userName={user.userName}
                  profileImgUrl={user.profileImgUrl}
                  campus={user.campus}
                  projectTrack={user.projectTrack}
                  ssafyTrack={user.ssafyTrack}
                  techStacks={user.techStacks}
                  job1={user.job1}
                  job2={user.job2}
                  githubUrl={user.githubUrl}
                  belongToTeam={user.belongToTeam}
                />
              ))}
            </UserList>
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
  padding: 0.3125rem 2rem 0.3125rem 1rem;
  border-color: #e9ecf3;
  border-radius: 4px;
  background-position: calc(100% - 0.6rem) 49%;
  background-size: 0.625rem 0.3125rem;
  background-color: #e9ecf3;
  background-image: url(/images/assets/toggle-black.png);
  background-repeat: no-repeat;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
  color: #263747;
  appearance: none;
  transition: all 0.08s ease-in-out;
  cursor: pointer;
`;

const UserList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
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

export default UserRecruitmentSection;
