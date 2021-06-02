import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App component', () => {
  render(<App />);
  const linkElement = screen.getByText(/dev-jot/i);
  expect(linkElement).toBeInTheDocument();
});
