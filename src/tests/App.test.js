import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import data from './data';
import Table from '../components/Table';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import PlanetsProvider from '../context/PlanetsProvider';

test('Verifica de o input de filtro funciona da forma esperada', async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(data),
  }));

  await act(async () => render(
    <PlanetsProvider>
      <App />
    </PlanetsProvider>,
  ));

  const inputFilter = await screen.findByRole('textbox');
  expect(inputFilter).toBeInTheDocument();
  const tatooine = await screen.findByRole('cell', {
    name: /tatooine/i
  });
  expect(tatooine).toBeInTheDocument();

  userEvent.type(inputFilter, 'al');

  const alderaan = screen.getByRole('cell', {
    name: /alderaan/i
  });
  expect(alderaan).toBeInTheDocument();
});
