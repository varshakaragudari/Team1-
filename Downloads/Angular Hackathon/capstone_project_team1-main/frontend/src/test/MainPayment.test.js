import React from 'react';
import { render, screen } from '@testing-library/react';
import MainPayment from '../pages/MainPayment';

// Mocking axios for the component
jest.mock('axios', () => {
  return {
    get: jest.fn(() => Promise.resolve({ data: {} })),
  };
});

describe('MainPayment Component', () => {
  it('renders without crashing', () => {
    render(<MainPayment />);
    // You can add more specific assertions here
  });

  it('fetches and displays current and saving account balances', async () => {
    // Mock the sessionStorage data
    const mockUserData = { userId: 1 };
    jest.spyOn(global, 'sessionStorage', 'get').mockImplementation(() => ({
      getItem: () => JSON.stringify(mockUserData),
    }));

    // Mock axios response for account balances
    axios.get.mockResolvedValueOnce({ data: { balance: 1000 } });
    axios.get.mockResolvedValueOnce({ data: { balance: 500 } });

    render(<MainPayment />);

    // Wait for the data to load and check if it's displayed
    const currentAccountBalance = await screen.findByText('£1000');
    const savingAccountBalance = await screen.findByText('£500');

    expect(currentAccountBalance).toBeInTheDocument();
    expect(savingAccountBalance).toBeInTheDocument();
  });

  it('displays the last update date', async () => {
    const mockLastUpdate = '2023-10-05';
    jest.spyOn(global.Date, 'now').mockImplementation(() =>
      new Date(mockLastUpdate).getTime()
    );

    render(<MainPayment />);

    const lastUpdateText = await screen.findByText('Last update: 2023-10-05');
    expect(lastUpdateText).toBeInTheDocument();
  });
});
