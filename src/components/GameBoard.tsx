import React from 'react';
import { Grid } from './Grid';
import { Keyboard } from './Keyboard';
import { GameState } from '../types/game';

interface GameBoardProps {
  gameState: GameState;
  onKeyPress: (key: string) => void;
  isDarkMode: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({ gameState, onKeyPress, isDarkMode }) => {
  return (
    <main className="max-w-4xl mx-auto p-4">
      <Grid
        guesses={gameState.guesses}
        currentGuess={gameState.currentGuess}
        solution={gameState.solution}
        isDarkMode={isDarkMode}
      />
      <Keyboard
        onKeyPress={onKeyPress}
        letterStates={gameState.letterStates}
        isDarkMode={isDarkMode}
      />
    </main>
  );
};