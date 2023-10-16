import React from 'react';
import { render, screen } from '@testing-library/react';
import Activity from '../pages/Activity';

// Mock sessionStorage for the test
const mockSessionStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};
global.sessionStorage = mockSessionStorage;

// Mock axios for the test
jest.mock('axios');

describe('Activity Component', () => {
  beforeEach(() => {
    mockSessionStorage.getItem.mockClear();
  });

  it('renders the component without crashing', () => {
    render(<Activity />);
  });

  it('displays the title in Helmet', () => {
    render(<Activity />);
    const titleElement = screen.getByText('Activity - My Profile - NatWest Online Banking');
    expect(titleElement).toBeInTheDocument();
  });

  it('fetches and displays activities when they exist', async () => {
    // Mock user data in sessionStorage
    mockSessionStorage.getItem.mockReturnValue('{"userId": "123"}');

    // Mock axios response
    const activities = [
      { activityId: 1, type: 'Login', description: 'User logged in', timestamp: Date.now(), ipAddress: '192.168.0.1' },
      // Add more activity data as needed
    ];

    const axiosMock = require('axios');
    axiosMock.get.mockResolvedValue({ data: activities });

    render(<Activity />);

    // Wait for activities to be displayed
    const activityElements = await screen.findAllByRole('row');
    expect(activityElements).toHaveLength(activities.length);
  });

  it('displays a message when no activities exist', async () => {
    // Mock user data in sessionStorage
    mockSessionStorage.getItem.mockReturnValue('{"userId": "123"}');

    // Mock axios response for no activities
    const axiosMock = require('axios');
    axiosMock.get.mockResolvedValue({ data: [] });

    render(<Activity />);

    const noActivityMessage = await screen.findByText('No any activity');
    expect(noActivityMessage).toBeInTheDocument();
  });

  // Add more test cases as needed to cover other parts of the component and its behavior.
});
