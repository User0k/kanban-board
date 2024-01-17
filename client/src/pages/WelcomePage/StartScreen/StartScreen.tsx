import BGStart from './images/BGStart.svg';
import Logo from './images/Logo.svg';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import './StartScreen.scss';

function StartScreen() {
  return (
    <Box id='start-screen'>
      <Stack
        justifyContent="center"
        alignItems="center"
        className="logo">
        <Card className="logo__wrapper">
          <CardMedia component="img" image={BGStart} alt="Background Start" />
          <CardMedia
            component="img"
            image={Logo}
            alt="Logo"
            className="logo__picture"
          />
        </Card>
      </Stack>
      <img src='/wallpaper.jpg' alt='Demo image' className='demo-image'/>
    </Box>
  );
}

export default StartScreen;
