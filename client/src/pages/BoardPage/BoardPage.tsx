import { IMAGE_FULL_HD } from '../../constants';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetBoardByIdQuery } from '../../services/boardService';
import { useGetColumnsInBoardQuery } from '../../services/columnService';
import { IColumn } from '../../models';
import CreateColumnModal from '../../components/modals/CreateColumnModal';
import ErrorBar from '../../components/ErrorBar';
import Column from '../../components/Column';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import CircularProgress from '@mui/material/CircularProgress';
import './BoardPage.scss';

function BoardPage() {
  const navigate = useNavigate();
  const { boardId } = useParams() || '';

  const { data: board, isError: boardNotFound } = useGetBoardByIdQuery(
    boardId || ''
  );

  const image = board?.image;
  let bgImage = image;

  if (image && image[0] === 'u') {
    bgImage = image.split('?')[0] + IMAGE_FULL_HD + ')';
  }

  const {
    data: columns,
    isLoading: isColumnsLoading,
    isError: columnsGetError,
  } = useGetColumnsInBoardQuery(boardId || '');

  const [isColumnCreating, setIsColumnCreating] = useState(false);

  const boardName = columnsGetError ? 'Can`t get columns' : board?.name || '';

  return (
    <>
      {boardNotFound ? (
        'This board cannot be found'
      ) : (
        <Box className="board-page" sx={{ backgroundImage: `${bgImage}` }}>
          <ErrorBar />
          <Box className="board-page__subheader">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ p: 2 }}>
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
            {isColumnsLoading ? (
              <Stack alignItems="center">
                <CircularProgress size={30} sx={{ m: 1 }} />
              </Stack>
            ) : (
              columns &&
              columns.map((column: IColumn) => (
                <Column {...column} boardId={boardId!} key={column.id} />
              ))
            )}
            {isColumnCreating && <CircularProgress color="success" />}
            <CreateColumnModal
              boardId={boardId!}
              setIsColumnCreating={setIsColumnCreating}>
              <Button
                className="btn-create-column"
                variant="contained"
                startIcon={<AddIcon />}>
                Create Column
              </Button>
            </CreateColumnModal>
          </Stack>
        </Box>
      )}
    </>
  );
}

export default BoardPage;
