import { Box, Container, Typography, Grid, Card, CardContent, Button, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Shield, Lock, Brain, GamepadIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const features = [
    {
      icon: <Shield size={40} />,
      title: 'Aprende Ciberseguridad',
      description: 'Descubre cómo protegerte en línea de manera divertida y efectiva.'
    },
    {
      icon: <Lock size={40} />,
      title: 'Protege tus Datos',
      description: 'Entiende la importancia de mantener tu información segura.'
    },
    {
      icon: <Brain size={40} />,
      title: 'Contenido Interactivo',
      description: 'Aprende con lecciones interactivas diseñadas especialmente para ti.'
    },
    {
      icon: <GamepadIcon size={40} />,
      title: 'Juegos Educativos',
      description: 'Practica lo aprendido con juegos divertidos y desafiantes.'
    }
  ];

  const handleInstallExtension = () => {
    if (user) {
      // Redirigir a la página de instalación de la extensión
      window.location.href = '/safeSurftExtension/safeSurftExtension.zip';
    } else {
      // Redirigir a la página de registro
      navigate('/register');
    }
  };

  return (
    <Box sx={{ 
      minHeight: '90vh',
      background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`
    }}>
      <Container maxWidth="lg">
        <Box sx={{ pt: 8, pb: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{ fontWeight: 'bold' }}
            >
              Aprende Ciberseguridad de Forma Divertida
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Una plataforma educativa diseñada para niños y adolescentes donde aprenderás
              sobre seguridad en línea mientras te diviertes.
            </Typography>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/register')}
                sx={{ borderRadius: 8 }}
              >
                Comenzar Ahora
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/learn')}
                sx={{ borderRadius: 8 }}
              >
                Explorar Contenido
              </Button>
              <Button
                variant="contained"
                size="large"
                onClick={handleInstallExtension}
                sx={{ borderRadius: 8 }}
              >
                Instalar Extensión SafeSurf
              </Button>
            </Box>
          </motion.div>
        </Box>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Box sx={{ color: theme.palette.primary.main, mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography gutterBottom variant="h5" component="h2">
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};