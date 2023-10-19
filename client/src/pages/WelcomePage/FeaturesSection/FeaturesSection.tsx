import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FeatureCard from './FeatureCard';
import './FeatureSection.scss';

const cards = [
  {
    title: 'Organize Your Work with Ease',
    description:
      'Streamline your workflow and stay on top of your tasks effortlessly. Our kanban board application provides a user-friendly interface that allows you to easily organize and prioritize your work. With intuitive features and customizable options, managing your projects and tasks has never been easier.',
  },
  {
    title: 'Customizable Boards',
    description:
      'Make your unique kanban board by customizing its appearance. Choose from a range of background picture or gradient options to personalize your boards and create a visually appealing workspace. Customizable boards allow you to tailor your experience and reflect your unique style and preferences.',
  },
  {
    title: 'Intuitive Drag and Drop Interface',
    description:
      'Say goodbye to complicated task management. Our kanban board application offers a seamless drag and drop interface, allowing you to effortlessly move columns and tasks around. With a simple and intuitive interaction, you can easily reorganize your workflow, add new tasks, and delete existing ones with just a few clicks.',
  },
];

function FeaturesSection() {
  return (
    <Container>
      <Typography
        variant="h4"
        component={'h1'}
        color="primary"
        className="feature-section__title">
        Key features
      </Typography>
      <Grid container spacing={2}></Grid>
      <Stack gap={4} className="feature-section__cards-wrapper">
        {cards.map(({ title, description }, i) => (
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
