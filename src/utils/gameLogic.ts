import { LetterState } from '../types/game';
import { isValidWord } from './words';

export const processGuess = (
  currentGuess: string,
  solution: string
): { isValid: boolean; message?: string } => {
  if (currentGuess.length !== 5) {
    return { isValid: false, message: 'Word must be 5 letters' };
  }
  
  if (!isValidWord(currentGuess)) {
    return { isValid: false, message: 'Not a valid word' };
  }

  return { isValid: true };
};

export const checkGuess = (guess: string, solution: string): ('correct' | 'present' | 'absent')[] => {
  const solutionChars = solution.split('');
  const guessChars = guess.toUpperCase().split('');
  const result = Array(5).fill('absent');
  
  // First pass: mark correct letters
  guessChars.forEach((char, i) => {
    if (char === solutionChars[i]) {
      result[i] = 'correct';
      solutionChars[i] = '#'; // Mark as used
    }
  });
  
  // Second pass: mark present letters
  guessChars.forEach((char, i) => {
    if (result[i] !== 'correct') {
      const solutionIndex = solutionChars.indexOf(char);
      if (solutionIndex !== -1) {
        result[i] = 'present';
        solutionChars[solutionIndex] = '#'; // Mark as used
      }
    }
  });
  
  return result;
};

export const updateLetterStates = (
  guess: string,
  solution: string,
  currentStates: Record<string, LetterState>
): Record<string, LetterState> => {
  const newStates = { ...currentStates };
  const results = checkGuess(guess, solution);

  guess.split('').forEach((letter, index) => {
    const upperLetter = letter.toUpperCase();
    const currentState = newStates[upperLetter];
    const newState = results[index];

    if (!currentState || newState === 'correct') {
      newStates[upperLetter] = newState;
    } else if (newState === 'present' && currentState !== 'correct') {
      newStates[upperLetter] = newState;
    }
  });

  return newStates;
};