import { useState } from 'react';
import { IColumn } from '../../models';
import ColumnTitleInput from './ColumnTitleInput';
import ColumnTitleText from './ColumnTitleText';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import './Column.scss';

function Column({ boardId, id, title }: IColumn) {
  const [columnName, setColumnName] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const onCloseInput = () => setIsEditing(false);
  const onOpenInput = () => setIsEditing(true);

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
      <Button
        className="btn-create_task"
        variant="contained"
        startIcon={<AddIcon />}>
        Add task
      </Button>
    </Box>
  );
}

export default Column;
