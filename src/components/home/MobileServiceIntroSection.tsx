import { useRef } from 'react';

import styled from '@emotion/styled';

import useOnScreen from '../../hooks/useOnScreen';

const MobileServiceIntroSection: React.FC = () => {
  const sectionRef = useRef(null);
  const isVisible = useOnScreen(sectionRef);

  return (
    <Section ref={sectionRef}>
      <Wrapper>
        <Contents className="section__contents">
          <Head className={isVisible ? 'scroll' : ''}>반응형 웹</Head>
          <SubHead className={isVisible ? 'scroll' : ''}>
            모바일 웹 서비스 제공
          </SubHead>
          <Description className={isVisible ? 'scroll' : ''}>
            PC, 테블릿, 모바일 등 어떤 기기에서든 최적화된 싸피 메이트 서비스를
            이용하실 수 있습니다.
          </Description>
        </Contents>
        <Iphone className={isVisible ? 'scroll' : ''}>
          <IphoneInner>
            <IphoneContents src="/images/home/mobile-team-list-sample.png" />
            <IphoneFrame src="/images/home/iphone-frame.png" />
          </IphoneInner>
        </Iphone>
      </Wrapper>
    </Section>
  );
};

const Section = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 320px 16px;
  box-sizing: border-box;

  @media (max-width: 991px) {
    padding-bottom: 680px;
  }
  @media (max-width: 575px) {
    flex-direction: column;
    padding-top: 140px;
    padding-bottom: 660px;
  }
`;

const Contents = styled.div`
  max-width: 480px;

  @media (max-width: 991px) {
    margin-right: 0;
    margin-bottom: 60px;
    margin-left: 0;
  }
  @media (max-width: 575px) {
    margin-bottom: 40px;
  }
`;

const Head = styled.h1`
  opacity: 0;
  margin-bottom: 28px;
  font-size: 28px;
  font-weight: 700;
  color: #3396f4;

  &.scroll {
    animation: 0.6s ease-in-out 0s 1 normal forwards running fadeinBottom;
  }

  @media (max-width: 575px) {
    font-size: 18px;
    margin-bottom: 10px;
  }

  @keyframes fadeinBottom {
    from {
      transform: translate3d(0, 50px, 0);
      opacity: 0;
    }
    to {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
`;

const SubHead = styled.h2`
  opacity: 0;
  margin-bottom: 30px;
  font-size: 48px;
  font-weight: 700;
  line-height: 1.4;
  color: #263747;

  &.scroll {
    animation: 0.6s ease-in-out 0s 1 normal forwards running fadeinBottom;
  }

  @media (max-width: 575px) {
    margin-bottom: 19px;
    font-size: 28px;
  }

  @keyframes fadeinBottom {
    from {
      transform: translate3d(0, 50px, 0);
      opacity: 0;
    }
    to {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
`;

const Description = styled.p`
  opacity: 0;
  font-size: 23px;
  font-weight: 400;
  line-height: 1.5;
  color: #263747;

  &.scroll {
    animation: 0.6s ease-in-out 1.2s 1 normal forwards running fadeinBottom;
  }

  @media (max-width: 575px) {
    font-size: 17px;
  }

  @keyframes fadeinBottom {
    from {
      transform: translate3d(0, 50px, 0);
      opacity: 0;
    }
    to {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
`;

const Iphone = styled.div`
  opacity: 0;
  display: flex;
  justify-content: flex-end;
  position: absolute;
  width: calc(100% - 32px);
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 0 16px;
  box-sizing: border-box;

  &.scroll {
    animation: 0.6s ease-in-out 0.6s 1 normal forwards running fadeinBottom;
  }

  @media (max-width: 991px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
  }

  @keyframes fadeinBottom {
    from {
      transform: translate3d(0, 50px, 0);
      opacity: 0;
    }
    to {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
`;

const IphoneInner = styled.div`
  position: absolute;
  top: -355px;
  width: 600px;
  height: 936px;

  @media (max-width: 991px) {
    top: 220px;
    width: calc(600px * 0.8);
    height: calc(936px * 0.8);
  }

  @media (max-width: 575px) {
    top: 120px;
    width: calc(600px * 0.7);
    height: calc(936px * 0.7);
  }
`;

const IphoneFrame = styled.img`
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
`;

const IphoneContents = styled.img`
  position: absolute;
  top: 10%;
  left: 21.8%;
  width: 56%;
  height: auto;
  border-radius: 20px;
`;

export default MobileServiceIntroSection;
