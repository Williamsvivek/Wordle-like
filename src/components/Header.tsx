import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onShowInstructions: () => void;
  onShowStats: () => void;
  errorMessage: string | null;
}

export const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  onToggleDarkMode,
  onShowInstructions,
  onShowStats,
  errorMessage
}) => {
  return (
    <header className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <button
          onClick={onShowInstructions}
          className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'}`}
        >
          ?
        </button>
        <h1 className={`text-2xl font-bold text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          WORDLE
        </h1>
        <div className="flex gap-4">
          <button
            onClick={onToggleDarkMode}
            className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'}`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={onShowStats}
            className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'}`}
          >
            📊
          </button>
        </div>
      </div>
      {errorMessage && (
        <div className="bg-red-500 text-white text-center py-2">
          {errorMessage}
        </div>
      )}
    </header>
  );
};