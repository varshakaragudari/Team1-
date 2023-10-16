import React from 'react';
import { render, screen } from '@testing-library/react';
import MyAccount from '../pages/MyAccount';

// Mocking axios for the component
jest.mock('axios', () => {
  return {
    get: jest.fn(() => Promise.resolve({ data: {} })),
  };
});

describe('MyAccount Component', () => {
  it('renders without crashing', () => {
    render(<MyAccount />);
    // You can add more specific assertions here
  });

  it('displays user account details and personal information', async () => {
    // Mock the sessionStorage data
    const mockUserData = {
      userId: 1,
      accounts: [
        { accountNumber: '12345678' }, // Savings
        { accountNumber: '98765432' }, // Current
      ],
      firstName: 'John',
      lastName: 'Doe',
      dob: '1990-01-01',
      address: '123 Main St',
      city: 'Cityville',
      country: 'Countryland',
      phoneNumber: '123-456-7890',
      email: 'john@example.com',
    };
    jest.spyOn(global, 'sessionStorage', 'get').mockImplementation(() => ({
      getItem: () => JSON.stringify(mockUserData),
    }));

    // Mock axios response for account balances
    axios.get.mockResolvedValueOnce({ data: { balance: 1000 } });
    axios.get.mockResolvedValueOnce({ data: { balance: 500 } });

    render(<MyAccount />);

    // Wait for the data to load and check if it's displayed
    const currentAccountNumber = await screen.findByText('98765432');
    const currentAccountBalance = await screen.findByText('£1000');
    const savingAccountNumber = await screen.findByText('12345678');
    const savingAccountBalance = await screen.findByText('£500');
    const userName = await screen.findByText('John Doe');
    const dob = await screen.findByText('1990-01-01');
    const address = await screen.findByText('123 Main St');
    const city = await screen.findByText('Cityville');
    const country = await screen.findByText('Countryland');
    const phone = await screen.findByText('123-456-7890');
    const email = await screen.findByText('john@example.com');

    expect(currentAccountNumber).toBeInTheDocument();
    expect(currentAccountBalance).toBeInTheDocument();
    expect(savingAccountNumber).toBeInTheDocument();
    expect(savingAccountBalance).toBeInTheDocument();
    expect(userName).toBeInTheDocument();
    expect(dob).toBeInTheDocument();
    expect(address).toBeInTheDocument();
    expect(city).toBeInTheDocument();
    expect(country).toBeInTheDocument();
    expect(phone).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });
});
