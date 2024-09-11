// Users.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Users from './Users';
import { api } from './api';
import { userColumns } from './utils';
import { BrowserRouter as Router } from 'react-router-dom';
import { toast } from 'react-toastify';

// Mock the API
jest.mock('./api', () => ({
  api: {
    getUsers: jest.fn(),
  },
}));

// Mock the toast notifications
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
];

describe('Users Component', () => {
  beforeEach(() => {
    (api.getUsers as jest.Mock).mockResolvedValue(mockUsers);
  });

  test('renders the Users component', async () => {
    render(
      <Router>
        <Users />
      </Router>
    );

    // Wait for users to be fetched and rendered
    await screen.findByText('John Doe');

    // Check if the "Add User" button is in the document
    expect(screen.getByText('Add User')).toBeInTheDocument();

    // Check if the user data is displayed in the table
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  test('filters users based on search query', async () => {
    render(
      <Router>
        <Users />
      </Router>
    );

    await screen.findByText('John Doe');

    // Type in the search field
    fireEvent.change(screen.getByLabelText(/Search user/i), { target: { value: 'Jane' } });

    // Check if only the filtered user is displayed
    expect(screen.queryByText('John Doe')).toBeNull();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  test('handles API errors gracefully', async () => {
    (api.getUsers as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));

    render(
      <Router>
        <Users />
      </Router>
    );

    // Wait for the error handling
    await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Failed to fetch Users list'));
  });
});
