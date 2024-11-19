import React from 'react';
import { Container, Grid, Typography, Paper, Box } from '@mui/material';
import {
  Shield,
  Lock,
  AlertTriangle,
  UserCheck,
  Network,
  Code
} from 'lucide-react';

const features = [
  {
    name: 'Authentication & Authorization',
    description: 'Secure login systems and access control with multi-factor authentication support.',
    icon: UserCheck,
  },
  {
    name: 'Cryptography',
    description: 'Advanced encryption protocols to protect your sensitive data during transmission.',
    icon: Lock,
  },
  {
    name: 'Penetration Testing',
    description: 'Regular security assessments to identify and fix vulnerabilities.',
    icon: Code,
  },
  {
    name: 'Network Security',
    description: 'Comprehensive protection for your network connections and data transfers.',
    icon: Network,
  },
  {
    name: 'Real-time Alerts',
    description: 'Instant notifications about potential security threats and suspicious activities.',
    icon: AlertTriangle,
  },
  {
    name: 'Web Application Security',
    description: 'Protection against common web vulnerabilities and attacks.',
    icon: Shield,
  },
];

export default function Features() {
  return (
    <Box
      sx={{
        py: 8,
        bgcolor: 'background.default',
      }}
      id="features"
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            component="h2"
            variant="overline"
            color="primary"
            gutterBottom
          >
            Features
          </Typography>
          <Typography
            variant="h3"
            color="text.primary"
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            Complete Security Solution
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            Comprehensive protection for your online activities with advanced security features.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Grid item xs={12} sm={6} key={feature.name}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: '100%',
                    bgcolor: 'background.paper',
                    border: 1,
                    borderColor: 'divider',
                    '&:hover': {
                      boxShadow: 2,
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <Box
                      sx={{
                        bgcolor: 'primary.main',
                        borderRadius: 1,
                        p: 1,
                        mr: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={24} color="white" />
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        color="text.primary"
                        gutterBottom
                      >
                        {feature.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {feature.description}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}