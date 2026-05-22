import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Spoofity hero header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Feel The Music/i);
  expect(headerElement).toBeInTheDocument();
});
