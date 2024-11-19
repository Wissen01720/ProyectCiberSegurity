import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

export const Navbar = () => {
  const { user, signOut } = useAuthStore();

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>
      <Toolbar>
        <Shield size={32} style={{ marginRight: '10px' }} />
        <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          CyberKids
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={RouterLink} to="/Learn">
            Aprender
          </Button>
          <Button color="inherit" component={RouterLink} to="/Games">
            Juegos
          </Button>
          {user ? (
            <>
              <Button color="inherit" component={RouterLink} to="/profile">
                Perfil
              </Button>
              <Button color="inherit" onClick={signOut}>
                Salir
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">
                Iniciar Sesión
              </Button>
              <Button color="inherit" component={RouterLink} to="/register">
                Registrarse
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};