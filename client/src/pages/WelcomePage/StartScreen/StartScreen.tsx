import BGStart from './BGStart.svg';
import Logo from './Logo.svg';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import './StartScreen.scss';

function StartScreen() {
  return (
    <Stack justifyContent="center" alignItems="center" className="start-screen">
      <Card className="start-screen__wrapper">
        <CardMedia component="img" image={BGStart} alt="Background Start" />
        <CardMedia
          component="img"
          image={Logo}
          alt="Logo"
          className="start-screen__logo"
        />
      </Card>
    </Stack>
  );
}

export default StartScreen;
