import { Container, Typography, Box } from '@mui/material';
import { BruteForceGame } from './BruteForceGame';

export const Games = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Juegos de Ciberseguridad
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph>
          Aprende sobre seguridad mientras juegas
        </Typography>
        <BruteForceGame />
      </Box>
    </Container>
  );
};