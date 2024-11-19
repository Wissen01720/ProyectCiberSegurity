import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

interface AuthContextType {
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Lógica para obtener el usuario con el token
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.('/login', { email, password });
      const data = response.data as { user: any; token: string };
      setUser(data.user);
      localStorage.setItem('token', data.token);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await api.post('/register', { email, password });
      const data = response.data as { user: any; token: string };
      setUser(data.user);
      localStorage.setItem('token', data.token);
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}