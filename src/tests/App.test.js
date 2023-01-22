import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import data from './data';
import Table from '../components/Table';

test('I am your test ', async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(data),
  }));

  render(<App />);
  const loading = await screen.findByText(/loading.../i);
  expect(loading).toBeInTheDocument();
});
