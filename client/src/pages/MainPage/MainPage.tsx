import { useTranslation } from '../../hooks/useTranslation';
import { useGetAllBoardsQuery } from '../../services/boardService';
import Board from '../../components/Board';
import NewBoardModal from '../../components/modals/NewBoardModal';
import PageSpinner from '../../components/Spinners/PageSpinner';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AppsIcon from '@mui/icons-material/Apps';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import './MainPage.scss';

function MainPage() {
  const {
    data: boards,
    isLoading: isBoardsLoading,
    isError: getBoardsError,
  } = useGetAllBoardsQuery();

  const t = useTranslation('mainPage');

  return (
    <Box id="main">
      <Box sx={{ pt: 3 }}>
        <Stack direction={'row'} justifyContent={'center'}>
          <Button variant="contained" sx={{ ml: 2 }} className="btn-main">
            <AppsIcon fontSize="large" />
          </Button>
          <Stack sx={{ pl: 2 }}>
            <Typography variant="h1">{t?.boards}</Typography>
            <Typography variant="body2">{t?.promotion}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ pt: 1 }}>
              {t?.boardsNumber} {boards?.length ?? 0}
            </Typography>
          </Stack>
        </Stack>
        <Divider sx={{ p: 2, mb: 4 }} />
      </Box>
      <Container maxWidth="xl" sx={{ mb: 2 }}>
        {isBoardsLoading ? (
          <PageSpinner />
        ) : (
          <Stack
            direction={'row'}
            gap={2}
            justifyContent={'center'}
            flexWrap="wrap">
            {!getBoardsError ? (
              <NewBoardModal>{t?.createBoard ?? ''}</NewBoardModal>
            ) : (
              <Box className="boards-unavailable">{t?.boardsUnavailable}</Box>
            )}
            {boards?.map((board) => (
              <Board {...board} key={board.id} />
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
}

export default MainPage;
