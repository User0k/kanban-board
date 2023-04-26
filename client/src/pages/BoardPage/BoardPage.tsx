import { IMAGE_FULL_HD } from '../../constants';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetBoardByIdQuery } from '../../services/boardService';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import './BoardPage.scss';

function BoardPage() {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const { data: board, isLoading } = useGetBoardByIdQuery(boardId || '');
  const boardName = board?.name || '';
  const image = board?.image;
  let bgImage = image;

  if (image && image[0] === 'u') {
    bgImage = image.split('?')[0] + IMAGE_FULL_HD + ')';
  }

  return (
    <>
      {!board ? (
        'This board cannot be found'
      ) : (
        <Box className="board-page" sx={{ backgroundImage: `${bgImage}` }}>
          <Box className="board-page__subheader">
            <Stack direction="row" alignItems="center" sx={{ p: 2 }}>
              <Button
                className="btn-back"
                variant="contained"
                startIcon={<ArrowLeftIcon />}
                onClick={() => navigate(-1)}>
                Back
              </Button>
              <Typography
                className="board-page__title"
                variant="h5"
                component="h1"
                noWrap={true}>
                {boardName}
              </Typography>
            </Stack>
          </Box>
          <Stack
            className="board-page__columns-wrapper"
            direction="row"
            spacing={2}>
            <Button
              className="btn-create-column"
              variant="contained"
              startIcon={<AddIcon />}>
              Create Column
            </Button>
          </Stack>
        </Box>
      )}
    </>
  );
}

export default BoardPage;
