import { create } from 'zustand';
import { postgrestClient } from '../lib/postgrestClient';

interface GameProgress {
  gameType: string;
  level: number;
  score: number;
  completed: boolean;
}

interface GameState {
  progress: GameProgress[];
  loading: boolean;
  error: string | null;
  saveProgress: (progress: GameProgress) => Promise<void>;
  fetchProgress: () => Promise<void>;
}

export const useGameStore = create<GameState>((set) => ({
  progress: [],
  loading: false,
  error: null,

  saveProgress: async (progress: GameProgress) => {
    try {
      const { data } = await postgrestClient.post('/game_progress', {
        game_type: progress.gameType,
        level: progress.level,
        score: progress.score,
        completed: progress.completed,
      });

      set((state: GameState) => ({
        progress: [...state.progress, data[0] as GameProgress],
      }));
    } catch (error: any) {
      set({ error: (error as Error).message });
    }
  },

  fetchProgress: async () => {
    set({ loading: true });
    try {
      const { data } = await postgrestClient.get('/game_progress?order=created_at.desc');

      set({ 
        progress: data as GameProgress[],
        loading: false,
      });
    } catch (error: any) {
      set({ 
        error: (error as Error).message,
        loading: false,
      });
    }
  },
}));