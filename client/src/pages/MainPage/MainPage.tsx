import { IMAGES_LOAD_AMOUNT, PRELOADED_IMAGES } from '../../constants';
import {
  useGetAllBoardsQuery,
  useGetBoardByIdQuery,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
} from '../../services/boardService';
import { useState } from 'react';
import imgMinifyer from '../../utils/imgMinifyer';
import { getAllSources } from '../../utils/backgroundRandomizer';
import Board from '../../components/Board';
import NewBoardModal from '../../components/modals/NewBoardModal';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AppsIcon from '@mui/icons-material/Apps';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Spinner from '../../components/Spinner';
import './MainPage.scss';

function MainPage() {
  const { data: boards, isLoading: isBoardsLoading } = useGetAllBoardsQuery();
  const preloadMinifiedImgs = imgMinifyer(PRELOADED_IMAGES);
  const [images, setImages] = useState(preloadMinifiedImgs);

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
            <NewBoardModal images={images} />
          </Stack>
        )}
      </Container>
    </Box>
  );
}

export default MainPage;
