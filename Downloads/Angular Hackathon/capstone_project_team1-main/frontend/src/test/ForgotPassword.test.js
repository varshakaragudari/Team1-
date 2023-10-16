import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ForgotPassword from '../pages/ForgotPassword';

test('renders the initial Forgot Password form', () => {
  render(<ForgotPassword />);

  // Check if the main heading is present
  expect(screen.getByText('Forgot Password')).toBeInTheDocument();

  // Check if the "Customer ID" input is present
  expect(screen.getByLabelText('Customer ID')).toBeInTheDocument();

  // Check if the "Phone Number" input is present
  expect(screen.getByLabelText('Enter your Phone Number registered with the account')).toBeInTheDocument();

  // Check if the "Generate OTP" button is present
  expect(screen.getByText('Generate OTP')).toBeInTheDocument();

  // Check if the "Enter OTP" input is initially disabled
  expect(screen.getByLabelText('Enter OTP')).toBeDisabled();

  // Add more assertions for other form elements as needed
});