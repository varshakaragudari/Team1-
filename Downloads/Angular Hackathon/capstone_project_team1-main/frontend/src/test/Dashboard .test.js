import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from '../pages/Dashboard';

// Mock sessionStorage for the test
const mockSessionStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};
global.sessionStorage = mockSessionStorage;

describe('Dashboard Component', () => {
  beforeEach(() => {
    mockSessionStorage.getItem.mockClear();
  });

  it('renders the component without crashing', () => {
    render(<Dashboard />);
  });

  it('displays the title in Helmet', () => {
    render(<Dashboard />);
    const titleElement = screen.getByText('Dashboard - NatWest Online Banking');
    expect(titleElement).toBeInTheDocument();
  });

  it('fetches and displays account details when user data exists', async () => {
    // Mock user data in sessionStorage
    mockSessionStorage.getItem.mockReturnValue('{"userId": "123"}');

    // Mock API responses for account data
    // You can adjust the data as needed for your tests
    const currentAccountData = {
      type: 'Current Account',
      balance: 1000,
      accountNumber: '1234567890',
    };
    const savingAccountData = {
      type: 'Savings Account',
      balance: 5000,
      accountNumber: '9876543210',
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([currentAccountData, savingAccountData]),
      })
    );

    render(<Dashboard />);

    // Check if the account details are displayed correctly
    const currentAccountElement = screen.getByText('Current Account');
    const savingAccountElement = screen.getByText('Savings Account');
    expect(currentAccountElement).toBeInTheDocument();
    expect(savingAccountElement).toBeInTheDocument();
  });

  it('toggles the account numbers visibility on click', () => {
    render(<Dashboard />);

    // Check the initial state
    const accountNumberElement = screen.getByText('1234 **** **** 7890');
    expect(accountNumberElement).toBeInTheDocument();

    // Click the eye icon to toggle visibility
    const toggleButton = screen.getByTestId('toggle-button');
    fireEvent.click(toggleButton);

    // Check if the account number is hidden after clicking the eye icon
    const hiddenAccountNumberElement = screen.queryByText('1234 **** **** 7890');
    expect(hiddenAccountNumberElement).toBeNull();
  });

  // Add more test cases as needed to cover other parts of the component and its behavior.
});
