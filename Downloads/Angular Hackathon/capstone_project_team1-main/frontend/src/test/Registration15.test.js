import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Registration15 from '../pages/Registration15'; 
 

test('renders the initial form of Registration', () => {
  render(<Registration15 />);

  // Check if the title is present
  expect(screen.getByText('Setup Online Banking - NatWest')).toBeInTheDocument();

  // Check if the main heading is present
  expect(screen.getByText('Setup Online Banking')).toBeInTheDocument();

  // Check if "Next" button is present
  const nextButton = screen.getByText('Next');
  expect(nextButton).toBeInTheDocument();

  // Ensure that the "Next" button is initially disabled
  expect(nextButton).toBeDisabled();


});