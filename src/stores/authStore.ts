import { create } from 'zustand';
import { signIn, signUp, signOut } from '../lib/postgrestClient';
import { User } from '../types';

interface AuthState {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  signIn: async (email: string, password: string) => {
    set({ loading: true });
    try {
      const data = await signIn(email, password);
      if (Array.isArray(data) && data.length > 0) {
        set({ user: data[0] as User, loading: false });
      } else {
        set({ loading: false });
        throw new Error('Invalid response data');
      }
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
  signUp: async (email: string, password: string, username: string) => {
    set({ loading: true });
    try {
      const data = await signUp(email, password, username);
      if (Array.isArray(data) && data.length > 0) {
        set({ user: data[0] as User, loading: false });
      } else {
        set({ loading: false });
        throw new Error('Invalid response data');
      }
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
  signOut: async () => {
    set({ loading: true });
    try {
      await signOut();
      set({ user: null, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
}));