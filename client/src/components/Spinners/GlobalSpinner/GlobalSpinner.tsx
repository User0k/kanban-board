import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

interface IColor {
  color?: 'primary' | 'success' | 'error';
}

function GlobalSpinner({ color = 'primary' }: IColor) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, .3)',
        transform: 'translate(-50%, -50%)',
        zIndex: '999',
      }}>
      <CircularProgress color={color} />
    </Box>
  );
}

export default GlobalSpinner;
