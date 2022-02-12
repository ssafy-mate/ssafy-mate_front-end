import styled from '@emotion/styled';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';

interface RecruitStatusTagProps {
  isSufficient: boolean;
}

const RecruitStatusTag: React.FC<RecruitStatusTagProps> = ({
  isSufficient,
}) => {
  return (
    <Tag>
      {isSufficient ? (
        <>
          <SufficentIcon />
          <SufficentContent>충족</SufficentContent>
        </>
      ) : (
        <>
          <LackIcon />
          <LackContent>부족</LackContent>
        </>
      )}
    </Tag>
  );
};

const Tag = styled.div`
  display: flex;
  align-items: center;
`;

const SufficentIcon = styled(CheckCircleIcon)`
  margin-right: 4px;
  font-size: 20px;
  color: #4ab050;
`;

const LackIcon = styled(WarningIcon)`
  margin-right: 4px;
  font-size: 20px;
  color: #ffc00a;
`;

const SufficentContent = styled.span`
  font-size: 14px;
  line-height: 0;
  color: #4ab050;
`;

const LackContent = styled.span`
  color: #ffc00a;
  font-size: 14px;
  line-height: 0;
`;

export default RecruitStatusTag;
