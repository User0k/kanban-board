import { Dispatch, SetStateAction, useState } from 'react';
import { getAllSources } from '../../../utils/backgroundRandomizer';
import imgMinifyer from '../../../utils/imgMinifyer';
import { getAllGradients } from '../../../utils/gradientGenerator';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IMAGES_LOAD_AMOUNT, PRELOADED_IMAGES } from '../../../constants';
import './ChooseImageModal.scss';

interface IModalProps {
  setImage: Dispatch<SetStateAction<string>>;
}

function ChooseImageModal({ setImage }: IModalProps) {
  const [open, setOpen] = useState(false);
  const [isPicture, setIsPicture] = useState(true);

  const handleOpenWithImages = () => {
    setIsPicture(true);
    setOpen(true);
  };

  const handleOpenWithGradients = () => {
    setIsPicture(false);
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
      <Stack direction={'row'} alignItems="end" spacing={1} className='choose-image__btn-wrapper'>
        <Box className="choose-image__btn-more" onClick={handleOpenWithImages}>
          <MoreHorizIcon />
        </Box>
        {[images[0], gradients[0]].map((image) => (
          <Box
            className="choose-image__mini-image"
            key={image}
            sx={{ backgroundImage: image }}
            onClick={() => setImage(image)}
          />
        ))}
        <Box
          className="choose-image__btn-more"
          onClick={handleOpenWithGradients}>
          <MoreHorizIcon />
        </Box>
      </Stack>
      <Dialog className="choose-image" open={open} onClose={handleClose}>
        <Stack spacing={1} sx={{ p: 1 }}>
          {(isPicture ? images : gradients).map((image) => (
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
