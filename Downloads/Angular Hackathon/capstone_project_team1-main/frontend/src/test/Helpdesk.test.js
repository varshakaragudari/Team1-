import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // To provide a router context
import Helpdesk from '../pages/Helpdesk';

describe('Helpdesk component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Helpdesk />
      </MemoryRouter>
    );
  });

  
});
