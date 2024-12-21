export const compareWords = (guess: string, solution: string): number[] => {
  const result = Array(5).fill(3); // Initialize with "incorrect" (3)
  const solutionChars = solution.split('');
  const guessChars = guess.split('');
  
  // First pass: mark correct letters (1)
  for (let i = 0; i < 5; i++) {
    if (guessChars[i] === solutionChars[i]) {
      result[i] = 1;
      solutionChars[i] = '#';
    }
  }
  
  // Second pass: mark present letters (2)
  for (let i = 0; i < 5; i++) {
    if (result[i] !== 1) {
      const pos = solutionChars.indexOf(guessChars[i]);
      if (pos !== -1) {
        result[i] = 2;
        solutionChars[pos] = '#';
      }
    }
  }
  
  return result;
};