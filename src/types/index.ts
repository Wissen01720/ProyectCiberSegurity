export interface User {
    id: string;
    email: string;
    username: string;
    role: 'user' | 'admin';
    created_at: string;
  }
  
  export interface GameProgress {
    userId: string;
    level: number;
    score: number;
    completed: boolean;
  }
  
  export interface LearningContent {
    id: string;
    title: string;
    content: string;
    category: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    created_at: string;
    updated_at: string;
  }