import { useRef } from 'react';

import styled from '@emotion/styled';

import useOnScreen from '../../hooks/useOnScreen';

import PcBox from './PcBox';

interface IntroSectionProps {
  headText: string;
  subHeadText: string;
  descriptionText: string;
  imgUrl: string;
  reversed: boolean;
}

interface WrapperProps {
  reversed: boolean;
}

interface ContentsProps {
  reversed: boolean;
}

const IntroSection: React.FC<IntroSectionProps> = ({
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
      <Wrapper className="section__inner" reversed={reversed}>
        <Contents className="section__contents" reversed={reversed}>
          <Head className={isVisible ? 'scroll' : ''}>{headText}</Head>
          <SubHead className={isVisible ? 'scroll' : ''}>{subHeadText}</SubHead>
          <Description className={isVisible ? 'scroll' : ''}>
            {descriptionText}
          </Description>
        </Contents>
        <PcBox imgUrl={imgUrl} isVisible={isVisible} />
      </Wrapper>
    </Section>
  );
};

const Section = styled.section`
  &:nth-of-type(odd) {
    background-color: #f9fafb;
  }
`;

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: ${(props) =>
    props.reversed === true ? 'row-reverse' : 'row'};
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 250px 16px;
  box-sizing: border-box;

  @media (max-width: 991px) {
    flex-direction: column;
    justify-content: center;

    & .contents {
      align-items: flex-start;
    }
  }
  @media (max-width: 575px) {
    padding-top: 140px;
  }
`;

const Contents = styled.div<ContentsProps>`
  max-width: 480px;
  margin-right: ${(props) => (props.reversed ? 0 : '40px')};
  margin-left: ${(props) => (props.reversed ? '40px' : 0)};

  @media (max-width: 991px) {
    margin-right: 0;
    margin-bottom: 60px;
    margin-left: 0;
  }
  @media (max-width: 575px) {
    margin-bottom: 40px;
  }
`;

const Head = styled.h3`
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

const SubHead = styled.h4`
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

export default IntroSection;
