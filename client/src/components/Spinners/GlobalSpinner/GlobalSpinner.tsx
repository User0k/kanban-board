import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

interface IColor {
  color?: 'primary' | 'success' | 'error';
}

function GlobalSpinner({color = 'primary'}: IColor) {
  return (
    <Box sx={{ position: 'absolute', zIndex: '999', top: '50%' }}>
      <CircularProgress color={color} />
    </Box>
  );
}

export default GlobalSpinner;
