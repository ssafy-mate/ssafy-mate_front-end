import { useState } from 'react';

import { Link } from 'react-router-dom';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import ArticleIcon from '@mui/icons-material/Article';

interface UserLabelProps {
  userId: number;
  userName: string;
}

const UserLabel: React.FC<UserLabelProps> = ({ userId, userName }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const myId = 1; // 임시 아이디 추후 스토어에서 받아오기

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <Label
        id="basic-button"
        className="user-label"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {userName}
      </Label>
      <MuiMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MuiMenuItem>
          <MenuLink to={`/users/${userId}`}>
            <ListItemIcon>
              <ArticleIcon fontSize="small" css={{ color: '#5f7f90' }} />
            </ListItemIcon>
            <MenuLabel variant="inherit" noWrap>
              프로필 보기
            </MenuLabel>
          </MenuLink>
        </MuiMenuItem>
        <MuiMenuItem>
          <MenuLink
            to={`/chatting/${myId < userId ? myId : userId}-${
              myId > userId ? myId : userId
            }`}
          >
            <ListItemIcon>
              <SendIcon fontSize="small" css={{ color: '#5f7f90' }} />
            </ListItemIcon>
            <MenuLabel variant="inherit" noWrap>
              메시지 보내기
            </MenuLabel>
          </MenuLink>
        </MuiMenuItem>
      </MuiMenu>
    </>
  );
};

const Label = styled(Button)`
  min-width: 0;
  padding: 0;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  color: #263647;
  text-align: left;
  transition: color 0.08s ease-in-out;

  &:hover {
    background-color: transparent;
    color: #3396f4;
    text-decoration: underline;
  }
  &:focus {
    background-color: transparent;
  }

  & span {
    width: auto;
  }

  & span:focus-visible {
    outline: none;
  }
`;

const MuiMenu = styled(Menu)`
  ul {
    padding: 0;
  }
`;

const MuiMenuItem = styled(MenuItem)`
  min-height: 0;
  padding: 0;
`;

const MenuLabel = styled(Typography)`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: #5f7f90;
`;

const MenuLink = styled(Link)`
  display: flex;
  width: 100%;
  padding: 12px 16px;

  @media (max-width: 575px) {
    padding: 10px 14px;
  }
`;

export default UserLabel;
