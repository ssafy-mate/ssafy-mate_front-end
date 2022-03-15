/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

interface VisuallyHiddenHeadProps {
  level: number;
  text: string;
}

const VisuallyHiddenHead: React.FC<VisuallyHiddenHeadProps> = ({
  level,
  text,
}) => {
  switch (level) {
    case 1:
      return <h1 css={visuallyHiddenHead}>{text}</h1>;
    case 2:
      return <h2 css={visuallyHiddenHead}>{text}</h2>;
    case 3:
      return <h3 css={visuallyHiddenHead}>{text}</h3>;
    case 4:
      return <h4 css={visuallyHiddenHead}>{text}</h4>;
    case 5:
      return <h5 css={visuallyHiddenHead}>{text}</h5>;
    case 6:
      return <h6 css={visuallyHiddenHead}>{text}</h6>;
    default:
      return <></>;
  }
};

const visuallyHiddenHead = css`
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

export default VisuallyHiddenHead;
