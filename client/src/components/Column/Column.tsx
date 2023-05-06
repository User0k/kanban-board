import { useState } from 'react';
import { IColumn } from '../../models';
import { useGetTasksInColumnQuery } from '../../services/taskService';
import ColumnTitleInput from './ColumnTitleInput';
import ColumnTitleText from './ColumnTitleText';
import NewTaskModal from '../modals/NewTaskModal';
import Task from '../Task';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import './Column.scss';

function Column({ boardId, id, title }: IColumn) {
  const [columnName, setColumnName] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const [isTaskCreating, setIsTaskCreating] = useState(false);
  const onCloseInput = () => setIsEditing(false);
  const onOpenInput = () => setIsEditing(true);
  const { data: tasks } = useGetTasksInColumnQuery({ boardId, columnId: id });

  return (
    <Box className="column">
      <Stack className="column__title-wrapper">
        {isEditing ? (
          <ColumnTitleInput
            boardId={boardId}
            id={id}
            title={title}
            columnName={columnName}
            onCloseInput={onCloseInput}
            setColumnName={setColumnName}
          />
        ) : (
          <ColumnTitleText
            boardId={boardId}
            id={id}
            columnName={columnName}
            onOpenInput={onOpenInput}
          />
        )}
      </Stack>
      <Box className="task-list">
        {(tasks || []).map((task) => (
          <Task key={task.id} />
        ))}
      </Box>
      {isTaskCreating && <CircularProgress color="success" />}
      <NewTaskModal
        boardId={boardId}
        columnId={id}
        setIsTaskCreating={setIsTaskCreating}>
        <Button
          className="btn-create_task"
          variant="contained"
          startIcon={<AddIcon />}>
          Add task
        </Button>
      </NewTaskModal>
    </Box>
  );
}

export default Column;
