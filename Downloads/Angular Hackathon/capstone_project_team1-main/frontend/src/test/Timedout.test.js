import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Timedout from '../pages/Timedout';

describe('Timedout component', () => {
  it('renders without crashing', () => {
    render(<Timedout />);
  });

 

  it('displays the timeout message', () => {
    const { getByText } = render(<Timedout />);
    expect(getByText("Sorry, you've timed out")).toBeTruthy();
  });

  it('displays the "What\'s next?" section', () => {
    const { getByText } = render(<Timedout />);
    expect(getByText("what's next?")).toBeTruthy();
  });

  

  it('displays a "Start again" button', () => {
    const { getByText } = render(<Timedout />);
    expect(getByText('Start again')).toBeTruthy();
  });

  
});
