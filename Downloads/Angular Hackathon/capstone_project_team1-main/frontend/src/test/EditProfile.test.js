import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import EditProfile from '../pages/EditProfile'
import { MemoryRouter } from 'react-router-dom'; // To provide a router context
describe('EditProfile component', () => {
    it('renders without crashing', () => {
        render(
            <MemoryRouter>
            <EditProfile />
          </MemoryRouter>);
      });
it('allows editing of city field', async () => {
  const { getByLabelText } = render(
    <MemoryRouter>
      <EditProfile />
    </MemoryRouter>
  );

  const cityInput = getByLabelText('City');
  fireEvent.change(cityInput, { target: { value: 'New York' } });

  await waitFor(() => {
    expect(cityInput.value).toBe('New York');
  });
});

it('allows editing of state field', async () => {
  const { getByLabelText } = render(
    <MemoryRouter>
      <EditProfile />
    </MemoryRouter>
  );

  const stateInput = getByLabelText('State');
  fireEvent.change(stateInput, { target: { value: 'California' } });

  await waitFor(() => {
    expect(stateInput.value).toBe('California');
  });
});
});

// import React from 'react';
// import { render } from '@testing-library/react';
// import EditProfile from '../pages/EditProfile'; 
// import { MemoryRouter } from 'react-router-dom';

// describe('EditProfile Component', () => {
  // it('renders the EditProfile component with initial form values', () => {
  //   const { getByLabelText, getByText } = render(<EditProfile />);

  //   // Assert that the component renders with initial form values
  //   expect(getByLabelText('First Name')).toHaveValue('');
  //   expect(getByLabelText('Last Name')).toHaveValue('');
  //   expect(getByLabelText('Address')).toHaveValue('');
  //   expect(getByLabelText('Date Of Birth')).toHaveValue('');
  //   expect(getByLabelText('City')).toHaveValue('');
  //   expect(getByLabelText('State')).toHaveValue('');
  //   expect(getByLabelText('Country')).toHaveValue('');
  //   expect(getByLabelText('Phone Number')).toHaveValue('');
  //   expect(getByLabelText('Email')).toHaveValue('');
  //   expect(getByLabelText('Bio')).toHaveValue('');

  //   // Assert that buttons are rendered
  //   expect(getByText('Save')).toBeInTheDocument();
  //   expect(getByText('Cancel')).toBeInTheDocument();
  // });

  // it('allows entering values in the form fields', () => {
  //   const { getByLabelText } = render(<EditProfile />);

  //   // Simulate user input in form fields
  //   fireEvent.change(getByLabelText('First Name'), { target: { value: 'John' } });
  //   fireEvent.change(getByLabelText('Last Name'), { target: { value: 'Doe' } });
  //   // Repeat for other form fields as needed

  //   // Assert that the form fields have the updated values
  //   expect(getByLabelText('First Name')).toHaveValue('John');
  //   expect(getByLabelText('Last Name')).toHaveValue('Doe');
  //   // Repeat for other form fields as needed
  // });

  // it('allows uploading a user photo', () => {
  //   const { getByLabelText } = render(<EditProfile />);

  //   // Simulate user selecting a file
  //   const fileInput = getByLabelText('Upload Your Photo');
  //   fireEvent.change(fileInput, {
  //     target: { files: [new File(['user-photo'], 'user-photo.jpg', { type: 'image/jpeg' })] },
  //   });

  //   // Assert that the user photo input has changed
  //   expect(fileInput).toHaveValue('');
  // });

  // it('allows deleting the user photo', () => {
  //   const { getByLabelText, getByText } = render(<EditProfile />);

  //   // Simulate user uploading a photo
  //   fireEvent.change(getByLabelText('Upload Your Photo'), {
  //     target: { files: [new File(['user-photo'], 'user-photo.jpg', { type: 'image/jpeg' })] },
  //   });

  //   // Simulate user clicking the Delete button
  //   fireEvent.click(getByText('Delete'));

  //   // Assert that the user photo input has been cleared
  //   expect(getByLabelText('Upload Your Photo')).toHaveValue('');
  // });

  // // You can add more test cases to cover other interactions and validations

  // it('displays a success message after form submission', () => {
  //   const { getByText, getByLabelText } = render(<EditProfile />);

  //   // Simulate user entering valid data and submitting the form
  //   fireEvent.change(getByLabelText('First Name'), { target: { value: 'John' } });
  //   fireEvent.change(getByLabelText('Last Name'), { target: { value: 'Doe' } });
  //   // Repeat for other form fields as needed
  //   fireEvent.click(getByText('Save'));

  //   // Assert that a success message is displayed
  //   expect(getByText('Your profile has been updated.')).toBeInTheDocument();
  // });

  // it('renders the "Personal Information" heading with the correct className', () => {
  //   // Render the EditProfile component
  //   const { getByText } = render(<EditProfile />);
  //   const personalInfoHeading = getByText('Personal Information');

  //   // Assert that the element with the correct className exists
  //   expect(personalInfoHeading).toBeInTheDocument();
  //   expect(personalInfoHeading).toHaveClass('personal-info-heading');
  // });
//   it('renders without crashing', () => {
//     render(<EditProfile />);
//   });
// });
