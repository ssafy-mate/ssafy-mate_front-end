import { useRef } from 'react';

import styled from '@emotion/styled';

import useOnScreen from '../../hooks/useOnScreen';

interface MobileServiceIntroSectionProps {
  headText: string;
  subHeadText: string;
  descriptionText: string;
  imgUrl: string;
  reversed: boolean;
}

interface WrapperProps {
  reversed: boolean;
}

interface IphoneProps {
  reversed: boolean;
}

const MobileServiceIntroSection: React.FC<MobileServiceIntroSectionProps> = ({
  headText,
  subHeadText,
  descriptionText,
  imgUrl,
  reversed,
}) => {
  const sectionRef = useRef(null);
  const isVisible = useOnScreen(sectionRef);

  return (
    <Section ref={sectionRef}>
      <Wrapper reversed={reversed}>
        <Contents className="section__contents">
          <Head className={isVisible ? 'scroll' : ''}>{headText}</Head>
          <SubHead className={isVisible ? 'scroll' : ''}>{subHeadText}</SubHead>
          <Description className={isVisible ? 'scroll' : ''}>
            {descriptionText}
          </Description>
        </Contents>
        <MobilePhone className={isVisible ? 'scroll' : ''} reversed={reversed}>
          <MobilePhoneInner>
            <MobilePhoneContents src={imgUrl} alt={`${headText} 이미지`} />
            <MobilePhoneFrame
              src="/images/home/iphone-frame.png"
              alt="아이폰 프레임"
            />
          </MobilePhoneInner>
        </MobilePhone>
      </Wrapper>
    </Section>
  );
};

const Section = styled.section`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;

  &:nth-of-type(odd) {
    background-color: #f9fafb;
  }
`;

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: ${(props) => (props.reversed ? 'row-reverse' : 'row')};
  width: 100%;
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 380px 16px;
  box-sizing: border-box;

  @media (max-width: 991px) {
    flex-direction: row;
    padding-bottom: 680px;
  }
  @media (max-width: 575px) {
    flex-direction: column;
    padding-top: 140px;
    padding-bottom: 655px;
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
    margin-bottom: 10px;
    font-size: 18px;
  }

  @keyframes fadeinBottom {
    from {
      opacity: 0;
      transform: translate3d(0, 50px, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
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
      opacity: 0;
      transform: translate3d(0, 50px, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
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
      opacity: 0;
      transform: translate3d(0, 50px, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
`;

const MobilePhone = styled.div<IphoneProps>`
  opacity: 0;
  display: flex;
  justify-content: ${(props) => (props.reversed ? 'flex-start' : 'flex-end')};
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
      opacity: 0;
      transform: translate3d(0, 50px, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
`;

const MobilePhoneInner = styled.div`
  position: absolute;
  top: -355px;
  width: 578px;
  height: 928px;

  @media (max-width: 991px) {
    top: 220px;
    width: calc(578px * 0.8);
    height: calc(928px * 0.8);
  }
  @media (max-width: 575px) {
    top: 130px;
    width: calc(578px * 0.7);
    height: calc(928px * 0.7);
  }
`;

const MobilePhoneFrame = styled.img`
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
`;

const MobilePhoneContents = styled.img`
  position: absolute;
  top: 11.5%;
  left: 21.83%;
  width: 56.34%;
  height: auto;
  border-radius: 20px;

  &:nth-of-type(2) {
    top: 50%;
  }
`;

export default MobileServiceIntroSection;
