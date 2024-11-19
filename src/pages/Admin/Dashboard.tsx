import React, { useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import { useAdminStore } from '../../stores/adminStore';
import { AddContentDialog } from './AddContentDialog';

export const AdminDashboard = () => {
  const { stats, fetchStats, content } = useAdminStore();
  const [openDialog, setOpenDialog] = React.useState(false);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const chartData = {
    labels: stats.userGrowth?.map((d: { date: string }) => d.date) || [],
    datasets: [
      {
        label: 'Nuevos Usuarios',
        data: stats.userGrowth?.map((d: { count: number }) => d.count) || [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Estadísticas Generales */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Total Usuarios
            </Typography>
            <Typography component="p" variant="h4">
              {stats.totalUsers}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Contenidos Activos
            </Typography>
            <Typography component="p" variant="h4">
              {stats.totalContent}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Juegos Completados
            </Typography>
            <Typography component="p" variant="h4">
              {stats.completedGames}
            </Typography>
          </Paper>
        </Grid>

        {/* Gráfico de Crecimiento */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography component="h2" variant="h6" color="primary">
                Crecimiento de Usuarios
              </Typography>
            </Box>
            <Box sx={{ height: 300 }}>
              <Line data={chartData} options={{ maintainAspectRatio: false }} />
            </Box>
          </Paper>
        </Grid>

        {/* Tabla de Contenido */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography component="h2" variant="h6" color="primary">
                Contenido Reciente
              </Typography>
              <Button variant="contained" onClick={() => setOpenDialog(true)}>
                Agregar Contenido
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Título</TableCell>
                    <TableCell>Categoría</TableCell>
                    <TableCell>Dificultad</TableCell>
                    <TableCell>Fecha</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {content.map((item: { id: string, title: string, category: string, difficulty: string, created_at: string }) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.difficulty}</TableCell>
                      <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      <AddContentDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </Container>
  );
};