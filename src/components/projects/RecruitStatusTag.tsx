import styled from '@emotion/styled';

const RecruitStatusTag: React.FC = () => {
  return <Tag>모집 중</Tag>;
};

const Tag = styled.span`
  padding: 4px 10px;
  border: 1px solid #4ab050;
  border-radius: 12px;
  background-color: #ecf7ed;
  font-size: 14px;
  font-weight: 500;
  color: #4ab050;

  @media (max-width: 960px) {
    font-size: 13px;
  }
  @media (max-width: 720px) {
    font-size: 12px;
  }
`;

export default RecruitStatusTag;
