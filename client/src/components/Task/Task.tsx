import { IUpdateTask } from '../../models';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useDeleteTaskMutation } from '../../services/taskService';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import GlobalSpinner from '../Spinners/GlobalSpinner';
import UserButton from './UserButton';
import DeleteConfirmModal from '../modals/DeleteConfirmModal';
import EditTaskModal from '../modals/EditTaskModal';
import DraggableElement from '../../dndWrappers/DraggableElement';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import Tooltip from '@mui/material/Tooltip';
import AvatarGroup from '@mui/material/AvatarGroup';
import './Task.scss';

interface ITaskProps extends IUpdateTask {
  index: number;
}

function Task({ index, ...taskProps }: ITaskProps) {
  const { title, description, boardId, columnId, id } = taskProps;
  const [deleTask, { isLoading: isTaskDeleting, isError: deleteTaskError }] =
    useDeleteTaskMutation();

  const onDelete = async () => {
    await deleTask({ boardId, columnId, id });
  };

  const users = useAppSelector((state) => state.boardReducer.assignedUsers)[id];

  useErrorHandler(deleteTaskError, 'Unable to delete task');

  return (
    <>
      {isTaskDeleting && <GlobalSpinner color="error" />}
      <DraggableElement id={id} index={index}>
        <Card className="task">
          <Stack>
            <Typography
              className="task__title"
              variant="subtitle2"
              color="text.secondary">
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ minWidth: '250px' }}>
              <Stack className="task__bar" direction="row" alignItems="center">
                <DeleteConfirmModal element="task" onDelete={onDelete}>
                  <DeleteForeverIcon className="task-delete" />
                </DeleteConfirmModal>
                <EditTaskModal {...taskProps}>
                  <Tooltip title="Edit task" id="edit-task-tooltip">
                    <MoreVertIcon className="task-modify" />
                  </Tooltip>
                </EditTaskModal>
                {description && (
                  <FormatAlignLeftIcon className="task-description" />
                )}
              </Stack>
              <AvatarGroup max={3}>
                {users?.map((user) => (
                  <UserButton key={user.id} taskId={id} user={user} />
                ))}
              </AvatarGroup>
            </Stack>
          </Stack>
        </Card>
      </DraggableElement>
    </>
  );
}

export default Task;
