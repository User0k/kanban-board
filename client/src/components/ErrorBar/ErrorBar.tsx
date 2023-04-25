import { useState, useEffect } from 'react';
import { clearError } from '../../store/slices/errorSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Fade from '@mui/material/Fade';
import './ErrorBar.scss';

function ErrorBar() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const { errorMessage } = useAppSelector((state) => state.errorReducer);

  useEffect(() => {
    errorMessage ? setOpen(true) : setOpen(false);
  }, [errorMessage]);

  const handleClose = () => {
    setOpen(false);
    dispatch(clearError());
  };

  return open ? (
    <Fade in timeout={300}>
      <Box className="error-bar">
        <Alert variant="filled" severity="error" sx={{ alignItems: 'center' }}>
          <Stack direction="row" alignItems="center">
            {errorMessage}
            <IconButton className="error-bar__btn-close">
              <CloseIcon onClick={handleClose} />
            </IconButton>
          </Stack>
        </Alert>
      </Box>
    </Fade>
  ) : null;
}

export default ErrorBar;
