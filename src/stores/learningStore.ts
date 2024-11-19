import { create } from 'zustand';
import { postgrestClient } from '../lib/postgrestClient';
import { LearningContent } from '../types';

interface LearningState {
  content: LearningContent[];
  loading: boolean;
  error: string | null;
  fetchContent: () => Promise<void>;
  addContent: (content: Omit<LearningContent, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
}

export const useLearningStore = create<LearningState>((set) => ({
  content: [],
  loading: false,
  error: null,
  fetchContent: async () => {
    set({ loading: true });
    try {
      const { data } = await postgrestClient
        .get('/learning_content?order=created_at.desc');

      set({ content: data as LearningContent[], error: null });
    } catch (error: any) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
  addContent: async (newContent: Omit<LearningContent, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data } = await postgrestClient
        .post('/learning_content', newContent);

      set((state: LearningState) => ({
        content: [...state.content, data[0] as LearningContent],
      }));
    } catch (error: any) {
      set({ error: (error as Error).message });
    }
  },
}));