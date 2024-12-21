export type LetterState = 'correct' | 'present' | 'absent' | 'empty';

export interface GameState {
  currentGuess: string;
  guesses: string[];
  gameStatus: 'playing' | 'won' | 'lost';
  solution: string;
  letterStates: Record<string, LetterState>;
}

export interface Statistics {
  gamesPlayed: number;
  wins: number;
  currentStreak: number;
  maxStreak: number;
  winPercentage: number;
}