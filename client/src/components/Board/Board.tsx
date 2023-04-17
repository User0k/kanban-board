import { useState } from 'react';
import { useDeleteBoardMutation } from '../../services/boardService';
import { IBoard } from '../../models';
import DeleteConfirmModal from '../modals/DeleteConfirmModal';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import './Board.scss';

function Board({ name, description, id, image }: IBoard) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const handleDeleteOpen = () => setDeleteModal(true);
  const handleEditOpen = () => setEditModal(true);

  const [deleteBoard] = useDeleteBoardMutation();
  const onDelete = async () => {
    await deleteBoard(id);
  };

  return (
    <Card className="card-board">
      <Box className="card-board__bar">
        <Tooltip title="Modify board">
          <EditIcon
            sx={{ m: 1 }}
            className="edit-button"
            onClick={handleEditOpen}
          />
        </Tooltip>
        <Tooltip title="Delete board">
          <DeleteForeverIcon
            sx={{ m: 1 }}
            className="delete-button"
            onClick={handleDeleteOpen}
          />
        </Tooltip>
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
      <DeleteConfirmModal
        element="board"
        open={deleteModal}
        setOpen={setDeleteModal}
        onDelete={onDelete}
      />
    </Card>
  );
}

export default Board;
