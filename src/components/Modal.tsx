import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  isDarkMode: boolean;
  showNewGame?: boolean;
  onNewGame?: () => void;
}

export const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  isDarkMode,
  showNewGame,
  onNewGame 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-lg p-6 max-w-sm w-full`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
          >
            ✕
          </button>
        </div>
        {children}
        {showNewGame && (
          <button
            onClick={onNewGame}
            className="w-full mt-6 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
          >
            New Game
          </button>
        )}
      </div>
    </div>
  );
};