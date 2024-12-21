// API endpoints configuration
const API_BASE_URL = 'http://localhost/wordle/api';

export const fetchRandomWord = async (): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/endpoints/getWord.php`);
    if (!response.ok) throw new Error('Failed to fetch word');
    const data = await response.json();
    return data.word.toUpperCase();
  } catch (error) {
    console.error('Error fetching word:', error);
    // Fallback to a default word if API fails
    return 'REACT';
  }
};

export const validateGuess = async (guess: string, solution: string): Promise<LetterState[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/endpoints/validateGuess.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ guess: guess.toUpperCase(), solution: solution.toUpperCase() }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Invalid word');
    }

    const data = await response.json();
    return data.result.map((code: number): LetterState => {
      switch (code) {
        case 1: return 'correct';
        case 2: return 'present';
        default: return 'absent';
      }
    });
  } catch (error) {
    console.error('Error validating guess:', error);
    throw error;
  }
};