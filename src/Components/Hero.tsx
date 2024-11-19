import React from 'react';
import { Container, Typography, Button, Grid, Box } from '@mui/material';
import { Shield } from 'lucide-react';

export default function Hero() {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              component="h1"
              variant="h2"
              color="text.primary"
              gutterBottom
              sx={{ fontWeight: 'bold' }}
            >
              Secure Browsing
              <Typography
                component="span"
                variant="h2"
                sx={{ display: 'block', color: 'primary.main', fontWeight: 'bold' }}
              >
                Made Simple
              </Typography>
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              Protect yourself online with our comprehensive browser security solution.
              Real-time protection against phishing, malware, and other online threats.
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                sx={{ mr: 2, mb: { xs: 2, sm: 0 } }}
              >
                Install Extension
              </Button>
              <Button
                variant="outlined"
                size="large"
              >
                Learn More
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              alt="Cybersecurity"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}