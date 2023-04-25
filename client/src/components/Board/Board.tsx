import { useState } from 'react';
import { useDeleteBoardMutation } from '../../services/boardService';
import { UseErrorHandler } from '../../store/hooks';
import { IBoard } from '../../models';
import GlobalSpinner from '../Spinners/GlobalSpinner';
import DeleteConfirmModal from '../modals/DeleteConfirmModal';
import EditBoardModal from '../modals/EditBoardModal';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './Board.scss';

function Board({ name, description, id, image }: IBoard) {
  const [isUpdating, setIsUpdating] = useState(false);

  const [
    deleteBoard,
    { isLoading: isBoardDeleting, isError: deleteBoardError },
  ] = useDeleteBoardMutation();
  const onDelete = async () => {
    await deleteBoard(id);
  };

  UseErrorHandler(deleteBoardError, 'Unable to delete board');

  return (
    <>
      {isBoardDeleting && <GlobalSpinner color="error" />}
      {isUpdating && <GlobalSpinner color="success" />}
      <Card className="card-board">
        <Box className="card-board__bar">
          <EditBoardModal
            name={name}
            description={description}
            id={id}
            imageFromProps={image}
            setIsUpdating={setIsUpdating}>
            <Tooltip title="Edit board">
              <EditIcon sx={{ m: 1 }} className="edit-button" />
            </Tooltip>
          </EditBoardModal>
          <DeleteConfirmModal element="board" onDelete={onDelete}>
            <Tooltip title="Delete board">
              <DeleteForeverIcon sx={{ m: 1 }} className="delete-button" />
            </Tooltip>
          </DeleteConfirmModal>
        </Box>
        <CardMedia>
          <Box
            sx={{
              height: 165,
              background: image,
            }}
          />
        </CardMedia>
        <CardContent sx={{ padding: '4px 12px' }}>
          <Typography variant="h6" component="div" noWrap={true}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap={true}>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default Board;
