import styled from '@emotion/styled';

interface TeamTechStackTagProps {
  techStackName: string;
}

const TeamTechStackTag: React.FC<TeamTechStackTagProps> = ({
  techStackName,
}) => {
  return (
    <TagItem>
      <Img
        src={`/images/assets/tech-stack/${techStackName}.png`}
        alt={`${techStackName} 로고 이미지`}
      />
      <Name>{techStackName}</Name>
    </TagItem>
  );
};

const TagItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding: 10px 16px;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: #eff3f7;

  &:last-of-type {
    margin-bottom: 0;
  }

  @media (max-width: 575px) {
    margin-bottom: 10px;
  }
`;

const Img = styled.img`
  margin-right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 2px;
  object-fit: fill;

  @media (max-width: 575px) {
    width: 22px;
    height: 22px;
  }
`;

const Name = styled.span`
  font-size: 14px;
  color: #5f7f90;

  @media (max-width: 575px) {
    font-size: 13px;
  }
`;

export default TeamTechStackTag;
