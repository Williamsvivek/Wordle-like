import React, { useState } from 'react';
import { GameState, Statistics } from './types/game';
import { getRandomWord } from './utils/words';
import { processGuess, updateLetterStates } from './utils/gameLogic';
import { useKeyboard } from './hooks/useKeyboard';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useDarkMode } from './hooks/useDarkMode';
import { Header } from './components/Header';
import { GameBoard } from './components/GameBoard';
import { Modal } from './components/Modal';
import { DevTools } from './components/DevTools';

export default function App() {
  const [gameState, setGameState] = useLocalStorage<GameState>('gameState', {
    currentGuess: '',
    guesses: [],
    gameStatus: 'playing',
    solution: getRandomWord(),
    letterStates: {}
  });

  const [showInstructions, setShowInstructions] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const [stats, setStats] = useLocalStorage<Statistics>('gameStats', {
    gamesPlayed: 0,
    wins: 0,
    currentStreak: 0,
    maxStreak: 0,
    winPercentage: 0
  });

  const [isDarkMode, setIsDarkMode] = useDarkMode();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const startNewGame = () => {
    setGameState({
      currentGuess: '',
      guesses: [],
      gameStatus: 'playing',
      solution: getRandomWord(),
      letterStates: {}
    });
    setShowStats(false);
  };

  const handleKeyPress = (key: string) => {
    if (gameState.gameStatus !== 'playing') return;

    setErrorMessage(null);

    if (key === 'ENTER') {
      const { isValid, message } = processGuess(gameState.currentGuess, gameState.solution);
      
      if (!isValid) {
        setErrorMessage(message);
        return;
      }

      const newGuesses = [...gameState.guesses, gameState.currentGuess.toUpperCase()];
      const won = gameState.currentGuess.toUpperCase() === gameState.solution;
      const lost = newGuesses.length === 6;

      const newLetterStates = updateLetterStates(
        gameState.currentGuess,
        gameState.solution,
        gameState.letterStates
      );

      setGameState(prev => ({
        ...prev,
        guesses: newGuesses,
        currentGuess: '',
        gameStatus: won ? 'won' : lost ? 'lost' : 'playing',
        letterStates: newLetterStates
      }));

      if (won || lost) {
        setShowStats(true);
        updateStats(won);
      }
    } else if (key === '⌫' || key === 'BACKSPACE') {
      setGameState(prev => ({
        ...prev,
        currentGuess: prev.currentGuess.slice(0, -1)
      }));
    } else if (gameState.currentGuess.length < 5 && /^[A-Z]$/.test(key)) {
      setGameState(prev => ({
        ...prev,
        currentGuess: prev.currentGuess + key
      }));
    }
  };

  useKeyboard(handleKeyPress);

  const updateStats = (won: boolean) => {
    setStats(prev => ({
      gamesPlayed: prev.gamesPlayed + 1,
      wins: prev.wins + (won ? 1 : 0),
      currentStreak: won ? prev.currentStreak + 1 : 0,
      maxStreak: won ? Math.max(prev.currentStreak + 1, prev.maxStreak) : prev.maxStreak,
      winPercentage: Math.round(((prev.wins + (won ? 1 : 0)) / (prev.gamesPlayed + 1)) * 100)
    }));
  };

  return (
    <div className={`min-h-screen transition-colors ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <Header
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onShowInstructions={() => setShowInstructions(true)}
        onShowStats={() => setShowStats(true)}
        errorMessage={errorMessage}
      />

      <GameBoard
        gameState={gameState}
        onKeyPress={handleKeyPress}
        isDarkMode={isDarkMode}
      />

      {process.env.NODE_ENV === 'development' && (
        <DevTools isDarkMode={isDarkMode} />
      )}

      <Modal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
        title="How to Play"
        isDarkMode={isDarkMode}
      >
        <div className="space-y-2">
          <p>Guess the word in 6 tries.</p>
          <p>Each guess must be a valid 5-letter word.</p>
          <p>The color of the tiles will change to show how close your guess was:</p>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 text-white flex items-center justify-center rounded">
              A
            </div>
            <span>Correct letter in correct spot</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-yellow-500 text-white flex items-center justify-center rounded">
              B
            </div>
            <span>Correct letter in wrong spot</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-500 text-white flex items-center justify-center rounded">
              C
            </div>
            <span>Letter not in word</span>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showStats}
        onClose={() => setShowStats(false)}
        title={gameState.gameStatus === 'playing' ? 'Statistics' : gameState.gameStatus === 'won' ? 'Congratulations!' : 'Game Over'}
        isDarkMode={isDarkMode}
        showNewGame={gameState.gameStatus !== 'playing'}
        onNewGame={startNewGame}
      >
        <div>
          {gameState.gameStatus !== 'playing' && (
            <p className="mb-2">
              The word was: <span className="font-bold">{gameState.solution}</span>
            </p>
          )}
          <div className="grid grid-cols-4 gap-2 text-center mb-4">
            <div>
              <div className="text-2xl font-bold">{stats.gamesPlayed}</div>
              <div className="text-xs">Played</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.winPercentage}</div>
              <div className="text-xs">Win %</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.currentStreak}</div>
              <div className="text-xs">Current Streak</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.maxStreak}</div>
              <div className="text-xs">Max Streak</div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}