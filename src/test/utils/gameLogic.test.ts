import { describe, it, expect } from 'vitest';
import { processGuess, checkGuess, updateLetterStates } from '../../utils/gameLogic';

describe('gameLogic', () => {
  describe('processGuess', () => {
    it('validates word length', () => {
      expect(processGuess('TEST', 'TESTS')).toEqual({
        isValid: false,
        message: 'Word must be 5 letters'
      });
    });

    it('validates word existence', () => {
      expect(processGuess('XXXXX', 'TESTS')).toEqual({
        isValid: false,
        message: 'Not a valid word'
      });
    });
  });

  describe('checkGuess', () => {
    it('correctly identifies exact matches', () => {
      expect(checkGuess('TESTS', 'TESTS')).toEqual([
        'correct',
        'correct',
        'correct',
        'correct',
        'correct'
      ]);
    });

    it('correctly identifies present letters', () => {
      expect(checkGuess('STEAM', 'TEAMS')).toEqual([
        'present',
        'present',
        'present',
        'present',
        'present'
      ]);
    });
  });
});