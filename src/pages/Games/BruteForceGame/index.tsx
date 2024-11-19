import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { BruteForceGameEngine } from './GameLogic';
import { GameProgress } from './GameProgress';
import { PasswordInput } from './PasswordInput';
import { useGameStore } from '../../../stores/gameStore';

export const BruteForceGame = () => {
  const [game, setGame] = useState(new BruteForceGameEngine());
  const [feedback, setFeedback] = useState('');
  const { saveProgress } = useGameStore();
  const gameState = game.getState();

  useEffect(() => {
    if (gameState.completed) {
      saveProgress({
        gameType: 'bruteforce',
        level: gameState.level,
        score: gameState.score,
        completed: true,
      });
    }
  }, [gameState.completed, gameState.level, gameState.score, saveProgress]);

  const handleAttempt = (attempt: string) => {
    const result = game.attemptPassword(attempt);
    
    if (result.isComplete) {
      if (result.matches === gameState.password.length) {
        setFeedback(`¡Correcto! Has encontrado la contraseña. Puntuación: ${result.score}`);
      } else {
        setFeedback(`Juego terminado. La contraseña era: ${gameState.password}`);
      }
    } else {
      setFeedback(`Caracteres correctos: ${result.matches}. Intentos restantes: ${result.attemptsLeft}`);
    }
    
    setGame(new BruteForceGameEngine(gameState.level));
  };

  const handleNextLevel = () => {
    setGame(new BruteForceGameEngine(gameState.level + 1));
    setFeedback('');
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom>
            Simulador de Fuerza Bruta - Nivel {gameState.level}
          </Typography>

          <GameProgress
            level={gameState.level}
            attempts={gameState.attempts}
            maxAttempts={gameState.maxAttempts}
            score={gameState.score}
          />

          <PasswordInput
            onSubmit={handleAttempt}
            disabled={gameState.completed}
            passwordLength={gameState.password.length}
          />

          <Box sx={{ mt: 3 }}>
            <Typography
              variant="body1"
              color={gameState.completed ? "success.main" : "text.secondary"}
              sx={{ fontWeight: 'medium' }}
            >
              {feedback}
            </Typography>
          </Box>

          {gameState.completed && (
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                onClick={handleNextLevel}
                color="secondary"
              >
                Siguiente Nivel
              </Button>
            </Box>
          )}
        </Paper>
      </motion.div>
    </Box>
  );
};