import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface IFeatureCard {
  title: string;
  description: string;
  cardType: 'blue' | 'gray';
  elevation?: number;
}

function FeatureCard({
  title,
  description,
  cardType,
  elevation,
}: IFeatureCard) {
  const bgcolor =
    cardType === 'blue' ? 'rgb(25, 118, 210)' : 'rgb(231, 234, 237)';
  const titleColor = cardType === 'blue' ? 'white' : 'rgb(25, 118, 210)';
  const descrColor = cardType === 'blue' ? 'white' : 'black';

  return (
    <Paper sx={{ bgcolor }} elevation={elevation} className="feature-card">
      <CardContent>
        <Typography variant="h6" align="center" color={titleColor}>
          {title}
        </Typography>
        <Box sx={{ bgcolor: titleColor }} className="feature-card-divder" />
        <Typography color={descrColor}>{description}</Typography>
      </CardContent>
    </Paper>
  );
}

export default FeatureCard;
