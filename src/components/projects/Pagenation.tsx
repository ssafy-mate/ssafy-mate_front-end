import React from 'react';

import { useMediaQuery } from 'react-responsive';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Pagenation: React.FC = () => {
  const smallMedia = useMediaQuery({
    query: '(max-width: 575px)',
  });
  const extraLargeMedia = useMediaQuery({
    query: '(max-width: 1199px)',
  });

  return (
    <Container>
      <Wrapper>
        <Stack spacing={2}>
          <Pagination
            count={20}
            variant="outlined"
            shape="rounded"
            css={pagination}
            size={extraLargeMedia ? (smallMedia ? 'small' : 'medium') : 'large'}
          />
        </Stack>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin-top: 28px;
  padding: 0 16px;
  box-sizing: border-box;

  @media (max-width: 767px) {
    margin-top: 20px;
  }
  @media (max-width: 575px) {
    margin-top: 10px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const pagination = css`
  margin: auto 0;

  .MuiPagination-ul {
    color: #263747;
  }
  .MuiPagination-ul button {
    border: none;
    color: #263747;
  }
`;

export default Pagenation;
