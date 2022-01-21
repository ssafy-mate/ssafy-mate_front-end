import styled from '@emotion/styled';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SufficientStatusTag: React.FC = () => {
  return (
    <Tag>
      <Icon />
      <Content>충족</Content>
    </Tag>
  );
};

const Tag = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled(CheckCircleIcon)`
  margin-right: 4px;
  font-size: 20px;
  color: #4ab050;
`;

const Content = styled.span`
  font-size: 14px;
  line-height: 0;
  color: #4ab050;
`;

export default SufficientStatusTag;
