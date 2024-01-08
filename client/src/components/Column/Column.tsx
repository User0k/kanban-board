import { useState } from 'react';
import { IColumn, ITask } from '../../models';
import { Droppable } from '@hello-pangea/dnd';
import { useTranslation } from '../../hooks/useTranslation';
import DraggableElement from '../../dndWrappers/DraggableElement';
import ColumnTitleInput from './ColumnTitleInput';
import ColumnTitleText from './ColumnTitleText';
import CreateTaskModal from '../modals/CreateTaskModal';
import Task from '../Task';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import './Column.scss';

interface IColumnProps extends IColumn {
  tasks: ITask[] | undefined;
  index: number;
}

function Column({ boardId, id, title, tasks, index }: IColumnProps) {
  const [columnName, setColumnName] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const [isTaskCreating, setIsTaskCreating] = useState(false);
  const onCloseInput = () => setIsEditing(false);
  const onOpenInput = () => setIsEditing(true);
  const t = useTranslation('column');

  return (
    <DraggableElement id={id} index={index} className="column">
      <Droppable droppableId={id}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
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
              {tasks &&
                tasks.map((task, index) => (
                  <Task
                    {...task}
                    boardId={boardId}
                    columnId={id}
                    index={index}
                    key={task.id}
                  />
                ))}
            </Box>
            {provided.placeholder}
            {isTaskCreating && <CircularProgress color="success" />}
            <CreateTaskModal
              boardId={boardId}
              columnId={id}
              setIsTaskCreating={setIsTaskCreating}>
              <Button
                className="btn-create_task"
                variant="contained"
                startIcon={<AddIcon />}>
                {t?.addTask}
              </Button>
            </CreateTaskModal>
          </div>
        )}
      </Droppable>
    </DraggableElement>
  );
}

export default Column;
