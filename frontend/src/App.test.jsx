import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import '@testing-library/jest-dom';

beforeAll(() => {
    window.alert = jest.fn(); // mock alert to prevent test from crashing
  });
  

describe('Sidebar Functionality', () => {
  test('renders Add Cold Email button', () => {
    render(<App />);
    expect(screen.getByText(/Add Cold Email/i)).toBeInTheDocument();
  });

  test('renders Save Flow and Run Flow buttons', () => {
    render(<App />);
    expect(screen.getByText(/Save Flow/i)).toBeInTheDocument();
    expect(screen.getByText(/Run Flow/i)).toBeInTheDocument();
  });

  test('renders node options in sidebar', () => {
    render(<App />);
    expect(screen.getByText(/Cold Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Wait\/Delay/i)).toBeInTheDocument();
    expect(screen.getByText(/Lead Source/i)).toBeInTheDocument();
  });

  test('sidebar is visible on load', () => {
    render(<App />);
    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar).toBeVisible();
  });
});

describe('Button Interactions', () => {
  test('clicking Save Flow button', async () => {
    render(<App />);
    const saveButton = screen.getByText(/Save Flow/i);
    await userEvent.click(saveButton);
    // Optionally check for a confirmation message or effect
  });

  test('clicking Run Flow triggers handler', async () => {
    render(<App />);
    const runButton = screen.getByText(/Run Flow/i);
    await userEvent.click(runButton);
    // Optionally check for flow execution result
  });
});

describe('Canvas Rendering', () => {
  test('renders the flow canvas', () => {
    render(<App />);
    const canvas = screen.getByTestId('flow-canvas');
    expect(canvas).toBeInTheDocument();
  });
});
