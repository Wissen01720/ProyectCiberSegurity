import { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';

interface GameState {
  level: number;
  targetPassword: string;
  attempts: number;
  maxAttempts: number;
  isComplete: boolean;
}

export const BruteForceGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    level: 1,
    targetPassword: generatePassword(4),
    attempts: 0,
    maxAttempts: 10,
    isComplete: false,
  });
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');

  function generatePassword(length: number): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }

  const handleGuess = () => {
    const newState = { ...gameState };
    newState.attempts++;

    if (guess === gameState.targetPassword) {
      setFeedback('¡Correcto! Has encontrado la contraseña.');
      newState.isComplete = true;
    } else {
      const matchingChars = [...guess].filter((char, i) => char === gameState.targetPassword[i]).length;
      setFeedback(`Caracteres correctos: ${matchingChars}. Intentos restantes: ${gameState.maxAttempts - newState.attempts}`);
    }

    if (newState.attempts >= newState.maxAttempts && !newState.isComplete) {
      setFeedback(`Juego terminado. La contraseña era: ${gameState.targetPassword}`);
      newState.isComplete = true;
    }

    setGameState(newState);
  };

  const nextLevel = () => {
    const newLength = gameState.level + 3;
    setGameState({
      level: gameState.level + 1,
      targetPassword: generatePassword(newLength),
      attempts: 0,
      maxAttempts: 10 + gameState.level * 2,
      isComplete: false,
    });
    setGuess('');
    setFeedback('');
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom>
            Simulador de Fuerza Bruta - Nivel {gameState.level}
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            Intenta adivinar la contraseña. La contraseña tiene {gameState.targetPassword.length} caracteres.
          </Typography>

          <LinearProgress 
            variant="determinate" 
            value={(gameState.attempts / gameState.maxAttempts) * 100} 
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Tu intento"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            disabled={gameState.isComplete}
            sx={{ mb: 2 }}
          />

          <Box sx={{ mb: 3 }}>
            <Button
              variant="contained"
              onClick={handleGuess}
              disabled={gameState.isComplete || !guess}
              sx={{ mr: 2 }}
            >
              Intentar
            </Button>
            {gameState.isComplete && (
              <Button
                variant="outlined"
                onClick={nextLevel}
                color="secondary"
              >
                Siguiente Nivel
              </Button>
            )}
          </Box>

          <Typography 
            variant="body1" 
            color={gameState.isComplete ? "success.main" : "text.secondary"}
            sx={{ fontWeight: 'medium' }}
          >
            {feedback}
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
};