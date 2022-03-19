import styled from '@emotion/styled';

interface Props {
  isRecruiting: boolean;
}

const RecruitStatusBadge: React.FC<Props> = ({ isRecruiting }) => {
  return (
    <Tag isRecruiting={isRecruiting}>
      {isRecruiting ? '모집 중' : '모집 마감'}
    </Tag>
  );
};

const Tag = styled.span<Props>`
  padding: 4px 10px;
  border: 1px solid ${(props) => (props.isRecruiting ? '#4ab050' : '#515f6b;')};
  border-radius: 12px;
  background-color: ${(props) => (props.isRecruiting ? '#ecf7ed' : '#dcdfe1')};
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => (props.isRecruiting ? '#4ab050' : '#515f6b')};

  @media (max-width: 960px) {
    font-size: 13px;
  }
  @media (max-width: 720px) {
    font-size: 12px;
  }
`;

export default RecruitStatusBadge;
