import styled from '@emotion/styled';

import GroupsIcon from '@mui/icons-material/Groups';
import WebIcon from '@mui/icons-material/Web';
import StorageIcon from '@mui/icons-material/Storage';

import RecruitStatusTag from '../projects/RecruitStatusTag';

interface TeamMembersStatusBoxProps {
  totalRecruitment: number;
  totalHeadcount: number;
  frontendRecruitment: number;
  frontendHeadcount: number;
  backendRecruitment: number;
  backendHeadcount: number;
  isTotalSufficient: boolean;
  isFrontendSufficient: boolean;
  isBackendSufficient: boolean;
}

const TeamMembersStatusBox: React.FC<TeamMembersStatusBoxProps> = ({
  totalRecruitment,
  totalHeadcount,
  frontendRecruitment,
  frontendHeadcount,
  backendRecruitment,
  backendHeadcount,
  isTotalSufficient,
  isFrontendSufficient,
  isBackendSufficient,
}) => {
  return (
    <StatusBox>
      <HeadcountList>
        <HeadcountItem>
          <Label>
            <GroupsIcon />
            Total
          </Label>
          <Contents>
            <Count>{totalHeadcount}명</Count>/
            <Count>{totalRecruitment}명</Count>
          </Contents>
          <RecruitStatusTag isSufficient={isTotalSufficient} />
        </HeadcountItem>
        <HeadcountItem>
          <Label>
            <WebIcon />
            Front-end
          </Label>
          <Contents>
            <Count>{frontendHeadcount}명</Count>/
            <Count>{frontendRecruitment}명</Count>
          </Contents>
          <RecruitStatusTag isSufficient={isFrontendSufficient} />
        </HeadcountItem>
        <HeadcountItem>
          <Label>
            <StorageIcon />
            Back-end
          </Label>
          <Contents>
            <Count>{backendHeadcount}명</Count>/
            <Count>{backendRecruitment}명</Count>
          </Contents>
          <RecruitStatusTag isSufficient={isBackendSufficient} />
        </HeadcountItem>
      </HeadcountList>
    </StatusBox>
  );
};

const StatusBox = styled.li`
  display: flex;
  flex-direction: column;
  min-width: 340px;
  margin-bottom: 12px;
  padding: 14px;
  border: 1px solid #d7e2eb;
  border-radius: 4px;
  box-sizing: border-box;
  transition: all 0.08s ease-in-out;

  @media (max-width: 575px) {
    min-width: 100%;
  }
`;

const HeadcountList = styled.ul`
  width: 100%;
`;

const HeadcountItem = styled.li`
  overflow: hidden;
  display: flex;
  width: 100%;
  border-bottom: 1px solid #d7e2eb;
  box-sizing: border-box;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Label = styled.label`
  overflow: hidden;
  display: flex;
  align-items: center;
  min-width: 100px;
  padding: 6px 0;
  font-size: 14px;
  line-height: 1.5;
  color: #263647;
  text-overflow: ellipsis;
  white-space: nowrap;

  svg {
    margin-right: 8px;
    font-size: 18px;
    line-height: 1.5;
  }

  @media (max-width: 767px) {
    font-size: 14px;

    svg {
      font-size: 16px;
    }
  }
`;

const Contents = styled.p`
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 6px 16px;
  font-size: 14px;
  line-height: 1.5;
  color: #5f7f90;
  text-overflow: ellipsis;
  white-space: nowrap;

  & span {
    &:nth-of-type(1) {
      margin-right: 6px;
    }
    &:nth-of-type(2) {
      margin-left: 6px;
    }
  }
`;

const Count = styled.span``;

export default TeamMembersStatusBox;
