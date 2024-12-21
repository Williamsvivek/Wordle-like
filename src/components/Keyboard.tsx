import React from 'react';
import { LetterState } from '../types/game';

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
];

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  letterStates: Record<string, LetterState>;
  isDarkMode: boolean;
}

export const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, letterStates, isDarkMode }) => {
  const getKeyClass = (key: string) => {
    const state = letterStates[key];
    const baseClass = 'px-2 py-4 rounded m-0.5 text-sm font-bold transition-colors';
    const darkModeBase = isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300';
    
    switch (state) {
      case 'correct':
        return `${baseClass} bg-green-500 text-white`;
      case 'present':
        return `${baseClass} bg-yellow-500 text-white`;
      case 'absent':
        return `${baseClass} bg-gray-500 text-white`;
      default:
        return `${baseClass} ${darkModeBase}`;
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-2">
      {KEYBOARD_ROWS.map((row, i) => (
        <div key={i} className="flex justify-center mb-2">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className={getKeyClass(key)}
              style={{ minWidth: key.length > 1 ? '65px' : '40px' }}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};