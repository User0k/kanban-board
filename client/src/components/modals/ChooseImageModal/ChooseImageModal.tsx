import { Dispatch, SetStateAction, useState } from 'react';
import imgMinifyer from '../../../utils/imgMinifyer';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { IMAGES_LOAD_AMOUNT, PRELOADED_IMAGES } from '../../../constants';
import { getAllGradients } from '../../../utils/gradientGenerator';
import './ChooseImageModal.scss';

interface IModalProps {
  setImage: Dispatch<SetStateAction<string>>;
}

function ChooseImageModal({ setImage }: IModalProps) {
  const [open, setOpen] = useState(false);
  const [isBgImage, setIsBgImage] = useState(true);

  const handleOpenWithImages = () => {
    setIsBgImage(true);
    setOpen(true);
  };

  const handleOpenWithGradients = () => {
    setIsBgImage(false);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const preloadMinifiedImgs = imgMinifyer(PRELOADED_IMAGES);
  const [images, setImages] = useState(preloadMinifiedImgs);
  const [gradients, setGradients] = useState(
    getAllGradients(IMAGES_LOAD_AMOUNT)
  );

  return (
    <>
      <Button variant="contained" size="small" onClick={handleOpenWithImages}>
        Choose image
      </Button>
      <Button
        variant="contained"
        size="small"
        onClick={handleOpenWithGradients}>
        Choose gradient
      </Button>
      <Dialog className="choose-image" open={open} onClose={handleClose}>
        <Stack spacing={1} sx={{ p: 1 }}>
          {(isBgImage ? images : gradients).map((image) => (
            <Box
              className="choose-image__image"
              key={image}
              sx={{ backgroundImage: image }}
              onClick={() => setImage(image)}
            />
          ))}
          <Button variant="contained" size="small" className="load-more-btn">
            <KeyboardDoubleArrowDownIcon fontSize={'small'} />
          </Button>
        </Stack>
      </Dialog>
    </>
  );
}

export default ChooseImageModal;
