import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders the game board', () => {
    render(<App />);
    expect(screen.getByText('WORDLE')).toBeInTheDocument();
  });

  it('handles keyboard input', () => {
    render(<App />);
    fireEvent.keyDown(document, { key: 'a' });
    const cells = screen.getAllByRole('button');
    expect(cells.some(cell => cell.textContent === 'A')).toBe(true);
  });
});