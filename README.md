# Worlde-like
A modern implementation of the popular word-guessing game Wordle, built with React, TypeScript, and Tailwind CSS.

## 🎮 Features

- 🎯 Classic Wordle gameplay
- 🌓 Dark/Light mode toggle
- 📊 Statistics tracking
- ⌨️ Virtual keyboard with color-coded feedback
- 💾 Local storage for game progress
- 📱 Responsive design
- 🎲 Random word selection
- ✅ Word validation

## 🚀 Live Demo

Try the game here: https://wordle-like.netlify.app/

## 🛠️ Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Vitest for testing
- Lucide React for icons

## 🏗️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Run ESLint

## 🎯 Game Rules

1. Guess the word in 6 tries
2. Each guess must be a valid 5-letter word
3. Color feedback after each guess:
   - 🟩 Green: Letter is correct and in right position
   - 🟨 Yellow: Letter is in the word but wrong position
   - ⬜ Gray: Letter is not in the word

## 🧪 Testing

The project includes comprehensive tests for game logic and components. Run the test suite with:

```bash
npm run test
```

## 📱 Responsive Design

The game is fully responsive and works on:
- 📱 Mobile devices
- 💻 Tablets
- 🖥️ Desktop computers

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by the original [Wordle](https://www.nytimes.com/games/wordle) game
- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
