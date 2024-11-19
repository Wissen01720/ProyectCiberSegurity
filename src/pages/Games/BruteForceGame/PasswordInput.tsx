import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';

interface PasswordInputProps {
  onSubmit: (password: string) => void;
  disabled: boolean;
  passwordLength: number;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  onSubmit,
  disabled,
  passwordLength,
}) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.length === passwordLength) {
      onSubmit(input);
      setInput('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            value={input}
            onChange={(e) => setInput(e.target.value.toLowerCase())}
            disabled={disabled}
            label="Intenta adivinar la contraseña"
            variant="outlined"
            fullWidth
            inputProps={{
              maxLength: passwordLength,
              pattern: '[a-z0-9]*',
            }}
            helperText={`La contraseña tiene ${passwordLength} caracteres`}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={disabled || input.length !== passwordLength}
            sx={{ minWidth: 120 }}
          >
            Probar
          </Button>
        </Box>
      </form>
    </motion.div>
  );
};