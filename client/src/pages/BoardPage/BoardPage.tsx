import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useDragEnd } from '../../hooks/useDragEnd';
import { useUpdateColumnSet } from '../../hooks/useUpdateColumnSet';
import { useUpdateTaskSet } from '../../hooks/useUpdateTaskSet';
import { useUpdateAssignedUsers } from '../../hooks/useUpdateAssignedUsers';
import { useGetBoardByIdQuery } from '../../services/boardService';
import { IColumn } from '../../models';
import CreateColumnModal from '../../components/modals/CreateColumnModal';
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
  const boardId = useParams().boardId || '';
  const { data: board, isError: boardNotFound } = useGetBoardByIdQuery(boardId);

  const [isColumnCreating, setIsColumnCreating] = useState(false);
  const { isColumnsLoading, columnsGetError } = useUpdateColumnSet(boardId);
  const boardName = columnsGetError ? 'Can`t get columns' : board?.name || '';
  const storedColumns = useAppSelector((state) => state.boardReducer).columns;

  const tasksIds = useUpdateTaskSet(boardId);
  useUpdateAssignedUsers(tasksIds);
  const storedTasks = useAppSelector((state) => state.boardReducer).tasks;

  const onDragEnd = useDragEnd(boardId);

  return (
    <>
      {boardNotFound ? (
        <Box className="board-not-found">This board cannot be found</Box>
      ) : (
        <Box className="board-page" sx={{ backgroundImage: `${board?.image}` }}>
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
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId={boardId}
              direction="horizontal"
              type="column">
              {(provided) => (
                <Stack
                  className="board-page__columns-wrapper"
                  direction="row"
                  spacing={2}
                  {...provided.droppableProps}
                  ref={provided.innerRef}>
                  {isColumnsLoading ? (
                    <Stack alignItems="center">
                      <CircularProgress size={30} sx={{ m: 1 }} />
                    </Stack>
                  ) : (
                    storedColumns.map((column: IColumn, index) => (
                      <Column
                        {...column}
                        boardId={boardId}
                        tasks={storedTasks[column.id]}
                        index={index}
                        key={column.id}
                      />
                    ))
                  )}
                  {provided.placeholder}
                  {isColumnCreating && <CircularProgress color="success" />}
                  <CreateColumnModal
                    boardId={boardId}
                    setIsColumnCreating={setIsColumnCreating}>
                    <Button
                      className="btn-create-column"
                      variant="contained"
                      startIcon={<AddIcon />}>
                      Create Column
                    </Button>
                  </CreateColumnModal>
                </Stack>
              )}
            </Droppable>
          </DragDropContext>
        </Box>
      )}
    </>
  );
}

export default BoardPage;
