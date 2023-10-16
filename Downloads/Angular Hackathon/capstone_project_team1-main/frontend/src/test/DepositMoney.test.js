import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import DepositMoney from '../pages/DepositMoney';

describe('DepositMoney Component', () => {
  it('renders the component', () => {
    render(<DepositMoney />);
    expect(screen.getByText('Deposit Money')).toBeInTheDocument();
  });

  it('should select an account and set an amount', () => {
    render(<DepositMoney />);

    // Simulate user input
    const accountSelect = screen.getByLabelText('In which account you want to deposit');
    const amountInput = screen.getByPlaceholderText('Enter amount');
    fireEvent.change(accountSelect, { target: { value: '1234567890' } });
    fireEvent.change(amountInput, { target: { value: '100' } });

    expect(accountSelect.value).toBe('1234567890');
    expect(amountInput.value).toBe('100');
  });

  it('should open and close the dialog', () => {
    render(<DepositMoney />);

    const depositButton = screen.getByText('Deposit');

    // Open dialog
    fireEvent.click(depositButton);
    const dialog = screen.getByText('Amount added:  £100');
    expect(dialog).toBeInTheDocument();

    // Close dialog
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    // Verify that the dialog is closed
    expect(screen.queryByText('Amount added:  £100')).toBeNull();
  });
});

describe('LoginDialog Component', () => {
  it('renders the dialog with a message', () => {
    const message = 'Amount added:  £100';
    render(<LoginDialog show={true} handleClose={() => {}} message={message} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('closes the dialog when clicking the "Close" button', () => {
    const handleClose = jest.fn();
    render(<LoginDialog show={true} handleClose={handleClose} message="Test message" />);
    const closeButton = screen.getByText('Close');

    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not render the dialog when show is false', () => {
    render(<LoginDialog show={false} handleClose={() => {}} message="Test message" });
    expect(screen.queryByText('Test message')).toBeNull();
  });
});
