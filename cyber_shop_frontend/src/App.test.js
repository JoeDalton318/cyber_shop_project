import { render, screen } from '@testing-library/react';
import App from './App';

test('renders page d\'accueil NEON', () => {
  render(<App />);
  const titleElement = screen.getByText(/bienvenue/i);
  expect(titleElement).toBeInTheDocument();
});