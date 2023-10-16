import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';

// Mock sessionStorage for the test
const mockSessionStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};
global.sessionStorage = mockSessionStorage;

// Test suite for the Home component
describe('Home Component', () => {
  beforeEach(() => {
    mockSessionStorage.getItem.mockClear();
  });

  it('renders the component without crashing', () => {
    render(<Home />);
  });

  it('displays the title in Helmet', () => {
    render(<Home />);
    const titleElement = screen.getByText('Save while you spend with round up savings');
    expect(titleElement).toBeInTheDocument();
  });

  it('displays the "Start savings now" button when no user data is available', () => {
    mockSessionStorage.getItem.mockReturnValue(null); // Simulate no user data
    render(<Home />);
    const startSavingsButton = screen.getByText('Start savings now');
    expect(startSavingsButton).toBeInTheDocument();
  });

  it('displays the "Open banking dashboard" button when user data is available', () => {
    mockSessionStorage.getItem.mockReturnValue('{"user": "data"}'); // Simulate user data
    render(<Home />);
    const openDashboardButton = screen.getByText('Open banking dashboard');
    expect(openDashboardButton).toBeInTheDocument();
  });
});
