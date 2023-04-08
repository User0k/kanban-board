import {
  useGetAllBoardsQuery,
  useGetBoardByIdQuery,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
} from '../../services/boardService';
import Board from '../../components/Board';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import './MainPage.scss';
import Spinner from '../../components/Spinner';

function MainPage() {
  const { data: boards, isLoading: isBoardsLoading } = useGetAllBoardsQuery();
  return (
    <Box id="main">
      <Box sx={{ pt: 3 }}>
        <Stack direction={'row'} justifyContent={'center'}>
          <Button variant="contained" className="btn-main">
            <CalendarViewMonthIcon fontSize="large" />
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
            <Button className="btn-create-board">create a board</Button>
          </Stack>
        )}
      </Container>
    </Box>
  );
}

export default MainPage;
