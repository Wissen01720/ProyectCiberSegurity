export class PasswordGenerator {
    private static readonly CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789';
    
    static generate(length: number): string {
      return Array.from(
        { length }, 
        () => this.CHARS[Math.floor(Math.random() * this.CHARS.length)]
      ).join('');
    }
  
    static calculateComplexity(password: string): number {
      const hasNumbers = /\d/.test(password);
      const hasLetters = /[a-zA-Z]/.test(password);
      const length = password.length;
      
      let complexity = 0;
      if (hasNumbers) complexity += 10;
      if (hasLetters) complexity += 26;
      
      return Math.pow(complexity, length);
    }
  
    static comparePasswords(attempt: string, target: string): {
      matches: number;
      positions: boolean[];
    } {
      const positions = Array(target.length).fill(false);
      let matches = 0;
  
      for (let i = 0; i < target.length; i++) {
        if (attempt[i] === target[i]) {
          matches++;
          positions[i] = true;
        }
      }
  
      return { matches, positions };
    }
  }
  
  export interface GameState {
    level: number;
    password: string;
    attempts: number;
    maxAttempts: number;
    complexity: number;
    history: Array<{
      attempt: string;
      matches: number;
      timestamp: number;
    }>;
    completed: boolean;
    score: number;
  }
  
  export class BruteForceGameEngine {
    private state: GameState;
  
    constructor(initialLevel: number = 1) {
      this.state = this.initializeLevel(initialLevel);
    }
  
    private initializeLevel(level: number): GameState {
      const passwordLength = 3 + Math.floor(level / 2);
      const password = PasswordGenerator.generate(passwordLength);
      const complexity = PasswordGenerator.calculateComplexity(password);
  
      return {
        level,
        password,
        attempts: 0,
        maxAttempts: 10 + level * 2,
        complexity,
        history: [],
        completed: false,
        score: 0,
      };
    }
  
    attemptPassword(guess: string): {
      matches: number;
      positions: boolean[];
      attemptsLeft: number;
      isComplete: boolean;
      score: number;
    } {
      if (this.state.completed) {
        throw new Error('Game is already complete');
      }
  
      this.state.attempts++;
      const { matches, positions } = PasswordGenerator.comparePasswords(
        guess,
        this.state.password
      );
  
      const attemptsLeft = this.state.maxAttempts - this.state.attempts;
      const isComplete = matches === this.state.password.length || attemptsLeft <= 0;
  
      if (isComplete) {
        this.state.completed = true;
        this.state.score = this.calculateScore(matches === this.state.password.length);
      }
  
      this.state.history.push({
        attempt: guess,
        matches,
        timestamp: Date.now(),
      });
  
      return {
        matches,
        positions,
        attemptsLeft,
        isComplete,
        score: this.state.score,
      };
    }
  
    private calculateScore(success: boolean): number {
      if (!success) return 0;
      
      const baseScore = 1000;
      const attemptsMultiplier = (this.state.maxAttempts - this.state.attempts) / this.state.maxAttempts;
      const complexityMultiplier = Math.log10(this.state.complexity);
      
      return Math.round(baseScore * attemptsMultiplier * complexityMultiplier);
    }
  
    getState(): GameState {
      return { ...this.state };
    }
  
    nextLevel(): GameState {
      if (!this.state.completed) {
        throw new Error('Cannot advance to next level before completing current level');
      }
      this.state = this.initializeLevel(this.state.level + 1);
      return { ...this.state };
    }
  }