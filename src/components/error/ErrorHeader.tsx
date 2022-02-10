import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

interface ContainerProps {
  isScrollActive: boolean;
}

interface LogoWrapperProps extends ContainerProps {}

interface LogoNameProps extends ContainerProps {}

const ErrorHeader: React.FC = () => {
  const [isScrollActive, setIsScrollActive] = useState<boolean>(
    window.scrollY !== 0 ? true : false,
  );

  useEffect(() => {
    window.addEventListener('scroll', updateScrollY);
  }, []);

  const updateScrollY = () => {
    setIsScrollActive(window.scrollY !== 0 ? true : false);
  };

  return (
    <Container isScrollActive={isScrollActive}>
      <Wrapper>
        <BrandWrapper>
          <Brand to="/">
            <LogoWrapper isScrollActive={isScrollActive}>
              <Logo
                src="/images/common/ssafy-mate_logo.png"
                alt="SSAFY MATE 로고 이미지"
              />
            </LogoWrapper>
            <LogoName isScrollActive={isScrollActive}>SSAFY MATE</LogoName>
          </Brand>
        </BrandWrapper>
      </Wrapper>
    </Container>
  );
};

const Container = styled.header<ContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  background-color: ${(props) => (props.isScrollActive ? '#fff' : '#3396f4')};
  transition: background-color 0.08s ease-in-out;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 6px 16px;
  box-sizing: border-box;
`;

const BrandWrapper = styled.div`
  height: 34px;
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  height: inherit;
`;

const LogoWrapper = styled.div<LogoWrapperProps>`
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 1px solid ${(props) => (props.isScrollActive ? '#add5fa' : '#fff')};
  border-radius: 5px;
  background-color: ${(props) => (props.isScrollActive ? '#add5fa' : '#fff')};
  transition: all 0.08s ease-in-out;
`;

const Logo = styled.img`
  width: 24px;
  height: 100%;
  margin: 0 auto;
`;

const LogoName = styled.span<LogoNameProps>`
  margin-left: 6px;
  padding-top: 1px;
  font-size: 20px;
  font-weight: 700;
  color: ${(props) => (props.isScrollActive ? '#3396f4' : '#fff')};
  transition: color 0.08s ease-in-out;
`;

export default ErrorHeader;
