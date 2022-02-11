import styled from '@emotion/styled';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import DraftsIcon from '@mui/icons-material/Drafts';

interface EmptyBoxProps {
  message: string;
}

const EmptyRequestBox: React.FC<EmptyBoxProps> = ({ message }) => {
  return (
    <Box>
      <IconWrapper>
        <DraftsIcon css={icon} />
      </IconWrapper>
      <Head>{message}</Head>
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 16px;
  border-radius: 4px;
  background-color: #f4f4f8;

  @media (max-width: 575px) {
    padding-top: 30px;
    padding-bottom: 30px;
  }
`;

const IconWrapper = styled.div`
  margin-bottom: 24px;

  @media (max-width: 575px) {
    margin-bottom: 16px;
  }
`;

const Head = styled.h2`
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: #98a8b9;

  @media (max-width: 575px) {
    font-size: 13px;
  }
`;

const icon = css`
  font-size: 52px;
  color: #98a8b9;

  @media (max-width: 575px) {
    font-size: 38px;
  }
`;

export default EmptyRequestBox;
