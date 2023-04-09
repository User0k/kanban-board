import { IBoard } from '../../models';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import './Board.scss';
import Tooltip from '@mui/material/Tooltip';

function Board({ name, description }: IBoard) {
  return (
    <Card className="card-board">
      <Box className="card-board__bar">
        <Tooltip title="Modify board">
          <EditIcon sx={{ m: 1 }} className="edit-button" />
        </Tooltip>
        <Tooltip title="Delete board">
          <DeleteForeverIcon sx={{ m: 1 }} className="delete-button" />
        </Tooltip>
      </Box>
      <CardMedia
        component="img"
        alt="image"
        height="150"
        image="https://images.unsplash.com/photo-1679674704818-f3a500c1305b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDk4MDIyOQ&ixlib=rb-4.0.3&q=80&w=1080"
        className='card-board__image'
      />
      {/* <CardMedia>
        <Box
          sx={{
            height: 150,
            background:
              'linear-gradient(0deg, rgba(45, 180, 253, 1) 0%,  rgba(34, 174, 195, 1) 100% )',
          }}></Box>
      </CardMedia> */}
      <CardContent>
        <Typography variant="h6" component="div" noWrap={true}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap={true}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Board;
