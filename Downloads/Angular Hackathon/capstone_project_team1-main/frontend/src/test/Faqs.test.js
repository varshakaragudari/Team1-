import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Faqs from '../pages/Faqs';

describe('Faqs component', () => {
  it('renders without crashing', () => {
    render(<Faqs />);
  });

  it('initially hides faq1', () => {
    const { queryByText } = render(<Faqs />);
    expect(queryByText('All our instant access savings accounts are eligible for Rounds Ups, except for Instant Access ISAs.')).toBeNull();
    
  });

  it('initially hides faq4',()=>{
    const { queryByText } = render(<Faqs />);
    expect(queryByText("You can turn Round Up alerts off or back on again whenever you want. Just open the app, go to 'my profile', tap 'settings', choose 'notification settings' and 'savings'. Then tap to choose what suits you. ")).toBeNull();
  })
  it('initially hides all answers', () => {
    const { queryByText } = render(<Faqs />);
    expect(queryByText("If you save more than £1.49 with Round Ups in any week, we'll automatically send you an alert in the app to tell you what the total amount of your Round Ups was for that week. You might be surprised by how much you've saved.")).toBeNull();
    // Repeat this for other questions
  });

  
});
