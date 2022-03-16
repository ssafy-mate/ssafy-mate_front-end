import styled from '@emotion/styled';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LoadingCircular: React.FC = () => {
  return (
    <Container sx={{ display: 'flex' }}>
      <CircularProgress />
    </Container>
  );
};

const Container = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export default LoadingCircular;
