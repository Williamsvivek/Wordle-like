import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useLocalStorage('darkMode', false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return [isDarkMode, setIsDarkMode] as const;
};