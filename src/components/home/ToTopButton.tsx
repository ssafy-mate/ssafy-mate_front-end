import { useState } from 'react';

import styled from '@emotion/styled';

import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

interface ButtonProps {
  isVisible: boolean;
}

const ToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;

    if (scrolled > 300) {
      setIsVisible(true);
    } else if (scrolled <= 300) {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    <Button onClick={scrollToTop} isVisible={isVisible}>
      <ArrowIcon />
    </Button>
  );
};

const Button = styled.div<ButtonProps>`
  display: ${(props) => (props.isVisible ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 30px;
  bottom: 30px;
  z-index: 30;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;

  @media (max-width: 575px) {
    width: 42px;
    height: 42px;
  }
`;

const ArrowIcon = styled(ArrowCircleUpIcon)`
  border-radius: 50%;
  background-color: #fff;
  font-size: 48px;
  color: #798694;
  transition: color 0.08s ease-in-out;

  &:hover {
    color: #606b76;
  }

  @media (max-width: 575px) {
    font-size: 42px;
  }
`;

export default ToTopButton;
