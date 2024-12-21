import React, { useState } from 'react';
import { WORD_LIST } from '../utils/words';

interface DevToolsProps {
  isDarkMode: boolean;
}

export const DevTools: React.FC<DevToolsProps> = ({ isDarkMode }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className={`${
          isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
        } px-4 py-2 rounded-lg shadow-lg`}
      >
        {isVisible ? 'Hide' : 'Show'} Valid Words
      </button>

      {isVisible && (
        <div className={`
          mt-2 p-4 rounded-lg shadow-lg max-h-96 overflow-y-auto
          ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}
        `}>
          <h3 className="font-bold mb-2">Valid Words ({WORD_LIST.length}):</h3>
          <div className="grid grid-cols-3 gap-1">
            {WORD_LIST.map((word) => (
              <div key={word} className="font-mono">{word}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};