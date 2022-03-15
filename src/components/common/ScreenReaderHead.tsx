/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

interface ScreenReaderHeadProps {
  element: string;
  text: string;
}

const ScreenReaderHead: React.FC<ScreenReaderHeadProps> = ({
  element,
  text,
}) => {
  switch (element) {
    case 'h1':
      return <h1 css={screenReaderHead}>{text}</h1>;
    case 'h2':
      return <h2 css={screenReaderHead}>{text}</h2>;
    case 'h3':
      return <h3 css={screenReaderHead}>{text}</h3>;
    case 'h4':
      return <h4 css={screenReaderHead}>{text}</h4>;
    case 'h5':
      return <h5 css={screenReaderHead}>{text}</h5>;
    case 'h6':
      return <h6 css={screenReaderHead}>{text}</h6>;
    default:
      return <></>;
  }
};

const screenReaderHead = css`
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(0px 0px 99.9% 99.9%);
  -webkit-clip-path: inset(0px 0px 99.9% 99.9%);
`;

export default ScreenReaderHead;
