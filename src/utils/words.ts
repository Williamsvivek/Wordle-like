// Word list for the game
export const WORD_LIST = [
  'REACT', 'WORLD', 'PLANE', 'BRAIN', 'STEAM',
  'FLAME', 'SCALE', 'TRACE', 'BRAKE', 'GRAPE',
  'HOUSE', 'LIGHT', 'MUSIC', 'PAINT', 'SPACE',
  'DREAM', 'CLOUD', 'BEACH', 'DANCE', 'EARTH'
];

export const getRandomWord = (): string => {
  return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
};

export const isValidWord = (word: string): boolean => {
  return WORD_LIST.includes(word.toUpperCase());
};