import { Dispatch, SetStateAction, useState } from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import './ChooseImageModal.scss';

interface IModalProps {
  images: string[];
  setImage: Dispatch<SetStateAction<string>>;
}

function ChooseImageModal({ images, setImage }: IModalProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="contained" size="small" onClick={handleOpen}>
        Choose image
      </Button>
      <Dialog
        className="choose-image"
        open={open}
        onClose={handleClose}>
        <Stack spacing={1} sx={{ p: 1 }}>
          {images.map((image) => (
            <Box
              className="choose-image__image"
              key={image}
              sx={{ backgroundImage: image }}
              onClick={() => setImage(image)}
            />
          ))}
          <Button
            variant="contained"
            size="small"
            className='load-more-btn'>
            <KeyboardDoubleArrowDownIcon />
          </Button>
        </Stack>
      </Dialog>
    </>
  );
}

export default ChooseImageModal;
