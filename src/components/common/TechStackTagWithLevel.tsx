import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

import { TechStackTagProps } from '../../types/commonTypes';
import { TechStacksWithLevel } from '../../types/userInfomationTypes';

interface TechStackTagWithLevelProps extends TechStackTagProps {
  techStacks: TechStacksWithLevel[];
  updateTechStacks: (techStack: TechStacksWithLevel) => void;
  deleteTechStacks: (techStackName: string) => void;
}

const TechStackTagWithLevel: React.FC<TechStackTagWithLevelProps> = ({
  id,
  name,
  imgUrl,
  onDelete,
  techStacks,
  updateTechStacks,
  deleteTechStacks,
  ...other
}) => {
  const [selectedStackLevel, setSelectedStackLevel] = useState<string>('중');

  useEffect(() => {
    techStacks.forEach((techStack) => {
      if (techStack.techStackName === name) {
        setSelectedStackLevel(techStack.techStackLevel);
      }
    });
  }, [name, techStacks]);

  const handleTechStackLevel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const updateTechStacklevel: string = event.currentTarget.value;

    setSelectedStackLevel(updateTechStacklevel);

    updateTechStacks({
      techStackLevel: updateTechStacklevel,
      techStackName: name,
    });
  };

  const deleteTechStack = (event: React.MouseEvent<HTMLButtonElement>) => {
    onDelete(event);

    deleteTechStacks(name);
  };

  return (
    <TagItem {...other}>
      <Group>
        <Img src={imgUrl} alt={name} />
        <Name>{name}</Name>
      </Group>
      <Group className="a">
        <Box
          className="b"
          sx={{
            'display': 'flex',
            'flexDirection': 'column',
            'alignItems': 'center',
            '& > *': {
              m: 1,
            },
          }}
        >
          <MuiButtonGroup
            className="c"
            size="small"
            aria-label="small button group"
          >
            <LevelButton
              key="low"
              className={selectedStackLevel === '하' ? 'selected' : ''}
              value="하"
              onClick={handleTechStackLevel}
            >
              하
            </LevelButton>
            <LevelButton
              key="middle"
              className={selectedStackLevel === '중' ? 'selected' : ''}
              value="중"
              onClick={handleTechStackLevel}
            >
              중
            </LevelButton>
            <LevelButton
              key="high"
              className={selectedStackLevel === '상' ? 'selected' : ''}
              value="상"
              onClick={handleTechStackLevel}
            >
              상
            </LevelButton>
          </MuiButtonGroup>
        </Box>
        <DeleteButton onClick={deleteTechStack}>
          <CloseIcon />
        </DeleteButton>
      </Group>
    </TagItem>
  );
};

const TagItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding: 3px 6px;
  box-sizing: border-box;

  &:hover {
    border-radius: 0.25rem;
    background-color: #eaf4fd;
  }
  &:last-of-type {
    margin-bottom: 16px;
  }

  @media (max-width: 540px) {
    margin-bottom: 16px;
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

  @media (max-width: 540px) {
    width: 22px;
    height: 22px;
  }
`;

const Name = styled.h6`
  font-size: 14px;
  color: #5f7f90;

  @media (max-width: 540px) {
    font-size: 13px;
  }
`;

const MuiButtonGroup = styled(ButtonGroup)`
  margin: 0;
`;

const DeleteButton = styled.button`
  margin-left: 6px;
  border: none;
  background-color: transparent;
  color: #f44336;
  transition: all 0.12s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.15);
  }

  @media (max-width: 540px) {
    svg {
      width: 22px;
      height: 22px;
    }
  }
`;

const LevelButton = styled(Button)`
  width: 24px;
  height: 24px;
  border-color: #5babf6;
  background-color: #fbfbfd;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 400;
  color: #3396f4;

  &:hover {
    background-color: #5babf6;
    color: #fff;
  }
  &.selected {
    background-color: #5babf6;
    color: #fff;
  }

  @media (max-width: 540px) {
    width: 22px;
    height: 22px;
    font-size: 13px;
  }
  @media (max-width: 348px) {
    width: 18px;
    height: 18px;
    font-size: 12px;
  }
`;

export default TechStackTagWithLevel;
