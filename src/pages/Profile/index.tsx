import { Container, Paper, Typography, Box, Avatar, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../stores/authStore';

export const Profile = () => {
  const { user } = useAuthStore();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Avatar
              sx={{ width: 100, height: 100, mr: 3 }}
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`}
            />
            <Box>
              <Typography variant="h4" gutterBottom>
                {user?.username}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Progreso de Aprendizaje
                  </Typography>
                  {/* Aquí irá el componente de progreso */}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Logros
                  </Typography>
                  {/* Aquí irán los logros del usuario */}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </motion.div>
    </Container>
  );
};