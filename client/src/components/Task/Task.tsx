import { IUpdateTask } from '../../models';
import { useDeleteTaskMutation } from '../../services/taskService';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import GlobalSpinner from '../Spinners/GlobalSpinner';
import DeleteConfirmModal from '../modals/DeleteConfirmModal';
import EditTaskModal from '../modals/EditTaskModal';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import './Task.scss';
import { Tooltip } from '@mui/material';

function Task(taskProps: IUpdateTask) {
  const { title, description, boardId, columnId, id } = taskProps;
  const [deleTask, { isLoading: isTaskDeleting, isError: deleteTaskError }] =
    useDeleteTaskMutation();

  const onDelete = async () => {
    await deleTask({ boardId, columnId, id });
  };

  useErrorHandler(deleteTaskError, 'Unable to delete task');

  return (
    <>
      {isTaskDeleting && <GlobalSpinner color="error" />}
      <Card className="task">
        <Stack>
          <Typography
            className="task__title"
            variant="subtitle2"
            color="text.secondary">
            {title}
          </Typography>
          <Stack className="task__bar" direction="row" alignItems="center">
            <DeleteConfirmModal element="task" onDelete={onDelete}>
              <DeleteForeverIcon className="task-delete" />
            </DeleteConfirmModal>
            <EditTaskModal {...taskProps}>
              <Tooltip title="Edit task" id='edit-task-tooltip'>
                <MoreVertIcon className="task-modify" />
              </Tooltip>
            </EditTaskModal>
            {description && (
              <FormatAlignLeftIcon className="task-description" />
            )}
          </Stack>
        </Stack>
      </Card>
    </>
  );
}

export default Task;
