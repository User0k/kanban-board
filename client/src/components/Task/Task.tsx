import { IUpdateTask } from '../../models';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import './Task.scss';

function Task({ title, description }: IUpdateTask) {
  return (
    <Card className="task">
      <Stack>
        <Typography
          className="task__title"
          variant="subtitle2"
          color="text.secondary">
          {title}
        </Typography>
        <Stack className="task__bar" direction="row" alignItems="center">
          <DeleteForeverIcon className="task-delete" />
          <MoreVertIcon className="task-modify" />
          {description && <FormatAlignLeftIcon className="task-description" />}
        </Stack>
      </Stack>
    </Card>
  );
}

export default Task;
