import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

type ColorProps = {
  selectColor: string;
};

const Loading: React.FC<ColorProps> = ({ selectColor }) => {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <CircularProgress size={20} style={{ color: selectColor }} />
    </Box>
  );
};

export default Loading;
