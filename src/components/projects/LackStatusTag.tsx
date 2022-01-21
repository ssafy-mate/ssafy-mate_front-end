import styled from '@emotion/styled';

import WarningIcon from '@mui/icons-material/Warning';

const LackStatusTag: React.FC = () => {
  return (
    <Tag>
      <Icon />
      <Content>부족</Content>
    </Tag>
  );
};

const Tag = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled(WarningIcon)`
  margin-right: 4px;
  font-size: 20px;
  color: #ffc00a;
`;

const Content = styled.span`
  color: #ffc00a;
  font-size: 14px;
  line-height: 0;
`;

export default LackStatusTag;
