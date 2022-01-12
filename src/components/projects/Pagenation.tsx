import React from 'react';

import { useMediaQuery } from 'react-responsive';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Pagenation: React.FC = () => {
  const isMobile = useMediaQuery({
    query: '(max-width: 390px)',
  });

  return (
    <Stack spacing={2}>
      <Pagination
        count={20}
        variant="outlined"
        shape="rounded"
        css={pagination}
        size={isMobile ? 'small' : 'medium'}
      />
    </Stack>
  );
};

const pagination = css`
  margin: 40px auto 0;

  .MuiPagination-ul {
    color: #263747;
  }
  .MuiPagination-ul button {
    border: none;
    color: #263747;
  }

  @media (max-width: 472px) {
  }
`;

export default Pagenation;
