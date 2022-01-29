import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

import { TechStackTagProps } from '../../types/commonTypes';
import { TechStacksWithLevel } from '../../types/userInfomationTypes';

interface TechStackTagWithLevelProps extends TechStackTagProps {
  techStacks: Array<TechStacksWithLevel>;
  techStacksError: boolean;
  updateTechStacks: (techStacks: Array<TechStacksWithLevel>) => void;
  updateTechStacksError: (techStacksError: boolean) => void;
}

const TechStackTagWithLevel: React.FC<TechStackTagWithLevelProps> = ({
  id,
  name,
  imgUrl,
  onDelete,
  techStacks,
  techStacksError,
  updateTechStacks,
  updateTechStacksError,
  ...other
}) => {
  const [level, setLevel] = useState('');

  useEffect(() => {
    updateTechStacks(techStacks);
  }, [techStacks, updateTechStacks]);

  useEffect(() => {
    techStacks.length < 2
      ? updateTechStacksError(true)
      : updateTechStacksError(false);
  });

  const handleTechStackLevel = (event: React.MouseEvent<HTMLButtonElement>) => {
    const level: string = event.currentTarget.value;

    switch (level) {
      case '상':
        setLevel('high');
        break;
      case '중':
        setLevel('middle');
        break;
      case '하':
        setLevel('low');
        break;
    }

    const findTechStack = techStacks.find(
      (techStack) => techStack.techStackName === name,
    );

    findTechStack === undefined
      ? techStacks.push({
          techStackName: name,
          techStackLevel: level,
        })
      : (findTechStack.techStackLevel = level);
  };

  const deleteTechStack = (event: React.MouseEvent<HTMLButtonElement>) => {
    onDelete(event);

    const findStackIndex = techStacks.findIndex(
      (techStack) => techStack.techStackName === name,
    );

    techStacks.splice(findStackIndex, 1);
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
              className={level === 'low' ? 'selected' : ''}
              value="하"
              onClick={handleTechStackLevel}
            >
              하
            </LevelButton>
            <LevelButton
              key="middle"
              className={level === 'middle' ? 'selected' : ''}
              value="중"
              onClick={handleTechStackLevel}
            >
              중
            </LevelButton>
            <LevelButton
              key="high"
              className={level === 'high' ? 'selected' : ''}
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
