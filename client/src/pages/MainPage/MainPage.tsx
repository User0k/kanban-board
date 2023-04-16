import { IMAGES_LOAD_AMOUNT, PRELOADED_IMAGES } from '../../constants';
import {
  useGetAllBoardsQuery,
  useGetBoardByIdQuery,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
} from '../../services/boardService';
import { useState } from 'react';
import imgMinifyer from '../../utils/imgMinifyer';
import { getAllSources } from '../../utils/backgroundRandomizer';
import Board from '../../components/Board';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AppsIcon from '@mui/icons-material/Apps';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Spinner from '../../components/Spinner';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import './MainPage.scss';

function MainPage() {
  const { data: boards, isLoading: isBoardsLoading } = useGetAllBoardsQuery();
  const preloadMinifiedImgs = imgMinifyer(PRELOADED_IMAGES);
  const [images, setImages] = useState(preloadMinifiedImgs);
  const [createBoard] = useCreateBoardMutation();
  const [open, setOpen] = useState(true);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const loadMoreImages = async () => {
    const imgArr: string[] = await getAllSources(IMAGES_LOAD_AMOUNT);
    setImages(imgArr);
  };

  return (
    <Box id="main">
      <Box sx={{ pt: 3 }}>
        <Stack direction={'row'} justifyContent={'center'}>
          <Button variant="contained" sx={{ ml: 2 }} className="btn-main">
            <AppsIcon fontSize="large" />
          </Button>
          <Stack sx={{ pl: 2 }}>
            <Typography variant="h1">Boards</Typography>
            <Typography variant="body2">
              You can view, modify or delete them. Need to start with another
              one? Create new!
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ pt: 1 }}>
              Number of available boards: {boards?.length ?? 0}
            </Typography>
          </Stack>
        </Stack>
        <Divider sx={{ p: 2, mb: 4 }} />
      </Box>
      <Container maxWidth="xl">
        {isBoardsLoading ? (
          <Spinner />
        ) : (
          <Stack
            direction={'row'}
            gap={2}
            justifyContent={'center'}
            flexWrap="wrap">
            {boards?.map((board) => (
              <Board {...board} key={board.id} />
            ))}
            <Button
              sx={{ mb: 2 }}
              className="btn-create-board"
              onClick={handleClickOpen}>
              create a board
            </Button>
          </Stack>
        )}
        <Dialog open={open} onClose={handleClose} className="create-board">
          <DialogTitle className="create-board__title">
            Create a board
          </DialogTitle>
          <DialogContent sx={{ p: 2 }}>
            <Box
              sx={{ backgroundImage: `${images[0]}` }}
              className="create-board__preview"
            />
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              className="background-change__wrapper">
              <Button variant="contained" size="small">
                Choose image
              </Button>
              <Button variant="contained" size="small">
                Choose gradient
              </Button>
            </Stack>
            <TextField
              autoFocus
              required
              id="name"
              label="Board name"
              fullWidth
              size="small"
              sx={{ mb: 2 }}
            />
            <TextField
              required
              id="description"
              label="Board description"
              fullWidth
              size="small"
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleClose}>
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}

export default MainPage;
