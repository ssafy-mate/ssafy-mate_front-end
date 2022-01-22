import React from 'react';

import styled from '@emotion/styled';

interface MenuBarProps {
  isExpanded: boolean;
  onExpandMenu: () => void;
}

interface BarProps {
  isExpanded: boolean;
  onClick: () => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ isExpanded, onExpandMenu }) => {
  return (
    <Bar isExpanded={isExpanded} onClick={onExpandMenu}>
      <Line />
      <Line />
      <Line />
    </Bar>
  );
};

const Bar = styled.button<BarProps>`
  position: relative;
  padding: 8px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  & span:nth-of-type(1) {
    transform: ${(props) =>
      props.isExpanded ? 'rotate(45deg) translate(2px, 2px)' : ''};
  }
  & span:nth-of-type(2) {
    display: ${(props) => (props.isExpanded ? 'none' : 'block')};
  }
  & span:nth-of-type(3) {
    transform: ${(props) =>
      props.isExpanded ? 'rotate(-45deg) translate(2px, -2px)' : ''};
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
