/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

interface UserTechStackTagProps {
  techStackName: string;
  techStackImgUrl: string;
  techStackLevel: string;
}

const UserTechStackTag: React.FC<UserTechStackTagProps> = ({
  techStackName,
  techStackImgUrl,
  techStackLevel,
}) => {
  return (
    <TagItem>
      <Group>
        <Img src={techStackImgUrl} alt={techStackName} />
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
              disabled={techStackLevel === '하' ? false : true}
              css={{
                'backgroundColor':
                  techStackLevel === '하' ? '#5babf6' : '#fbfbfb',
                'color': techStackLevel === '하' ? '#fff' : '#3396f4',
                '&:hover': {
                  outline: 'none',
                  border: 'none',
                  backgroundColor: '#5babf6',
                },
              }}
            >
              하
            </LevelButton>
            <LevelButton
              key="middle"
              disabled={techStackLevel === '중' ? false : true}
              css={{
                'backgroundColor':
                  techStackLevel === '중' ? '#5babf6' : '#fbfbfb',
                'color': techStackLevel === '중' ? '#fff' : '#3396f4',
                '&:hover': {
                  outline: 'none',
                  border: 'none',
                  backgroundColor: '#5babf6',
                },
              }}
            >
              중
            </LevelButton>
            <LevelButton
              key="high"
              disabled={techStackLevel === '상' ? false : true}
              css={{
                'backgroundColor':
                  techStackLevel === '상' ? '#5babf6' : '#fbfbfb',
                'color': techStackLevel === '상' ? '#fff' : '#3396f4',
                '&:hover': {
                  outline: 'none',
                  border: 'none',
                  backgroundColor: '#5babf6',
                },
              }}
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

const LevelButton = styled(Button)`
  width: 24px;
  height: 24px;
  border: 1px solid #5babf6;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 400;
  cursor: default;

  @media (max-width: 575px) {
    width: 22px;
    height: 22px;
    font-size: 13px;
  }
`;

export default UserTechStackTag;
