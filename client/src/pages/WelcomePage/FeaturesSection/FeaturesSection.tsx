import { useTranslation } from '../../../hooks/useTranslation';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FeatureCard from './FeatureCard';
import './FeaturesSection.scss';

function FeaturesSection() {
  const t = useTranslation('welcomePage')?.featuresection;
  
  return (
    <Container>
      <Typography
        variant="h4"
        component={'h1'}
        color="primary"
        className="feature-section__title">
        {t?.header}
      </Typography>
      <Grid container spacing={2}></Grid>
      <Stack gap={4} className="feature-section__cards-wrapper">
        {t?.cards.map(({ title, description }, i) => (
          <FeatureCard
            key={title}
            title={title}
            description={description}
            cardType={i % 2 ? 'gray' : 'blue'}
            elevation={i % 2 ? 4 : 16}
          />
        ))}
      </Stack>
    </Container>
  );
}

export default FeaturesSection;
