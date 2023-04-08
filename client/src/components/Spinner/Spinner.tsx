import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Spinner() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10vh' }}>
      <CircularProgress size={50} />
    </Box>
  );
}

export default Spinner;
