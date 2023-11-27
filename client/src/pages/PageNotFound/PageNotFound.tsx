import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './PageNotFound.scss';

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <Stack justifyContent="center" alignItems="center" id="page-not-found">
      <Stack direction="row" className="illustration-wrapper">
        <Box className="not-found__number">4</Box>
        <div className="not-found__illustration">
          <Box className="not-found__circle"></Box>
          <div className="not-found__clip">
            <Stack direction="row" className="not-found__paper">
              <Stack className="body__square-row">
                {Array(6)
                  .fill('')
                  .map((_, i) => (
                    <Box key={i} className="body__square square-1"></Box>
                  ))}
              </Stack>
              <Stack className="body__square-row">
                {Array(3)
                  .fill('')
                  .map((_, i) => (
                    <Box key={i} className="body__square square-2"></Box>
                  ))}
              </Stack>
              <Stack className="body__square-row">
                {Array(4)
                  .fill('')
                  .map((_, i) => (
                    <Box key={i} className="body__square square-3"></Box>
                  ))}
              </Stack>
            </Stack>
          </div>
        </div>
        <Box className="not-found__number">4</Box>
      </Stack>
      <Typography variant="h6" component={'h1'} className="not-found-descr">
        Oh no! The page you are looking for is gone!
      </Typography>
      <Button variant="contained" onClick={() => navigate('/')}>
        Back Home
      </Button>
    </Stack>
  );
}

export default PageNotFound;
