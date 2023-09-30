import { render, screen } from '@testing-library/react';
import App from './App';

test('renders all & selected events list', () => {
  render(<App />);
  const allEventsHeader = screen.getByText("All Events");
  const selectedEventsHeader = screen.getByText("Selected Events");

  expect(allEventsHeader).toBeInTheDocument();
  expect(selectedEventsHeader).toBeInTheDocument();
});
 