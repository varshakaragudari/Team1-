import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import HelpProduct from '../pages/HelpProduct';

describe('HelpProduct component', () => {
  it('renders without crashing', () => {
    render(<HelpProduct />);
  });

  it('renders the correct text in the h1 element', () => {
    const { getByText } = render(<HelpProduct />);
    const h1Text = getByText('Help with your product');
  
    // Assert that the text in the h1 element is as expected
    expect(h1Text).toBeInTheDocument();});


    
  
});
