import { create } from 'zustand';
import { postgrestClient } from '../lib/postgrestClient';
import { LearningContent } from '../types';

interface AdminStats {
  totalUsers: number;
  totalContent: number;
  completedGames: number;
  userGrowth: { date: string; count: number }[];
}

interface AdminState {
  stats: AdminStats;
  users: any[];
  content: LearningContent[];
  loading: boolean;
  error: string | null;
  fetchStats: () => Promise<void>;
  addContent: (content: Omit<LearningContent, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  stats: {
    totalUsers: 0,
    totalContent: 0,
    completedGames: 0,
    userGrowth: [],
  },
  users: [],
  content: [],
  loading: false,
  error: null,

  fetchStats: async () => {
    set({ loading: true });
    try {
      // Fetch total users
      const { data: totalUsers } = await postgrestClient
        .get('/profiles?select=*,count=exact');

      // Fetch total content
      const { data: totalContent } = await postgrestClient
        .get('/learning_content?select=*,count=exact');

      // Fetch completed games
      const { data: completedGames } = await postgrestClient
        .get('/game_progress?select=*,count=exact&completed=eq.true');

      // Fetch user growth (last 7 days)
      const { data: userGrowth } = await postgrestClient
        .get(`/profiles?select=created_at&created_at=gte.${new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()}`);

      // Process user growth data
      const growthData = userGrowth?.reduce((acc: any[], user: any) => {
        const date = new Date(user.created_at).toLocaleDateString();
        const existingDate = acc.find(d => d.date === date);
        if (existingDate) {
          existingDate.count++;
        } else {
          acc.push({ date, count: 1 });
        }
        return acc;
      }, []) || [];

      set({
        stats: {
          totalUsers: totalUsers.length || 0,
          totalContent: totalContent.length || 0,
          completedGames: completedGames.length || 0,
          userGrowth: growthData,
        },
        loading: false,
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  addContent: async (newContent: Omit<LearningContent, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data } = await postgrestClient
        .post('/learning_content', newContent);

      set((state: AdminState) => ({
        content: [...state.content, data[0] as LearningContent],
      }));

      // Refresh stats after adding content
      get().fetchStats();
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
}));