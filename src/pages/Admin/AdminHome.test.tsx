// AdminHome.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminHome from './AdminHome'; // Adjust the import path if necessary

describe('AdminHome Component', () => {
  test('renders the home page with welcome message', () => {
    render(<AdminHome />);

    // Check if the welcome message is in the document
    expect(screen.getByText(/Welcome to the Admin Dashboard/i)).toBeInTheDocument();

    // Check if the paragraph text is in the document
  });
});
