import { useEffect, useCallback } from 'react';

export const useKeyboard = (onKeyPress: (key: string) => void) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const key = event.key.toUpperCase();
    
    if (key === 'ENTER' || key === 'BACKSPACE' || key === 'DELETE') {
      event.preventDefault();
      onKeyPress(key === 'BACKSPACE' || key === 'DELETE' ? '⌫' : key);
    } else if (/^[A-Z]$/.test(key)) {
      event.preventDefault();
      onKeyPress(key);
    }
  }, [onKeyPress]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};