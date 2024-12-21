import React from 'react';
import { checkGuess } from '../utils/gameLogic';

interface GridProps {
  guesses: string[];
  currentGuess: string;
  solution: string;
  isDarkMode: boolean;
}

export const Grid: React.FC<GridProps> = ({ guesses, currentGuess, solution, isDarkMode }) => {
  const remainingRows = Math.max(0, 6 - (guesses.length + 1));
  const rows = [
    ...guesses,
    currentGuess,
    ...Array(remainingRows).fill('')
  ];

  const getCellClass = (letter: string, rowIndex: number, colIndex: number) => {
    const baseClass = 'w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold rounded m-0.5 transition-colors';
    const darkModeClass = isDarkMode ? 'text-white border-gray-600' : 'text-gray-900 border-gray-300';
    
    if (rowIndex >= guesses.length) {
      return `${baseClass} ${darkModeClass}`;
    }

    const result = checkGuess(guesses[rowIndex], solution)[colIndex];
    switch (result) {
      case 'correct':
        return `${baseClass} bg-green-500 text-white border-green-500`;
      case 'present':
        return `${baseClass} bg-yellow-500 text-white border-yellow-500`;
      case 'absent':
        return `${baseClass} bg-gray-500 text-white border-gray-500`;
      default:
        return `${baseClass} ${darkModeClass}`;
    }
  };

  return (
    <div className="grid grid-rows-6 gap-0.5 p-2">
      {rows.map((guess, i) => (
        <div key={i} className="grid grid-cols-5 gap-0.5">
          {Array(5).fill('').map((_, j) => (
            <div
              key={`${i}-${j}`}
              className={getCellClass(guess[j] || '', i, j)}
            >
              {guess[j] || ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};