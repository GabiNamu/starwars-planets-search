import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import data from './data';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import PlanetsProvider from '../context/PlanetsProvider';

beforeEach(async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(data),
  }));

  await act(async () => render(
    <PlanetsProvider>
      <App />
    </PlanetsProvider>,
  ));
})

test('Verifica de o input de filtro funciona da forma esperada', async () => {

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

test('', () => {
  const selectColumn = screen.getByTestId("column-filter");
  const selectComparison = screen.getByTestId("comparison-filter");
  const inputNumber = screen.getByTestId("value-filter");
  const filterButton = screen.getByRole('button', {
    name: /filtrar/i
  });

  expect(selectColumn).toBeInTheDocument();
  expect(selectComparison).toBeInTheDocument();
  expect(inputNumber).toBeInTheDocument();
  expect(filterButton).toBeInTheDocument();

  userEvent.selectOptions(selectColumn, 'diameter');
  userEvent.selectOptions(selectComparison, 'igual a');
  inputNumber.value = '';
  userEvent.type(inputNumber, '10200');
  userEvent.click(filterButton);

  expect(screen.getByRole('cell', {
    name: /Yavin IV/i
  })).toBeInTheDocument();
  expect(screen.queryByRole('cell', {
    name: /tatooine/i
  })).not.toBeInTheDocument();
});

test('Verifica se o filtro de ordenar os planetas funciona da maneira esperada', () => {
  const selectSort = screen.getByTestId("column-sort");
  const inputRadioAsc = screen.getByRole('radio', {
    name: /asc/i
  });
  const orderButton = screen.getByRole('button', {
    name: /ordenar/i
  });

  expect(selectSort).toBeInTheDocument();
  expect(inputRadioAsc).toBeInTheDocument();
  expect(orderButton).toBeInTheDocument();

  userEvent.selectOptions(selectSort, 'rotation_period');
  userEvent.click(inputRadioAsc);
  userEvent.click(orderButton);

  const planetsArray = screen.getAllByTestId("planet-name");
  const bespin = screen.getByRole('cell', {
    name: /bespin/i
  })
  expect(bespin).toBeInTheDocument();
})

test('Verifica se filtro de texto funciona junto do filtro de numerico', () => {
  const inputFilter = screen.getByRole('textbox');
  const selectColumn = screen.getByTestId("column-filter");
  const selectComparison = screen.getByTestId("comparison-filter");
  const inputNumber = screen.getByTestId("value-filter");
  const filterButton = screen.getByRole('button', {
    name: /filtrar/i
  });

  userEvent.type(inputFilter, 't');
  userEvent.selectOptions(selectColumn, 'rotation_period');
  userEvent.selectOptions(selectComparison, 'menor que')
  inputNumber.value = '';
  userEvent.type(inputNumber, '24');
  userEvent.click(filterButton);

  expect(screen.getByText(/tatooine/i)).toBeInTheDocument();
  expect(screen.getByText(/hoth/i)).toBeInTheDocument();
  expect(screen.queryByText(/alderaan/i)).not.toBeInTheDocument();
});