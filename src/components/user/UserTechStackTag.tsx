import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

interface UserTechStackTagProps {
  techStackName: string;
  techStackLevel: string;
}

interface LevelButtonProps {
  isSelected: boolean;
}

const UserTechStackTag: React.FC<UserTechStackTagProps> = ({
  techStackName,
  techStackLevel,
}) => {
  return (
    <TagItem>
      <Group>
        <Img
          src={`/images/assets/tech-stack/${techStackName}.png`}
          alt={techStackName}
        />
        <Name>{techStackName}</Name>
      </Group>
      <Group>
        <Box
          sx={{
            'display': 'flex',
            'flexDirection': 'column',
            'alignItems': 'center',
            '& > *': {
              m: 1,
            },
          }}
        >
          <MuiButtonGroup size="small" aria-label="small button group">
            <LevelButton
              key="low"
              isSelected={techStackLevel === '하' ? true : false}
              disabled={techStackLevel === '하' ? false : true}
            >
              하
            </LevelButton>
            <LevelButton
              key="middle"
              className="selected"
              isSelected={techStackLevel === '중' ? true : false}
              disabled={techStackLevel === '중' ? false : true}
            >
              중
            </LevelButton>
            <LevelButton
              key="high"
              isSelected={techStackLevel === '상' ? true : false}
              disabled={techStackLevel === '상' ? false : true}
            >
              상
            </LevelButton>
          </MuiButtonGroup>
        </Box>
      </Group>
    </TagItem>
  );
};

const TagItem = styled.li`
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding: 10px 16px;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #eff3f7;

  &:last-of-type {
    margin-bottom: 0;
  }

  @media (max-width: 575px) {
    margin-bottom: 10px;
  }
`;

const Group = styled.div`
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
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

const MuiButtonGroup = styled(ButtonGroup)`
  margin: 0;
`;

const LevelButton = styled(Button)<LevelButtonProps>`
  width: 24px;
  height: 24px;
  border-color: #5babf6;
  background-color: ${(props) => (props.isSelected ? '#5babf6' : '#fbfbfb')};
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => (props.isSelected ? '#fff' : '#3396f4')};
  cursor: default;

  &:hover {
    background-color: ${(props) => (props.isSelected ? '#5babf6' : '#fbfbfb')};
    border: 1px solid #5babf6;
  }

  @media (max-width: 575px) {
    width: 22px;
    height: 22px;
    font-size: 13px;
  }
`;

export default UserTechStackTag;
