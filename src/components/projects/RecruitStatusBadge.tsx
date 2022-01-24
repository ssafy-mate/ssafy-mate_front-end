import styled from '@emotion/styled';

interface Props {
  isActive: boolean;
}

const RecruitStatusBadge: React.FC<Props> = ({ isActive }) => {
  return <Tag isActive={isActive}>{isActive ? '모집 중' : '모집 마감'}</Tag>;
};

const Tag = styled.span<Props>`
  padding: 4px 10px;
  border: 1px solid ${(props) => (props.isActive ? '#4ab050' : '#515f6b;')};
  border-radius: 12px;
  background-color: ${(props) => (props.isActive ? '#ecf7ed' : '#dcdfe1')};
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => (props.isActive ? '#4ab050' : '#515f6b')};

  @media (max-width: 960px) {
    font-size: 13px;
  }
  @media (max-width: 720px) {
    font-size: 12px;
  }
`;

export default RecruitStatusBadge;
