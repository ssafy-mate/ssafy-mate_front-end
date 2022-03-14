import styled from '@emotion/styled';

import { styled as MuiStyled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Skeleton from '@mui/material/Skeleton';

import SkeletonUserItem from './SkeletonUserItem';

const SkeletonUserRecruitmentSection: React.FC = () => {
  return (
    <Container>
      <RecruitmentHeader>
        <HeaderLeft>
          <TotalCount>
            <Skeleton variant="text" width={130} height={24} />
          </TotalCount>
          <MuiFormControlLabel
            control={<Android12Switch />}
            label="팀에 합류된 교육생 제외"
          />
        </HeaderLeft>
        <HeaderRight>
          <SortSelect>
            <option value="recent">최신순</option>
            <option value="old">오래된 순</option>
          </SortSelect>
        </HeaderRight>
      </RecruitmentHeader>
      <UserList>
        <SkeletonUserItem />
        <SkeletonUserItem />
        <SkeletonUserItem />
        <SkeletonUserItem />
        <SkeletonUserItem />
        <SkeletonUserItem />
        <SkeletonUserItem />
        <SkeletonUserItem />
        <SkeletonUserItem />
      </UserList>
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

const HeaderLeft = styled.div``;

const HeaderRight = styled.div``;

const TotalCount = styled.h1`
  margin: auto 0;
`;

const SortSelect = styled.select`
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

export default SkeletonUserRecruitmentSection;
