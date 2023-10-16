import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import DebitCardPayment from '../pages/DebitCardPayment';

describe('DebitCardPayment Component', () => {
  it('renders the component', () => {
    render(<DebitCardPayment />);
    expect(screen.getByText('Pay using Debit card')).toBeInTheDocument();
  });

  it('verifies the debit card details', () => {
    render(<DebitCardPayment />);

    // Simulate user input
    const cardNumberInput = screen.getByPlaceholderText('Enter 16-digit card number');
    const cvvInput = screen.getByPlaceholderText('CVV');
    const expiryInput = screen.getByPlaceholderText('MM/YY');
    fireEvent.change(cardNumberInput, { target: { value: '1234567890123456' } });
    fireEvent.change(cvvInput, { target: { value: '123' } });
    fireEvent.change(expiryInput, { target: { value: '12/23' } });

    // Verify button click
    const verifyButton = screen.getByText('Verify');
    fireEvent.click(verifyButton);

    // Expect that the card details are verified
    expect(screen.getByText('Receiver details')).toBeInTheDocument();
  });

  it('validates the receiver details', () => {
    render(<DebitCardPayment />);

    // Verify the card first
    const cardNumberInput = screen.getByPlaceholderText('Enter 16-digit card number');
    const cvvInput = screen.getByPlaceholderText('CVV');
    const expiryInput = screen.getByPlaceholderText('MM/YY');
    fireEvent.change(cardNumberInput, { target: { value: '1234567890123456' } });
    fireEvent.change(cvvInput, { target: { value: '123' } });
    fireEvent.change(expiryInput, { target: { value: '12/23' } });
    const verifyButton = screen.getByText('Verify');
    fireEvent.click(verifyButton);

    // Simulate user input for receiver details
    const merchantIdInput = screen.getByPlaceholderText('Enter valid merchant id');
    fireEvent.change(merchantIdInput, { target: { value: '12345678901234' } });

    // Validate receiver details
    const validateButton = screen.getByText('Validate');
    fireEvent.click(validateButton);

    // Expect that the receiver details are validated
    expect(screen.getByText('Amount to pay')).toBeInTheDocument();
  });

  it('completes the payment', async () => {
    render(<DebitCardPayment />);

    // Verify the card and validate receiver first
    const cardNumberInput = screen.getByPlaceholderText('Enter 16-digit card number');
    const cvvInput = screen.getByPlaceholderText('CVV');
    const expiryInput = screen.getByPlaceholderText('MM/YY');
    fireEvent.change(cardNumberInput, { target: { value: '1234567890123456' } });
    fireEvent.change(cvvInput, { target: { value: '123' } });
    fireEvent.change(expiryInput, { target: { value: '12/23' } });
    const verifyButton = screen.getByText('Verify');
    fireEvent.click(verifyButton);

    const merchantIdInput = screen.getByPlaceholderText('Enter valid merchant id');
    fireEvent.change(merchantIdInput, { target: { value: '12345678901234' } });
    const validateButton = screen.getByText('Validate');
    fireEvent.click(validateButton);

    // Simulate user input for payment details
    const amountInput = screen.getByPlaceholderText('Enter amount');
    const otpInput = screen.getByPlaceholderText('Enter 6-digit otp sent to your phone');
    const pinInput = screen.getByPlaceholderText('Enter 4-digit pin');
    fireEvent.change(amountInput, { target: { value: '100' } });
    fireEvent.change(otpInput, { target: { value: '123456' } });
    fireEvent.change(pinInput, { target: { value: '1212' } });

    // Complete the payment
    const confirmButton = screen.getByText('Confirm with OTP');
    fireEvent.click(confirmButton);

    // Expect that the payment is completed successfully
    // You may need to add assertions based on the success screen.
    await act(async () => {
      expect(await screen.findByText('Payment Successful')).toBeInTheDocument();
    });
  });
});
