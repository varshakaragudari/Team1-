import React from 'react';
import { render, fireEvent, screen  } from '@testing-library/react';
import Transaction from '../pages/Transaction';
import { MemoryRouter } from 'react-router-dom'; // To provide a router context
describe('Transaction component', () => {
    it('renders without crashing', () => {
        
        render(
            <MemoryRouter>
            <Transaction />
          </MemoryRouter>);
      });
it('renders with the correct title', () => {
    render(
      <MemoryRouter>
        <Transaction />
      </MemoryRouter>
    );

    const titleElement = screen.getByText('Transactions - NatWest Online Banking', { exact: false });
    expect(titleElement).toBeInTheDocument();
  });
  it('renders a table', () => {
    render(<MemoryRouter>
        <Transaction />
      </MemoryRouter>);
    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
  });
});

