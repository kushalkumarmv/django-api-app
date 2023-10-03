import { render, screen } from './helpers/test-utils';
import App from './App';
import { MemoryRouter } from 'react-router-dom';


test('renders Welcome to Postgram text', () => {
  render(
    // Wrap your component with MemoryRouter in your test
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const LinkElement = screen.getByText(/Welcome to Postgram/i);
  expect(LinkElement).toBeInTheDocument();
});
