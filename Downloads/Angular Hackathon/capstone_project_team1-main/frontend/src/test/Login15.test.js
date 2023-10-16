import React from 'react';
import { render, screen,fireEvent } from '@testing-library/react';
import Login15 from '../pages/Login15';

test('renders login form with customer number option selected', () => {
  render(<Login15 />);
  
  // Check that the initial rendering includes the "Customer ID" option
  const customerNumberRadio = screen.getByTestId('customerNumberRadio');
  const cardNumberRadio = screen.getByTestId('cardNumberRadio');
  const continueButton = screen.getByText('Continue');
  
  expect(customerNumberRadio).toBeInTheDocument();
  expect(cardNumberRadio).toBeInTheDocument();
  expect(continueButton).toBeInTheDocument();
});

test('handles customer number input correctly', () => {
    render(<Login15 />);
    
    // Find the customer number input field and enter a valid value
    const customerNumberInput = screen.getByPlaceholderText('Enter Customer ID');
    fireEvent.change(customerNumberInput, { target: { value: '12345' } });
  
    // Check that the value in the input field has changed
    expect(customerNumberInput).toHaveValue('12345');
  });
  
  test('displays an error message for an invalid customer number', () => {
    render(<Login15 />);
    
    // Find the customer number input field and enter an invalid value
    const customerNumberInput = screen.getByPlaceholderText('Enter Customer ID');
    fireEvent.change(customerNumberInput, { target: { value: 'invalid-customer-number' } });
  
    // Check that an error message is displayed
    const errorMessage = screen.getByText('Please enter a valid 16-digit card number.');
    expect(errorMessage).toBeInTheDocument();
  });