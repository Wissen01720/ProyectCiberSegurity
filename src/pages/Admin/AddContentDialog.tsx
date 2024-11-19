import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAdminStore } from '../../stores/adminStore';

interface AddContentForm {
  title: string;
  content: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface AddContentDialogProps {
  open: boolean;
  onClose: () => void;
}

export const AddContentDialog: React.FC<AddContentDialogProps> = ({ open, onClose }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AddContentForm>();
  const { addContent } = useAdminStore();

  const onSubmit = async (data: AddContentForm) => {
    try {
      await addContent(data);
      reset();
      onClose();
    } catch (error) {
      console.error('Error al agregar contenido:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Agregar Nuevo Contenido</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Título"
              fullWidth
              {...register('title', { required: 'Este campo es requerido' })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <TextField
              label="Contenido"
              fullWidth
              multiline
              rows={4}
              {...register('content', { required: 'Este campo es requerido' })}
              error={!!errors.content}
              helperText={errors.content?.message}
            />
            <TextField
              label="Categoría"
              fullWidth
              {...register('category', { required: 'Este campo es requerido' })}
              error={!!errors.category}
              helperText={errors.category?.message}
            />
            <TextField
              select
              label="Dificultad"
              fullWidth
              {...register('difficulty', { required: 'Este campo es requerido' })}
              error={!!errors.difficulty}
              helperText={errors.difficulty?.message}
            >
              <MenuItem value="beginner">Principiante</MenuItem>
              <MenuItem value="intermediate">Intermedio</MenuItem>
              <MenuItem value="advanced">Avanzado</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">Guardar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};