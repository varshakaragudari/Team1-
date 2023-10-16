import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FeedbackForm from '../pages/Feedback';

describe('FeedbackForm component', () => {
  it('renders without crashing', () => {
    render(<FeedbackForm />);
  });

  
  it("renders the feedback form title with the correct class name",()=>{
    render(<FeedbackForm />);
    const feedbackFormTitle = screen.getByText('Feedback form');
  
  // Use the `toHaveClass` matcher to check if the element has the correct class name
  expect(feedbackFormTitle).toHaveClass('prim-colr');
  })
  it("renders the label for First Name",()=>{
    render(<FeedbackForm />);
    const firstNameLabel = screen.getByText('First Name*');

  // Assert that the label element is in the document
  expect(firstNameLabel).toBeInTheDocument();
  })
  it("renders the label for Last Name",()=>{
    render(<FeedbackForm />);
    const lastNameLabel = screen.getByText('Last Name*');

  // Assert that the label element is in the document
  expect(lastNameLabel).toBeInTheDocument();
  })
});
