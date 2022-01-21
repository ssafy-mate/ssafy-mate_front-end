import React from 'react';

import styled from '@emotion/styled';

interface MenuBarProps {
  isActive: boolean;
  onOpenMenuBar: () => void;
}

interface BarProps {
  isActive: boolean;
  onClick: () => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ isActive, onOpenMenuBar }) => {
  return (
    <Bar isActive={isActive} onClick={onOpenMenuBar}>
      <Line />
      <Line />
      <Line />
    </Bar>
  );
};

const Bar = styled.button<BarProps>`
  position: relative;
  padding: 0.5rem;
  border: none;
  background-color: transparent;
  cursor: pointer;

  & span:nth-of-type(1) {
    transform: ${(props) =>
      props.isActive ? 'rotate(45deg) translate(2px, 2px)' : ''};
  }
  & span:nth-of-type(2) {
    display: ${(props) => (props.isActive ? 'none' : 'block')};
  }
  & span:nth-of-type(3) {
    transform: ${(props) =>
      props.isActive ? 'rotate(-45deg) translate(2px, -2px)' : ''};
  }
`;

const Line = styled.span`
  display: block;
  width: 22px;
  height: 2px;
  border-radius: 1px;
  box-sizing: border-box;
  background-color: #fff;
  transition: all 0.08s ease-in-out;

  &:not(:first-of-type) {
    margin-top: 4px;
  }
`;

export default MenuBar;
