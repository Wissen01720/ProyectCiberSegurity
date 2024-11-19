import { Container, Grid, Typography, Card, CardContent, CardActions, Button } from '@mui/material';
import { motion } from 'framer-motion';

export const Learn = () => {
  const categories = [
    { title: 'Principiante', color: '#4CAF50' },
    { title: 'Intermedio', color: '#2196F3' },
    { title: 'Avanzado', color: '#F44336' }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Aprende Ciberseguridad
      </Typography>
      
      <Grid container spacing={4}>
        {categories.map((category, index) => (
          <Grid item xs={12} md={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2" sx={{ color: category.color }}>
                    {category.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Contenido diseñado para nivel {category.title.toLowerCase()}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Ver contenido
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};