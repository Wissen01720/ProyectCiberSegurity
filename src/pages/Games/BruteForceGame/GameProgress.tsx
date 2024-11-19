import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';

interface GameProgressProps {
  level: number;
  attempts: number;
  maxAttempts: number;
  score: number;
}

export const GameProgress: React.FC<GameProgressProps> = ({
  level,
  attempts,
  maxAttempts,
  score,
}) => {
  const progress = (attempts / maxAttempts) * 100;

  return (
    <Box sx={{ mb: 3 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="h6">Nivel {level}</Typography>
          <Typography variant="h6">Puntuación: {score}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ flexGrow: 1 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: 'grey.200',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 5,
                  backgroundColor: progress > 75 ? 'error.main' : 'primary.main',
                },
              }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            {maxAttempts - attempts} intentos restantes
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
};