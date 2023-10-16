import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import Settings from '../pages/Settings';
describe('Settings component', () => {
    it('renders without crashing', () => {
        render(
            <MemoryRouter>
            <Settings />
          </MemoryRouter>);
      });
it('allows editing of city field', async () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Settings />
      </MemoryRouter>
    );

    const cityInput = screen.getByLabelText('City');
    fireEvent.change(cityInput, { target: { value: 'New York' } });

    await waitFor(() => {
      expect(cityInput.value).toBe('New York');
    });
  });

//   it('allows editing of state field', async () => {
//     const { getByLabelText } = render(
//       <MemoryRouter>
//         <Settings />
//       </MemoryRouter>
//     );

//     const stateInput = getByLabelText('State');
//     fireEvent.change(stateInput, { target: { value: 'California' } });

//     await waitFor(() => {
//       expect(stateInput.value).toBe('California');
//     });
//   });
});