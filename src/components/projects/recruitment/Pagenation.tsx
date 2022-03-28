import { useMediaQuery } from 'react-responsive';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface PagenationProps {
  totalPage: number;
  page: number;
  setPage: (page: number) => void;
}

const Pagenation: React.FC<PagenationProps> = ({
  totalPage,
  page,
  setPage,
}) => {
  const extraLargeMedia = useMediaQuery({
    query: '(max-width: 1199px)',
  });
  const smallMedia = useMediaQuery({
    query: '(max-width: 575px)',
  });

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ): void => {
    setPage(page);
  };

  return (
    <Container>
      <Wrapper>
        <Stack spacing={2}>
          <Pagination
            variant="outlined"
            shape="rounded"
            count={totalPage}
            page={page}
            onChange={handlePageChange}
            size={extraLargeMedia ? (smallMedia ? 'small' : 'medium') : 'large'}
            css={pagination}
          />
        </Stack>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 28px auto 0;
  padding: 0 16px;
  box-sizing: border-box;

  @media (max-width: 767px) {
    margin-top: 20px;
  }
  @media (max-width: 575px) {
    margin-top: 10px;
    margin-bottom: 90px;
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
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    color: #263747;
  }
`;

export default Pagenation;
