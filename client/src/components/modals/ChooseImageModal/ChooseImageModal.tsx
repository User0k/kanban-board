import { Dispatch, SetStateAction, useState } from 'react';
import { getAllSources } from '../../../utils/backgroundRandomizer';
import imgMinifyer from '../../../utils/imgMinifyer';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { IMAGES_LOAD_AMOUNT, PRELOADED_IMAGES } from '../../../constants';
import './ChooseImageModal.scss';

interface IModalProps {
  setImage: Dispatch<SetStateAction<string>>;
}

function ChooseImageModal({ setImage }: IModalProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const preloadMinifiedImgs = imgMinifyer(PRELOADED_IMAGES);
  const [images, setImages] = useState(preloadMinifiedImgs);

  const loadMoreImages = async () => {
    const imgArr: string[] = await getAllSources(IMAGES_LOAD_AMOUNT);
    setImages(imgArr);
  };

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
            <KeyboardDoubleArrowDownIcon fontSize={'small'}/>
          </Button>
        </Stack>
      </Dialog>
    </>
  );
}

export default ChooseImageModal;
