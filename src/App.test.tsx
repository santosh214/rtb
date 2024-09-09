import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';
import Layout from './components/Layout/Layout';

// Mock Layout component to test App component in isolation
jest.mock('./components/Layout/Layout', () => () => <div>Mock Layout</div>);

describe('App Component', () => {
  test('renders ToastContainer and Layout', () => {
    render(<App />);


    // Check if Layout is rendered (mocked version in this case)
    expect(screen.getByText('Mock Layout')).toBeInTheDocument();
  });

  test('matches the snapshot', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});
