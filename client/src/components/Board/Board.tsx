import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { useDeleteBoardMutation } from '../../services/boardService';
import { setBoardImage } from '../../store/slices/boardSlice';
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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './Board.scss';

function Board({ name, description, id, image }: IBoard) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isUpdating, setIsUpdating] = useState(false);

  const [
    deleteBoard,
    { isLoading: isBoardDeleting, isError: deleteBoardError },
  ] = useDeleteBoardMutation();

  const onNavigate = () => {
    navigate(`/boards/${id}`);
    dispatch(setBoardImage(image));
  };

  const onDelete = async () => {
    await deleteBoard(id);
  };

  useErrorHandler(deleteBoardError, 'Unable to delete board');

  return (
    <>
      {isBoardDeleting && <GlobalSpinner color="error" />}
      {isUpdating && <GlobalSpinner color="success" />}
      <Card className="card-board">
        <Box className="card-board__bar">
          <Box className="card-board__bar-wrapper">
            <EditBoardModal
              name={name}
              description={description}
              id={id}
              imageFromProps={image}
              setIsUpdating={setIsUpdating}>
              <EditIcon sx={{ m: 1 }} className="edit-button" />
            </EditBoardModal>
            <DeleteConfirmModal element="board" onDelete={onDelete}>
              <DeleteForeverIcon sx={{ m: 1 }} className="delete-button" />
            </DeleteConfirmModal>
          </Box>
        </Box>
        <CardMedia className="card-board__image" onClick={onNavigate}>
          <Box className="card-board__image-shadow" />
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
